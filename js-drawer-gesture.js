// js-drawer-gesture.js

(() => {
  const drawer = document.getElementById('drawer');
  const overlay = document.getElementById('overlay');

  let startX = 0;
  let currentX = 0;
  let touchingDrawer = false;

  // Only trigger on mobile/touch devices
  const threshold = 50; // swipe threshold in px

  function onTouchStart(e) {
    if (e.touches.length !== 1) return;
    startX = e.touches[0].clientX;
    touchingDrawer = drawer.classList.contains('open') || startX < 30; // swipe from left edge or open drawer
  }

  function onTouchMove(e) {
    if (!touchingDrawer) return;
    currentX = e.touches[0].clientX;
    const translateX = Math.min(0, -260 + (currentX - startX));
    if (!drawer.classList.contains('open')) {
      drawer.style.left = translateX + 'px';
    }
    e.preventDefault(); // prevent horizontal scroll
  }

  function onTouchEnd(e) {
    if (!touchingDrawer) return;
    const deltaX = currentX - startX;

    if (!drawer.classList.contains('open') && deltaX > threshold) {
      drawer.classList.add('open');
      overlay.classList.add('show');
      drawer.style.left = ''; // reset inline style
    } else if (drawer.classList.contains('open') && deltaX < -threshold) {
      drawer.classList.remove('open');
      overlay.classList.remove('show');
    } else {
      drawer.style.left = ''; // reset position
    }

    touchingDrawer = false;
    startX = 0;
    currentX = 0;
  }

  // Attach touch events
  document.addEventListener('touchstart', onTouchStart);
  document.addEventListener('touchmove', onTouchMove, { passive: false });
  document.addEventListener('touchend', onTouchEnd);
})();
