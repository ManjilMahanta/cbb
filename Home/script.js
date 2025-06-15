// 🌄 Photo Viewer Logic
let currentIndex = 1;

function changeImage(direction) {
  currentIndex += direction;
  if (currentIndex < 1) currentIndex = 10;
  if (currentIndex > 10) currentIndex = 1;
  document.getElementById("main-photo").src = `/Home/assets/photos/${currentIndex}.JPG`;
}

// 🔁 On DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  // ✅ Fade-in effect on page load
  document.body.classList.add("fade-in");

  // ✅ Hide loader after DOM ready
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => loader.style.display = "none", 300);
  }

  // ✅ Burger menu toggle
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");
  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // 🎬 Modal video preview open
  document.querySelectorAll(".preview-video").forEach((video) => {
    video.addEventListener("click", () => {
      const modal = document.getElementById("videoModal");
      const modalVideo = document.getElementById("modalVideo");
      modalVideo.src = video.getAttribute("src");
      modalVideo.muted = false;
      modalVideo.play();
      modal.style.display = "flex";
    });
  });

  // ❌ Close modal
  const closeModal = document.getElementById("closeModal");
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      const modal = document.getElementById("videoModal");
      const modalVideo = document.getElementById("modalVideo");
      modalVideo.pause();
      modalVideo.src = "";
      modal.style.display = "none";
    });
  }

  // 🔇 Mute toggle
  const muteToggle = document.getElementById("muteToggle");
  if (muteToggle) {
    muteToggle.addEventListener("click", () => {
      const modalVideo = document.getElementById("modalVideo");
      modalVideo.muted = !modalVideo.muted;
      muteToggle.textContent = modalVideo.muted ? "🔇" : "🔊";
    });
  }

  // ⌨️ Arrow keys for photo viewer
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      changeImage(1);
    } else if (e.key === "ArrowLeft") {
      changeImage(-1);
    }
  });

  // 🧠 Scroll-triggered slide-in effect
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // only once
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll(".scroll-fade").forEach((el) => observer.observe(el));
});

// 🔁 Fade-out on link navigation
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
