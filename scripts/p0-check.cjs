const base = process.env.BASE_URL || 'http://localhost:3120';
(async () => {
  const { default: assert } = await import('node:assert/strict');
  const fs = await import('node:fs');
  const { createRequire } = await import('node:module');
  const { chromium } = createRequire(__filename)('/home/ubuntu/hermes3d/node_modules/playwright');
  const out = process.env.OUT_DIR || `${__dirname}/../docs/p0-evidence`;
  const routes = ['/', '/projects', '/about', '/contact', ...['lexa','pulse','nodewatch','ledger','atlas','sentra','bloom','orbit'].map(s => `/projects/${s}`)];
  const browser = await chromium.launch();
  const results = { timestamp: new Date().toISOString(), samples: [], interactions: [], errors: [] };
  { const warm=await browser.newPage({viewport:{width:1280,height:900}}); await warm.goto(base,{waitUntil:'networkidle'}); await warm.waitForTimeout(2000); await warm.close(); }
  const measure = () => {
    const rect = n => { const r=n.getBoundingClientRect(),s=getComputedStyle(n);return {text:n.textContent.trim(),x:r.x,y:r.y+scrollY,width:r.width,height:r.height,size:s.fontSize,weight:s.fontWeight,color:s.color,filter:s.filter,transform:s.transform}; };
    const footer = document.querySelector('footer');
    return {width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,topCount:document.querySelectorAll('#top').length,footer:rect(footer),footerLinks:[...footer.querySelectorAll('a')].map(n=>({...rect(n),href:n.getAttribute('href')})),tools:[...document.querySelectorAll('[data-tool]')].map(n=>({name:n.dataset.tool,tile:rect(n),icon:rect(n.querySelector('img')),label:rect(n.querySelector('div:last-child span'))})),links:[...document.querySelectorAll('a')].map(n=>({text:n.textContent.trim(),href:n.getAttribute('href')})),brokenImages:[...document.images].filter(n=>!n.complete||!n.naturalWidth).map(n=>n.src)};
  };
  try {
    for (const motion of ['no-preference','reduce']) for (const width of [320,390,1107,1440,1920]) {
      const context = await browser.newContext({viewport:{width,height:1000},reducedMotion:motion});
      const page = await context.newPage();
      page.on('pageerror',e=>results.errors.push(e.message));
      for (const route of routes) {
        assert.equal((await page.goto(base+route)).status(),200);
        await page.waitForTimeout(500);
        await page.evaluate(()=>document.fonts.ready);
        await page.waitForTimeout(600);
        for(let y=0;y<await page.evaluate(()=>document.documentElement.scrollHeight);y+=800){await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await page.waitForTimeout(40);}
        await page.waitForTimeout(1000);
        const sample = {...await page.evaluate(measure),route,motion};
        const name = `${route.replaceAll('/','_')}-${width}-${motion}`;
        await page.screenshot({path:`${out}/${name}.png`,fullPage:true});
        fs.writeFileSync(`${out}/${name}.json`,JSON.stringify(sample,null,2));
        results.samples.push({route,width,motion,scrollWidth:sample.scrollWidth});
        assert(sample.scrollWidth<=width,`${name}: overflow ${sample.scrollWidth}`);
        assert.equal(sample.topCount,1);
        assert.deepEqual(sample.brokenImages,[]);
        const home=sample.footerLinks.find(n=>n.text==='Home'),hello=sample.footerLinks.find(n=>n.text==='Say Hello');
        assert.equal(home.size,`${width>=1440?36:width>=1107?31:24}px`);
        assert.equal(home.weight,'700');
        assert.equal(hello.size,`${width>=1440?24:width>=1107?19:14}px`);
        assert(!/Download Resume|All rights reserved|Designed & built|Bali, Indonesia/.test(sample.footer.text));
        if(width>=1440){const zones=['Home','LinkedIn','Back to Top'].map(t=>sample.footerLinks.find(n=>n.text===t));assert(Math.abs(zones[0].y-zones[1].y)<1);assert(zones[0].x<zones[1].x&&zones[1].x<zones[2].x);}
        if(route==='/'){
          assert.equal(sample.tools.length,12);
          assert(!/\b\d yrs?\b|Hover a tile/.test(await page.locator('[data-tool]').first().locator('..').innerText()));
          for(const tool of sample.tools){assert.equal(tool.icon.filter,'brightness(0) invert(1)');assert(tool.icon.y+tool.icon.height<=tool.label.y||tool.icon.x+tool.icon.width<=tool.label.x);assert(tool.label.x+tool.label.width<=tool.tile.x+tool.tile.width);}
          for(const tile of await page.locator('[data-tool]').all()){
            await tile.hover();
            await page.waitForFunction(()=>{const el=document.querySelector('[data-tool]:hover');return el&&getComputedStyle(el.querySelector('img')).filter==='brightness(0) invert(0)';},null,{timeout:10000});
            await page.waitForTimeout(50);
            const state=await tile.evaluate(n=>({name:n.dataset.tool,filter:getComputedStyle(n.querySelector('img')).filter,size:n.querySelector('img').getBoundingClientRect().width,color:getComputedStyle(n.querySelector('div:last-child span')).color,bg:getComputedStyle(n).backgroundColor}));
            assert.equal(state.filter,'brightness(0) invert(0)');assert.equal(state.color,'rgb(0, 0, 0)');assert.equal(state.bg,'rgb(255, 255, 255)');assert.equal(state.size,motion==='reduce'?56:72);
            results.interactions.push({width,motion,toolHover:state});
          }
          await page.mouse.move(0,0);await page.waitForTimeout(350);
          if(width===1440){await page.locator('[data-tool="Keras"]').screenshot({path:`${out}/keras-${motion}.png`});}
          if(motion==='reduce'){
            const track=page.locator('[aria-hidden] > div.flex.w-max');const before=await track.evaluate(n=>getComputedStyle(n).transform);await page.waitForTimeout(500);assert.equal(await track.evaluate(n=>getComputedStyle(n).transform),before);
            for(const reveal of await page.locator('[data-reveal]').all())assert.equal(await reveal.evaluate(n=>getComputedStyle(n).opacity),'1');
          }
        }
      }
      await context.close();
    }
    const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
    await page.goto(base);await page.getByRole('button',{name:'MENU',exact:true}).focus();await page.keyboard.press('Enter');
    const dialog=page.getByRole('dialog');assert(await dialog.isVisible());assert.equal(await page.evaluate(()=>document.activeElement.textContent.trim()),'CLOSE');
    for(let i=0;i<20;i++){await page.keyboard.press('Tab');assert(await page.evaluate(()=>!!document.activeElement.closest('dialog')), 'Tab escaped modal');}
    await page.keyboard.press('Shift+Tab');assert(await page.evaluate(()=>!!document.activeElement.closest('dialog')));
    await page.evaluate(()=>document.querySelector('header a').focus());assert(await page.evaluate(()=>!!document.activeElement.closest('dialog')));
    await page.keyboard.press('Escape');assert(!await dialog.count());assert.equal(await page.evaluate(()=>document.activeElement.textContent.trim()),'MENU');
    results.interactions.push({menu:'initial CLOSE; 20 Tabs; reverse Tab; background focus blocked; Escape; return MENU passed'});
    await page.goto(base+'/projects');await page.waitForTimeout(500);
    await page.waitForTimeout(1500);
    for(const button of await page.getByRole('group',{name:'Filter projects'}).getByRole('button').all()){await button.click({force:true});await page.waitForTimeout(150);assert.equal(await button.getAttribute('aria-pressed'),'true');results.interactions.push({filter:await button.innerText(),cards:await page.locator('main a[href^="/projects/"]').count()});}
    await page.getByRole('button',{name:'All',exact:true}).click({force:true});await page.waitForTimeout(150);assert.equal(await page.locator('main a[href^="/projects/"]').count(),8);
    for(let i=0;i<8;i++){await page.goto(base+routes[4+i]);const links=await page.locator('main a[href^="/projects/"]').evaluateAll(ns=>ns.map(n=>n.getAttribute('href')));assert(links.includes(routes[4+(i+1)%8]));}
    await page.goto(base+'/contact');assert.equal(await page.getByRole('link',{name:'Download Resume'}).getAttribute('href'),'https://drive.google.com/file/d/1UdIE1vEKGbZNNg8kGWZR6m0Mp58xHl5y/view?usp=sharing');
    results.interactions.push({nextChain:'all eight correct',resume:'owner Drive resume link on contact'});
    const touch=await browser.newContext({hasTouch:true,isMobile:true,viewport:{width:390,height:844}});const tp=await touch.newPage();await tp.goto(base);await tp.touchscreen.tap(100,100);assert.equal(await tp.locator('.site-cursor').evaluate(n=>getComputedStyle(n).display),'none');await touch.close();
    results.interactions.push({touch:'real coarse context cursor suppressed'});
    await page.close();
    try{
      const ref=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});await ref.goto('https://collinscole.framer.website',{timeout:45000});await ref.waitForTimeout(2000);await ref.locator('footer').scrollIntoViewIfNeeded();await ref.waitForTimeout(1500);results.referenceFooter=await ref.evaluate(measure);await ref.locator('footer').screenshot({path:`${out}/reference-footer-1440.png`});await ref.close();
    }catch(e){results.referenceFooter={error:e.message};}
    assert.equal(results.samples.length,120);assert.deepEqual(results.errors,[]);results.passed=true;
  } catch(e){results.passed=false;results.failure=e.stack;process.exitCode=1;} finally {fs.writeFileSync(`${out}/checks.json`,JSON.stringify(results,null,2));await browser.close();console.log(JSON.stringify({passed:results.passed,samples:results.samples.length,failure:results.failure}));}
})();
