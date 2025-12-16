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


// ============================================================
// GALERÍA DINÁMICA DESDE CARPETAS
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
    const tabsContainer = document.getElementById("gallery-tabs");
    const grid = document.getElementById("gallery-grid");
    const title = document.getElementById("gallery-title");
    const counter = document.getElementById("gallery-counter");
    const lightbox = document.getElementById("gallery-lightbox");
    const lightboxImg = document.getElementById("lightbox-image");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxClose = document.getElementById("lightbox-close");
    const sliderPrev = document.getElementById("gallery-prev");
    const sliderNext = document.getElementById("gallery-next");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");

    if (!tabsContainer || !grid) return;

    let galleries = [];
    let activeGallery = null;
    let currentIndex = 0;

    async function loadGalleries() {
        try {
            const response = await fetch("assets/img/gallery-index.json", { cache: "no-store" });
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data.galleries) && data.galleries.length) {
                    return data.galleries.map((g) => ({ ...g, images: g.images || [] }));
                }
            }
        } catch (err) {
            console.warn("No se pudo cargar el índice de galería, usando fallback", err);
        }
        return [];
    }

    function setActiveGallery(id) {
        activeGallery = id;
        currentIndex = 0;
        renderTabs();
        renderGrid();
    }

    function renderTabs() {
        tabsContainer.innerHTML = "";
        galleries.forEach((gallery) => {
            const tab = document.createElement("button");
            tab.type = "button";
            tab.className = `gallery-tab ${gallery.id === activeGallery ? "active" : ""}`;
            tab.dataset.gallery = gallery.id;
            tab.innerHTML = `
                <span class="pill">${gallery.images.length} fotos</span>
                <span>${gallery.name}</span>
            `;
            tab.addEventListener("click", () => setActiveGallery(gallery.id));
            tabsContainer.appendChild(tab);
        });
    }

    function scrollToCard(index) {
        const card = grid.children[index];
        if (!card) return;
        const target = card.offsetLeft - (grid.clientWidth - card.clientWidth) / 2;
        grid.scrollTo({ left: Math.max(target, 0), behavior: "smooth" });
    }

    function setActiveCard(index) {
        [...grid.children].forEach((card, idx) => {
            card.classList.toggle("active", idx === index);
        });
        scrollToCard(index);
    }

    function getActiveGallery() {
        return galleries.find((g) => g.id === activeGallery) || galleries[0];
    }

    function updateLightboxContent() {
        const gallery = getActiveGallery();
        if (!gallery || !gallery.images.length) return;
        const total = gallery.images.length;
        currentIndex = ((currentIndex % total) + total) % total;
        lightboxImg.src = gallery.images[currentIndex];
        lightboxCaption.textContent = `${gallery.name} · ${currentIndex + 1}`;
        setActiveCard(currentIndex);
    }

    function openLightbox(index) {
        if (!lightbox) return;
        currentIndex = index;
        updateLightboxContent();
        lightbox.classList.remove("hidden");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        lightbox?.classList.add("hidden");
        document.body.style.overflow = "";
    }

    function renderGrid() {
        const gallery = getActiveGallery();
        if (!gallery) return;

        title.textContent = gallery.name;
        counter.textContent = gallery.images.length;

        grid.innerHTML = "";

        if (!gallery.images.length) {
            const empty = document.createElement("div");
            empty.className = "gallery-empty";
            empty.innerHTML = `
                <p class="font-title text-xl">Aún no hay fotos publicadas.</p>
                <p class="text-sm">Agrega carpetas dentro de <code>assets/img/galeria/</code> con tus imágenes para que aparezcan aquí.</p>
            `;
            grid.appendChild(empty);
            return;
        }

        gallery.images.forEach((imgSrc, idx) => {
            const card = document.createElement("button");
            card.type = "button";
            card.className = "gallery-card";
            card.innerHTML = `
                <img src="${imgSrc}" alt="${gallery.name} ${idx + 1}">
                <div class="gallery-info">
                    <p>${gallery.name}</p>
                    <span class="pill pill-red">#${idx + 1}</span>
                </div>`;
            card.addEventListener("click", () => {
                currentIndex = idx;
                openLightbox(idx);
            });
            grid.appendChild(card);
        });

        setActiveCard(currentIndex);
    }

    lightboxClose?.addEventListener("click", closeLightbox);
    lightbox?.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !lightbox?.classList.contains("hidden")) {
            closeLightbox();
        }
        if (e.key === "ArrowRight" && !lightbox?.classList.contains("hidden")) {
            changeImage(1);
        }
        if (e.key === "ArrowLeft" && !lightbox?.classList.contains("hidden")) {
            changeImage(-1);
        }
    });

    function changeImage(step) {
        const gallery = getActiveGallery();
        if (!gallery?.images.length) return;
        currentIndex = (currentIndex + step + gallery.images.length) % gallery.images.length;
        updateLightboxContent();
    }

    sliderPrev?.addEventListener("click", () => {
        changeImage(-1);
        if (lightbox?.classList.contains("hidden")) {
            setActiveCard(currentIndex);
        }
    });

    sliderNext?.addEventListener("click", () => {
        changeImage(1);
        if (lightbox?.classList.contains("hidden")) {
            setActiveCard(currentIndex);
        }
    });

    lightboxPrev?.addEventListener("click", () => changeImage(-1));
    lightboxNext?.addEventListener("click", () => changeImage(1));

    loadGalleries().then((data) => {
        galleries = data;
        if (!galleries.length) {
            title.textContent = "Galería";
            counter.textContent = "0";
            grid.innerHTML = "";
            const empty = document.createElement("div");
            empty.className = "gallery-empty";
            empty.innerHTML = `
                <p class="font-title text-xl">Aún no hay fotos publicadas.</p>
                <p class="text-sm">Añade carpetas e imágenes en <code>assets/img/galeria/</code> para habilitar la galería.</p>
            `;
            grid.appendChild(empty);
            tabsContainer.innerHTML = "";
            const tabEmpty = document.createElement("div");
            tabEmpty.className = "gallery-empty-tab";
            tabEmpty.textContent = "Sin álbumes aún";
            tabsContainer.appendChild(tabEmpty);
            return;
        }

        activeGallery = galleries[0]?.id || null;
        renderTabs();
        renderGrid();
    });
});








