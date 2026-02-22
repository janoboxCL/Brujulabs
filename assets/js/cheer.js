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

// Flip cards: categorías (click / tap)
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("#categorias .fh-cat").forEach(card => {
        card.addEventListener("click", () => {
            card.classList.toggle("is-flipped");
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
       img: "assets/img/coach_javier.jpg",
        name: "Coach Javier",
        role: "Entrenador de Cheer • Técnica Competitiva",
        desc: `
Con una basta experiencia en la formación de equipos CHEERLEADING, Javier lidera procesos de desarrollo técnico y competitivo con foco en la ejecución limpia, la seguridad y el trabajo en equipo.<br><br>

<ul style="margin-left:0; padding-left:18px; list-style:none;">
    <li style="margin-bottom:6px;">• Campeón mundial TEAM CHILE 2017.</li>
    <li style="margin-bottom:6px;">• Ex alumno Colegio Alicante del Rosal.</li>
    <li style="margin-bottom:6px;">• Entrenador de Cheer enfocado en técnica de stunts, transiciones y performance competitiva.</li>
    <li style="margin-bottom:6px;">• Planificación progresiva para formación de bases, flyers y equipos School/All Star.</li>
</ul>
`,
        specialties: ["Cheerleading", "Técnica Competitiva", "Stunts", "Formación de Equipos"]
    },
    3: {
        img: "assets/img/coach_nicolas.jpg",
        name: "Coach Nicolas",
       role: "Entrenador de Gimnasia • Técnica y Fuerza",
    desc: `
Con una basta experiencia en la formación de equipos CHEERLEADING, Nicolás aplica fundamentos de gimnasia para potenciar fuerza, movilidad y control corporal en cada atleta.<br><br>

<ul style="margin-left:0; padding-left:18px; list-style:none;">
    <li style="margin-bottom:6px;">• Campeón mundial TEAM CHILE 2017.</li>
    <li style="margin-bottom:6px;">• Ex alumno Colegio Alicante del Rosa.</li>
    <li style="margin-bottom:6px;">• Entrenador de gimnasia orientado a técnica de suelo, flexibilidad activa y estabilidad.</li>
    <li style="margin-bottom:6px;">• Desarrollo de progresiones para tumbling, fuerza específica y prevención de lesiones.</li>
</ul>
`,
    specialties: ["Gimnasia", "Tumbling", "Flexibilidad", "Fuerza Funcional"]
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

    async function urlExists(url) {
        try {
            const response = await fetch(url, { method: "HEAD", cache: "no-store" });
            if (response.ok) return true;
        } catch (err) {
            // Algunos hosts estáticos no soportan HEAD
        }

        try {
            const response = await fetch(url, { method: "GET", cache: "no-store" });
            return response.ok;
        } catch (err) {
            return false;
        }
    }

    function parseLinksFromHtml(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        return [...doc.querySelectorAll("a[href]")]
            .map((a) => a.getAttribute("href") || "")
            .filter(Boolean);
    }

    async function discoverGalleriesFromDirectoryListing() {
        try {
            const rootResponse = await fetch("assets/img/galeria/", { cache: "no-store" });
            if (!rootResponse.ok || !rootResponse.headers.get("content-type")?.includes("text/html")) {
                return [];
            }

            const rootHtml = await rootResponse.text();
            const folderNames = parseLinksFromHtml(rootHtml)
                .filter((href) => href.endsWith("/"))
                .map((href) => href.replace(/\/$/, ""))
                .map((href) => href.split("/").pop())
                .filter((name) => name && name !== "." && name !== "..");

            const discovered = await Promise.all(folderNames.map(async (folderName) => {
                const folderUrl = `assets/img/galeria/${folderName}/`;
                const folderResponse = await fetch(folderUrl, { cache: "no-store" });
                if (!folderResponse.ok || !folderResponse.headers.get("content-type")?.includes("text/html")) {
                    return null;
                }

                const folderHtml = await folderResponse.text();
                const images = parseLinksFromHtml(folderHtml)
                    .filter((href) => /(\.png|\.jpe?g|\.webp|\.gif)$/i.test(href))
                    .map((href) => `${folderUrl}${href.split("/").pop()}`);

                return {
                    id: folderName,
                    name: folderName.replace(/_/g, " ").replace(/\b(\w)/g, (match) => match.toUpperCase()),
                    images,
                };
            }));

            return discovered.filter((gallery) => gallery?.images.length);
        } catch (err) {
            return [];
        }
    }

    async function loadGalleries() {
        try {
            const response = await fetch(`assets/img/gallery-index.json?v=${Date.now()}`, { cache: "no-store" });
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data.galleries) && data.galleries.length) {
                    const galleriesFromJson = data.galleries.map((g) => ({ ...g, images: g.images || [] }));
                    const validated = await Promise.all(galleriesFromJson.map(async (gallery) => {
                        const existingImages = await Promise.all(gallery.images.map(async (img) => {
                            const exists = await urlExists(img);
                            return exists ? img : null;
                        }));

                        return {
                            ...gallery,
                            images: existingImages.filter(Boolean),
                        };
                    }));

                    const nonEmpty = validated.filter((gallery) => gallery.images.length);
                    if (nonEmpty.length) return nonEmpty;
                }
            }
        } catch (err) {
            console.warn("No se pudo cargar el índice de galería, usando fallback", err);
        }

        return discoverGalleriesFromDirectoryListing();
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
    }

    function closeLightbox() {
        lightbox?.classList.add("hidden");
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

    let touchStartX = null;
    let touchStartY = null;
    const SWIPE_THRESHOLD = 40;

    function handleTouchStart(e) {
        if (!e.touches?.length) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }

    function handleTouchEnd(e) {
        if (touchStartX === null || !e.changedTouches?.length) return;
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = Math.abs(e.changedTouches[0].clientY - touchStartY);

        if (Math.abs(dx) > Math.max(SWIPE_THRESHOLD, dy * 1.2)) {
            changeImage(dx > 0 ? -1 : 1);
            if (lightbox?.classList.contains("hidden")) {
                setActiveCard(currentIndex);
            }
        }

        touchStartX = null;
        touchStartY = null;
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

    function enableSwipe(element) {
        if (!element) return;
        element.addEventListener("touchstart", handleTouchStart, { passive: true });
        element.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    enableSwipe(grid);
    enableSwipe(lightbox);
    enableSwipe(lightboxImg);

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
