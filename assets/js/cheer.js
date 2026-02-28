document.addEventListener('DOMContentLoaded', () => {
  const pairs = [
    ['mobile-btn', 'mobile-menu'],
    ['season-mobile-btn', 'season-mobile-menu']
  ];

  pairs.forEach(([buttonId, menuId]) => {
    const button = document.getElementById(buttonId);
    const menu = document.getElementById(menuId);
    if (!button || !menu) return;

    button.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      button.setAttribute('aria-expanded', String(isOpen));
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
      });
    });
  });

  setupHeroCarousel();
});

function setupHeroCarousel() {
  const root = document.getElementById('hero-carousel');
  if (!root) return;

  const TRANSITION_MS = 1300;
  const SWIPE_THRESHOLD = 48;

  const slides = [
    {
      key: 'lanzar',
      tabLabel: 'Lanzamiento',
      layout: 'A',
      heading: 'Tu copiloto para lanzar, ordenar y escalar con foco.',
      description: 'Aterrizamos tu operación digital con una ruta práctica y resultados desde el primer sprint.',
      bullets: ['Implementación guiada', 'Acompañamiento continuo'],
      primaryCta: { label: 'Agendar demo', href: '#contacto' },
      secondaryCta: { label: 'Ver soluciones', href: '#soluciones' },
      tooltip: 'Estado: rumbo definido'
    },
    {
      key: 'ordenar',
      tabLabel: 'Sistema',
      layout: 'B',
      heading: 'Sistema operativo para crecer con orden.',
      description: 'Combinamos método y ejecución para que cada avance tenga estructura.',
      modules: [
        { title: 'Arquitectura', description: 'Base web y stack modular alineado a negocio.' },
        { title: 'Growth', description: 'Ciclos de mejora medibles con foco en conversión.' },
        { title: 'Automatización', description: 'Flujos repetibles conectados a tu operación.' }
      ]
    },
    {
      key: 'crecer',
      tabLabel: 'Roadmap',
      layout: 'C',
      heading: 'Roadmap operativo para avanzar trimestre a trimestre.',
      description: 'Convertimos objetivos en un plan vivo con hitos claros y entregables accionables.',
      roadmap: [
        { phase: 'Q1', title: 'Diagnóstico + Base', detail: 'Prioridades, setup y quick wins.' },
        { phase: 'Q2', title: 'Integración', detail: 'Automatizaciones y procesos conectados.' },
        { phase: 'Q3', title: 'Optimización', detail: 'Escala, métricas y siguientes apuestas.' }
      ],
      planTitle: 'Plan activo',
      planDescription: 'Tablero con prioridades, sprints y seguimiento semanal.',
      status: 'status: ON',
      primaryCta: { label: 'Agendar demo', href: '#contacto' }
    }
  ];

  let activeIndex = 0;
  let transitionLock = false;
  let activeTimeout = null;

  const panels = document.createElement('div');
  panels.className = 'hero-panels';
  panels.setAttribute('aria-live', 'polite');

  const renderedSlides = slides.map((slide, index) => createHeroSlide(slide, index, index === activeIndex));
  renderedSlides.forEach((slide) => panels.appendChild(slide));

  const tabs = createTabControl(slides, {
    initialIndex: activeIndex,
    onChange: moveTo
  });

  const previousButton = createNavButton('prev', 'Anterior', '‹', () => moveTo(activeIndex - 1));
  const nextButton = createNavButton('next', 'Siguiente', '›', () => moveTo(activeIndex + 1));

  root.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      moveTo(activeIndex - 1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      moveTo(activeIndex + 1);
    }
  });

  root.tabIndex = 0;

  let touchStartX = 0;
  let touchCurrentX = 0;
  panels.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].clientX;
    touchCurrentX = touchStartX;
  }, { passive: true });

  panels.addEventListener('touchmove', (event) => {
    touchCurrentX = event.changedTouches[0].clientX;
  }, { passive: true });

  panels.addEventListener('touchend', () => {
    const delta = touchCurrentX - touchStartX;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    if (delta > 0) moveTo(activeIndex - 1);
    if (delta < 0) moveTo(activeIndex + 1);
  });

  function moveTo(index) {
    if (transitionLock) return;
    const nextIndex = normalizeIndex(index, slides.length);
    if (nextIndex === activeIndex) return;

    transitionLock = true;
    if (activeTimeout) window.clearTimeout(activeTimeout);

    const currentSlide = renderedSlides[activeIndex];
    const nextSlide = renderedSlides[nextIndex];

    currentSlide.classList.remove('is-active');
    currentSlide.classList.add('is-leaving');
    currentSlide.setAttribute('aria-hidden', 'true');

    nextSlide.classList.add('is-entering');
    nextSlide.setAttribute('aria-hidden', 'false');

    requestAnimationFrame(() => {
      nextSlide.classList.add('is-active');
    });

    activeIndex = nextIndex;
    tabs.setActive(activeIndex);

    activeTimeout = window.setTimeout(() => {
      renderedSlides.forEach((slide, idx) => {
        slide.classList.remove('is-entering', 'is-leaving');
        if (idx !== activeIndex) slide.classList.remove('is-active');
      });
      transitionLock = false;
    }, TRANSITION_MS);
  }

  root.className = 'hero-carousel';
  root.style.setProperty('--hero-transition-ms', `${TRANSITION_MS}ms`);
  root.append(previousButton, nextButton, panels, tabs.element);
}

