// Portfolio content — source of truth.
// Structure follows "Struktur Porto.docx"; copy edited to English.

export const profile = {
  name: "Fikriya Sabila Yusriyani",
  firstName: "Fikriya",
  role: "Machine Learning · Computer Vision · Data Engineering",
  headline: "I build computer vision systems — from data pipelines to trained CNNs — for social and health problems.",
  education: "B.Sc. Informatics Engineering, Universitas Gunadarma",
  focus: "Machine Learning, Computer Vision, Data Engineering",
  photo: "/assets/profile.jpg",
  status: "Open to ML & computer vision work",
};

export const socials = [
  { label: "LinkedIn", handle: "fikriyasy", href: "https://www.linkedin.com/in/fikriyasy" },
  { label: "GitHub", handle: "riaasy", href: "https://github.com/riaasy" },
  { label: "Email", handle: "fikriyasabila@gmail.com", href: "mailto:fikriyasabila@gmail.com" },
];

export const about = {
  statement:
    "Machine Learning enthusiast with a deep interest in building Computer Vision systems that address social and health problems. Experienced in designing and optimizing Convolutional Neural Network architectures, engineering visual data pipelines, and applying Transfer Learning. Analytical by habit — balancing technical complexity with real-world implementation validity.",
  meta: [
    { label: "Education", value: "Informatics Engineering, Universitas Gunadarma" },
    { label: "Focus", value: "ML · Computer Vision · Data Engineering" },
    { label: "Research interest", value: "AI for social & health problems" },
  ],
};

export const featured = {
  eyebrow: "Featured Project",
  title: "Facial Expression Recognition for children with special needs",
  kind: "Independent Project · Thesis Research",
  role: "Machine Learning & Computer Vision Researcher",
  summary:
    "An automatic facial expression recognition system designed to detect emotions in children on the autism spectrum. It handles atypical expression characteristics and severe class imbalance in social/medical image datasets through targeted deep learning optimization.",
  tags: ["Python", "ResNet18", "MobileNetV2", "Transfer Learning", "Albumentations", "YuNet"],
  pipeline: [
    { id: "source", label: "External datasets", note: "FERAC · Mendeley Data" },
    { id: "dedup", label: "Deduplication", note: "MD5 + pHash" },
    { id: "align", label: "Face alignment", note: "YuNet, 15% margin" },
    { id: "audit", label: "Quality audit", note: "Image quality filtering" },
    { id: "train", label: "Fine-tuning", note: "ResNet18 / MobileNetV2" },
    { id: "output", label: "4 basic emotions", note: "Stable predictions" },
  ],
  chapters: [
    {
      n: "01",
      title: "Data pipeline engineering",
      body: "End-to-end preprocessing built from external repositories: hash-based duplicate filtering (MD5, perceptual hashing), then automatic face cropping with YuNet landmark alignment and a 15% margin measured from the eye landmarks.",
      tags: ["MD5", "pHash", "YuNet", "Quality audit"],
    },
    {
      n: "02",
      title: "Computational experiments",
      body: "Eight comprehensive test scenarios crossing base architecture (MobileNetV2 vs ResNet18), data augmentation strategy, and class mapping (4 basic classes vs full 6 classes).",
      tags: ["8 scenarios", "A/B testing", "Augmentation"],
    },
    {
      n: "03",
      title: "Architecture optimization",
      body: "Two-phase fine-tuning — a warm-up phase followed by full fine-tuning — with early stopping to prevent overfitting and accelerate convergence.",
      tags: ["Two-phase fine-tuning", "Early stopping"],
    },
    {
      n: "04",
      title: "Critical problem solving",
      body: "Visual feature overlap and severe class imbalance on sadness and surprise. A data-driven architectural decision compressed classification to 4 basic emotions, effectively damping bias from atypical child expressions.",
      tags: ["Class imbalance", "Feature overlap", "4-class mapping"],
    },
  ],
  metrics: [
    { key: "accuracy", label: "Accuracy", value: 0.79 },
    { key: "precision", label: "Precision", value: 0.66 },
    { key: "recall", label: "Recall", value: 0.6 },
    { key: "f1", label: "Weighted F1", value: 0.78 },
  ],
  metricsNote: "Best scenario — ResNet18 with data augmentation, 4 classes.",
  outcomes: [
    "More stable predictions: noise reduction and emotion-class compression secured the system's internal validity.",
    "A comprehensive analysis of the trade-off between internal validity (technical accuracy) and ecological validity (practical use by therapists in the field).",
    "A grounded foundation for future spatio-temporal, video-based AI systems.",
  ],
};

export const skills = [
  {
    group: "ML Engineering",
    items: [
      "Model Evaluation",
      "Transfer Learning",
      "Hyperparameter Tuning",
      "Data Augmentation",
    ],
  },
  {
    group: "Data Processing",
    items: [
      "Image Quality Auditing",
      "Automated Face Detection & Alignment",
      "Data Deduplication",
    ],
  },
  {
    group: "Analytical Thinking",
    items: [
      "Technical Decision-Making",
      "Class Imbalance Resolution",
      "Methodical Experimentation",
    ],
  },
];

export const marqueeWords = [
  "Computer Vision",
  "Transfer Learning",
  "CNN",
  "ResNet18",
  "MobileNetV2",
  "Data Engineering",
  "Deep Learning",
  "Albumentations",
];

export const sections = [
  { id: "profile", label: "Profile" },
  { id: "project", label: "Project" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];
