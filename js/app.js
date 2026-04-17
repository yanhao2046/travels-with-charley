// Main application logic — panel, TOC, detail, timeline, play journey

let currentStopId = null;
let isPlaying = false;
let playTimer = null;

// === Hero Cards (Steinbeck / Charley / Rocinante) ===
// Icon-based cards (no embedded images — all links open in new tab)
const HERO_EMOJIS = { steinbeck: '✍️', charley: '🐩', rocinante: '🚐' };

function buildHeroCards() {
  const container = document.getElementById('hero-cards');
  if (!container) return;
  container.innerHTML = ROUTE_DATA.heroCards.map(hero => `
    <div class="hero-card">
      <div class="hero-icon-box">
        <div class="hero-icon">${HERO_EMOJIS[hero.key] || '📷'}</div>
      </div>
      <div class="hero-card-body">
        <h3>${hero.nameCn}</h3>
        <p class="hero-name-en">${hero.nameEn}</p>
        <p class="hero-caption">${hero.caption}</p>
        <div class="hero-links">
          <a href="${hero.searchUrl}" target="_blank" rel="noopener" class="link-btn link-btn-primary">🔍 Google 图片</a>
          <a href="${hero.wikiUrl}" target="_blank" rel="noopener" class="link-btn">📖 Wikipedia</a>
        </div>
      </div>
    </div>
  `).join('');
}

function initHeroModal() {
  const modal = document.getElementById('hero-modal');
  const openBtn = document.getElementById('hero-toggle');
  const closeBtn = document.getElementById('hero-close');
  const backdrop = modal.querySelector('.hero-modal-backdrop');

  openBtn.addEventListener('click', () => { modal.style.display = 'flex'; });
  closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
  backdrop.addEventListener('click', () => { modal.style.display = 'none'; });
}

// === Theme Modal ===
function renderThemeBody(themeId) {
  const themes = (typeof THEMES !== 'undefined') ? THEMES : null;
  const theme = themes ? themes.find(t => t.id === themeId) : null;
  const btn = document.querySelector(`.theme-btn[data-theme-id="${themeId}"]`);
  const iconFallback = btn ? btn.querySelector('.theme-icon').textContent : '';
  const nameFallback = btn ? btn.querySelector('.theme-label').textContent : themeId;

  if (!theme) {
    return `
      <div class="theme-header">
        <span class="theme-header-icon">${iconFallback}</span>
        <h2>${nameFallback}</h2>
      </div>
      <div class="theme-wip">内容待填（下一步）<br>Content coming next step</div>
    `;
  }

  const excerptsHtml = (theme.excerpts || []).map(ex => `
    <li>
      <span class="excerpt-source">${ex.source || ''}</span>
      ${ex.text}
    </li>
  `).join('');

  const queriesHtml = (theme.queries || []).map(q => {
    const bingUrl = `https://www.bing.com/images/search?q=${encodeURIComponent(q.q)}`;
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(q.q)}&tbm=isch`;
    return `
      <div class="theme-query-row">
        <span class="theme-query-label">${q.cn}</span>
        <a href="${bingUrl}" target="_blank" rel="noopener" class="link-btn link-btn-sm">🔎 Bing</a>
        <a href="${googleUrl}" target="_blank" rel="noopener" class="link-btn link-btn-sm">🔍 Google</a>
      </div>
    `;
  }).join('');

  return `
    <div class="theme-header">
      <span class="theme-header-icon">${theme.icon || iconFallback}</span>
      <h2>${theme.name}<span class="theme-name-en">${theme.nameEn || ''}</span></h2>
    </div>
    ${theme.bgNote ? `<div class="theme-bg-note">${theme.bgNote}</div>` : ''}
    ${excerptsHtml ? `<div class="theme-section-title">书中摘录</div><ul class="theme-excerpts">${excerptsHtml}</ul>` : ''}
    ${queriesHtml ? `<div class="theme-section-title">场景图搜</div><div class="theme-queries">${queriesHtml}</div>` : ''}
  `;
}

function initThemeModal() {
  const modal = document.getElementById('theme-modal');
  const body = document.getElementById('theme-modal-body');
  const closeBtn = document.getElementById('theme-close');
  const backdrop = modal.querySelector('.theme-modal-backdrop');

  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const themeId = btn.dataset.themeId;
      body.innerHTML = renderThemeBody(themeId);
      modal.style.display = 'flex';
      body.scrollTop = 0;
    });
  });

  const close = () => { modal.style.display = 'none'; };
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') close();
  });
}

// === Image link generators for each stop ===
// Returns scene-specific queries from STOP_IMAGE_QUERIES if available,
// otherwise falls back to a single generic query based on stop.nameEn.
function getStopImageScenes(stop) {
  const scenes = (typeof STOP_IMAGE_QUERIES !== 'undefined' && STOP_IMAGE_QUERIES[stop.id]) || null;
  if (scenes && scenes.length) {
    return scenes.map(s => ({
      cn: s.cn,
      q: s.q,
      googleUrl: `https://www.google.com/search?q=${encodeURIComponent(s.q)}&tbm=isch`,
      bingUrl: `https://www.bing.com/images/search?q=${encodeURIComponent(s.q)}`,
    }));
  }
  const fallbackQ = `${stop.nameEn} 1960s`;
  return [{
    cn: stop.nameCn,
    q: fallbackQ,
    googleUrl: `https://www.google.com/search?q=${encodeURIComponent(fallbackQ)}&tbm=isch`,
    bingUrl: `https://www.bing.com/images/search?q=${encodeURIComponent(fallbackQ)}`,
  }];
}

