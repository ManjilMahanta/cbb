document.addEventListener("DOMContentLoaded", () => {
  // 🔃 Hide loader after DOM content is ready
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => loader.style.display = "none", 300);
  }

  // ✅ Fade in body content
  document.body.classList.add("fade-in");

  // 🌀 Scroll-triggered fade/slide-in
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // only trigger once
      }
    });
  }, {
    threshold: 0.1
  });

  // Observe all elements with .scroll-fade
  document.querySelectorAll(".scroll-fade").forEach((el) => {
    observer.observe(el);
  });

  // 🍔 Burger menu (if navbar included on this page)
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");

  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }
});

// 🌐 Smooth fade-out on page navigation
document.querySelectorAll('a[href]').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (
      href &&
      !href.startsWith('#') &&
      !href.startsWith('http') &&
      !this.hasAttribute('target')
    ) {
      e.preventDefault();
      document.body.classList.remove('fade-in');
      document.body.style.opacity = 0;
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    }
  });
});
function toggleServiceList() {
  const options = document.getElementById("service-options");
  options.style.display = options.style.display === "block" ? "none" : "block";
}

function sendWhatsAppMessage(event) {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const selectedServices = Array.from(document.querySelectorAll('input[name="services"]:checked'))
    .map(cb => cb.value)
    .join(", ");

  if (!name || !phone || selectedServices.length === 0) {
    alert("Please fill all fields and select at least one service.");
    return;
  }

  const message = `Hello! I'm ${name}, my phone number is ${phone}. I'm interested in the following services: ${selectedServices}`;
  const url = `https://wa.me/123456789?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}

