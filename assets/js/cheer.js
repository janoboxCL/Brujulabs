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
});
