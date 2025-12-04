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
        name: "Coach Nombre 1",
        role: "Tumbling • Técnica",
        description: "Trayectoria destacada con enfoque en técnica, acrobacia y progresiones seguras.",
        specialties: ["Tumbling", "Acrobacia", "Flexibilidad", "Progresiones"]
    },
    2: {
        name: "Coach Nombre 2",
        role: "Stunts • Liderazgo",
        description: "Amplia experiencia en stunts, pirámides y disciplina competitiva.",
        specialties: ["Stunts", "Piramides", "Transiciones", "Liderazgo"]
    },
    3: {
        name: "Coach Nombre 3",
        role: "Jumps • Coreografía",
        description: "Especialista en saltos, técnica y armado de rutinas de alto impacto visual.",
        specialties: ["Jumps", "Coreografía", "Marcación", "Ritmo"]
    }
};

const cards = document.querySelectorAll("[data-coach]");
const panel = document.getElementById("coach-panel");
const closeBtn = document.getElementById("coach-close");

cards.forEach(card => {
    card.addEventListener("click", () => {
        const id = card.getAttribute("data-coach");
        const data = coachData[id];

        document.getElementById("panel-name").textContent = data.name;
        document.getElementById("panel-role").textContent = data.role;
        document.getElementById("panel-description").textContent = data.description;

        const list = document.getElementById("panel-specialties");
        list.innerHTML = "";
        data.specialties.forEach(s => {
            const li = document.createElement("li");
            li.textContent = s;
            list.appendChild(li);
        });

        panel.classList.remove("hidden");
        panel.scrollIntoView({ behavior: "smooth" });
    });
});

closeBtn.addEventListener("click", () => {
    panel.classList.add("hidden");
});