function createTabControl(items, { initialIndex = 0, onChange }) {
  const tablist = document.createElement('div');
  tablist.className = 'hero-tabs';
  tablist.setAttribute('role', 'tablist');
  tablist.setAttribute('aria-label', 'Cambiar viñeta del hero');

  let activeIndex = initialIndex;
  const buttons = items.map((item, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'hero-tab';
    button.setAttribute('role', 'tab');
    button.id = `hero-tab-${item.key}`;
    button.setAttribute('aria-controls', `slide-${index + 1}`);
    const selected = index === activeIndex;
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
    button.setAttribute('aria-label', `Ir al slide ${index + 1}: ${item.tabLabel}`);
    if (selected) button.classList.add('is-active');
    button.innerHTML = `<span class="hero-tab-number">${String(index + 1).padStart(2, '0')}</span><span class="hero-tab-label">${item.tabLabel}</span><span class="hero-tab-led" aria-hidden="true"></span>`;

    button.addEventListener('click', () => {
      setActive(index);
      onChange(index);
    });

    button.addEventListener('keydown', (event) => {
      if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let next = activeIndex;
      if (event.key === 'ArrowRight') next = (activeIndex + 1) % buttons.length;
      if (event.key === 'ArrowLeft') next = (activeIndex - 1 + buttons.length) % buttons.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = buttons.length - 1;
      setActive(next);
      buttons[next].focus();
      onChange(next);
    });

    tablist.appendChild(button);
    return button;
  });

  function setActive(nextIndex) {
    activeIndex = nextIndex;
    buttons.forEach((button, index) => {
      const selected = index === activeIndex;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
      button.classList.toggle('is-active', selected);
    });
  }

  return { element: tablist, setActive };
}

function createHeroSlide(slide, slideIndex, isActive) {
  const article = document.createElement('article');
  article.className = `hero-slide hero-layout-${slide.layout}${isActive ? ' is-active' : ''}`;
  article.id = `slide-${slideIndex + 1}`;
  article.setAttribute('data-layout', slide.layout);
  article.setAttribute('role', 'tabpanel');
  article.setAttribute('aria-labelledby', `hero-tab-${slide.key}`);
  article.setAttribute('aria-hidden', String(!isActive));

  if (slide.layout === 'A') return createLayoutA(article, slide);
  if (slide.layout === 'B') return createLayoutB(article, slide);
  if (slide.layout === 'C') return createLayoutC(article, slide);

  return article;
}

function createLayoutA(article, slide) {
  const copy = document.createElement('div');
  copy.className = 'hero-copy';

  const overline = document.createElement('p');
  overline.className = 'overline';
  overline.textContent = 'COPILOTO DIGITAL';

  const heading = document.createElement('h1');
  heading.textContent = slide.heading;

  const description = document.createElement('p');
  description.textContent = slide.description;

  const bulletList = document.createElement('ul');
  bulletList.className = 'hero-bullets';
  slide.bullets.forEach((bullet) => {
    const item = document.createElement('li');
    item.textContent = bullet;
    bulletList.appendChild(item);
  });

  const actions = document.createElement('div');
  actions.className = 'hero-actions';
  actions.append(
    createPrimaryButton(slide.primaryCta.label, slide.primaryCta.href),
    createSecondaryButton(slide.secondaryCta.label, slide.secondaryCta.href)
  );

  copy.append(overline, heading, description, bulletList, actions);

  const visual = createRobotVisual({ tooltip: slide.tooltip });

  article.append(copy, visual);
  return article;
}

