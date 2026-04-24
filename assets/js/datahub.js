function isSafeUrl(value) {
  if (!value) return false;
  try {
    const url = new URL(value, window.location.origin);
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
}

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
  if (!container) return;

  container.replaceChildren();

  DATASETS.forEach(d => {
    const card = document.createElement('a');
    card.className = 'card';

    if (isSafeUrl(d.href)) card.href = d.href;

    if (d.external) {
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
    }

    const linkLabel = d.external ? 'View on GitHub →' : 'Open dashboard →';

    // header
    const header = document.createElement('div');
    header.className = 'card-header';

    const icon = document.createElement('div');
    icon.className = 'card-icon';
    icon.textContent = d.icon || '';

    const badgesWrap = document.createElement('div');
    badgesWrap.className = 'card-badges';

    (d.badges || []).forEach(b => {
      const span = document.createElement('span');
      span.className = `badge ${b.style || ''}`;
      span.textContent = b.label || '';
      badgesWrap.appendChild(span);
    });

    header.append(icon, badgesWrap);

    // title
    const title = document.createElement('h3');
    title.textContent = d.title || '';

    // description
    const desc = document.createElement('p');
    desc.textContent = d.description || '';

    // meta
    const metaWrap = document.createElement('div');
    metaWrap.className = 'card-meta';

    (d.meta || []).forEach(m => {
      const row = document.createElement('div');
      row.className = 'card-meta-row';

      const strong = document.createElement('strong');
      strong.textContent = `${m.key}:`;

      const span = document.createElement('span');
      span.textContent = ` ${m.val}`;

      row.append(strong, span);
      metaWrap.appendChild(row);
    });

    // footer
    const footer = document.createElement('div');
    footer.className = 'card-footer';

    const link = document.createElement('span');
    link.className = 'card-link';
    link.textContent = linkLabel;

    const status = document.createElement('span');
    status.className = `card-status ${d.status || ''}`;
    status.textContent = d.statusLabel || '';

    footer.append(link, status);

    card.append(header, title, desc, metaWrap, footer);
    container.appendChild(card);
  });

  // placeholder
  const placeholder = document.createElement('div');
  placeholder.className = 'card-placeholder';

  const plus = document.createElement('span');
  plus.className = 'plus';
  plus.textContent = '+';

  const text = document.createElement('span');
  text.textContent = 'More datasets & tools coming soon';

  placeholder.append(plus, text);
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
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('theme-btn')
    ?.addEventListener('click', toggleTheme);

  initTheme();
  renderCards();
});
