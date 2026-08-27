const loader = document.querySelector("[data-loader]");
const cursor = document.querySelector("[data-cursor]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const typingTarget = document.querySelector("[data-typing]");
const canvas = document.querySelector("[data-particles]");
const ctx = canvas.getContext("2d");

const emailJsConfig = {
  publicKey: "",
  serviceId: "",
  templateId: "",
};

window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("is-hidden"), 450);
});

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((node) => revealObserver.observe(node));

const phrases = ["Animated portfolio experiences", "Responsive React interfaces", "3D-feeling microinteractions"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const phrase = phrases[phraseIndex];
  typingTarget.textContent = phrase.slice(0, charIndex);

  if (!isDeleting && charIndex < phrase.length) {
    charIndex += 1;
  } else if (isDeleting && charIndex > 0) {
    charIndex -= 1;
  } else if (!isDeleting) {
    isDeleting = true;
    setTimeout(typeLoop, 1200);
    return;
  } else {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }

  setTimeout(typeLoop, isDeleting ? 34 : 58);
}

typeLoop();

window.addEventListener("pointermove", (event) => {
  cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
});

document.querySelectorAll("a, button, input, textarea").forEach((node) => {
  node.addEventListener("pointerenter", () => cursor.classList.add("is-active"));
  node.addEventListener("pointerleave", () => cursor.classList.remove("is-active"));
});

document.querySelectorAll(".tilt").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateX(${y * -8}deg) rotateY(${x * 8}deg) translateY(-4px)`;
  });
  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

document.querySelectorAll(".magnetic").forEach((button) => {
  button.addEventListener("pointermove", (event) => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px)`;
  });
  button.addEventListener("pointerleave", () => {
    button.style.transform = "";
  });
});

const particles = [];
const particleCount = 54;

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * ratio);
  canvas.height = Math.floor(window.innerHeight * ratio);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function createParticles() {
  particles.length = 0;
  for (let i = 0; i < particleCount; i += 1) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      size: Math.random() * 2 + 0.8,
    });
  }
}

function renderParticles() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  particles.forEach((particle, index) => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
    if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(15, 118, 110, 0.42)";
    ctx.fill();

    for (let j = index + 1; j < particles.length; j += 1) {
      const next = particles[j];
      const distance = Math.hypot(particle.x - next.x, particle.y - next.y);
      if (distance < 118) {
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(next.x, next.y);
        ctx.strokeStyle = `rgba(196, 122, 27, ${0.13 - distance / 1000})`;
        ctx.stroke();
      }
    }
  });
  requestAnimationFrame(renderParticles);
}

resizeCanvas();
createParticles();
renderParticles();
window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});

const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");
  const hasEmailJs = Object.values(emailJsConfig).every(Boolean) && window.emailjs;

  if (hasEmailJs) {
    try {
      window.emailjs.init({ publicKey: emailJsConfig.publicKey });
      await window.emailjs.send(emailJsConfig.serviceId, emailJsConfig.templateId, {
        from_name: name,
        reply_to: email,
        message,
      });
      formStatus.textContent = "Message sent. I will reply soon.";
      contactForm.reset();
      return;
    } catch (error) {
      formStatus.textContent = "EmailJS could not send it. Opening an email draft instead.";
    }
  } else {
    formStatus.textContent = "Opening an email draft. Add EmailJS IDs in script.js to send directly.";
  }

  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`${message}\n\nReply to: ${email}`);
  window.location.href = `mailto:hello@example.com?subject=${subject}&body=${body}`;
});