function getStopWikiUrl(stop) {
  const wikiQuery = stop.nameEn.split(',')[0].split('(')[0].trim();
  return `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(wikiQuery)}`;
}

// === Panel Toggle ===
function initPanel() {
  const panel = document.getElementById('side-panel');
  const toggleBtn = document.getElementById('panel-toggle');

  toggleBtn.addEventListener('click', () => {
    panel.classList.toggle('open');
    // Invalidate map size when panel toggles
    setTimeout(() => { if (map) map.invalidateSize(); }, 350);
  });

  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
  });
}

// === TOC (Table of Contents) ===
function buildTOC() {
  const tocList = document.getElementById('toc-list');
  const stops = ROUTE_DATA.stops;
  const parts = ROUTE_DATA.parts;

  let html = '';
  let currentPart = null;

  stops.forEach(stop => {
    const partId = typeof stop.part === 'string' ? parseInt(stop.part) :
                   String(stop.part).includes('/') ? parseInt(String(stop.part).split('/')[0]) : stop.part;

    if (partId !== currentPart) {
      currentPart = partId;
      const part = parts.find(p => p.id === partId);
      html += `<div class="toc-part-header" style="background:${part.color}">${part.title} — ${part.subtitle}</div>`;
    }

    html += `
      <div class="toc-item" data-stop-id="${stop.id}" onclick="selectStop(${stop.id})">
        <div class="toc-item-num" style="background:${getPartColor(partId)}">${stop.id}</div>
        <div class="toc-item-info">
          <div class="toc-item-name">${stop.nameCn}</div>
          <div class="toc-item-name-en">${stop.nameEn}</div>
          <div class="toc-item-time">${stop.time}</div>
        </div>
      </div>
    `;
  });

  tocList.innerHTML = html;
}

