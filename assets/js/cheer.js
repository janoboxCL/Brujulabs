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

        // Pausar en hover y mover la tarjeta al centro
        card.addEventListener("mouseenter", () => {
            stopAutoRoll();

            if (card.classList.contains("hero-pos-left")) {
                rotateOnceLeftToCenter();   // mover izquierda → centro
            }
            else if (card.classList.contains("hero-pos-right")) {
                rotateOnceRightToCenter();  // mover derecha → centro
            }
        });

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
        //desc: "Entrenador y coreógrafo con 24 años de experiencia, formador de atletas y entrenadores, juez IASF y líder de procesos competitivos de alto rendimiento.",
        desc: `
Entrenador y coreógrafo con 24 años de trayectoria en Cheerleading competitivo, con foco en técnica avanzada, formación integral de atletas y construcción de rutinas de alto rendimiento.<br><br>

<ul style="margin-left:0; padding-left:18px; list-style:none;">
    <li style="margin-bottom:6px;">• Campeón nacional School y All Star desde 2001.</li>
    <li style="margin-bottom:6px;">• Juez IASF (sello verde y rojo) con experiencia internacional.</li>
    <li style="margin-bottom:6px;">• Formador de atletas y entrenadores en procesos de alto rendimiento.</li>
    <li style="margin-bottom:6px;">• Coach de selecciones por más de 20 años.</li>
    <li style="margin-bottom:6px;">• Participación en mundiales USASF en Orlando: 2008, 2010, 2013, 2016, 2023.</li>
</ul>
`,

        specialties: ["Coreografía", "Técnica", "Acrobacia", "Liderazgo"]


    },
    2: {
       img: "assets/img/coach_jc.jpeg",
        name: "Coach JC",
        role: "Preparación Física • Técnica",
        desc: `
Masoterapeuta y entrenador especializado en desarrollo técnico y preparación física aplicada al Cheerleading. Su enfoque combina precisión, control corporal y progresiones seguras para atletas en formación y niveles competitivos.<br><br>

<ul style="margin-left:0; padding-left:18px; list-style:none;">
    <li style="margin-bottom:6px;">• Campeón nacional categoría All Star.</li>
    <li style="margin-bottom:6px;">• Entrenador de la selección del Colegio Alicante del Rosal.</li>
    <li style="margin-bottom:6px;">• Especialista en movilidad, prevención de lesiones y técnica individual.</li>
    <li style="margin-bottom:6px;">• Acompañamiento progresivo para atletas que buscan subir de nivel.</li>
</ul>
`,
        specialties: ["Técnica", "Preparación Física", "Movilidad", "Progresiones"]
    },
    3: {
        img: "assets/img/coach_jona.jpeg",
        name: "Coach Jona",
       role: "Preparación Física • Cheer Dance",
    desc: `
Profesor de Educación Física y Personal Trainer con amplia experiencia en deportes de rendimiento. Campeón nacional y panamericano, integrante de equipos de Cheer Dance y All Star. Su trabajo integra fuerza, técnica y ejecución competitiva.<br><br>

<ul style="margin-left:0; padding-left:18px; list-style:none;">
    <li style="margin-bottom:6px;">• Campeón nacional y panamericano en categorías de alto rendimiento.</li>
    <li style="margin-bottom:6px;">• Integrante de equipos de Cheer Dance a nivel competitivo.</li>
    <li style="margin-bottom:6px;">• Entrenador de equipos School y All Star.</li>
    <li style="margin-bottom:6px;">• Enfoque integral en técnica, coreografía y preparación física.</li>
</ul>
`,
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
        modalDesc.innerHTML  = c.desc;

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








