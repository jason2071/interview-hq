// Q&A content lives in data.json; this file fetches it and builds the DOM.
// Loaded with `defer`, so the DOM is already parsed when this runs.
const DATA_URL = 'data/qa.json';

init();

async function init() {
  let data;
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    data = await res.json();
  } catch (err) {
    renderError(err);
    return;
  }

  renderTOC(data.sections);
  renderSections(data.sections);
  renderRecap(data.recap);
  wireToolbar();
  setupDrawer();
  setupScrollSpy();
}

function renderTOC(sections) {
  const toc = document.getElementById('toc');
  for (const s of sections) {
    const a = document.createElement('a');
    a.href = '#' + s.id;
    a.textContent = s.title;
    toc.append(a);
  }
}

function renderSections(sections) {
  const root = document.getElementById('qa');
  for (const s of sections) {
    const section = document.createElement('section');
    section.id = s.id;

    const head = document.createElement('div');
    head.className = 'sec-head';

    const num = document.createElement('span');
    num.className = 'sec-num';
    num.textContent = s.num;

    const h2 = document.createElement('h2');
    h2.textContent = s.title;

    head.append(num, h2);

    if (s.tag) {
      const tag = document.createElement('span');
      tag.className = 'tag ' + s.tag.class;
      tag.textContent = s.tag.label;
      head.append(tag);
    }

    section.append(head);
    for (const item of s.items) section.append(buildCard(item));
    root.append(section);
  }
}

function buildCard(item) {
  const details = document.createElement('details');
  details.className = 'qa';

  const summary = document.createElement('summary');
  summary.className = 'q';

  const marker = document.createElement('span');
  marker.className = 'marker';
  marker.setAttribute('aria-hidden', 'true');
  marker.textContent = 'Q';

  const chev = document.createElement('span');
  chev.className = 'chev';
  chev.setAttribute('aria-hidden', 'true');
  chev.textContent = '›'; // ›

  // Question is plain text → textContent (no injection surface).
  summary.append(marker, document.createTextNode(item.q), chev);

  const a = document.createElement('div');
  a.className = 'a';
  const inner = document.createElement('div');
  inner.className = 'a-inner';
  inner.innerHTML = item.a; // authored/trusted HTML from data.json
  a.append(inner);

  details.append(summary, a);
  return details;
}

function renderRecap(recap) {
  if (!recap) return;
  const root = document.getElementById('recap');

  const h2 = document.createElement('h2');
  h2.textContent = recap.title;

  const ol = document.createElement('ol');
  for (const html of recap.items) {
    const li = document.createElement('li');
    li.innerHTML = html; // authored/trusted HTML
    ol.append(li);
  }

  root.append(h2, ol);
}

function wireToolbar() {
  // Native <details> handles click/keyboard/focus/open-state.
  // Toolbar just flips the `open` property on every card.
  document.getElementById('expandAll').addEventListener('click', () =>
    document.querySelectorAll('.qa').forEach(d => (d.open = true)));
  document.getElementById('collapseAll').addEventListener('click', () =>
    document.querySelectorAll('.qa').forEach(d => (d.open = false)));
}

// Mobile off-canvas sidebar: toggle button + overlay + Esc + close on link tap.
function setupDrawer() {
  const toggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  if (!toggle || !sidebar || !overlay) return;

  const open = () => {
    sidebar.classList.add('open');
    overlay.classList.add('show');
    toggle.setAttribute('aria-expanded', 'true');
  };
  const close = () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () =>
    sidebar.classList.contains('open') ? close() : open());
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });
  // Tapping a TOC link navigates → close the drawer (mobile).
  document.getElementById('toc').addEventListener('click', e => {
    if (e.target.tagName === 'A') close();
  });
}

// Highlight the TOC link for the section currently in view.
function setupScrollSpy() {
  const links = new Map();
  document.querySelectorAll('#toc a').forEach(a =>
    links.set(a.getAttribute('href').slice(1), a));
  if (!links.size) return;

  const obs = new IntersectionObserver(entries => {
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      links.forEach(l => l.classList.remove('active'));
      const a = links.get(en.target.id);
      if (a) a.classList.add('active');
    }
  }, { rootMargin: '-15% 0px -75% 0px' });

  document.querySelectorAll('#qa section').forEach(s => obs.observe(s));
}

function renderError(err) {
  const root = document.getElementById('qa');
  const box = document.createElement('div');
  box.className = 'note';
  box.textContent =
    `โหลด data.json ไม่ได้ (${err.message || err}). ` +
    `ต้องเปิดผ่าน local server — รัน "python -m http.server" ในโฟลเดอร์นี้ แล้วเข้า http://localhost:8000`;
  root.append(box);
}