function createLayoutB(article, slide) {
  const visual = createRobotVisual({
    tooltip: 'Estado: módulo sincronizado',
    large: true,
    alt: 'Robot helper de brujulabs en vista ampliada'
  });

  const centered = document.createElement('div');
  centered.className = 'hero-copy hero-copy--right';

  const overline = document.createElement('p');
  overline.className = 'overline';
  overline.textContent = 'SISTEMA / MÉTODO';

  const heading = document.createElement('h1');
  heading.textContent = slide.heading;

  const description = document.createElement('p');
  description.textContent = slide.description;

  const modules = document.createElement('div');
  modules.className = 'hero-modules';
  slide.modules.forEach((module) => {
    const card = document.createElement('article');
    card.className = 'hero-module-card';

    const title = document.createElement('h3');
    title.textContent = module.title;

    const text = document.createElement('p');
    text.textContent = module.description;

    card.append(title, text);
    modules.appendChild(card);
  });

  centered.append(overline, heading, description, modules);
  article.append(visual, centered);

  return article;
}

function createLayoutC(article, slide) {
  const intro = document.createElement('div');
  intro.className = 'hero-copy hero-copy--center';

  const overline = document.createElement('p');
  overline.className = 'overline';
  overline.textContent = 'ROADMAP OPERATIVO';

  const heading = document.createElement('h1');
  heading.textContent = slide.heading;

  const description = document.createElement('p');
  description.textContent = slide.description;

  const list = document.createElement('ol');
  list.className = 'hero-timeline-list';
  slide.roadmap.forEach((stage) => {
    const item = document.createElement('li');

    const phase = document.createElement('span');
    phase.className = 'hero-phase';
    phase.textContent = stage.phase;

    const title = document.createElement('strong');
    title.textContent = stage.title;

    const detail = document.createElement('p');
    detail.textContent = stage.detail;

    item.append(phase, title, detail);
    list.appendChild(item);
  });

  intro.append(overline, heading, description);

  const visual = createRobotVisual({
    tooltip: 'Estado: monitoreo activo',
    compact: true
  });

  const plan = document.createElement('aside');
  plan.className = 'hero-plan-card';

  const planTitle = document.createElement('h3');
  planTitle.textContent = slide.planTitle;

  const planDescription = document.createElement('p');
  planDescription.textContent = slide.planDescription;

  const planStatus = document.createElement('span');
  planStatus.className = 'hero-status-led';
  planStatus.textContent = slide.status;

  const planAction = createPrimaryButton(slide.primaryCta.label, slide.primaryCta.href);

  plan.append(planTitle, planDescription, planStatus, planAction);

  const bottom = document.createElement('div');
  bottom.className = 'hero-layout-c-bottom';
  bottom.append(list, plan);

  article.append(intro, visual, bottom);

  return article;
}

function createNavButton(direction, label, symbol, onClick) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `hero-nav hero-${direction}`;
  button.setAttribute('aria-label', label);
  button.innerHTML = `<span aria-hidden="true" class="hero-chevron">${symbol}</span>`;
  button.addEventListener('click', onClick);
  return button;
}

function createRobotVisual({ tooltip, large = false, compact = false, alt = 'Robot helper de brujulabs' }) {
  const visual = document.createElement('div');
  visual.className = `hero-visual${large ? ' is-large' : ''}${compact ? ' is-compact' : ''}`;

  const ring = document.createElement('div');
  ring.className = 'hero-hud-ring';
  ring.setAttribute('aria-hidden', 'true');

  const frame = document.createElement('div');
  frame.className = 'robot-frame';

  const image = document.createElement('img');
  image.className = 'robot-image';
  image.src = 'assets/img/robot.png';
  image.alt = alt;

  const tooltipElement = document.createElement('div');
  tooltipElement.className = 'robot-tooltip';
  tooltipElement.textContent = tooltip;

  frame.appendChild(image);
  visual.append(ring, frame, tooltipElement);
  return visual;
}

function normalizeIndex(index, length) {
  if (index < 0) return length - 1;
  if (index >= length) return 0;
  return index;
}

function createPrimaryButton(label, href) {
  const button = document.createElement('a');
  button.className = 'hero-btn-primary';
  button.href = href;
  button.innerHTML = `${label} <span class="chevron" aria-hidden="true">›</span>`;
  return button;
}

function createSecondaryButton(label, href) {
  const button = document.createElement('a');
  button.className = 'hero-btn-secondary';
  button.href = href;
  button.textContent = label;
  return button;
}
