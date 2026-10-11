/**
 * All copy + data for the site, transcribed from the Figma file "Portofolio"
 * (Vfa2sw0KvmhagP7jjrZBJ6). Frame ids are noted so a design change maps to one
 * place here.
 */

export const profile = {
  wordmark: "PRANA",
  headline: "prana", // Home hero (14:15)
  // Hero intro (14:18) — muted base with white bold phrases, split so the
  // markup mirrors the Figma styled-text segments.
  intro: [
    { text: "I turn messy data into useful products — building " },
    { text: "machine learning models", strong: true },
    { text: ", data pipelines, and " },
    { text: "web experiences", strong: true },
    { text: " that are accurate, fast, and " },
    { text: "make a measurable impact", strong: true },
    { text: "." },
  ],
  email: "mdpranajaya@gmail.com",
  location: "Bali, Indonesia — WITA (UTC+8)",
  locationShort: "Bali, Indonesia",
  socialLine: "LinkedIn · GitHub · Threads",
  resumeUrl: "https://drive.google.com/",
  availability:
    "Open to full-time roles, internships, and freelance projects in data science, ML, and web. I usually reply within 24 hours.",
  contactTitle: "Let’s talk", // Contact header (18:213)
  // About page copy — 4 paragraphs (18:112)
  paragraphs: [
    "Hi, I’m Prana — a data scientist and ML engineer helping teams turn raw data into clear decisions and products people actually use.",
    "I work across the stack: from cleaning messy datasets and training models, to shipping them behind fast, thoughtful web interfaces.",
    "Whether it’s language models for local languages, forecasting, or analytics tooling, my process is iterative, grounded in evaluation, and built to last.",
    "I believe good models aren’t just accurate. They’re explainable, reliable, and move people to make better decisions.",
  ],
};

