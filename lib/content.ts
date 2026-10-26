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
    "I am a Brilliant Internship Assistant in the Ultra Micro Business Department of PT Bank Rakyat Indonesia (Persero) Tbk, where I support BRILink agent monitoring and build Google Sheets automation and Agen Inbox. I am also a Local Language Specialist Intern on the Data Science team at PT GoTo Gojek Tokopedia Tbk, evaluating Balinese language model responses and GoFood search relevance.",
    "Before that, I supported the Bali SPMB 2026 rollout for 146 schools at PT Metra-Net (Metranet), a subsidiary of PT Telkom Indonesia (Persero) Tbk, and worked as a Junior Data Science Intern at PT Vinix Seven Aurum (VINIX7).",
    "My undergraduate thesis, Mentalys, combines on-device facial and voice emotion analysis with PHQ-9 scoring. It extends the Mentalys team capstone from Bangkit Academy led by Google, GoTo, and Traveloka in 2024, where I graduated with distinction in the Machine Learning cohort.",
    "I co-authored image-captioning research published in JNATIA (Jurnal Nasional Teknologi Informasi dan Aplikasinya) in February 2025, using VGG-16 and LSTM on the Flickr8k dataset with an average BLEU score of 0.415.",
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

export type Award = { title: string; org: string; year: string; href?: string };

export const awards: Award[] = [
  {
    title: "Graduated with Distinction, top 10% of 1,500+",
    org: "Bangkit Academy led by Google, GoTo, and Traveloka",
    year: "2025",
  },
  {
    title: "Top 50 team of 644",
    org: "Bangkit Academy led by Google, GoTo, and Traveloka, Batch 2",
    year: "2024",
  },
  { title: "Top 10 participant, Blockchain Technology Apprentice", org: "Mandala Chain Foundation", year: "2025" },
  {
    title: "Dev Certification for Machine Learning with TensorFlow (DCML)",
    org: "dev.cert",
    year: "2025",
    href: "https://dev.id/certificate/verify/R1VGRY7W2M",
  },
];

export const certificationsUrl = "https://www.linkedin.com/in/mdprana/details/certifications/";

