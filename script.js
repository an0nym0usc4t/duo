function openTab(evt, tabName, bgNumber) {
  // Hide all tab content sections
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(tab => tab.classList.remove('active'));

  // Reset all tab buttons so only the active one enlarges
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => btn.classList.remove('active'));

  // Show selected tab & enlarge its button
  document.getElementById(tabName).classList.add('active');
  evt.currentTarget.classList.add('active');

  // Switch page background between Painting (1) and Swirl Pattern (2)
  document.body.className = 'bg-' + bgNumber;
}

function makeBouncingDraggable(selector) {
  const el = document.querySelector(selector);
  if (!el) return;

  // Starting position & bounce speed
  let x = 40;
  let y = 40;
  let vx = 2.2; // Horizontal speed
  let vy = 1.8; // Vertical speed

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;
  let lastMouseX = 0;
  let lastMouseY = 0;

  // Ensure proper positioning styles
  el.style.position = 'fixed';
  el.style.left = '0px';
  el.style.top = '0px';
  el.style.cursor = 'grab';
  el.style.userSelect = 'none';
  el.style.touchAction = 'none';
  el.style.zIndex = '9999';

  // Pointer down (Mouse & Touch)
  el.addEventListener('pointerdown', (e) => {
    isDragging = true;
    el.style.cursor = 'grabbing';
    el.setPointerCapture(e.pointerId);

    offsetX = e.clientX - x;
    offsetY = e.clientY - y;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  });

  // Pointer move
  el.addEventListener('pointermove', (e) => {
    if (!isDragging) return;

    x = e.clientX - offsetX;
    y = e.clientY - offsetY;

    // Calculate throw velocity based on how fast the user drags it
    vx = (e.clientX - lastMouseX) * 0.4;
    vy = (e.clientY - lastMouseY) * 0.4;

    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  });

  // Pointer up (Release & keep bouncing/gliding)
  el.addEventListener('pointerup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    el.style.cursor = 'grab';
    el.releasePointerCapture(e.pointerId);

    // Give it a gentle minimum speed if dropped completely still
    if (Math.abs(vx) < 0.5) vx = (Math.random() > 0.5 ? 1 : -1) * 1.8;
    if (Math.abs(vy) < 0.5) vy = (Math.random() > 0.5 ? 1 : -1) * 1.8;
  });

  // Animation loop
  function animate() {
    const maxX = window.innerWidth - el.offsetWidth;
    const maxY = window.innerHeight - el.offsetHeight;

    if (!isDragging) {
      x += vx;
      y += vy;

      // Gently slow down if thrown super fast
      if (Math.abs(vx) > 3) vx *= 0.98;
      if (Math.abs(vy) > 3) vy *= 0.98;
    }

    // Bounce off left/right edges
    if (x <= 0) {
      x = 0;
      vx = Math.abs(vx);
    } else if (x >= maxX) {
      x = maxX;
      vx = -Math.abs(vx);
    }

    // Bounce off top/bottom edges
    if (y <= 0) {
      y = 0;
      vy = Math.abs(vy);
    } else if (y >= maxY) {
      y = maxY;
      vy = -Math.abs(vy);
    }

    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

// Start bouncing once the page loads
window.addEventListener('DOMContentLoaded', () => {
  makeBouncingDraggable('#bouncing-sticker');
});

