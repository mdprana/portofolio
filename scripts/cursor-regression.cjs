const base = process.env.BASE_URL || "http://localhost:3105";
const evidence = { base, timestamp: new Date().toISOString(), checks: [], errors: [] };

(async () => {
  const { default: assert } = await import("node:assert/strict");
  const fs = await import("node:fs");
  const path = await import("node:path");
  const { createRequire } = await import("node:module");
  const externalRequire = createRequire(__filename);
  const { chromium } = externalRequire(process.env.PLAYWRIGHT_PATH || "/home/ubuntu/hermes3d/node_modules/playwright");
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH || chromium.executablePath() });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  await context.addInitScript(() => {
    const original = window.matchMedia.bind(window);
    const query = '(hover: hover) and (pointer: fine)';
    const controlled = original(query);
    window.qaEligibility = value => {
      Object.defineProperty(controlled, 'matches', { configurable: true, value });
      controlled.dispatchEvent(new Event('change'));
    };
    window.matchMedia = value => value === query ? controlled : original(value);
  });
  const page = await context.newPage();
  page.on("pageerror", error => evidence.errors.push(error.message));
  const snapshot = () => page.evaluate(() => {
    const circle = document.querySelector(".site-cursor");
    const badge = [...document.querySelectorAll('[aria-hidden="true"]')].find(node => node.textContent.trim() === "VIEW PROJECT" && getComputedStyle(node).position === "fixed");
    const css = getComputedStyle(circle);
    const matrix = new DOMMatrix(css.transform);
    return {
      classes: document.documentElement.className,
      circle: css.display !== "none" && Number(css.opacity) > 0,
      opacity: Number(css.opacity), width: parseFloat(css.width), height: parseFloat(css.height),
      x: matrix.m41, y: matrix.m42, badge: !!badge,
      badgeX: badge ? new DOMMatrix(getComputedStyle(badge).transform).m41 : null,
      cursor: getComputedStyle(document.elementFromPoint(window.qaX || 1, window.qaY || 1) || document.body).cursor,
      hit: document.elementFromPoint(window.qaX || 1, window.qaY || 1)?.outerHTML.slice(0, 300),
      point: [window.qaX, window.qaY],
      scale: document.querySelector('[data-featured-card] [data-project-media]') ? new DOMMatrix(getComputedStyle(document.querySelector('[data-featured-card] [data-project-media]')).transform).a : null,
      media: { hover: matchMedia('(hover: hover)').matches, fine: matchMedia('(pointer: fine)').matches, reduce: matchMedia('(prefers-reduced-motion: reduce)').matches },
    };
  });
  const check = async (name, kind) => {
    await page.waitForTimeout(250);
    const state = await snapshot();
    evidence.checks.push({ name, state });
    assert(!(state.circle && state.badge), `${name}: two replacements`);
    if (kind === "native") {
      assert(!state.circle && !state.badge, `${name}: overlay remains`);
      assert(!/custom-cursor|featured-cursor|featured-media-active/.test(state.classes), `${name}: stale classes`);
      assert.notEqual(state.cursor, "none", `${name}: native hidden`);
    } else {
      assert.equal(state.badge, kind === "badge", name);
      assert.equal(state.circle, kind === "circle", name);
      if (kind === "badge") assert.equal(state.cursor, "none", name);
      else assert.notEqual(state.cursor, "none", `${name}: native hidden outside featured media`);
    }
    return state;
  };
  const move = async (x, y) => {
    await page.evaluate(({ x, y }) => { window.qaX = x; window.qaY = y; }, { x, y });
    await page.mouse.move(x, y);
  };
  const mediaPoint = async () => {
    const media = page.locator('[data-featured-card] [data-project-media]').first();
    await media.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    const box = await media.boundingBox();
    return { x: box.x + box.width / 2, y: Math.max(30, Math.min(950, box.y + box.height / 2)) };
  };
  try {
    for (const preference of ["no-preference", "reduce"]) {
      await page.emulateMedia({ reducedMotion: preference });
      const response = await page.goto(base);
      assert.equal(response.status(), 200);
      await page.waitForTimeout(1200);
      await check(`${preference}: initial`, "native");
      const point = await mediaPoint();
      await move(point.x, point.y);
      const badge = await check(`${preference}: media`, "badge");
      assert.equal(badge.media.fine && badge.media.hover, true);
      if (preference === "reduce") {
        assert.equal(badge.scale, 1);
        assert.equal(badge.badgeX, point.x - 18);
      }
      for (const [name, selector] of [["title", "h3"], ["year", "span"], ["padding", "div.flex.items-baseline"]]) {
        const target = page.locator('[data-featured-card]').first().locator(selector).first();
        await target.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        const box = await target.boundingBox();
        await move(box.x + box.width / 2, box.y + (name === "padding" ? 5 : box.height / 2));
        await check(`${preference}: ${name}`, "circle");
      }
      await move(1400, 100);
      const outside = await check(`${preference}: outside`, "circle");
      if (preference === "reduce") {
        assert.equal(outside.width, 28); assert.equal(outside.height, 28);
        await page.evaluate(() => window.dispatchEvent(new PointerEvent("pointermove", { pointerType: "mouse", clientX: 1380, clientY: 110 })));
        await page.evaluate(() => new Promise(requestAnimationFrame));
        const raw = await snapshot();
        evidence.checks.push({ name: "reduce: raw coordinates next frame", state: raw });
        assert.equal(raw.x, 1380); assert.equal(raw.y, 110); assert.equal(raw.opacity, 1);
      }
      await page.evaluate(() => window.dispatchEvent(new PointerEvent('pointerdown', { pointerType: 'mouse' })));
      await page.waitForFunction(expected => Math.abs(parseFloat(getComputedStyle(document.querySelector('.site-cursor')).width) - expected) < 0.1, preference === "reduce" ? 28 : 16);
      const pressed = await check(`${preference}: press`, "circle");
      assert(Math.abs(pressed.width - (preference === "reduce" ? 28 : 16)) < 1);
      await page.evaluate(() => window.dispatchEvent(new PointerEvent('pointerup', { pointerType: 'mouse' })));
      await page.evaluate(() => window.dispatchEvent(new Event("blur")));
      await check(`${preference}: blur`, "native");
      await move(5, 120); await check(`${preference}: reenter`, "circle");
      await page.evaluate(() => document.dispatchEvent(new Event("pointerleave")));
      await check(`${preference}: leave`, "native");
      await move(5, 130);
      for (const type of ["touch", "pen", ""]) {
        for (const event of ["pointerdown", "pointermove"]) {
          await page.evaluate(({ type, event }) => window.dispatchEvent(new PointerEvent(event, { pointerType: type, clientX: 100, clientY: 100 })), { type, event });
          await check(`${preference}: ${type || "unknown"} ${event}`, "native");
          await move(5, 130);
          await page.evaluate(() => window.dispatchEvent(new PointerEvent("pointermove", { pointerType: "mouse", clientX: 5, clientY: 130 })));
        }
      }
      const nextPoint = await mediaPoint();
      await move(nextPoint.x, nextPoint.y); await check(`${preference}: before scroll`, "badge");
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
      await check(`${preference}: stationary scroll`, "circle");
      const prevented = await page.evaluate(() => {
        const event = new WheelEvent("wheel", { deltaY: 80, bubbles: true, cancelable: true });
        document.body.dispatchEvent(event);
        return event.defaultPrevented;
      });
      evidence.checks.push({ name: `${preference}: wheel interception`, prevented });
      assert.equal(prevented, preference !== "reduce");
      await page.keyboard.press("Escape");
      const before = await page.evaluate(() => scrollY);
      await page.mouse.wheel(0, 150);
      await page.waitForTimeout(600);
      assert((await page.evaluate(() => scrollY)) > before);
      await page.keyboard.press("Escape");
      await page.evaluate(() => {
        const node = document.createElement('div');
        node.setAttribute('data-project-media', '');
        Object.assign(node.style, { position: 'fixed', top: '80px', left: '1250px', width: '100px', height: '100px', zIndex: '999' });
        node.id = 'qa-nonfeatured'; document.body.append(node);
      });
      await move(1300, 130); await check(`${preference}: nonfeatured media`, "circle");
      await page.evaluate(() => document.querySelector('#qa-nonfeatured').remove());
      if (preference === "no-preference") {
        const edgePoint = await mediaPoint();
        await move(edgePoint.x, edgePoint.y); await page.waitForTimeout(800);
        const box = await page.locator('[data-featured-card] [data-project-media]').first().boundingBox();
        const card = await page.locator('[data-featured-card]').first().boundingBox();
        await move(Math.max(card.x + 3, box.x + 3), Math.max(30, Math.min(950, box.y + box.height / 2)));
        await check("transformed media edge", "badge");
        await page.emulateMedia({ reducedMotion: "reduce" });
        await check("live reduce: cleanup", "native");
        assert.equal((await snapshot()).scale, 1);
        const reducedPoint = await mediaPoint();
        await move(5, 100);
        await move(reducedPoint.x, reducedPoint.y);
        const reducedReentry = await check("live reduce: hover reentry", "badge");
        assert.equal(reducedReentry.scale, 1);
        await page.waitForTimeout(1000);
        const revealStyles = await page.evaluate(() => [...document.querySelectorAll('main section > .display, main section > div, main section > ul, footer > .display, footer > div')].map(node => ({ opacity: node.style.opacity, transform: node.style.transform })));
        evidence.checks.push({ name: "live reduce: reveal cleanup", revealStyles });
        assert(revealStyles.every(style => !style.opacity && !style.transform));
        await page.emulateMedia({ reducedMotion: "no-preference" });
        await check("live no-preference: cleanup", "native");
        const restored = await mediaPoint();
        await move(1400, 100);
        await move(restored.x, restored.y);
        await page.waitForFunction(() => new DOMMatrix(getComputedStyle(document.querySelector('[data-featured-card] [data-project-media]')).transform).a > 1.09);
        await check("live no-preference: restored hover reentry", "badge");
      }
      for (const route of ["/projects", "/"]) {
        await page.evaluate(route => {
          const link = [...document.querySelectorAll('a')].find(node => node.getAttribute('href') === route);
          if (!link) throw new Error(`Missing route link ${route}`);
          link.click();
        }, route);
        await page.waitForURL(base + (route === "/" ? "/" : route));
        await check(`${preference}: route ${route}`, "native");
        await move(1390, 100); await check(`${preference}: route ${route} reenter`, "circle");
      }
    }
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.evaluate(() => window.qaEligibility(false));
    await check("live eligibility false (controlled MediaQueryList)", "native");
    await page.evaluate(() => window.qaEligibility(true));
    await check("live eligibility true before move (controlled MediaQueryList)", "native");
    await move(1380, 150); await check("live eligibility true after move", "circle");
    for (const options of [{ hasTouch: true, isMobile: true }, { javaScriptEnabled: false }]) {
      const nativeContext = await browser.newContext({ ...options, viewport: { width: 390, height: 844 } });
      const nativePage = await nativeContext.newPage();
      await nativePage.goto(base); await nativePage.waitForTimeout(500);
      await nativePage.mouse.move(200, 100);
      const state = await nativePage.evaluate(() => ({ fine: matchMedia('(pointer: fine)').matches, hover: matchMedia('(hover: hover)').matches, classes: document.documentElement.className, cursor: getComputedStyle(document.body).cursor, circle: getComputedStyle(document.querySelector('.site-cursor')).display }));
      evidence.checks.push({ name: options.hasTouch ? "real coarse/hover:none context" : "no JavaScript context", state });
      assert(!/custom-cursor|featured-cursor/.test(state.classes)); assert.notEqual(state.cursor, "none");
      await nativeContext.close();
    }
    assert.deepEqual(evidence.errors, []);
    evidence.passed = true;
  } catch (error) {
    evidence.passed = false; evidence.failure = error.stack; process.exitCode = 1;
  } finally {
    await browser.close();
    fs.writeFileSync(path.join(__dirname, '../docs/cursor-regression-evidence.json'), JSON.stringify(evidence, null, 2) + '\n');
    console.log(JSON.stringify({ passed: evidence.passed, checks: evidence.checks.length, failure: evidence.failure }, null, 2));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
