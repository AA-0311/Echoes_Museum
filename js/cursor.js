export function initCursor() {
    const dot = document.getElementById('cursor-dot');
    const flashlight = document.getElementById('flashlight-cursor');
    
    // Hide default cursor since custom cursor initialized successfully
    document.body.style.cursor = 'none';
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = 'a, button, .interactive, .gallery-link, .map-hotspot.unlocked-region { cursor: none !important; }';
    document.head.appendChild(cursorStyle);

    // Track mouse position
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    // Smooth trailing for the flashlight
    let flashlightX = mouseX;
    let flashlightY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Instant update for the dot
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
    });

    // Animation loop for smooth flashlight trailing
    function animate() {
        // Ease the flashlight towards the mouse
        flashlightX += (mouseX - flashlightX) * 0.15;
        flashlightY += (mouseY - flashlightY) * 0.15;
        
        flashlight.style.left = `${flashlightX}px`;
        flashlight.style.top = `${flashlightY}px`;
        
        requestAnimationFrame(animate);
    }
    
    animate();

    // Setup hover interactions (using event delegation on document)
    document.addEventListener('mouseover', (e) => {
        // Check if hovering over an interactive element
        const interactive = e.target.closest('a, button, .interactive');
        if (interactive) {
            document.body.classList.add('is-hovering');
        }
    });

    document.addEventListener('mouseout', (e) => {
        const interactive = e.target.closest('a, button, .interactive');
        if (interactive) {
            document.body.classList.remove('is-hovering');
        }
    });
}
