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

    function rotateCarousel() {

        const center = document.querySelector(".hero-pos-center");
        const left = document.querySelector(".hero-pos-left");
        const right = document.querySelector(".hero-pos-right");

        // Rotación circular de clases
        center.classList.remove("hero-pos-center");
        center.classList.add("hero-pos-right");

        right.classList.remove("hero-pos-right");
        right.classList.add("hero-pos-left");

        left.classList.remove("hero-pos-left");
        left.classList.add("hero-pos-center");
    }

    // Iniciar carrusel
    setInterval(rotateCarousel, 3000);
});


document.addEventListener("DOMContentLoaded", () => {

    const container = document.querySelector(".hero-stack-carousel");
    const cards = document.querySelectorAll(".hero-card");

    if (window.innerWidth <= 768) {

        // Crear dots
        const dotContainer = document.createElement("div");
        dotContainer.classList.add("hero-mobile-dots");

        cards.forEach((c, i) => {
            const dot = document.createElement("div");
            dot.classList.add("hero-dot");
            if (i === 0) dot.classList.add("hero-dot-active");
            dotContainer.appendChild(dot);

            dot.addEventListener("click", () => {
                container.scrollTo({
                    left: c.offsetLeft - 20,
                    behavior: "smooth"
                });
            });
        });

        container.after(dotContainer);

        // Activar dots según scroll
        container.addEventListener("scroll", () => {
            const index = Math.round(container.scrollLeft / 260);
            const dots = document.querySelectorAll(".hero-dot");
            dots.forEach(d => d.classList.remove("hero-dot-active"));
            if (dots[index]) dots[index].classList.add("hero-dot-active");
        });
    }

});

