// Global photo index for the photo viewer
let currentIndex = 1;

function changeImage(direction) {
  currentIndex += direction;
  if (currentIndex < 1) currentIndex = 10;
  if (currentIndex > 10) currentIndex = 1;
  document.getElementById("main-photo").src = `/Home/assets/photos/${currentIndex}.JPG`;
}

document.addEventListener("DOMContentLoaded", () => {
  // ✅ Fade in body on page load
  document.body.classList.add("fade-in");

  // 🍔 Burger menu toggle
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");

  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // 🎬 Video modal open
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
  document.getElementById("closeModal").addEventListener("click", () => {
    const modal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");
    modalVideo.pause();
    modalVideo.src = "";
    modal.style.display = "none";
  });

  // 🔇 Toggle mute
  document.getElementById("muteToggle").addEventListener("click", () => {
    const modalVideo = document.getElementById("modalVideo");
    modalVideo.muted = !modalVideo.muted;
    document.getElementById("muteToggle").textContent = modalVideo.muted ? "🔇" : "🔊";
  });

  // ⌨️ Left/right arrow for photo viewer
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      changeImage(1);
    } else if (e.key === "ArrowLeft") {
      changeImage(-1);
    }
  });
});

// 🌐 Smooth fade-out when navigating pages
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
