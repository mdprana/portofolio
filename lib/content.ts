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
    { text: "I build " },
    { text: "machine learning systems", strong: true },
    { text: ", " },
    { text: "data automation", strong: true },
    { text: ", and " },
    { text: "web applications", strong: true },
    { text: ", from on-device mental-health screening to tools for daily operations." },
  ],
  email: "mdpranajaya@gmail.com",
  location: "Bali, Indonesia — WITA (UTC+8)",
  locationShort: "Bali, Indonesia",
  socialLine: "LinkedIn · GitHub · Threads",
  resumeUrl: "https://drive.google.com/",
  availability:
    "Open to opportunities in machine learning, data science, and web development.",
  contactTitle: "Let’s talk", // Contact header (18:213)
  // About page copy — 4 paragraphs (18:112)
  paragraphs: [
    "I’m Prana, a Computer Science graduate from Universitas Udayana with a GPA of 3.84/4.00. I work across machine learning, data automation, and full-stack development.",
    "At BRI’s Ultra Micro Business Department, I support BRILink agent monitoring and build Google Sheets automation and Agen Inbox. At GoTo, I evaluate Balinese language model responses and GoFood search relevance.",
    "My undergraduate thesis, Mentalys, combines on-device facial and voice emotion analysis with PHQ-9 scoring. It extends the Mentalys team capstone from Bangkit Academy in 2024.",
    "I co-authored image-captioning research published in JNATIA in February 2025, using VGG-16 and LSTM with an average BLEU score of 0.415. I graduated with distinction from Bangkit’s Machine Learning cohort.",
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
  { value: "3.84", label: "GPA / 4.00, Universitas Udayana" },
  { value: "146", label: "Schools in supported Bali SPMB rollout" },
  { value: "0.415", label: "Average BLEU, JNATIA image captioning" },
  { value: "50", label: "Top 50 of 644 Bangkit teams" },
];

export const awards = [
  {
    title: "Graduated with Distinction, top 10% of 1,500+",
    org: "Bangkit Academy",
    year: "2025",
  },
  {
    title: "Top 50 team of 644",
    org: "Bangkit Academy, Batch 2",
    year: "2024",
  },
  { title: "Top 10 participant, Blockchain Technology Apprentice", org: "Mandala Chain Foundation", year: "2025" },
  {
    title: "Dev Certification for Machine Learning with TensorFlow (DCML)",
    org: "dev.cert",
    year: "2025",
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
    period: "Sep 2026–Present",
    role: "Brilliant Internship Assistant",
    org: "BRI, Ultra Micro Business Department",
    description:
      "BRILink monitoring, Google Sheets automation, and Agen Inbox workflow support for daily operations.",
  },
  {
    period: "Jul 2026–Present",
    role: "Local Language Specialist Intern",
    org: "GoTo Group, Data Science",
    description:
      "Balinese LLM factual/lexical/naturalness/Sor Singgih evaluation, rubric work and GoFood candidate relevance labels.",
  },
  {
    period: "May–Jul 2026",
    role: "Engineer On-Site / IT Support",
    org: "Metranet",
    description:
      "Bali SPMB 2026 rollout for 146 schools (89 SMA/57 SMK), Python automation and Streamlit data processing.",
  },
  {
    period: "Mar–Jun 2025",
    role: "Junior Data Science Intern",
    org: "VINIX7",
    description:
      "Data preprocessing and four-person Insight-PTN team, 411 study programs/62 public universities, K-Means/recommendation/visualization.",
  },
  {
    period: "Feb–Mar 2025",
    role: "Blockchain Technology Apprentice & Polkadot Developer Bootcamp",
    org: "Baliola / Mandala Chain Foundation",
    description:
      "Soulbound ERC-721 on Niskala testnet, Substrate fundamentals and TypeScript UI, Top 10 recognition.",
  },
  {
    period: "Sep 2024–Jan 2025",
    role: "Machine Learning Cohort Participant",
    org: "Bangkit Academy",
    description:
      "Graduated with distinction in the top 10%; Mentalys capstone team placed in the Top 50 of 644 teams.",
  },
  {
    period: "Aug–Sep 2024",
    role: "Web Developer",
    org: "PT Econdelight (Gecko Internet Service Provider)",
    description:
      "Hotel frontend HTML/CSS/JS from Figma integrated with Laravel routing/content.",
  },
  {
    period: "May–Jul 2023",
    role: "Team Leader, GEMASTIK XVI Cybersecurity Preliminary Round",
    org: "GEMASTIK XVI",
    description:
      "Led preliminary-round cybersecurity participation across forensics, web, and binary exploitation.",
  },
  {
    period: "Sep 2022–Jul 2026",
    role: "Bachelor’s Degree in Computer Science",
    org: "Universitas Udayana",
    description:
      "GPA 3.84/4.00.",
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
  image?: { src: string; alt: string; width: number; height: number };
  gallery?: { src: string; alt: string; width: number; height: number }[];
  summary?: string;
  repoUrl?: string;
  demoUrl?: string;
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
    slug: "locus-hotel",
    title: "Locus Hotel",
    year: "2024",
    tags: ["Web"],
    featured: true,
    role: "Frontend Developer",
    stack: "HTML, CSS, JavaScript, PHP, Laravel, Blade, Vite",
    type: "Hospitality Website / Demo",
    cover: covers[1],
    image: {
      src: "/projects/locus-hotel.webp",
      alt: "Locus Hotel website presentation showing desktop and mobile layouts on a forest-green background.",
      width: 1296,
      height: 1440,
    },
    gallery: [
      { src: "/projects/locus-hotel/home.webp", alt: "Locus Hotel home page hero: 'The Perfect Base For You' headline with Take a Tour and Learn More buttons over a dimmed photo of a wooden A-frame resort beside a pool.", width: 2880, height: 1800 },
      { src: "/projects/locus-hotel/rooms.webp", alt: "Locus Hotel Rooms page: 'Ultimate Room' banner above three Minimal Duplex Room cards with amenity icons.", width: 2880, height: 1800 },
      { src: "/projects/locus-hotel/gallery.webp", alt: "Locus Hotel Gallery page: 'Photo Gallery' banner above a mountain landscape photo and an aerial view of a waterfront pool deck.", width: 2880, height: 1800 },
      { src: "/projects/locus-hotel/blog.webp", alt: "Locus Hotel Blog page: 'Blog Feeds' banner above a featured post image and a sidebar with keyword search and Popular Feeds.", width: 2880, height: 1800 },
      { src: "/projects/locus-hotel/contact.webp", alt: "Locus Hotel Contact page: 'Contact us' banner above cards listing the office address in Badung, Bali, phone numbers and email addresses.", width: 2880, height: 1800 },
    ],
    summary:
      "A responsive hotel website frontend with room browsing, gallery and editorial pages, built with HTML, CSS and JavaScript in Laravel Blade.",
    repoUrl: "https://github.com/mdprana/Locus-Hotel",
    demoUrl: "https://locus-hotel.vercel.app",
    caseStudy: {
      problem:
        "Present hotel rooms, amenities and visual content in a consistent website layout that works across desktop and mobile screens.",
      approach:
        "I built the frontend with HTML, CSS and JavaScript, organized pages with Laravel Blade layouts and connected navigation through Laravel routes. The interface includes room listings, a gallery, blog and contact pages, plus arrival, departure and guest-selection controls.",
      result:
        "The public demo presents the responsive frontend and its supporting pages. It retains sample content, and the availability form is a visual prototype rather than a connected reservation system. No booking, payment or email-delivery integration is claimed.",
    },
    metrics: [],
  },
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
    featured: false,
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
