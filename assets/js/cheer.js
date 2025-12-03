// Animaciones al hacer scroll
document.addEventListener("DOMContentLoaded", () => {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add("visible");
        });
    }, { threshold: 0.2 });

    document.querySelectorAll(".fade-in").forEach(el => obs.observe(el));
});


// Animaciones de aparición
document.addEventListener("DOMContentLoaded", () => {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add("visible");
        });
    }, { threshold: 0.2 });

    document.querySelectorAll(".fade-in").forEach(el => obs.observe(el));
});

/* ---------------------------------------- */
/* HERO STACK PRO – AUTO HOVER SECUENCIAL   */
/* ---------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".hero-card");
    const isMobile = window.innerWidth <= 768;
    let current = 0;

    /* ---------------------------------------- */
    /* DESKTOP MODE — AUTO HOVER                */
    /* ---------------------------------------- */

    function desktopAutoHover() {
        cards.forEach(card => card.classList.remove("hero-card-active"));
        cards[current].classList.add("hero-card-active");
        current = (current + 1) % cards.length;
    }

    /* ---------------------------------------- */
    /* MOBILE MODE — SLIDER AUTO ROTATION       */
    /* ---------------------------------------- */

    function mobileAutoSlide() {
        const container = document.querySelector(".hero-stack");
        const cardWidth = cards[0].offsetWidth + 16; // tarjeta + gap
        container.scrollTo({
            left: current * cardWidth,
            behavior: "smooth"
        });

        cards.forEach(card => card.classList.remove("hero-card-active"));
        cards[current].classList.add("hero-card-active");

        current = (current + 1) % cards.length;
    }

    /* ---------------------------------------- */
    /* INIT                                     */
    /* ---------------------------------------- */

    if (!isMobile) {
        // Desktop: efecto hover + auto-rotación
        desktopAutoHover();

        setInterval(desktopAutoHover, 3000);

        cards.forEach(card => {
            card.addEventListener("mouseenter", () => {
                cards.forEach(c => c.classList.remove("hero-card-active"));
                card.classList.add("hero-card-active");
            });
        });

    } else {
        // Mobile: slider táctil + auto slide
        mobileAutoSlide();

        setInterval(mobileAutoSlide, 3000);
    }

});
