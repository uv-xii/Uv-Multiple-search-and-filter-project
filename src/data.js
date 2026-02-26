// ============================================================
// data.js — Mock dataset for Nexus Search Platform
// Categories: Images, Videos, People, Files
// ============================================================

export const CATEGORIES = ["All", "Images", "Videos", "People", "Files"];

export const MOCK_DATA = {
  Images: [
    { id: 1,  title: "Neural Network Visualization",  tag: "AI",      size: "4.2 MB",  format: "PNG",  date: "2026-01-15", color: "#00ff9d" },
    { id: 2,  title: "Quantum Circuit Diagram",        tag: "Science", size: "2.1 MB",  format: "SVG",  date: "2026-02-01", color: "#00cfff" },
    { id: 3,  title: "Dark Matter Simulation",         tag: "Space",   size: "8.7 MB",  format: "JPG",  date: "2025-12-20", color: "#ff6b6b" },
    { id: 4,  title: "Protein Fold Structure",         tag: "Biology", size: "1.4 MB",  format: "PNG",  date: "2026-01-28", color: "#ffd93d" },
    { id: 5,  title: "Cyber City Skyline",             tag: "Design",  size: "5.5 MB",  format: "JPG",  date: "2026-02-10", color: "#c77dff" },
    { id: 6,  title: "Data Flow Architecture",         tag: "Tech",    size: "3.3 MB",  format: "SVG",  date: "2026-02-18", color: "#00ff9d" },
  ],
  Videos: [
    { id: 7,  title: "Machine Learning Explained",    tag: "Education", duration: "12:34", resolution: "4K",    date: "2026-01-10", color: "#00cfff" },
    { id: 8,  title: "Quantum Computing Intro",       tag: "Science",   duration: "8:20",  resolution: "1080p", date: "2026-02-05", color: "#00ff9d" },
    { id: 9,  title: "Neural Interface Demo",         tag: "Tech",      duration: "5:47",  resolution: "4K",    date: "2025-11-30", color: "#ff6b6b" },
    { id: 10, title: "Space X Launch Sequence",       tag: "Space",     duration: "22:10", resolution: "1080p", date: "2026-01-22", color: "#ffd93d" },
    { id: 11, title: "Deep Sea Bioluminescence",      tag: "Nature",    duration: "15:00", resolution: "4K",    date: "2026-02-14", color: "#c77dff" },
  ],
  People: [
    { id: 12, title: "Dr. Yuki Tanaka",   tag: "AI Research", role: "Neuroscientist",   location: "Tokyo",  date: "2026-01-05", color: "#00ff9d" },
    { id: 13, title: "Marcus Osei",       tag: "Engineering", role: "Quantum Engineer",  location: "Accra",  date: "2026-02-11", color: "#00cfff" },
    { id: 14, title: "Lena Vasquez",      tag: "Design",      role: "UX Architect",      location: "Berlin", date: "2025-12-15", color: "#c77dff" },
    { id: 15, title: "Arjun Mehta",       tag: "Data Science",role: "ML Engineer",       location: "Mumbai", date: "2026-02-01", color: "#ffd93d" },
    { id: 16, title: "Zara Okonkwo",      tag: "Biotech",     role: "Gene Researcher",   location: "Lagos",  date: "2026-01-18", color: "#ff6b6b" },
  ],
  Files: [
    { id: 17, title: "Nexus_Architecture_v3.pdf",   tag: "Docs",     size: "1.2 MB",  format: "PDF",  date: "2026-02-20", color: "#ff6b6b" },
    { id: 18, title: "quantum_algo_research.docx",  tag: "Research", size: "890 KB",  format: "DOCX", date: "2026-01-30", color: "#00ff9d" },
    { id: 19, title: "neural_weights_model.zip",    tag: "Model",    size: "234 MB",  format: "ZIP",  date: "2026-02-08", color: "#ffd93d" },
    { id: 20, title: "cipher_protocol_spec.txt",    tag: "Security", size: "45 KB",   format: "TXT",  date: "2025-12-28", color: "#00cfff" },
    { id: 21, title: "biometric_dataset.csv",       tag: "Data",     size: "12.4 MB", format: "CSV",  date: "2026-02-17", color: "#c77dff" },
    { id: 22, title: "system_core_backup.tar",      tag: "System",   size: "4.1 GB",  format: "TAR",  date: "2026-01-07", color: "#ff6b6b" },
  ],
};

// Flatten all data with category field
export const ALL_DATA = Object.entries(MOCK_DATA).flatMap(([cat, items]) =>
  items.map((item) => ({ ...item, category: cat }))
);

// Result counts per category
export const CATEGORY_COUNTS = Object.fromEntries([
  ["All", ALL_DATA.length],
  ...Object.entries(MOCK_DATA).map(([cat, items]) => [cat, items.length]),
]);
