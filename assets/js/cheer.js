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

  const slides = [
    {
      key: 'lanzar',
      tabLabel: 'Lanzar',
      heading: 'Lanza tu presencia digital con claridad.',
      description: 'Sitio, identidad y configuración base en semanas, no meses.',
      bullets: ['Diseño modular', 'Entrega lista para publicar'],
      primaryCta: { label: 'Ver ejemplo', href: '#soluciones' },
      secondaryCta: { label: 'Conocer enfoque', href: '#servicios' },
      tooltip: 'Te guío paso a paso.'
    },
    {
      key: 'ordenar',
      tabLabel: 'Ordenar',
      heading: 'Ordena tu operación y automatiza lo repetible.',
      description: 'Procesos, formularios, integraciones y mejoras continuas.',
      bullets: ['Menos fricción', 'Más control'],
      primaryCta: { label: 'Agendar demo', href: '#contacto' },
      secondaryCta: { label: 'Ver servicios', href: '#servicios' },
      tooltip: 'Detecto cuellos de botella.'
    },
    {
      key: 'crecer',
      tabLabel: 'Crecer',
      heading: 'Crece con métricas y decisiones claras.',
      description: 'Seguimiento, optimización y próximos pasos accionables.',
      bullets: ['Paneles simples', 'Iteración constante'],
      primaryCta: { label: 'Empezar', href: '#contacto' },
      secondaryCta: { label: 'Ver propuesta', href: '#soluciones' },
      tooltip: 'Te muestro el rumbo.'
    }
  ];

  let activeIndex = 0;

  const panels = document.createElement('div');
  panels.className = 'hero-panels';

  const renderedSlides = slides.map((slide, index) => createHeroSlide(slide, index === activeIndex));
  renderedSlides.forEach((slide) => panels.appendChild(slide));

  const segmented = createSegmentedControl(slides, {
    initialIndex: activeIndex,
    onChange: (nextIndex) => {
      activeIndex = nextIndex;
      renderedSlides.forEach((slide, index) => {
        const active = index === activeIndex;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
      });
    }
  });

  root.className = 'hero-carousel';
  root.append(segmented, panels);
}

function createSegmentedControl(items, { initialIndex = 0, onChange }) {
  const scroll = document.createElement('div');
  scroll.className = 'segmented-control__scroll';

  const tablist = document.createElement('div');
  tablist.className = 'segmented-control';
  tablist.setAttribute('role', 'tablist');
  tablist.setAttribute('aria-label', 'Etapas del servicio brujulabs');

  let activeIndex = initialIndex;
  const buttons = items.map((item, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'segmented-pill';
    button.setAttribute('role', 'tab');
    button.id = `segment-tab-${item.key}`;
    button.setAttribute('aria-controls', `segment-panel-${item.key}`);
    const selected = index === activeIndex;
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
    button.textContent = item.tabLabel;

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
    });
  }

  scroll.appendChild(tablist);
  return scroll;
}

function createHeroSlide(slide, isActive) {
  const article = document.createElement('article');
  article.className = `hero-slide${isActive ? ' is-active' : ''}`;
  article.id = `segment-panel-${slide.key}`;
  article.setAttribute('role', 'tabpanel');
  article.setAttribute('aria-labelledby', `segment-tab-${slide.key}`);
  article.setAttribute('aria-hidden', String(!isActive));

  const copy = document.createElement('div');
  copy.className = 'hero-copy';

  const overline = document.createElement('p');
  overline.className = 'overline';
  overline.textContent = 'TU RUMBO DIGITAL';

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

  const visual = document.createElement('div');
  visual.className = 'hero-visual';

  const frame = document.createElement('div');
  frame.className = 'robot-frame';

  const image = document.createElement('img');
  image.className = 'robot-image';
  image.src = 'assets/img/robot.png';
  image.alt = 'Robot helper de brujulabs';

  const tooltip = document.createElement('div');
  tooltip.className = 'robot-tooltip';
  tooltip.textContent = slide.tooltip;

  frame.appendChild(image);
  visual.append(frame, tooltip);

  article.append(copy, visual);
  return article;
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
