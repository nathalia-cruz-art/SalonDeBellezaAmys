// ======================================================
// CARRUSEL PRINCIPAL / HERO
// ======================================================

const images = [
  "/imagenes/slide1.png",
  "/imagenes/slide2mejorado.png",
  "/imagenes/fotolocal.png"
];

const slide = document.querySelector("#heroSlide");
const dots = [...document.querySelectorAll("#heroDots button")];

let current = 0;

function showSlide(index) {
  if (!slide || images.length === 0) return;

  current = index;

  slide.style.backgroundImage = `url("${images[index]}")`;

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

// Botones del carrusel
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
  });
});

// Mostrar primera imagen
showSlide(0);

// Cambio automático cada 6 segundos
if (images.length > 1) {
  setInterval(() => {
    showSlide((current + 1) % images.length);
  }, 6000);
}


// ======================================================
// NAVBAR AL HACER SCROLL
// ======================================================

const navbar = document.querySelector("#navbar");

if (navbar) {
  window.addEventListener(
    "scroll",
    () => {
      navbar.classList.toggle("scrolled", window.scrollY > 20);
    },
    { passive: true }
  );
}


// ======================================================
// MENÚ RESPONSIVE
// ======================================================

const menuButton = document.querySelector("#menuButton");
const navLinks = document.querySelector("#navLinks");

if (menuButton && navLinks) {

  const menuSpans = menuButton.querySelectorAll("span");

  menuButton.addEventListener("click", () => {

    const open = navLinks.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      String(open)
    );

    menuButton.setAttribute(
      "aria-label",
      open ? "Cerrar menú" : "Abrir menú"
    );

    if (menuSpans.length >= 3) {

      menuSpans[0].style.transform = open
        ? "translateY(6.5px) rotate(45deg)"
        : "";

      menuSpans[1].style.opacity = open
        ? "0"
        : "1";

      menuSpans[2].style.transform = open
        ? "translateY(-6.5px) rotate(-45deg)"
        : "";
    }
  });


  // Cerrar menú al seleccionar una opción
  navLinks.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("open");

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

      menuButton.setAttribute(
        "aria-label",
        "Abrir menú"
      );

      if (menuSpans.length >= 3) {

        menuSpans[0].style.transform = "";
        menuSpans[1].style.opacity = "1";
        menuSpans[2].style.transform = "";
      }
    });

  });
}


// ======================================================
// ANIMACIONES AL APARECER EN PANTALLA
// ======================================================

const observer = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);
      }

    });

  },
  {
    threshold: 0.12
  }
);


document
  .querySelectorAll(
    ".servicios-card, .nosotros-copy, .nosotros-imagenes, .galeria-item, .testimonial-grid article, .highlight"
  )
  .forEach((element) => {

    element.classList.add("reveal");

    observer.observe(element);
  });


// ======================================================
// FORMULARIO DE CITAS
// ======================================================

// IMPORTANTE:
// En tu index.html el formulario se llama:
// id="contactenosForm"

const form = document.querySelector("#contactenosForm");
const message = document.querySelector("#formMessage");

if (form && message) {

  form.addEventListener("submit", (event) => {

    event.preventDefault();

    message.textContent =
      "¡Gracias! Recibimos tu solicitud. Te contactaremos muy pronto.";

    form.reset();

  });
}


// ======================================================
// FECHA MÍNIMA PARA RESERVAR
// ======================================================

const dateInput = document.querySelector(
  'input[type="date"]'
);

if (dateInput) {

  const today = new Date();

  const year = today.getFullYear();

  const month = String(
    today.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    today.getDate()
  ).padStart(2, "0");

  const formattedDate =
    `${year}-${month}-${day}`;

  dateInput.min = formattedDate;
}


// ======================================================
// DESPLAZAMIENTO SUAVE DEL MENÚ
// ======================================================

document
  .querySelectorAll('a[href^="#"]')
  .forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId =
        link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#"
      ) {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (target) {

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    });

  });