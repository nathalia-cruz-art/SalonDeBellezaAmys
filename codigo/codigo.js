const images = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dCefxkU2JqYK053Ke7l5mACckBbUgN.png",
  "/imagenes/slide1.png",
  "/imagenes/slide2mejorado.png"
];

const slide = document.querySelector("#heroSlide");
const dots = [...document.querySelectorAll("#heroDots button")];
let current = 0;

function showSlide(index) {
  current = index;
  slide.style.backgroundImage = `url("${images[index]}")`;
  dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => showSlide(index));
});

showSlide(0);
setInterval(() => showSlide((current + 1) % images.length), 6000);

const navbar = document.querySelector("#navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });

const menuButton = document.querySelector("#menuButton");
const navLinks = document.querySelector("#navLinks");

menuButton.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  menuButton.querySelectorAll("span")[0].style.transform = open ? "translateY(6.5px) rotate(45deg)" : "";
  menuButton.querySelectorAll("span")[1].style.opacity = open ? "0" : "1";
  menuButton.querySelectorAll("span")[2].style.transform = open ? "translateY(-6.5px) rotate(-45deg)" : "";
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.querySelectorAll("span")[0].style.transform = "";
    menuButton.querySelectorAll("span")[1].style.opacity = "1";
    menuButton.querySelectorAll("span")[2].style.transform = "";
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".service-card, .about-copy, .about-visual, .gallery-item, .testimonial-grid article, .highlight").forEach(el => {
  el.classList.add("reveal");
  observer.observe(el);
});

const form = document.querySelector("#bookingForm");
const message = document.querySelector("#formMessage");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  message.textContent = "¡Gracias! Recibimos tu solicitud. Te contactaremos muy pronto.";
  form.reset();
});

const dateInput = document.querySelector('input[type="date"]');
if (dateInput) {
  const today = new Date().toISOString().split("T")[0];
  dateInput.min = today;
}
