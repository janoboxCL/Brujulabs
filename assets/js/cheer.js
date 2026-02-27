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
      menu.classList.toggle('open');
    });
  });
});
