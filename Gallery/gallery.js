const galleryDisplay = document.getElementById("galleryDisplay");

// Define file lists manually (since JS can't auto-read folders)
const galleryFiles = {
  wedding: ["1.jpg", "2.png", "3.mp4"],
  cinematic: ["1.mp4", "2.jpg"],
  traditional: ["1.jpg", "2.png", "3.mp4"]
};

function loadGallery() {
  const category = document.getElementById("categorySelector").value;
  const files = galleryFiles[category];
  galleryDisplay.innerHTML = "";

  files.forEach(file => {
    const ext = file.split('.').pop().toLowerCase();
    const path = `photos/${category}/${file}`;

    if (["jpg", "jpeg", "png", "webp"].includes(ext)) {
      const img = document.createElement("img");
      img.src = path;
      img.alt = category;
      galleryDisplay.appendChild(img);
    } else if (["mp4", "webm"].includes(ext)) {
      const video = document.createElement("video");
      video.src = path;
      video.controls = true;
      video.muted = true;
      video.playsInline = true;
      galleryDisplay.appendChild(video);
    }
  });
}

// Load default gallery
document.addEventListener("DOMContentLoaded", () => {
  loadGallery();
});
