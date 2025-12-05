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

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".hero-card");

    let interval = null;
    let isPaused = false;

    function rotateOnceLeftToCenter() {

        const center = document.querySelector(".hero-pos-center");
        const left   = document.querySelector(".hero-pos-left");
        const right  = document.querySelector(".hero-pos-right");

        // Reemplazo en orden correcto
        center.classList.replace("hero-pos-center", "hero-pos-right");
        left.classList.replace("hero-pos-left", "hero-pos-center");
        right.classList.replace("hero-pos-right", "hero-pos-left");
    }

    function rotateOnceRightToCenter() {

        const center = document.querySelector(".hero-pos-center");
        const left   = document.querySelector(".hero-pos-left");
        const right  = document.querySelector(".hero-pos-right");

        center.classList.replace("hero-pos-center", "hero-pos-left");
        right.classList.replace("hero-pos-right", "hero-pos-center");
        left.classList.replace("hero-pos-left", "hero-pos-right");
    }

    function autoRoll() {

        if (isPaused) return;

        const center = document.querySelector(".hero-pos-center");
        const left   = document.querySelector(".hero-pos-left");
        const right  = document.querySelector(".hero-pos-right");

        // orden de rotación normal
        center.classList.replace("hero-pos-center", "hero-pos-right");
        right.classList.replace("hero-pos-right", "hero-pos-left");
        left.classList.replace("hero-pos-left", "hero-pos-center");
    }

    function startAutoRoll() {
        interval = setInterval(autoRoll, 4500);
        isPaused = false;
    }

    function stopAutoRoll() {
        clearInterval(interval);
        isPaused = true;
    }

    startAutoRoll();


    /* ------------------------------------------------------ */
    /*  PAUSAR EN HOVER Y CLICK                               */
    /* ------------------------------------------------------ */

    cards.forEach(card => {

        // Pausar en hover
        card.addEventListener("mouseenter", stopAutoRoll);

        // Reanudar al salir
        card.addEventListener("mouseleave", () => {
            if (isPaused) startAutoRoll();
        });

        // Manejo del click sin superposición
        card.addEventListener("click", () => {

            stopAutoRoll(); // siempre pausa

            if (card.classList.contains("hero-pos-left")) {
                rotateOnceLeftToCenter();   // mover izquierda → centro
            }
            else if (card.classList.contains("hero-pos-right")) {
                rotateOnceRightToCenter();  // mover derecha → centro
            }

        });

    });

});



const coachData = {
    1: {
        img: "assets/coach1.jpg",
        name: "Coach Nombre 1",
        role: "Tumbling • Técnica",
        desc: "Trayectoria destacada con enfoque en técnica, acrobacia y progresiones seguras.",
        specialties: ["Tumbling", "Acrobacia", "Flexibilidad", "Progresiones"]
    },
    2: {
        img: "assets/coach2.jpg",
        name: "Coach Nombre 2",
        role: "Stunts • Liderazgo",
        desc: "Amplia experiencia en stunts, pirámides y disciplina competitiva.",
        specialties: ["Stunts", "Piramides", "Transiciones", "Liderazgo"]
    },
    3: {
        img: "assets/coach3.jpg",
        name: "Coach Nombre 3",
        role: "Jumps • Coreografía",
        desc: "Especialista en saltos, técnica y armado de rutinas de alto impacto visual.",
        specialties: ["Jumps", "Coreografía", "Marcación", "Ritmo"]
    }
};

const coachCards = document.querySelectorAll("[data-coach]");
const expanded = document.getElementById("coach-expanded");
const closeBtn = document.getElementById("coach-close");

coachCards.forEach(card => {
    card.addEventListener("click", () => {
        const id = card.getAttribute("data-coach");
        const data = coachData[id];

        expanded.classList.remove("hidden");
        expanded.scrollIntoView({ behavior: "smooth" });

        document.getElementById("expanded-img").src = data.img;
        document.getElementById("expanded-name").textContent = data.name;
        document.getElementById("expanded-role").textContent = data.role;
        document.getElementById("expanded-desc").textContent = data.desc;

        const specs = document.getElementById("expanded-specialties");
        specs.innerHTML = "";
        data.specialties.forEach(s => {
            const el = document.createElement("div");
            el.textContent = s;
            specs.appendChild(el);
        });
    });
});

closeBtn.addEventListener("click", () => {
    expanded.classList.add("hidden");
});
