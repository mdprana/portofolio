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
  const { projects, homeProjects, projectBySlug, nextProject } = load(fs.readFileSync(path.join(root, 'lib/content.ts'), 'utf8'));
  const before = load(execFileSync('git', ['show', 'HEAD:lib/content.ts'], { cwd: root, encoding: 'utf8' }));
  const inventory = ['mentalys', 'siraja', 'emotiscan', 'locus-hotel', 'insight-ptn', 'atlas', 'sentra', 'bloom'];
  assert.deepEqual(projects.map(p => p.slug), inventory);
  assert.deepEqual(homeProjects.map(p => p.slug), inventory.slice(0, 4));
  for (const slug of ['nodewatch', 'ledger']) assert.equal(projectBySlug(slug), undefined);
  for (const slug of ['mentalys', 'locus-hotel', 'insight-ptn', 'atlas', 'sentra', 'bloom']) {
    const original = before.projects.find(p => p.slug === slug);
    assert.deepEqual(projectBySlug(slug), { ...original, featured: inventory.slice(0, 4).includes(slug) });
  }
  assert.equal(nextProject('mentalys').slug, 'siraja');
  assert.equal(nextProject('bloom').slug, 'mentalys');
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
  console.log('Showcase checks passed: inventory, preservation, metadata, disclosures and ten WebP assets.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
