// ============================================
// Global Sound Module for JT Water Refilling
// ============================================

// Load sound files
const clickSound = new Audio("click.wav");
const successSound = new Audio("success.wav");

// ---------------------------
// Click Sound
// ---------------------------
function playClick() {
  clickSound.currentTime = 0; // reset before replay
  clickSound.play().catch(() => {}); // avoid autoplay errors
}

// ---------------------------
// Success Sound
// ---------------------------
function playSuccess() {
  successSound.currentTime = 0;
  successSound.play().catch(() => {});
}

// ---------------------------
// Global Button Click Sound
// ---------------------------
document.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" || e.target.classList.contains("btn")) {
    playClick();
  }
});

// ---------------------------
// Auto-play success sound when modal appears
// ---------------------------
// Detect any modal with ID containing "Modal"
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1 && node.id && node.id.toLowerCase().includes("modal")) {
        playSuccess();
      }
    });
  }
});

// Start observing the entire document for new modals
observer.observe(document.body, { childList: true });
