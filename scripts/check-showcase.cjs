async function main() {
const assert = (await import('node:assert/strict')).default;
const fs = await import('node:fs');
const path = await import('node:path');
const { execFileSync } = await import('node:child_process');
const ts = (await import('typescript')).default;
const sharp = (await import('sharp')).default;
const root = path.resolve(__dirname, '..');
function load(source) {
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const compiled = { exports: {} };
  new Function('exports', 'module', output)(compiled.exports, compiled);
  return compiled.exports;
}
  const { projects, homeProjects, projectBySlug, nextProject, stackLogos, tools } = load(fs.readFileSync(path.join(root, 'lib/content.ts'), 'utf8'));
  const before = load(execFileSync('git', ['show', 'HEAD:lib/content.ts'], { cwd: root, encoding: 'utf8' }));

   const inventory = ['mentalys', 'agen-inbox', 'siraja', 'insight-ptn', 'substrate-dev-template', 'emotiscan', 'locus-hotel', 'atlas'];
   const chronological = [...before.projects].sort((a, b) => a.slug === 'mentalys' ? -1 : b.slug === 'mentalys' ? 1 : Number(b.year) - Number(a.year));
   assert.deepEqual(projects.map(p => p.slug), chronological.map(p => p.slug));
  assert.deepEqual(projects.map(p => p.slug), inventory);
  assert.equal(new Set(projects.map(p => p.slug)).size, projects.length);
   const featured = ['mentalys', 'agen-inbox', 'substrate-dev-template', 'locus-hotel'];
   assert.deepEqual(homeProjects.map(p => p.slug), featured);
   for (const slug of ['nodewatch', 'ledger', 'sentra', 'bloom']) assert.equal(projectBySlug(slug), undefined);
   for (const slug of inventory) {
     const original = before.projects.find(p => p.slug === slug);
     assert.ok(original, `Missing preservation baseline: ${slug}`);
     assert.deepEqual(projectBySlug(slug), { ...original, featured: featured.includes(slug) });
   }
   assert.equal(projectBySlug('atlas').featured, false);
  for (const [index, slug] of inventory.entries()) assert.equal(nextProject(slug).slug, inventory[(index + 1) % inventory.length]);
  for (const [slug, title, year, role, type, stack, repo, gallery] of [
    ['siraja', 'SIRAJA', '2025', 'Academic Team Contributor', 'Academic Team Project / Audio Classification', 'Python, TensorFlow, Keras, Librosa, Streamlit', 'https://github.com/mdprana/SIRAJA', ['overview', 'upload', 'signals', 'about']],
    ['emotiscan', 'EmotiScan', '2024', 'Developer', 'Academic Project / Facial Expression Recognition', 'Python, OpenCV, TensorFlow, scikit-image, Streamlit', 'https://github.com/mdprana/Realtime-Face-Emotion-Recognition-Using-GLCM-and-ANN', ['upload', 'camera', 'distribution', 'confusion']],
  ]) {
    const p = projectBySlug(slug);
    assert.deepEqual([p.title, p.year, p.role, p.type, p.stack, p.repoUrl], [title, year, role, type, stack, repo]);
    assert.deepEqual(p.tags, ['Machine Learning']);
     assert.equal(p.featured, false);
    assert.equal(p.demoUrl, undefined);
    assert.deepEqual(p.metrics, []);
    assert.deepEqual(p.gallery.map(a => a.src), gallery.map(name => `/projects/${slug}/${name}.webp`));
    assert.deepEqual([p.image.width, p.image.height], [1296, 1440]);
    assert.equal(p.image.src, `/projects/${slug}.webp`);
    assert.ok(p.summary.length > 50);
    assert.doesNotMatch(JSON.stringify(p.caseStudy), /\baccuracy\b|\d+(?:\.\d+)?%|I trained/i);
    for (const asset of [p.image, ...p.gallery]) {
      assert.ok(asset.alt.length > 40);
      const metadata = await sharp(path.join(root, 'public', asset.src)).metadata();
      assert.equal(metadata.format, 'webp');
      assert.deepEqual([metadata.width, metadata.height], [asset.width, asset.height]);
    }
  }
  const sj = projectBySlug('siraja');
  assert.match(sj.summary, /52 MFCC.*CNN-LSTM.*Normal, Murmur or Artifact/);
  assert.match(sj.caseStudy.approach, /Our team used/);
  assert.match(sj.caseStudy.result, /screening aid, not a diagnostic device.*does not replace professional medical assessment/);
  const es = projectBySlug('emotiscan');
  assert.match(es.summary, /GLCM.*artificial neural network.*eight AffectNet classes/);
  for (const label of ['anger', 'disgust', 'fear', 'happiness', 'neutral', 'sadness', 'surprise', 'contempt']) assert.ok(es.caseStudy.problem.includes(label));
  assert.match(es.caseStudy.approach, /desktop GLCM and Streamlit histogram\/summary-statistic feature pipelines differ; web inference equivalence is not verified/);
  assert.match(es.caseStudy.result, /individual images or camera snapshots, not continuous video/);
  assert.match(es.caseStudy.result, /Expression labels do not establish a person's internal emotional state/);
  for (const asset of es.gallery.slice(2)) assert.match(asset.alt, /not independently reproduced/);
  for (const slug of ['siraja', 'emotiscan']) assert.deepEqual(fs.readdirSync(path.join(root, 'public/projects', slug)).sort(), projectBySlug(slug).gallery.map(a => path.basename(a.src)).sort());
  for (const [slug, title, year, role, type, stack, demo, gallery, logos] of [
    ['substrate-dev-template', 'Polkadot.js Interface', '2025', 'Frontend Developer', 'Developer Bootcamp / Blockchain Interface', 'React, TypeScript, Tailwind CSS, Polkadot.js API, Netlify', 'https://mdprana-polkadotjs-interface.netlify.app/', ['home', 'chain-state', 'extrinsics'], ['react.svg', 'typescript.svg', 'tailwindcss.svg', 'polkadot.svg', 'netlify.svg']],
    ['agen-inbox', 'Agen Inbox', '2026', 'Full-stack Developer', 'Private Workspace / Email Workflow', 'Next.js, React, Gmail API, Google Sheets API, Upstash, Vercel', 'https://agen-inbox.vercel.app/', ['login-desktop', 'login-mobile'], ['nextdotjs.svg', 'react.svg', 'gmail.png', 'googlesheets.svg', 'upstash.svg', 'vercel.svg']],
  ]) {
    const p = projectBySlug(slug);
    assert.deepEqual([p.title, p.year, p.role, p.type, p.stack, p.repoUrl, p.demoUrl], [title, year, role, type, stack, `https://github.com/mdprana/${slug}`, demo]);
    assert.deepEqual(p.tags, ['Web']);
     assert.equal(p.featured, true);
     assert.deepEqual(p.metrics, []);
    assert.ok(p.summary.length > 50);
    assert.equal(p.image.src, `/projects/${slug}.webp`);
    assert.deepEqual([p.image.width, p.image.height], [1296, 1440]);
    assert.match(p.image.alt, /laptop plus two phones/);
    assert.deepEqual(p.gallery.map(a => a.src), gallery.map(name => `/projects/${slug}/${name}.webp`));
    assert.deepEqual(p.gallery.map(a => [a.width, a.height]), gallery.map(name => name === 'login-mobile' ? [1170, 2532] : [2880, 1800]));
    assert.deepEqual(fs.readdirSync(path.join(root, 'public/projects', slug)).sort(), gallery.map(name => `${name}.webp`).sort());
    for (const [index, name] of stack.split(', ').entries()) {
      assert.equal(stackLogos[name], `/logos/${logos[index]}`);
      assert.ok(fs.statSync(path.join(root, 'public', stackLogos[name])).isFile());
    }
    for (const asset of [p.image, ...p.gallery]) {
      assert.ok(asset.alt.length > 40);
      const metadata = await sharp(path.join(root, 'public', asset.src)).metadata();
      assert.equal(metadata.format, 'webp');
      assert.deepEqual([metadata.width, metadata.height], [asset.width, asset.height]);
    }
  }
  const pk = projectBySlug('substrate-dev-template');
  assert.match(pk.caseStudy.approach, /contributed the interface on a bootcamp starter repository, not the original chain architecture/);
  assert.match(pk.caseStudy.approach, /React 19.*Westend.*Zombienet.*custom RPC.*wallet connection/);
  assert.match(pk.caseStudy.result, /no transaction was submitted during capture.*Transfer execution is not independently verified/);
  assert.match(pk.gallery[2].alt, /preparation.*no transaction submitted/);
  const ai = projectBySlug('agen-inbox');
  assert.match(ai.caseStudy.approach, /SHA-256 PKCE.*Upstash.*manual.*BERHASIL\/GAGAL.*single Status cell.*no automatic activation/);
  assert.match(ai.caseStudy.result, /restricted-access.*sign-in only.*No live Gmail or Google Sheets operation is claimed verified/);
  for (const asset of ai.gallery) assert.match(asset.alt, /public login screen.*no private inbox or records/);
  assert.doesNotMatch(JSON.stringify([pk, ai]), /\bBRI\b|\d+(?:\.\d+)?%/i);
   const detailSource = fs.readFileSync(path.join(root, 'app/projects/[slug]/page.tsx'), 'utf8');
   assert.doesNotMatch(detailSource, /\.filter\(|findIndex\(/);
   assert.match(detailSource, /src=\{stackLogos\[name\]\}/);
   assert.match(detailSource, /alt=\{name\}/);
   const counts = [7, 6, 5, 5, 5, 5, 7, 2];
   for (const [index, project] of projects.entries()) {
     const tokens = project.stack.split(',').map(s => s.trim());
     assert.equal(tokens.length, counts[index]);
     for (const token of tokens) {
       assert.ok(stackLogos[token], `Missing logo mapping: ${token}`);
       const file = path.join(root, 'public', stackLogos[token]);
       assert.ok(fs.statSync(file).isFile());
       const { info } = await sharp(file).resize({ height: 32 }).png().toBuffer({ resolveWithObject: true });
       assert.equal(info.height, 32);
       assert.ok(info.width > 0);
     }
     const html = fs.readFileSync(path.join(root, '.next/server/app/projects', `${project.slug}.html`), 'utf8');
     const stack = html.match(/<dt[^>]*>\(Stack\)<\/dt><dd><ul[^>]*>(.*?)<\/ul>/s)?.[1];
     assert.ok(stack, `Missing production stack: ${project.slug}`);
     const items = [...stack.matchAll(/<li\b[^>]*title="([^"]+)"[^>]*>(.*?)<\/li>/gs)];
     assert.equal(items.length, counts[index], project.slug);
     assert.deepEqual(items.map(item => item[1]), tokens);
     assert.equal([...stack.matchAll(/<img\b/g)].length, counts[index]);
     for (const [i, item] of items.entries()) {
       assert.match(item[2], new RegExp(`alt="${tokens[i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`));
       assert.ok(item[2].includes(`src="${stackLogos[tokens[i]]}"`));
       assert.match(item[2], /height="32"/);
     }
   }
   assert.equal(tools.length % 6, 0);
   assert.equal(tools.length, 24);
   assert.equal(new Set(tools.map(t => t.name)).size, tools.length);
   const original12 = ['Python', 'TensorFlow', 'Keras', 'PyTorch', 'scikit-learn', 'Hugging Face', 'pandas', 'NumPy', 'Jupyter', 'OpenCV', 'Next.js', 'React'];
   const stackTokens = new Set(projects.flatMap(p => p.stack.split(',').map(s => s.trim())));
   for (const [i, tool] of tools.entries()) {
     assert.equal(tool.index, String(i + 1).padStart(2, '0'));
     assert.match(tool.category, /^\((Language|ML|Data|Vision|Audio|Web|Mobile|Cloud)\)$/);
     assert.ok(tool.logo.startsWith('/logos/mono/'), tool.logo);
     assert.ok(fs.statSync(path.join(root, 'public', tool.logo)).isFile(), tool.logo);
     assert.ok(stackTokens.has(tool.name) || original12.includes(tool.name), `Tool not in any stack: ${tool.name}`);
   }
   for (const slug of ['python', 'tensorflow', 'keras', 'pytorch', 'scikitlearn', 'huggingface', 'pandas', 'numpy', 'jupyter', 'opencv', 'nextdotjs', 'react']) {
     assert.ok(fs.readFileSync(path.join(root, 'public/logos/mono', `${slug}.svg`)).equals(execFileSync('git', ['show', `9ac728e:public/logos/${slug}.svg`], { cwd: root })), slug);
   }
   for (const name of fs.readdirSync(path.join(root, 'public/logos')).filter(f => /\.(svg|png)$/.test(f))) {
     assert.ok(fs.readFileSync(path.join(root, 'public/logos', name)).equals(execFileSync('git', ['show', `HEAD:public/logos/${name}`], { cwd: root })), name);
   }
   console.log('Showcase checks passed: eight exact projects, Home order/flags, eight preserved objects, full nextProject cycle, metadata, disclosures, assets, complete logos and stable year-descending listing, production li/img counts 7/6/5/5/5/5/7/2, 24 mono toolkit tiles.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
