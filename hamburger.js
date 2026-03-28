// hamburger.js

// Grab the hamburger button, sidebar, and overlay
const hamburgerBtn = document.getElementById("hamburgerBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

// Toggle sidebar on mobile
hamburgerBtn.addEventListener("click", () => {
  sidebar.classList.toggle("translate-x-0"); // slide in/out
  overlay.classList.toggle("hidden");       // show/hide overlay

  // Optional: animate hamburger to X
  hamburgerBtn.classList.toggle("open");
});

// Close sidebar when clicking outside (overlay)
overlay.addEventListener("click", () => {
  sidebar.classList.remove("translate-x-0");
  overlay.classList.add("hidden");
  hamburgerBtn.classList.remove("open");
});