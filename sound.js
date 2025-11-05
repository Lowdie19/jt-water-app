// ============================================
// Global Sound Module for JT Water Refilling
// ============================================

// Load sound file (WAV format)
const clickSound = new Audio("click.wav");

// Universal function for click sound
function playClick() {
  clickSound.currentTime = 0; // reset before replay
  clickSound.play().catch(() => {}); // avoid autoplay errors
}

// Optional: play sound when any button is clicked
document.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" || e.target.classList.contains("btn")) {
    playClick();
  }
});
