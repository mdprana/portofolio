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
  const { projects, homeProjects, projectBySlug, nextProject, stackLogos } = load(fs.readFileSync(path.join(root, 'lib/content.ts'), 'utf8'));
  const before = load(execFileSync('git', ['show', 'HEAD:lib/content.ts'], { cwd: root, encoding: 'utf8' }));
  const existing = ['mentalys', 'siraja', 'emotiscan', 'locus-hotel', 'insight-ptn', 'atlas', 'sentra', 'bloom'];
  const inventory = [...existing, 'substrate-dev-template', 'agen-inbox'];
  assert.deepEqual(projects.map(p => p.slug), inventory);
  assert.equal(new Set(projects.map(p => p.slug)).size, projects.length);
  for (const slug of existing) assert.deepEqual(projectBySlug(slug), before.projects.find(p => p.slug === slug));
  assert.deepEqual(homeProjects.map(p => p.slug), inventory.slice(0, 4));
  for (const slug of ['nodewatch', 'ledger']) assert.equal(projectBySlug(slug), undefined);
  for (const slug of ['mentalys', 'locus-hotel', 'insight-ptn', 'atlas', 'sentra', 'bloom']) {
    const original = before.projects.find(p => p.slug === slug);
    assert.deepEqual(projectBySlug(slug), { ...original, featured: inventory.slice(0, 4).includes(slug) });
  }
  assert.equal(nextProject('mentalys').slug, 'siraja');
  assert.equal(nextProject('bloom').slug, 'substrate-dev-template');
  assert.equal(nextProject('agen-inbox').slug, 'mentalys');
  for (const [index, slug] of inventory.entries()) assert.equal(nextProject(slug).slug, inventory[(index + 1) % inventory.length]);
  for (const [slug, title, year, role, type, stack, repo, gallery] of [
    ['siraja', 'SIRAJA', '2025', 'Academic Team Contributor', 'Academic Team Project / Audio Classification', 'Python, TensorFlow, Keras, Librosa, Streamlit', 'https://github.com/mdprana/SIRAJA', ['overview', 'upload', 'signals', 'about']],
    ['emotiscan', 'EmotiScan', '2024', 'Developer', 'Academic Project / Facial Expression Recognition', 'Python, OpenCV, TensorFlow, scikit-image, Streamlit', 'https://github.com/mdprana/Realtime-Face-Emotion-Recognition-Using-GLCM-and-ANN', ['upload', 'camera', 'distribution', 'confusion']],
  ]) {
    const p = projectBySlug(slug);
    assert.deepEqual([p.title, p.year, p.role, p.type, p.stack, p.repoUrl], [title, year, role, type, stack, repo]);
    assert.deepEqual(p.tags, ['Machine Learning']);
    assert.equal(p.featured, true);
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
    ['agen-inbox', 'Agen Inbox', '2026', 'Full-stack Developer', 'Private Workspace / Email Workflow', 'Next.js, React, Gmail API, Google Sheets API, Upstash, Vercel', 'https://agen-inbox.vercel.app/', ['login-desktop', 'login-mobile'], ['nextdotjs.svg', 'react.svg', 'gmail.svg', 'googlesheets.svg', 'upstash.svg', 'vercel.svg']],
  ]) {
    const p = projectBySlug(slug);
    assert.deepEqual([p.title, p.year, p.role, p.type, p.stack, p.repoUrl, p.demoUrl], [title, year, role, type, stack, `https://github.com/mdprana/${slug}`, demo]);
    assert.deepEqual(p.tags, ['Web']);
    assert.equal(p.featured, false);
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
  console.log('Showcase checks passed: ten-project inventory, home invariant, eight preserved objects, full nextProject cycle, metadata, disclosures, logos and seventeen WebP assets.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
