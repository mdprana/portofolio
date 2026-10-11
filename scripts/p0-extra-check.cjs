const base = process.env.BASE_URL || "http://localhost:3122";
const ROUTES = ["/", "/projects", "/about", "/contact", ...["lexa", "pulse", "nodewatch", "ledger", "atlas", "sentra", "bloom", "orbit"].map(s => `/projects/${s}`)];
const WIDTHS = [320, 390, 1107, 1440, 1920];
(async () => {
  const { default: assert } = await import("node:assert/strict");
  const fs = await import("node:fs");
  const { createRequire } = await import("node:module");
  const { chromium } = createRequire(__filename)(process.env.PLAYWRIGHT_PATH || "/home/ubuntu/hermes3d/node_modules/playwright");
  const phase = process.env.PHASE || "full";
  assert(["full", "pixels"].includes(phase), `unknown PHASE ${phase}`);
  const out = process.env.OUT_DIR || (phase === "pixels" ? `docs/p0-evidence/pixels-${new Date().toISOString().replaceAll(/[:.]/g, "-")}` : "docs/p0-evidence");
  fs.mkdirSync(out, { recursive: true });
  const result = { base, phase, expected: phase === "pixels" ? { loads: 0, keyboard: 0, menus: 0, toolkit: 2, iconsPerMode: 12 } : { loads: 240, keyboard: 120, menus: 4, toolkit: 2 }, timestamp: new Date().toISOString(), loads: [], keyboard: [], menus: [], toolkit: [], errors: [] };
  const browser = await chromium.launch();
  browser.on("disconnected", () => fs.writeFileSync(`${out}/p0-extra-check.json`, JSON.stringify(result, null, 2)));
  const deadline = setTimeout(async () => { result.passed = false; result.errors.push({ scope: "deadline", message: phase === "pixels" ? "180 second pixel runtime limit" : "12 minute runtime limit" }); fs.writeFileSync(`${out}/p0-extra-check.json`, JSON.stringify(result, null, 2)); await browser.close(); process.exit(1); }, phase === "pixels" ? 175000 : 720000);
  const record = async (scope, fn) => {
    if (!browser.isConnected()) throw new Error("Browser closed; verification stopped");
    try { await fn(); } catch (error) { result.errors.push({ scope, message: error.stack }); console.error(scope, error.stack); }
    fs.writeFileSync(`${out}/p0-extra-check.json`, JSON.stringify(result, null, 2));
    const progress = { scope, loads: result.loads.length, keyboard: result.keyboard.length, menus: result.menus.length, toolkit: result.toolkit.length, errors: result.errors.length };
    console.log(JSON.stringify(progress));
    fs.writeFileSync(`${out}/p0-extra-progress.json`, JSON.stringify(progress, null, 2));
  };
  const evidence = async (page, path) => { if (!fs.existsSync(path) || !fs.statSync(path).size) await page.screenshot({ path, fullPage: true }); assert(fs.statSync(path).size > 0, `missing screenshot ${path}`); return path; };
  const stableFocus = async page => page.evaluate(() => new Promise((resolve, reject) => {
    const start = performance.now(); let previous = [], stable = 0;
    const check = () => {
      const n = document.activeElement, s = getComputedStyle(n), r = n.getBoundingClientRect();
      const position = [scrollX, scrollY, r.x, r.y, r.width, r.height];
      stable = position.every((v, i) => Math.abs(v - previous[i]) <= 2) ? stable + 1 : 0; previous = position;
      const visible = r.width > 0 && r.height > 0 && r.top < innerHeight && r.bottom > 0;
      if (stable >= 6 && performance.now() - start >= 200 && visible) return resolve({ id: n.dataset.qaFocus, text: n.textContent.trim(), outline: s.outline, visible, focusVisible: n.matches(":focus-visible") });
      if (performance.now() - start > 2500) return reject(new Error("Focus/scroll did not settle within 2500ms"));
      requestAnimationFrame(check);
    }; requestAnimationFrame(check);
  }));
  const newContext = async options => { const context = await browser.newContext(options); context.setDefaultTimeout(8000); context.setDefaultNavigationTimeout(15000); return context; };
  const dimensions = () => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, headings: [...document.querySelectorAll(".display")].map(n => ({ text: n.textContent, width: n.clientWidth, scrollWidth: n.scrollWidth, size: getComputedStyle(n).fontSize })) });
  const clipping = () => {
    const found = [], intentional = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode, el = node.parentElement;
      if (!node.textContent.trim() || el.closest('script,style,[aria-hidden="true"]') || !el.getClientRects().length || getComputedStyle(el).visibility === "hidden") continue;
      const range = document.createRange(); range.selectNodeContents(node);
      for (const r of range.getClientRects()) {
        if (!r.width || !r.height) continue;
        let clipped = r.left < -1 || r.right > innerWidth + 1;
        for (let p = el; p && p !== document.body; p = p.parentElement) {
          const s = getComputedStyle(p), b = p.getBoundingClientRect();
          if (/hidden|clip/.test(s.overflowX) && (r.left < b.left - 1 || r.right > b.right + 1)) clipped = true;
          if (/hidden|clip/.test(s.overflowY) && (r.top < b.top - 1 || r.bottom > b.bottom + 1)) clipped = true;
        }
        if (clipped) (el.closest('nav[aria-label="Primary"]') ? intentional : found).push({ text: node.textContent.trim(), tag: el.tagName, x: r.x, y: r.y + scrollY, width: r.width, height: r.height });
      }
    }
    return { found, intentional };
  };
  if (phase === "full") {
  for (const motion of ["no-preference", "reduce"]) for (const width of WIDTHS) {
    for (const blocked of [false, true]) {
      const context = await newContext({ viewport: { width, height: 1000 }, reducedMotion: motion });
      if (blocked) await context.route("**/*", route => route.request().resourceType() === "script" ? route.abort() : route.continue());
      const page = await context.newPage();
      await page.addInitScript(() => {
        window.loadDimensions = [];
        document.addEventListener("DOMContentLoaded", () => {
          const capture = stage => window.loadDimensions.push({ stage, width: innerWidth, scrollWidth: document.documentElement.scrollWidth });
          capture("DOMContentLoaded");
          for (const ms of [0, 50, 150, 300]) setTimeout(() => capture(`+${ms}ms`), ms);
        });
      });
      for (const route of ROUTES) await record(`${route}/${width}/${motion}/blocked=${blocked}`, async () => {
        assert.equal((await page.goto(base + route, { waitUntil: "domcontentloaded" })).status(), 200);
        const early = await page.evaluate(dimensions);
        await page.waitForTimeout(400);
        await page.evaluate(() => document.fonts.ready);
        const final = await page.evaluate(dimensions), timings = await page.evaluate(() => window.loadDimensions);
        const key = `${route.replaceAll("/", "_")}-${width}-${motion}-${blocked ? "blocked" : "early"}`;
        const screenshot = await evidence(page, `${out}/${key}.png`);
        const sample = { route, width, motion, blocked, early, timings, final, screenshot };
        result.loads.push(sample); fs.writeFileSync(`${out}/${key}.json`, JSON.stringify(sample, null, 2));
        for (const d of [early, final, ...timings]) assert(d.scrollWidth <= width, `${key} overflow ${JSON.stringify(d)}`);
        for (const h of final.headings) assert(h.scrollWidth <= h.width + 1, `${key}: heading overflow ${JSON.stringify(h)}`);
      });
      await context.close();
    }
    const context = await newContext({ viewport: { width, height: 1000 }, reducedMotion: motion });
    const page = await context.newPage();
    for (const route of ROUTES) await record(`keyboard/clipping ${route}/${width}/${motion}`, async () => {
      await page.goto(base + route, { waitUntil: "networkidle" });
      for (let y = 0; y < await page.evaluate(() => document.documentElement.scrollHeight); y += 650) {
        await page.evaluate(y => scrollTo({ top: y, behavior: "instant" }), y); await page.waitForTimeout(motion === "reduce" ? 10 : 100);
      }
      await page.waitForTimeout(1000);
      const text = await page.evaluate(clipping);
      const controls = await page.locator('a[href],button:not([disabled]),[tabindex="0"]').evaluateAll(ns => ns.filter(n => n.getClientRects().length && getComputedStyle(n).visibility !== "hidden").map(n => { n.dataset.qaFocus = String(ns.indexOf(n)); return { id: n.dataset.qaFocus, text: n.textContent.trim(), href: n.getAttribute("href") }; }));
      await page.evaluate(() => { document.activeElement.blur(); scrollTo({ top: 0, behavior: "instant" }); });
      const forward = [], reverse = [];
      for (let i = 0; i < controls.length; i++) {
        await page.keyboard.press("Tab");
        const f = await stableFocus(page);
        forward.push(f); assert(f.id, `Tab reached non-control ${f.text}`); assert(f.visible && f.focusVisible && !/ 0px/.test(f.outline), `focus invisible ${JSON.stringify(f)}`);
      }
      assert.equal(new Set(forward.map(f => f.id)).size, controls.length, "forward traversal missed controls");
      for (let i = 0; i < controls.length - 1; i++) { await page.keyboard.press("Shift+Tab"); reverse.push(await page.evaluate(() => document.activeElement.dataset.qaFocus)); }
      assert.deepEqual(reverse, forward.slice(0, -1).reverse().map(f => f.id));
      const screenshot = await evidence(page, `${out}/${route.replaceAll("/", "_")}-${width}-${motion}.png`);
      result.keyboard.push({ route, width, motion, controls, forward, reverse, clipping: text, screenshot });
      assert.deepEqual(text.found, [], "unexpected text clipping");
      assert((await page.evaluate(dimensions)).scrollWidth <= width);
    });
    await context.close();
  }
  for (const motion of ["no-preference", "reduce"]) for (const width of [320, 390]) await record(`menu/${width}/${motion}`, async () => {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: motion });
    await page.goto(base, { waitUntil: "networkidle" });
    const trigger = page.getByRole("button", { name: "MENU", exact: true });
    await trigger.focus(); await page.keyboard.press("Enter");
    const dialog = page.getByRole("dialog"), count = await dialog.locator("a,button").count();
    assert.equal(await page.evaluate(() => document.activeElement.textContent.trim()), "CLOSE");
    const cycles = [];
    for (const key of ["Tab", "Shift+Tab"]) for (let i = 0; i < count * 3; i++) {
      await page.keyboard.press(key);
      const f = await page.evaluate(() => ({ inside: !!document.activeElement.closest("dialog"), body: document.activeElement === document.body, text: document.activeElement.textContent.trim().slice(0, 80), outline: getComputedStyle(document.activeElement).outline, visible: document.activeElement.matches(":focus-visible") }));
      assert(f.body || (f.inside && f.visible && !/ 0px/.test(f.outline)), `modal background/invisible ${JSON.stringify(f)}`); cycles.push({ key, ...f });
    }
    const attempts = await page.locator('header a,header button,main a,main button,footer a').evaluateAll(ns => ns.map(n => { n.focus(); return { text: n.textContent.trim(), reached: document.activeElement === n, inside: !!document.activeElement.closest("dialog") }; }));
     assert(attempts.every(a => !a.reached), "background focus reachable");
    await dialog.screenshot({ path: `${out}/menu-${width}-${motion}-focus.png` });
    await page.keyboard.press("Escape"); assert.equal(await dialog.count(), 0); assert.equal(await page.evaluate(() => document.activeElement.textContent.trim()), "MENU");
    const navigation = [];
    for (const destination of ["Projects", "About", "Contact", "Home"]) {
      await trigger.focus(); await page.keyboard.press("Enter");
      await page.getByRole("dialog").getByRole("link", { name: destination, exact: true }).focus(); await page.keyboard.press("Enter");
      await page.waitForURL(base + (destination === "Home" ? "/" : `/${destination.toLowerCase()}`)); await page.waitForTimeout(400);
      assert.equal(await page.getByRole("dialog").count(), 0);
      const focus = await page.evaluate(() => ({ tag: document.activeElement.tagName, text: document.activeElement.textContent.trim().slice(0, 80), connected: document.activeElement.isConnected, visible: !!document.activeElement.getClientRects().length }));
      assert(focus.connected && focus.visible && focus.tag !== "BODY", `navigation focus lost ${JSON.stringify(focus)}`); navigation.push({ destination, focus });
    }
    result.menus.push({ width, motion, count, cycles, attempts, navigation }); await page.close();
  });
  }
  await record("toolkit/reduced-reveal", async () => {
    const checkpoints = [];
    for (const mode of ["fresh", "live"]) {
      const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: mode === "fresh" ? "reduce" : "no-preference" });
      assert.equal((await page.goto(base)).status(), 200);
      await page.waitForTimeout(2000);
      await page.locator('[data-tool="Keras"]').scrollIntoViewIfNeeded();
      await page.mouse.move(0, 0);
      if (mode === "live") {
        await page.waitForTimeout(40);
        await page.emulateMedia({ reducedMotion: "reduce" });
      }
      for (const delay of [50, 250, 2200, 500]) {
        await page.waitForTimeout(delay);
        const ancestors = await page.locator('[data-tool="Keras"]').evaluate(tile => {
          const nodes = [];
          for (let node = tile.parentElement; node && node.tagName !== "MAIN"; node = node.parentElement) {
            const css = getComputedStyle(node), matrix = new DOMMatrix(css.transform);
            nodes.push({ tag: node.tagName, opacity: css.opacity, transform: css.transform, static: matrix.isIdentity });
          }
          return nodes;
        });
        checkpoints.push({ mode, delay, ancestors });
        fs.writeFileSync(`${out}/reduced-reveal.json`, JSON.stringify(checkpoints, null, 2));
        assert(ancestors.some(node => node.tag === "UL"), "toolkit UL missing");
        for (const node of ancestors) {
          assert.equal(Number(node.opacity), 1, `${mode} ancestor opacity ${JSON.stringify(node)}`);
          assert(node.static, `${mode} ancestor transform ${JSON.stringify(node)}`);
        }
      }
      await page.screenshot({ path: `${out}/reduced-reveal-${mode}.png` });
      await page.close();
    }
  });
  for (const motion of ["no-preference", "reduce"]) await record(`pixels/${motion}`, async () => {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: motion });
    await page.goto(base, { waitUntil: "networkidle" });
    const pixels = async buffer => page.evaluate(async data => {
      const image = new Image(); image.src = `data:image/png;base64,${data}`; await image.decode();
      const canvas = document.createElement("canvas"); canvas.width = image.width; canvas.height = image.height;
      const ctx = canvas.getContext("2d"); ctx.fillStyle = "#777"; ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.drawImage(image, 0, 0); const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let white = 0, black = 0, middleWhite = 0, middleBlack = 0;
      for (let y = 0; y < canvas.height; y++) for (let x = 0; x < canvas.width; x++) { const i = (y * canvas.width + x) * 4; const w = d[i] > 240 && d[i+1] > 240 && d[i+2] > 240, b = d[i] < 15 && d[i+1] < 15 && d[i+2] < 15; white += w; black += b; if(x > canvas.width*.28 && x < canvas.width*.72 && y > canvas.height*.2 && y < canvas.height*.8) {middleWhite += w; middleBlack += b;} }
      return { width: canvas.width, height: canvas.height, white, black, middleWhite, middleBlack };
    }, buffer.toString("base64"));
    const icons = [];
    for (const tile of await page.locator("[data-tool]").all()) {
      const name = await tile.getAttribute("data-tool"), icon = tile.locator("img"), states = {};
      await tile.scrollIntoViewIfNeeded(); await page.mouse.move(0, 0); await page.waitForTimeout(1500);
      for (const state of ["rest", "hover"]) {
        if (state === "hover") { await tile.hover(); await page.waitForTimeout(450); }
        const path = `${out}/icon-${name.replaceAll(/[^a-z0-9]/gi, "_")}-${motion}-${state}.png`;
        const buffer = await icon.screenshot({ path }); const p = await pixels(buffer);
        assert(p.white > 10 && p.black > 10, `missing silhouette ${name}/${state}`);
        if(name === "Keras") assert(p.middleWhite > 10 && p.middleBlack > 10, "Keras negative space lost");
        const css = await icon.evaluate(n => ({ filter: getComputedStyle(n).filter, width: n.getBoundingClientRect().width }));
        assert.equal(css.filter, `brightness(0) invert(${state === "rest" ? 1 : 0})`);
        assert.equal(css.width, state === "hover" && motion !== "reduce" ? 72 : 56); states[state] = { path, pixels: p, css };
      }
      icons.push({ name, ...states });
    }
    if (phase === "pixels") { assert.equal(icons.length, 12); assert(icons.some(icon => icon.name === "Keras")); }
    const track = page.locator('[aria-hidden] > div.flex.w-max');
    const marquee = [];
    for (const state of ["rest", "hover"]) {
      await track.evaluate(n => n.parentElement.scrollIntoView({ behavior: "instant", block: "center" })); await page.mouse.move(0, 0);
      if(state === "hover") { const box = await track.locator("..").boundingBox(); await page.mouse.move(box.x + 100, box.y + 15); }
      const path = `${out}/marquee-${motion}-${state}.png`; await page.screenshot({ path });
      const styles = await track.locator("img").evaluateAll(ns => ns.map(n => ({ src: n.getAttribute("src"), filter: getComputedStyle(n).filter, width: n.getBoundingClientRect().width })));
      assert.equal(styles.length, 24); assert(styles.every(s => s.filter === "brightness(0) invert(1)"));
      marquee.push({ state, path, styles });
    }
    if(motion === "reduce") { const before = await track.evaluate(n => getComputedStyle(n).transform); await page.waitForTimeout(500); assert.equal(await track.evaluate(n => getComputedStyle(n).transform), before); }
    result.toolkit.push({ motion, icons, marquee }); await page.close();
  });
  clearTimeout(deadline);
  await browser.close();
  result.passed = phase === "pixels"
    ? result.errors.length === 0 && result.loads.length === 0 && result.keyboard.length === 0 && result.menus.length === 0 && result.toolkit.length === 2 && result.toolkit.every(mode => mode.icons.length === 12 && mode.icons.some(icon => icon.name === "Keras"))
    : result.errors.length === 0 && result.loads.length === 240 && result.keyboard.length === 120 && result.menus.length === 4 && result.toolkit.length === 2;
  fs.writeFileSync(`${out}/p0-extra-check.json`, JSON.stringify(result, null, 2));
  console.log(JSON.stringify({ passed: result.passed, loads: result.loads.length, keyboard: result.keyboard.length, menus: result.menus.length, toolkit: result.toolkit.length, errors: result.errors }, null, 2));
  if (!result.passed) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