export const publication = {
  title: "Implementasi Ekstraksi Fitur VGG-16 dan Pemodelan LSTM untuk Pembangkitan Caption Gambar Otomatis",
  authors: "Made Pranajaya Dibyacita, Luh Gede Astuti",
  journal: "JNATIA Vol. 3, No. 2, pp. 447–458",
  year: "2025",
  url: "https://ejournal2.unud.ac.id/index.php/jnatia/id/article/view/1478",
  doi: "10.24843/JNATIA.2025.v03.i02.p25",
  doiUrl: "https://doi.org/10.24843/JNATIA.2025.v03.i02.p25",
};

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
    org: "PT Bank Rakyat Indonesia (Persero) Tbk, Ultra Micro Business Department",
    logo: "/logos/experience/bri.png",
    description:
      "BRILink monitoring, Google Sheets automation, and Agen Inbox workflow support for daily operations.",
  },
  {
    period: "Jul 2026–Present",
    role: "Local Language Specialist Intern",
    org: "PT GoTo Gojek Tokopedia Tbk, Data Science",
    logo: "/logos/experience/goto.png",
    description:
      "Balinese LLM factual/lexical/naturalness/Sor Singgih evaluation, rubric work and GoFood candidate relevance labels.",
  },
  {
    period: "May–Jul 2026",
    role: "Engineer On-Site / IT Support",
    org: "PT Metra-Net (Metranet), subsidiary of PT Telkom Indonesia (Persero) Tbk",
    logo: "/logos/experience/metranet.png",
    description:
      "Bali SPMB 2026 rollout for 146 schools (89 SMA/57 SMK), Python automation and Streamlit data processing.",
  },
  {
    period: "Mar–Jun 2025",
    role: "Junior Data Science Intern",
    org: "PT Vinix Seven Aurum (VINIX7)",
    logo: "/logos/experience/vinix7.png",
    description:
      "Data preprocessing and four-person Insight-PTN team, 411 study programs/62 public universities, K-Means/recommendation/visualization.",
  },
  {
    period: "Feb–Mar 2025",
    role: "Blockchain Technology Apprentice & Polkadot Developer Bootcamp",
    org: "Baliola / Mandala Chain Foundation",
    logo: "/logos/experience/mandala-chain.png",
    logoLarge: true,
    description:
      "Soulbound ERC-721 on Niskala testnet, Substrate fundamentals and TypeScript UI, Top 10 recognition.",
  },
  {
    period: "Sep 2024–Jan 2025",
    role: "Machine Learning Cohort Participant",
    org: "Bangkit Academy led by Google, GoTo, and Traveloka",
    logo: "/logos/experience/bangkit.png",
    logoLarge: true,
    description:
      "Graduated with distinction in the top 10%; Mentalys capstone team placed in the Top 50 of 644 teams.",
  },
  {
    period: "Aug–Sep 2024",
    role: "Web Developer",
    org: "PT Econdelight (Gecko Internet Service Provider)",
    logo: "/logos/experience/gecko.png",
    logoLarge: true,
    description:
      "Hotel frontend HTML/CSS/JS from Figma integrated with Laravel routing/content.",
  },
  {
    period: "May–Jul 2023",
    role: "Team Leader, GEMASTIK XVI Cybersecurity Preliminary Round",
    org: "GEMASTIK XVI (Pagelaran Mahasiswa Nasional Bidang TIK)",
    logo: "/logos/experience/gemastik.png",
    logoLarge: true,
    description:
      "Led preliminary-round cybersecurity participation across forensics, web, and binary exploitation.",
  },
  {
    period: "Sep 2022–Jul 2026",
    role: "Bachelor’s Degree in Computer Science",
    org: "Universitas Udayana",
    logo: "/logos/experience/udayana.png",
    logoLarge: true,
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

export const stackLogos: Record<string, string> = {
  HTML: "/logos/html5.svg",
  CSS: "/logos/css.svg",
  JavaScript: "/logos/javascript.svg",
  PHP: "/logos/php.svg",
  Laravel: "/logos/laravel.svg",
  Vite: "/logos/vite.svg",
  Python: "/logos/python.svg",
  PyTorch: "/logos/pytorch.svg",
  FastAPI: "/logos/fastapi.svg",
  pandas: "/logos/pandas.svg",
  "scikit-learn": "/logos/scikitlearn.svg",
  MQTT: "/logos/mqtt.svg",
  "Next.js": "/logos/nextdotjs.svg",
  "Hugging Face": "/logos/huggingface.svg",
  TensorFlow: "/logos/tensorflow.svg",
};

export const projects: Project[] = [
  {
    slug: "mentalys",
    title: "Mentalys",
    year: "2026",
    tags: ["Machine Learning", "Mobile"],
    featured: true,
    role: "ML Engineer & Android Developer",
    stack: "Kotlin, TensorFlow Lite, ML Kit, Firebase, TypeScript, Express, Cloud Run",
    type: "Undergraduate Thesis / Android App",
    cover: covers[1],
    image: {
      src: "/projects/mentalys.webp",
      alt: "Mentalys presentation showing face analysis, home and screening result screens on three phones over a dark green background.",
      width: 1296,
      height: 1440,
    },
    gallery: [
      { src: "/projects/mentalys/screens-1.webp", alt: "Mentalys home screen, screening hub and PHQ-9 questionnaire screens side by side.", width: 2880, height: 1800 },
      { src: "/projects/mentalys/screens-2.webp", alt: "Mentalys face expression analysis, voice emotion analysis and screening results screens side by side.", width: 2880, height: 1800 },
    ],
    summary:
      "An Android app for early depression-risk screening that combines a PHQ-9 questionnaire with on-device facial and speech emotion recognition.",
    repoUrl: "https://github.com/mdprana/mentalys",
    demoUrl: "https://github.com/mdprana/mentalys/releases/tag/v1.0",
    caseStudy: {
      problem:
        "Questionnaires alone miss signals that show in a face or a voice, and sending raw camera or microphone data to a server raises privacy concerns for a mental-health tool.",
      approach:
        "I trained a VGG-16 + SE + attention face model on FER-2013 and a CNN-BiLSTM voice model on MFCC features from RAVDESS, exported both to TensorFlow Lite and ran them on the phone. A deterministic formula fuses PHQ-9, face and voice risk, with a safety override for severe PHQ-9 scores or any self-harm answer. Gemini only explains the result. Four TypeScript and Express services on Cloud Run handle accounts, history, content and clinics.",
      result:
        "Test accuracy of 68.3% for the face model and 97.2% for the voice model, with on-device inference of about 0.33 s and 0.02 s on an Android 15 phone. Raw face and voice recordings stay on the device. It is a screening aid, not a diagnostic tool.",
    },
    metrics: [
      { value: "97.2%", label: "Voice model accuracy" },
      { value: "68.3%", label: "Face model accuracy" },
      { value: "3", label: "Screening modalities" },
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
      alt: "Locus Hotel website presentation showing desktop and mobile layouts on a cream and brown background.",
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
];

export const homeProjects = projects.filter((p) => p.featured);

export function projectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function nextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
