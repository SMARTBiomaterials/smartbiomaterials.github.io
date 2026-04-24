// ── DATASET REGISTRY ──────────────────────────────────────────────────────────
// To add a new dataset: add one object to this array and redeploy.
const DATASETS = [
  {
    icon: "⚡",
    title: "Electrical & Mechanical Stimulation of Skin Cells",
    description: "A data-driven systematic review of in vitro electrical and mechanical stimulation effects on fibroblasts and keratinocytes. 563 experimental conditions from the peer-reviewed literature, with fold-change outcomes normalised to unstimulated controls.",
    badges: [
      { label: "Electrical", style: "badge-orange" },
      { label: "Mechanical", style: "badge-green" },
      { label: "In vitro", style: "badge-blue" },
      { label: "Interactive", style: "badge-purple" },
    ],
    meta: [
      { key: "Paper", val: "Burgess, Marsh, Lucian & Nair (2026)" },
      { key: "Records", val: "563 conditions · 2 modalities · 4 outcomes" },
      { key: "Licence", val: "CC BY 4.0 · Code: MIT" },
    ],
    href: "./stim-dashboard/",
    status: "live",
    statusLabel: "Live",
  },
  {
    icon: "📐",
    title: "MATtBend — Beam Tip Deflection Tracker",
    description: "A MATLAB tool for tracking beam tip deflection in video files. Uses point tracking to measure absolute deflection and X/Y displacement components over time, with interactive scale calibration, batch processing of multiple video formats, and Excel + plot output. Developed for characterising soft robotic and tissue engineering devices.",
    badges: [
      { label: "MATLAB", style: "badge-orange" },
      { label: "Strain Analysis", style: "badge-blue" },
      { label: "Video", style: "badge-purple" },
    ],
    meta: [
      { key: "Paper", val: "Burgess et al. (2025) — arXiv:2504.05302" },
      { key: "Output", val: "Per-video + master Excel · deflection plots" },
      { key: "Requires", val: "MATLAB R2020a+ · Computer Vision Toolbox" },
    ],
    href: "https://github.com/SMARTBiomaterials/MATtBend",
    status: "live",
    statusLabel: "GitHub",
    external: true,
  },
  // ── ADD NEW DATASETS BELOW ──
  // {
  //   icon: "🧬",
  //   title: "...",
  //   description: "...",
  //   badges: [{ label: "...", style: "badge-purple" }],
  //   meta: [{ key: "Paper", val: "..." }],
  //   href: "./new-dataset/",
  //   status: "live",
  //   statusLabel: "Live",
  // },
];

// ── RENDER ────────────────────────────────────────────────────────────────────
function renderCards() {
  const container = document.getElementById('cards-container');
  container.innerHTML = '';

  DATASETS.forEach(d => {
    const card = document.createElement('a');
    card.href = d.href;
    card.className = 'card';
    if (d.external) { card.target = '_blank'; card.rel = 'noopener noreferrer'; }
    const linkLabel = d.external ? 'View on GitHub →' : 'Open dashboard →';
    card.innerHTML = `
      <div class="card-header">
        <div class="card-icon">${d.icon}</div>
        <div class="card-badges">${d.badges.map(b => `<span class="badge ${b.style}">${b.label}</span>`).join('')}</div>
      </div>
      <h3>${d.title}</h3>
      <p>${d.description}</p>
      <div class="card-meta">${d.meta.map(m => `<div class="card-meta-row"><strong>${m.key}:</strong> ${m.val}</div>`).join('')}</div>
      <div class="card-footer">
        <span class="card-link">${linkLabel}</span>
        <span class="card-status ${d.status}">${d.statusLabel}</span>
      </div>
    `;
    container.appendChild(card);
  });

  // Placeholder for future entries
  const placeholder = document.createElement('div');
  placeholder.className = 'card-placeholder';
  placeholder.innerHTML = `<span class="plus">+</span><span>More datasets &amp; tools coming soon</span>`;
  container.appendChild(placeholder);
}

// ── THEME ─────────────────────────────────────────────────────────────────────
function initTheme() {
  const stored = localStorage.getItem('smart-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(stored || (prefersDark ? 'dark' : 'light'));
}
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('theme-btn');
  if (btn) btn.textContent = theme === 'dark' ? '☀︎ Light' : '☾ Dark';
  localStorage.setItem('smart-theme', theme);
}
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}
document.getElementById('theme-btn')?.addEventListener('click', toggleTheme);
// ── BOOT ──────────────────────────────────────────────────────────────────────
initTheme();
renderCards();
