import { initCursor } from './cursor.js';
import { navigateTo, renderView } from './router.js';

// Initialize custom cursor
initCursor();

// Initial render
renderView();

// Event delegation for internal links
document.body.addEventListener('click', e => {
    const link = e.target.closest('[data-link]');
    if (link) {
        e.preventDefault();
        const url = link.getAttribute('data-link');
        navigateTo(url);
    }
});

// Handle back/forward browser buttons
window.addEventListener('popstate', renderView);

// 360 Viewer Logic
let viewer = null;
document.addEventListener('open360', (e) => {
    const { imgUrl, embedUrl } = e.detail;
    const modal = document.getElementById('viewer-modal');
    const panoDiv = document.getElementById('panorama');
    modal.style.display = 'block';
    
    // Destroy existing viewer if any
    if (viewer) {
        viewer.destroy();
        viewer = null;
    }
    
    // Clear any existing iframe
    panoDiv.innerHTML = '';
    
    if (embedUrl) {
        // Use Iframe Embed (e.g. AirPano)
        // Create an overflow container to crop out AirPano's ads and top links
        const iframeContainer = document.createElement('div');
        iframeContainer.style.width = '100%';
        iframeContainer.style.height = '100%';
        iframeContainer.style.overflow = 'hidden';
        iframeContainer.style.position = 'relative';

        const iframe = document.createElement('iframe');
        iframe.src = embedUrl;
        iframe.style.position = 'absolute';
        iframe.style.top = '-50px'; // Crop top UI (approx 50px)
        iframe.style.left = '0';
        iframe.style.width = '100%';
        iframe.style.height = 'calc(100% + 180px)'; // Crop bottom ads (approx 130px)
        iframe.frameBorder = '0';
        iframe.setAttribute('allowfullscreen', 'true');
        
        iframeContainer.appendChild(iframe);
        panoDiv.appendChild(iframeContainer);
    } else if (imgUrl) {
        // Use local Pannellum viewer
        viewer = pannellum.viewer('panorama', {
            type: 'equirectangular',
            panorama: imgUrl,
            autoLoad: true,
            compass: false,
            showZoomCtrl: false
        });
    }
});

document.getElementById('close-viewer').addEventListener('click', () => {
    document.getElementById('viewer-modal').style.display = 'none';
    if (viewer) {
        viewer.destroy();
        viewer = null;
    }
    document.getElementById('panorama').innerHTML = ''; // Clear iframe to stop playback
});

// Notifications
function showNotification(msg) {
    const el = document.getElementById('notification-overlay');
    el.innerHTML = msg;
    el.style.display = 'block';
    
    if (window.gsap) {
        gsap.fromTo(el, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
        setTimeout(() => {
            gsap.to(el, { y: 50, opacity: 0, duration: 0.5, onComplete: () => { el.style.display = 'none'; }});
        }, 4000);
    } else {
        setTimeout(() => { el.style.display = 'none'; }, 4000);
    }
}

document.addEventListener('regionUnlocked', (e) => {
    const regionName = e.detail.newRegion.charAt(0).toUpperCase() + e.detail.newRegion.slice(1);
    showNotification(`New Region Unlocked on the Map: ${regionName}!`);
});

document.addEventListener('journeyComplete', () => {
    showNotification(`Journey Complete! The Final Quiz is now unlocked on the Map.`);
});

// Ambient Spooky Dust Particles
function spawnDustParticles() {
    const numParticles = 40;
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'dust-particle';
        
        // Randomize size, position, and animation duration
        const size = Math.random() * 5 + 2; // 2px to 7px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        
        // Randomize animation delay and duration
        const duration = Math.random() * 20 + 15; // 15s to 35s
        const delay = Math.random() * 25; // 0s to 25s
        
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `-${delay}s`; // Negative delay starts animation midway
        
        document.body.appendChild(particle);
    }
}

spawnDustParticles();

