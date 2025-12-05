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
        img: "assets/img/coach_benja.jpeg",
        name: "Coach Ben",       
        role: "Coreografía • Técnica",
        desc: "Entrenador y coreógrafo con 24 años de experiencia, formador de atletas y entrenadores, juez IASF y líder de procesos competitivos de alto rendimiento.",
        specialties: ["Coreografía", "Técnica", "Acrobacia", "Liderazgo"]


    },
    2: {
       img: "assets/img/coach_jc.jpeg",
        name: "Coach JC",
        role: "Preparación Física • Técnica",
        desc: "Masoterapeuta y entrenador con foco en técnica individual, preparación física y desarrollo progresivo de atletas competitivos.",
        specialties: ["Técnica", "Preparación Física", "Movilidad", "Progresiones"]
    },
    3: {
        img: "assets/img/coach_jona.jpeg",
        name: "Coach Jona",
       role: "Preparación Física • Cheer Dance",
    desc: "Entrenador y profesor de Educación Física, campeón nacional y panamericano, con enfoque en técnica, preparación física y ejecución coreográfica.",
    specialties: ["Técnica", "Cheer Dance", "Preparación Física", "Disciplina Competitiva"]
}
    
};

// Elementos del modal
const modal = document.getElementById("coach-modal");
const modalImg = document.getElementById("coach-modal-img");
const modalName = document.getElementById("coach-modal-name");
const modalRole = document.getElementById("coach-modal-role");
const modalDesc = document.getElementById("coach-modal-desc");
const modalSpecs = document.getElementById("coach-modal-specialties");
const btnClose = document.getElementById("coach-modal-close");

// Abrir modal desde una tarjeta
document.querySelectorAll("[data-coach]").forEach(card => {
    card.addEventListener("click", () => {
        const id = card.dataset.coach;
        const c = coachData[id];

        modalImg.src = c.img;
        modalName.textContent = c.name;
        modalRole.textContent = c.role;
        modalDesc.textContent = c.desc;

        modalSpecs.innerHTML = "";
        c.specialties.forEach(s => {
            const tag = document.createElement("div");
            tag.textContent = s;
            modalSpecs.appendChild(tag);
        });

        modal.classList.remove("hidden");
    });
});

// Cerrar modal botón
btnClose.addEventListener("click", () => {
    modal.classList.add("hidden");
});

// Cerrar modal al hacer click fuera
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.add("hidden");
    }
});




