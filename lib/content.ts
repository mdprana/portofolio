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
  "TensorFlow Lite": "/logos/tensorflow.svg",
  Keras: "/logos/keras.svg",
  OpenCV: "/logos/opencv.svg",
  Kotlin: "/logos/kotlin.svg",
  TypeScript: "/logos/typescript.svg",
  Express: "/logos/express.svg",
  Firebase: "/logos/firebase.svg",
  "Cloud Run": "/logos/googlecloud.svg",
  // ponytail: ML Kit has no standalone brand mark; uses Google's.
  "ML Kit": "/logos/google.svg",
  Plotly: "/logos/plotly.svg",
  Streamlit: "/logos/streamlit.svg",
  Librosa: "/logos/librosa.svg",
  "scikit-image": "/logos/scikitimage.png",
  Blade: "/logos/laravel.svg",
  React: "/logos/react.svg",
  "Tailwind CSS": "/logos/tailwindcss.svg",
  "Polkadot.js API": "/logos/polkadot.svg",
  Netlify: "/logos/netlify.svg",
  "Gmail API": "/logos/gmail.png",
  "Google Sheets API": "/logos/googlesheets.svg",
  Upstash: "/logos/upstash.svg",
  Vercel: "/logos/vercel.svg",
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
      { src: "/projects/mentalys/screens-1.webp", alt: "Mentalys welcome screen, login form and home screen with screening shortcuts and specialist cards.", width: 2880, height: 1800 },
      { src: "/projects/mentalys/screens-2.webp", alt: "Mentalys screening hub with three pending checks, followed by the first and later PHQ-9 questionnaire pages.", width: 2880, height: 1800 },
      { src: "/projects/mentalys/screens-3.webp", alt: "Mentalys face expression analysis, voice tone analysis with a 30-second timer, and the screening hub with all three checks done.", width: 2880, height: 1800 },
      { src: "/projects/mentalys/screens-4.webp", alt: "Mentalys screening result: Minimal risk score of 0.20, AI interpretation and summary, then crisis guidance and disclaimer.", width: 2880, height: 1800 },
      { src: "/projects/mentalys/screens-5.webp", alt: "Mentalys Ask AI chat screens and the mental test history list.", width: 2880, height: 1800 },
      { src: "/projects/mentalys/screens-6.webp", alt: "Mentalys Pedia home with food recommendations, the mental health article list and an article detail page.", width: 2880, height: 1800 },
      { src: "/projects/mentalys/screens-7.webp", alt: "Mentalys home screen with music and daily tips, a recipe sheet in Mentalys Pedia, and the settings screen.", width: 2880, height: 1800 },
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
    slug: "siraja",
    title: "SIRAJA",
    year: "2025",
    tags: ["Machine Learning"],
    featured: false,
    role: "Academic Team Contributor",
    stack: "Python, TensorFlow, Keras, Librosa, Streamlit",
    type: "Academic Team Project / Audio Classification",
    cover: covers[0],
    image: {
      src: "/projects/siraja.webp",
      alt: "SIRAJA cover: heart-sound prediction page in a laptop mockup, with a tablet showing waveform and spectrogram and a card of the Normal, Murmur and Artifact classes, on a dark blue background.",
      width: 1296,
      height: 1440,
    },
    gallery: [
      { src: "/projects/siraja/overview.webp", alt: "SIRAJA home category cards for Normal, Murmur and Artifact; performance tiles excluded.", width: 1440, height: 390 },
      { src: "/projects/siraja/upload.webp", alt: "SIRAJA empty audio-upload interface with supported formats and preprocessing notes, captured locally.", width: 1440, height: 1320 },
      { src: "/projects/siraja/signals.webp", alt: "Actual SIRAJA waveform and spectrogram visualizations from a local app capture; not a diagnostic result.", width: 1400, height: 1200 },
      { src: "/projects/siraja/about.webp", alt: "SIRAJA methodology crop showing CNN-LSTM architecture and 52 MFCC features; performance claims excluded.", width: 1440, height: 350 },
    ],
    summary:
      "An academic heart-sound classification app using 52 MFCC features and a CNN-LSTM model to predict Normal, Murmur or Artifact.",
    repoUrl: "https://github.com/mdprana/SIRAJA",
    caseStudy: {
      problem:
        "Explore how recorded heart sounds can be processed and classified in an interactive academic prototype.",
      approach:
        "Our team used 52 MFCC features with a CNN-LSTM model and built a Streamlit interface for audio upload, class predictions, waveforms and spectrograms.",
      result:
        "The app presents three predicted categories and signal visualizations. It is a screening aid, not a diagnostic device, and does not replace professional medical assessment. Screenshots capture the original app locally, not a verified live demo.",
    },
    metrics: [],
  },
  {
    slug: "emotiscan",
    title: "EmotiScan",
    year: "2024",
    tags: ["Machine Learning"],
    featured: false,
    role: "Developer",
    stack: "Python, OpenCV, TensorFlow, scikit-image, Streamlit",
    type: "Academic Project / Facial Expression Recognition",
    cover: covers[1],
    image: {
      src: "/projects/emotiscan.webp",
      alt: "EmotiScan cover: camera-mode interface in a laptop mockup with tablets showing the class distribution and confusion matrix, on a dark purple background; no face or prediction result shown.",
      width: 1296,
      height: 1440,
    },
    gallery: [
      { src: "/projects/emotiscan/upload.webp", alt: "EmotiScan local Streamlit image-upload empty state with no face or inference result.", width: 1680, height: 410 },
      { src: "/projects/emotiscan/camera.webp", alt: "EmotiScan local camera-snapshot empty state requesting camera permission; no face or continuous video shown.", width: 1680, height: 980 },
      { src: "/projects/emotiscan/distribution.webp", alt: "Persisted notebook output showing class distribution across eight expression labels; not independently reproduced.", width: 859, height: 590 },
      { src: "/projects/emotiscan/confusion.webp", alt: "Persisted notebook evaluation output showing a confusion matrix across eight expression labels; not independently reproduced or verified for web inference.", width: 793, height: 624 },
    ],
    summary:
      "An academic facial-expression recognition project exploring GLCM texture features and an artificial neural network across eight AffectNet classes.",
    repoUrl: "https://github.com/mdprana/Realtime-Face-Emotion-Recognition-Using-GLCM-and-ANN",
    caseStudy: {
      problem:
        "Explore texture-based facial-expression classification across anger, disgust, fear, happiness, neutral, sadness, surprise and contempt.",
      approach:
        "The desktop demo combines OpenCV face detection, GLCM feature extraction and an artificial neural network. A Streamlit interface provides image-upload and camera-snapshot inputs. The desktop GLCM and Streamlit histogram/summary-statistic feature pipelines differ; web inference equivalence is not verified.",
      result:
        "Repository includes desktop webcam demo, Streamlit interface and saved notebook evaluation outputs. Streamlit analyzes individual images or camera snapshots, not continuous video. Expression labels do not establish a person's internal emotional state. Notebook outputs are not independently reproduced. App screenshots were captured locally, not verified as a live demo.",
    },
    metrics: [],
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
    slug: "insight-ptn",
    title: "Insight-PTN",
    year: "2025",
    tags: ["Data", "Machine Learning"],
    featured: false,
    role: "Junior Data Science Intern",
    stack: "Python, pandas, scikit-learn, Plotly, Streamlit",
    type: "Internship Team Project / Data Dashboard",
    cover: covers[1],
    image: {
      src: "/projects/insight-ptn.webp",
      alt: "Insight-PTN dashboard presentation showing the data visualization page on a laptop and the cluster analysis page on a tilted screen, on a dark maroon background.",
      width: 1296,
      height: 1440,
    },
    gallery: [
      { src: "/projects/insight-ptn/overview.webp", alt: "Insight-PTN home page dataset summary: 411 records, 273 study programs, 62 public universities and an average of 368 applicants, with dataset notes.", width: 2880, height: 1800 },
      { src: "/projects/insight-ptn/relationships.webp", alt: "Visualisasi Data page, Hubungan Antar Variabel tab: X, Y and color selectors above a scatter of 2024 applicants against minimum starting salary, colored by difficulty level.", width: 2880, height: 1800 },
      { src: "/projects/insight-ptn/correlation.webp", alt: "Correlation matrix heatmap of the numeric study-program features below the applicant and salary scatter.", width: 2880, height: 1800 },
      { src: "/projects/insight-ptn/top-programs.webp", alt: "Top Jurusan tab: top 10 study programs bar chart by university with a detail table listing programs such as Aktuaria and Hubungan Internasional.", width: 2880, height: 1800 },
      { src: "/projects/insight-ptn/clusters.webp", alt: "Analisis Cluster page: study-program count per K-Means cluster, a PCA cluster scatter and a cluster scatter of applicants against salary.", width: 2880, height: 1800 },
      { src: "/projects/insight-ptn/cluster-profile.webp", alt: "Guide to reading the PCA and scatter charts above a radar chart comparing the characteristics of each cluster.", width: 2880, height: 1800 },
      { src: "/projects/insight-ptn/difficulty.webp", alt: "Heatmap of difficulty-level proportions per cluster with interpretation notes and a study-program list selector for each cluster.", width: 2880, height: 1800 },
      { src: "/projects/insight-ptn/recommendations.webp", alt: "Sistem Rekomendasi results: ranked study-program cards showing 2024 applicants, starting salary range and graduation rate.", width: 2880, height: 1800 },
    ],
    summary:
      "An interactive Streamlit dashboard that analyzes 411 social-science (IPS) study programs across 62 Indonesian public universities to surface programs with fewer applicants but strong job prospects.",
    repoUrl: "https://github.com/mdprana/ips-ptn-dashboard",
    demoUrl: "https://tim10d-dashboard.streamlit.app",
    caseStudy: {
      problem:
        "Prospective students tend to compete for the same popular programs, while less crowded IPS programs with good career outcomes are hard to find in one place.",
      approach:
        "Built during my PT Vinix Seven Aurum (VINIX7) internship as a 4-person team under mentor Musayyanah. The dashboard groups programs with K-Means into 4 clusters, maps them across Indonesia, ranks top programs and recommends programs from user preferences such as applicant count, salary, location and difficulty. I applied the clustering and built the recommendation and visualization features.",
      result:
        "A public Streamlit app with five pages: overview, data visualization, cluster analysis, recommendations and an about guide. Data comes from university pages and other public sources and is meant as a reference to confirm with official sources, not a final admission decision.",
    },
    metrics: [],
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
    slug: "substrate-dev-template",
    title: "Polkadot.js Interface",
    year: "2025",
    tags: ["Web"],
    featured: true,
    role: "Frontend Developer",
    stack: "React, TypeScript, Tailwind CSS, Polkadot.js API, Netlify",
    type: "Developer Bootcamp / Blockchain Interface",
    cover: covers[0],
    image: {
      src: "/projects/substrate-dev-template.webp",
      alt: "Polkadot.js Interface on a laptop plus two phones showing public chain exploration and transaction preparation screens.",
      width: 1296,
      height: 1440,
    },
    gallery: [
      { src: "/projects/substrate-dev-template/home.webp", alt: "Polkadot.js Interface public home screen with RPC connection and chain exploration controls.", width: 2880, height: 1800 },
      { src: "/projects/substrate-dev-template/chain-state.webp", alt: "Polkadot.js Interface public chain-state screen for preparing chain storage queries.", width: 2880, height: 1800 },
      { src: "/projects/substrate-dev-template/extrinsics.webp", alt: "Polkadot.js Interface public extrinsics preparation screen; no transaction submitted during capture.", width: 2880, height: 1800 },
    ],
    summary:
      "A responsive React and TypeScript interface for exploring Substrate chain state, preparing extrinsics and token transfers.",
    repoUrl: "https://github.com/mdprana/substrate-dev-template",
    demoUrl: "https://mdprana-polkadotjs-interface.netlify.app/",
    caseStudy: {
      problem:
        "Make RPC connection, storage queries and transaction preparation accessible in one browser interface.",
      approach:
        "I contributed the interface on a bootcamp starter repository, not the original chain architecture. React 19, TypeScript, Tailwind CSS and Polkadot.js API connect the interface to Westend, local Zombienet or a custom RPC endpoint, with wallet connection and transaction preparation controls.",
      result:
        "A public interface with chain-state, extrinsic and transfer screens. Screenshots show the public interface only; no transaction was submitted during capture. Transfer execution is not independently verified, and production readiness or original runtime design is not claimed.",
    },
    metrics: [],
  },
  {
    slug: "agen-inbox",
    title: "Agen Inbox",
    year: "2026",
    tags: ["Web"],
    featured: true,
    role: "Full-stack Developer",
    stack: "Next.js, React, Gmail API, Google Sheets API, Upstash, Vercel",
    type: "Private Workspace / Email Workflow",
    cover: covers[1],
    image: {
      src: "/projects/agen-inbox.webp",
      alt: "Agen Inbox on a laptop plus two phones showing public login screens and generic workflow information, not a private inbox.",
      width: 1296,
      height: 1440,
    },
    gallery: [
      { src: "/projects/agen-inbox/login-desktop.webp", alt: "Agen Inbox public login screen on desktop with sign-in, welcome and generic workflow information; no private inbox or records.", width: 2880, height: 1800 },
      { src: "/projects/agen-inbox/login-mobile.webp", alt: "Agen Inbox public login screen on mobile with sign-in, welcome and generic workflow information; no private inbox or records.", width: 1170, height: 2532 },
    ],
    summary:
      "A private workspace for reviewing alias email and manually recording follow-up results in Google Sheets.",
    repoUrl: "https://github.com/mdprana/agen-inbox",
    demoUrl: "https://agen-inbox.vercel.app/",
    caseStudy: {
      problem:
        "Keep email review and spreadsheet follow-up together without automatically deciding or activating anything.",
      approach:
        "I built the workspace with Next.js and React, Gmail and Google Sheets integration, server-side OAuth with SHA-256 PKCE and Upstash token storage. Review stays manual, with BERHASIL/GAGAL updates limited to a single Status cell and no automatic activation.",
      result:
        "A restricted-access workflow whose public demo exposes sign-in only. Gallery images show public login screens on desktop and mobile, not a private inbox or agent records. No live Gmail or Google Sheets operation is claimed verified.",
    },
    metrics: [],
  },
];

projects.sort((a, b) => a.slug === "mentalys" ? -1 : b.slug === "mentalys" ? 1 : Number(b.year) - Number(a.year));

export const homeProjects = ["mentalys", "agen-inbox", "substrate-dev-template", "locus-hotel"].map(
  (slug) => projects.find((project) => project.slug === slug)!,
);

export function projectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function nextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