export const nav = [
  { label: "PROJECTS", href: "/projects" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

export const footerColumns = [
  {
    label: "(Navigate)",
    links: [
      { text: "Home", href: "/" },
      { text: "Projects", href: "/projects" },
      { text: "About", href: "/about" },
      { text: "Contact", href: "/contact" },
    ],
  },
  {
    label: "(Social)",
    links: [
      { text: "LinkedIn", href: "https://www.linkedin.com/in/mdprana" },
      { text: "GitHub", href: "https://github.com/mdprana" },
      { text: "Threads", href: "https://www.threads.net/@mdprana" },
      { text: "Instagram", href: "https://www.instagram.com/" },
    ],
  },
  {
    label: "(Contact)",
    links: [
      { text: profile.email, href: `mailto:${profile.email}` },
      { text: profile.locationShort, href: "" },
    ],
  },
];

export const stats = [
  { value: "12+", label: "Projects shipped" },
  { value: "3", label: "Research papers" },
  { value: "94%", label: "Best model accuracy" },
  { value: "2K+", label: "Monthly demo users" },
];

export const awards = [
  {
    title: "1st Place — National Data Science Competition",
    org: "Gemastik",
    year: "2025",
  },
  {
    title: "Best Paper Award — Low-Resource NLP Workshop",
    org: "IEEE ICAIIC",
    year: "2025",
  },
  { title: "TensorFlow Developer Certificate", org: "Google", year: "2024" },
  {
    title: "Finalist — IoT Innovation Challenge",
    org: "Bali Tech Week",
    year: "2024",
  },
];

/** Home capability rows (16:12) — label colours alternate white / #5A5A5A. */
export const capabilities = [
  { label: "Machine Learning", dim: false },
  { label: "Data Science & Analytics", dim: true },
  { label: "NLP & Local Language", dim: false },
  { label: "Web Development", dim: true },
];

export const filters = ["All", "Machine Learning", "Data", "NLP", "IoT", "Web"];

export type Tool = {
  name: string;
  category: string;
  index: string;
  logo: string;
};

/** Tech Stack (32:156) — 12 elements · 5 groups. */
export const tools: Tool[] = [
  { name: "Python", category: "(Language)", index: "01", logo: "/logos/python.svg" },
  { name: "TensorFlow", category: "(ML)", index: "02", logo: "/logos/tensorflow.svg" },
  { name: "Keras", category: "(ML)", index: "03", logo: "/logos/keras.svg" },
  { name: "PyTorch", category: "(ML)", index: "04", logo: "/logos/pytorch.svg" },
  { name: "scikit-learn", category: "(ML)", index: "05", logo: "/logos/scikitlearn.svg" },
  { name: "Hugging Face", category: "(ML)", index: "06", logo: "/logos/huggingface.svg" },
  { name: "pandas", category: "(Data)", index: "07", logo: "/logos/pandas.svg" },
  { name: "NumPy", category: "(Data)", index: "08", logo: "/logos/numpy.svg" },
  { name: "Jupyter", category: "(Data)", index: "09", logo: "/logos/jupyter.svg" },
  { name: "OpenCV", category: "(Vision)", index: "10", logo: "/logos/opencv.svg" },
  { name: "Next.js", category: "(Web)", index: "11", logo: "/logos/nextdotjs.svg" },
  { name: "React", category: "(Web)", index: "12", logo: "/logos/react.svg" },
];

/** Timeline items (25:222) — About page only. */
export const timeline = [
  {
    period: "2026 — Now",
    role: "Local Language Specialist Intern",
    org: "GoTo — Data Science",
    description:
      "Building evaluation sets and quality pipelines for regional-language models used across millions of users.",
  },
  {
    period: "2025 — 2026",
    role: "Machine Learning Research Assistant",
    org: "Udayana University — AI Lab",
    description:
      "Fine-tuned multilingual transformers for Balinese and Javanese text; co-authored a paper on low-resource NLP.",
  },
  {
    period: "2024 — 2025",
    role: "Freelance Web & IoT Developer",
    org: "Independent",
    description:
      "Shipped dashboards and sensor systems for small businesses — from hardware prototypes to production web apps.",
  },
  {
    period: "2022 — 2026",
    role: "B.Sc. Informatics, Data Science & ML",
    org: "Udayana University",
    description:
      "Focused on machine learning, data engineering, and applied NLP. GPA 3.8 / 4.0.",
  },
];

export type Project = {
  slug: string;
  title: string;
  year: string;
  tags: string[];
  featured: boolean;
  role: string;
  stack: string;
  type: string;
  cover: [string, string];
  caseStudy: { problem: string; approach: string; result: string };
  metrics: { value: string; label: string }[];
};

/**
 * Home covers (Work Card set 25:57) use four gradients; the remaining Projects
 * cards reuse them in order until real artwork lands.
 */
const covers: [string, string][] = [
  ["#312E81", "#6366F1"], // indigo-900 → indigo-500
  ["#064E3B", "#10B981"], // emerald-900 → emerald-500
  ["#7C2D12", "#F97316"], // orange-900 → orange-500
  ["#1E3A8A", "#38BDF8"], // blue-900 → sky-400
];

export const projects: Project[] = [
  {
    slug: "lexa",
    title: "Lexa",
    year: "2026",
    tags: ["NLP", "Machine Learning"],
    featured: true,
    role: "ML Engineer",
    stack: "Python, PyTorch, FastAPI",
    type: "NLP / Local Language",
    cover: covers[0],
    caseStudy: {
      problem:
        "Most speech and text tools ignore regional languages. Lexa needed to understand Balinese and Javanese input with almost no labeled data.",
      approach:
        "I built a cleaning pipeline for scraped corpora, fine-tuned a multilingual transformer, and evaluated it against native-speaker annotations.",
      result:
        "+18% F1 over the baseline, 4× faster inference, and a public demo used by 2,000+ people in its first month.",
    },
    metrics: [
      { value: "+18%", label: "F1 score" },
      { value: "4×", label: "Faster inference" },
      { value: "2,000+", label: "Monthly users" },
    ],
  },
  {
    slug: "pulse",
    title: "Pulse",
    year: "2025",
    tags: ["Data", "Machine Learning"],
    featured: true,
    role: "Data Scientist",
    stack: "Python, pandas, scikit-learn",
    type: "Forecasting",
    cover: covers[1],
    caseStudy: {
      problem:
        "Monthly demand was planned from spreadsheets, so stockouts and overstock both ran high.",
      approach:
        "Built a feature pipeline over three years of sales history and compared gradient-boosted and seasonal baselines on a rolling-origin split.",
      result:
        "Cut forecast error by a third and shipped the model behind an internal dashboard.",
    },
    metrics: [
      { value: "−33%", label: "Forecast error" },
      { value: "3 yrs", label: "History modeled" },
      { value: "12", label: "SKU groups" },
    ],
  },
  {
    slug: "nodewatch",
    title: "Nodewatch",
    year: "2025",
    tags: ["IoT", "Data"],
    featured: true,
    role: "Full-stack Developer",
    stack: "Python, MQTT, Next.js",
    type: "IoT Systems",
    cover: covers[2],
    caseStudy: {
      problem:
        "Sensor readings were logged to local files, so nobody saw a failure until a site visit.",
      approach:
        "Streamed device telemetry over MQTT into a time-series store and built alert rules with a live web view.",
      result: "Failures surface in seconds instead of days, across six field sites.",
    },
    metrics: [
      { value: "6", label: "Field sites" },
      { value: "<5s", label: "Alert latency" },
      { value: "99.9%", label: "Uptime" },
    ],
  },
  {
    slug: "ledger",
    title: "Ledger",
    year: "2024",
    tags: ["Machine Learning"],
    featured: true,
    role: "ML Engineer",
    stack: "Python, scikit-learn, FastAPI",
    type: "Anomaly Detection",
    cover: covers[3],
    caseStudy: {
      problem: "Manual review could not keep pace with transaction volume.",
      approach:
        "Trained an anomaly detector on imbalanced transaction data and tuned the threshold against reviewer capacity, not accuracy alone.",
      result: "Flagged 80% of true anomalies with a quarter of the manual review load.",
    },
    metrics: [
      { value: "80%", label: "Recall" },
      { value: "−75%", label: "Manual review" },
      { value: "0.91", label: "ROC AUC" },
    ],
  },
  {
    slug: "atlas",
    title: "Atlas",
    year: "2024",
    tags: ["NLP"],
    featured: false,
    role: "NLP Engineer",
    stack: "Python, Hugging Face",
    type: "NLP",
    cover: covers[0],
    caseStudy: {
      problem: "Document search relied on exact keyword matches.",
      approach:
        "Built an embedding index with a lightweight reranker over the top candidate set.",
      result: "Relevant documents moved into the top three results for most queries.",
    },
    metrics: [
      { value: "3×", label: "Faster search" },
      { value: "0.87", label: "NDCG@10" },
      { value: "40k", label: "Documents" },
    ],
  },
  {
    slug: "sentra",
    title: "Sentra",
    year: "2024",
    tags: ["Machine Learning", "Data"],
    featured: false,
    role: "Data Scientist",
    stack: "Python, pandas",
    type: "Analytics",
    cover: covers[1],
    caseStudy: {
      problem: "Reporting was rebuilt by hand every month.",
      approach: "Modeled the warehouse once and generated the recurring reports from it.",
      result: "Monthly reporting dropped from days of work to a scheduled job.",
    },
    metrics: [
      { value: "−90%", label: "Reporting time" },
      { value: "18", label: "Source tables" },
      { value: "1", label: "Model" },
    ],
  },
  {
    slug: "bloom",
    title: "Bloom",
    year: "2023",
    tags: ["NLP"],
    featured: false,
    role: "ML Engineer",
    stack: "Python, TensorFlow",
    type: "Classification",
    cover: covers[2],
    caseStudy: {
      problem: "Support tickets were routed by hand to the wrong teams.",
      approach:
        "Fine-tuned a text classifier on labeled tickets and routed with a confidence fallback.",
      result:
        "Two thirds of tickets now route automatically, with low-confidence cases kept for humans.",
    },
    metrics: [
      { value: "66%", label: "Auto-routed" },
      { value: "0.89", label: "F1" },
      { value: "9", label: "Categories" },
    ],
  },
  {
    slug: "orbit",
    title: "Orbit",
    year: "2023",
    tags: ["Web", "Data"],
    featured: false,
    role: "Developer",
    stack: "Next.js, Python",
    type: "Web",
    cover: covers[3],
    caseStudy: {
      problem: "Public data lived in hard-to-read spreadsheets.",
      approach: "Built a small web app that fetches, caches, and charts the open dataset.",
      result:
        "Anyone can read the numbers in a browser, and the dataset refreshes on a schedule.",
    },
    metrics: [
      { value: "24", label: "Charts" },
      { value: "<1s", label: "Load time" },
      { value: "100", label: "Lighthouse" },
    ],
  },
];

export const homeProjects = projects.filter((p) => p.featured);

export function projectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function nextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