// === Tag Filter ===
function buildTagFilter() {
  const select = document.getElementById('tag-filter');
  const allTags = new Set();
  ROUTE_DATA.stops.forEach(stop => {
    stop.tags.forEach(tag => allTags.add(tag));
  });

  const sorted = [...allTags].sort();
  sorted.forEach(tag => {
    const opt = document.createElement('option');
    opt.value = tag;
    opt.textContent = tag;
    select.appendChild(opt);
  });

  select.addEventListener('change', () => {
    const filter = select.value;
    document.querySelectorAll('.toc-item').forEach(item => {
      const stopId = parseInt(item.dataset.stopId);
      const stop = ROUTE_DATA.stops.find(s => s.id === stopId);
      if (!filter || stop.tags.includes(filter)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

// === Detail Card ===
function showDetail(stopId) {
  const stop = ROUTE_DATA.stops.find(s => s.id === stopId);
  if (!stop) return;

  const partId = typeof stop.part === 'string' ? parseInt(stop.part) :
                 String(stop.part).includes('/') ? parseInt(String(stop.part).split('/')[0]) : stop.part;
  const part = ROUTE_DATA.parts.find(p => p.id === partId);

  document.getElementById('detail-placeholder').style.display = 'none';
  const card = document.getElementById('detail-card');
  card.style.display = '';

  document.getElementById('card-part').textContent = part.title;
  document.getElementById('card-part').style.background = part.color;
  document.getElementById('card-mood').textContent = stop.mood;
  document.getElementById('card-name').textContent = `${stop.nameCn} ${stop.nameEn}`;
  document.getElementById('card-time').textContent = `${stop.time} / ${stop.timeEn}`;
  document.getElementById('card-summary').textContent = stop.summary;
  document.getElementById('card-quote-en').textContent = `"${stop.quote}"`;
  document.getElementById('card-quote-cn').textContent = stop.quoteCn;

  // Tags
  const tagsEl = document.getElementById('card-tags');
  tagsEl.innerHTML = stop.tags.map(t => `<span class="tag">${t}</span>`).join('');

  // Counter
  const idx = ROUTE_DATA.stops.findIndex(s => s.id === stopId);
  document.getElementById('card-counter').textContent = `${idx + 1} / ${ROUTE_DATA.stops.length}`;

  // Nav buttons
  const prevBtn = document.getElementById('btn-prev');
  const nextBtn = document.getElementById('btn-next');
  prevBtn.disabled = idx === 0;
  nextBtn.disabled = idx === ROUTE_DATA.stops.length - 1;

  // Image links (external search) — per-scene, Bing + Google each
  const scenes = getStopImageScenes(stop);
  const wikiUrl = getStopWikiUrl(stop);
  const scenesHtml = scenes.map(s => `
    <div class="scene-row">
      <span class="scene-label">${s.cn}</span>
      <a href="${s.bingUrl}" target="_blank" rel="noopener" class="link-btn link-btn-sm">🔎 Bing</a>
      <a href="${s.googleUrl}" target="_blank" rel="noopener" class="link-btn link-btn-sm">🔍 Google</a>
    </div>
  `).join('');
  document.getElementById('card-image-links').innerHTML = `
    ${scenesHtml}
    <div class="scene-row scene-row-wiki">
      <a href="${wikiUrl}" target="_blank" rel="noopener" class="link-btn link-btn-sm">📖 Wikipedia</a>
    </div>
  `;

  // Switch to detail tab
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.querySelector('[data-tab="detail"]').classList.add('active');
  document.getElementById('tab-detail').classList.add('active');

  // Scroll card to top
  card.scrollTop = 0;
}

// === Timeline ===
function buildTimeline() {
  const timeline = document.getElementById('timeline');
  const stops = ROUTE_DATA.stops;

  // Group by approximate month
  const months = [
    { label: '1960年9月 September', stops: stops.filter(s => s.time.includes('9月')) },
    { label: '1960年10月 October', stops: stops.filter(s => s.time.includes('10月')) },
    { label: '1960年11月 November', stops: stops.filter(s => s.time.includes('11月') || s.time.includes('感恩节')) },
    { label: '1960年12月 December', stops: stops.filter(s => s.time.includes('12月')) }
  ];

  let html = '';
  months.forEach(month => {
    if (month.stops.length === 0) return;
    html += `<div class="timeline-month">${month.label}</div>`;
    month.stops.forEach(stop => {
      const partId = typeof stop.part === 'string' ? parseInt(stop.part) :
                     String(stop.part).includes('/') ? parseInt(String(stop.part).split('/')[0]) : stop.part;
      html += `
        <div class="timeline-item" data-stop-id="${stop.id}" onclick="selectStop(${stop.id})"
             style="border-left-color: ${getPartColor(partId)}">
          <div class="timeline-item-name">${stop.nameCn} ${stop.nameEn}</div>
          <div class="timeline-item-time">${stop.time}</div>
        </div>
      `;
    });
  });

  timeline.innerHTML = html;
}

// === Select Stop (main coordination function) ===
window.selectStop = function(stopId) {
  if (currentStopId === stopId) return;
  currentStopId = stopId;

  // 1. Fly map to stop
  flyToStop(stopId);

  // 2. Show detail card
  showDetail(stopId);

  // 3. Highlight TOC item
  document.querySelectorAll('.toc-item').forEach(item => {
    item.classList.toggle('active', parseInt(item.dataset.stopId) === stopId);
  });
  // Scroll TOC to active item
  const activeItem = document.querySelector(`.toc-item[data-stop-id="${stopId}"]`);
  if (activeItem) {
    activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // 4. Highlight timeline item
  document.querySelectorAll('.timeline-item').forEach(item => {
    item.classList.toggle('active', parseInt(item.dataset.stopId) === stopId);
  });

  // 5. Open panel if closed
  const panel = document.getElementById('side-panel');
  if (!panel.classList.contains('open')) {
    panel.classList.add('open');
    setTimeout(() => { if (map) map.invalidateSize(); }, 350);
  }
};

// === Play Journey ===
function initPlayControls() {
  const playBtn = document.getElementById('btn-play');

  playBtn.addEventListener('click', () => {
    if (isPlaying) {
      stopPlaying();
    } else {
      startPlaying();
    }
  });
}

function startPlaying() {
  isPlaying = true;
  const playBtn = document.getElementById('btn-play');
  playBtn.textContent = '⏸ 暂停';
  playBtn.classList.add('playing');

  const stops = ROUTE_DATA.stops;
  let idx = currentStopId ? stops.findIndex(s => s.id === currentStopId) : -1;

  function playNext() {
    idx++;
    if (idx >= stops.length) {
      stopPlaying();
      return;
    }
    selectStop(stops[idx].id);
    playTimer = setTimeout(playNext, 3000);
  }

  playNext();
}

function stopPlaying() {
  isPlaying = false;
  const playBtn = document.getElementById('btn-play');
  playBtn.textContent = '▶ 播放旅程';
  playBtn.classList.remove('playing');
  if (playTimer) {
    clearTimeout(playTimer);
    playTimer = null;
  }
}

// === Nav Buttons ===
function initNavButtons() {
  document.getElementById('btn-prev').addEventListener('click', () => {
    if (!currentStopId) return;
    const idx = ROUTE_DATA.stops.findIndex(s => s.id === currentStopId);
    if (idx > 0) selectStop(ROUTE_DATA.stops[idx - 1].id);
  });

  document.getElementById('btn-next').addEventListener('click', () => {
    if (!currentStopId) return;
    const idx = ROUTE_DATA.stops.findIndex(s => s.id === currentStopId);
    if (idx < ROUTE_DATA.stops.length - 1) selectStop(ROUTE_DATA.stops[idx + 1].id);
  });
}

// === Keyboard Navigation ===
function initKeyboard() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      document.getElementById('btn-prev').click();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      document.getElementById('btn-next').click();
    } else if (e.key === 'Escape') {
      const panel = document.getElementById('side-panel');
      panel.classList.toggle('open');
      setTimeout(() => { if (map) map.invalidateSize(); }, 350);
    } else if (e.key === ' ' && !e.target.matches('input, textarea')) {
      e.preventDefault();
      if (isPlaying) stopPlaying(); else startPlaying();
    }
  });
}

// === Init All ===
document.addEventListener('DOMContentLoaded', () => {
  initPanel();
  buildHeroCards();
  initHeroModal();
  initThemeModal();
  buildTOC();
  buildTagFilter();
  buildTimeline();
  initPlayControls();
  initNavButtons();
  initKeyboard();
});
