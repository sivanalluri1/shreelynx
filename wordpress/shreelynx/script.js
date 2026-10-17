(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  try { window.lucide?.createIcons({ attrs: { 'stroke-width': 1.6 } }); } catch (_) { /* Text labels remain usable without icons. */ }
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.mobile-menu-toggle');
  const menu = document.querySelector('.primary-menu');
  const groups = [...document.querySelectorAll('.nav-group')];
  const config = window.shreelynx || {};
  const normalize = url => { const u = new URL(url, location.href); return u.origin + u.pathname.replace(/\/$/, '') + (u.searchParams.has('page_id') ? '?page_id=' + u.searchParams.get('page_id') : ''); };
  document.querySelectorAll('.nav-link').forEach(link => {
    const active = normalize(link.href) === normalize(config.pageUrl || location.href) || (config.page === 'careers' && normalize(link.href) === normalize(config.talentUrl || '/talent/'));
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
  });
  function closeGroups(except) {
    groups.forEach(group => {
      if (group === except) return;
      group.classList.remove('submenu-open');
      group.querySelector('button')?.setAttribute('aria-expanded', 'false');
    });
  }
  function closeMenu() {
    closeGroups(); menu?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false'); toggle?.setAttribute('aria-label', 'Open navigation');
  }
  toggle?.addEventListener('click', () => {
    const open = !menu.classList.contains('open'); closeMenu();
    menu.classList.toggle('open', open); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  groups.forEach(group => {
    const button = group.querySelector('.submenu-toggle');
    button.addEventListener('click', () => {
      const open = !group.classList.contains('submenu-open'); closeGroups();
      group.classList.toggle('submenu-open', open); button.setAttribute('aria-expanded', String(open));
    });
    group.addEventListener('focusout', event => {
      if (!group.contains(event.relatedTarget)) { group.classList.remove('submenu-open'); button.setAttribute('aria-expanded', 'false'); }
    });
  });
  document.addEventListener('click', event => { if (!event.target.closest('.navbar')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const current = document.activeElement?.closest('.nav-group');
    const mobileOpen = menu?.classList.contains('open'); closeMenu();
    if (current) current.querySelector('button')?.focus(); else if (mobileOpen) toggle?.focus();
  });
  document.querySelectorAll('.mega-link,.primary-menu>a').forEach(link => link.addEventListener('click', closeMenu));
  window.matchMedia('(max-width: 980px)').addEventListener('change', closeMenu);
  document.querySelectorAll('[data-tabs]').forEach(root => {
    const buttons = [...root.querySelectorAll('[role=tab]')];
    const panels = [...root.querySelectorAll('[role=tabpanel]')];
    const serviceList = root.querySelector('.service-tablist');
    if (serviceList) {
      const breakpoint = matchMedia('(max-width: 700px)');
      const syncOrientation = () => serviceList.setAttribute('aria-orientation', breakpoint.matches ? 'horizontal' : 'vertical');
      syncOrientation(); breakpoint.addEventListener('change', syncOrientation);
    }
    function activate(button) {
      buttons.forEach(tab => { const active = tab === button; tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1; });
      panels.forEach(panel => { panel.hidden = panel.id !== button.getAttribute('aria-controls'); });
    }
    buttons.forEach((button, index) => {
      button.addEventListener('click', () => activate(button));
      button.addEventListener('keydown', event => {
        const vertical = button.closest('[role=tablist]')?.getAttribute('aria-orientation') === 'vertical' && innerWidth > 700;
        const prev = vertical ? 'ArrowUp' : 'ArrowLeft'; const next = vertical ? 'ArrowDown' : 'ArrowRight';
        if (![prev, next, 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const target = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (index + (event.key === next ? 1 : -1) + buttons.length) % buttons.length;
        activate(buttons[target]); buttons[target].focus();
      });
    });
  });
  document.querySelectorAll('[data-filter-group]').forEach(group => {
    const buttons = [...group.querySelectorAll('[data-filter]')];
    const items = [...document.querySelectorAll('[data-filter-item]')].filter(item => item.dataset.filterItem === group.dataset.filterGroup);
    buttons.forEach(button => button.addEventListener('click', () => {
      buttons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      items.forEach(item => { item.hidden = button.dataset.filter !== 'all' && !item.dataset.category.split(' ').includes(button.dataset.filter); });
    }));
  });
  const search = document.querySelector('[data-role-search]');
  search?.addEventListener('input', () => {
    let count = 0; const query = search.value.trim().toLowerCase();
    document.querySelectorAll('[data-role-card]').forEach(card => { card.hidden = !card.textContent.toLowerCase().includes(query); if (!card.hidden) count++; });
    const empty = document.querySelector('[data-role-empty]'); if (empty) empty.hidden = count > 0;
  });
  document.querySelectorAll('[data-tilt]').forEach(stage => {
    stage.addEventListener('pointermove', event => {
      if (reducedMotion.matches || event.pointerType !== 'mouse') return;
      const r = stage.getBoundingClientRect(); stage.style.setProperty('--rx', ((event.clientY - r.top) / r.height - .5) * -5 + 'deg'); stage.style.setProperty('--ry', ((event.clientX - r.left) / r.width - .5) * 5 + 'deg');
    });
    stage.addEventListener('pointerleave', () => { stage.style.setProperty('--rx', '0deg'); stage.style.setProperty('--ry', '0deg'); });
  });
  const back = document.querySelector('.back-to-top');
  const progress = document.querySelector('.scroll-progress'); let ticking = false;
  function updateScroll() {
    header?.classList.toggle('scrolled', scrollY > 20); back?.classList.toggle('visible', scrollY > 600);
    if (progress) progress.style.width = (scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight) * 100) + '%';
    ticking = false;
  }
  addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(updateScroll); ticking = true; } }, { passive: true }); updateScroll();
  back?.addEventListener('click', () => scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' }));
  // Deep links to perspectives open their complete text automatically.
  if (location.hash) { const article = document.getElementById(decodeURIComponent(location.hash.slice(1))); const details = article?.querySelector('details'); if (details) details.open = true; }
})();
