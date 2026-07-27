import { AppState } from '../state.js';

export function renderHope() {
    return `
        <div class="gallery-container">
            <header class="gallery-header">
                <button class="back-btn interactive" data-link="/museum">&#8592; Back to Museum Map</button>
                <button class="next-btn interactive" data-link="/quiz" style="position: absolute; right: 2rem; top: 2rem; background: transparent; color: var(--theme-color); border: 1px solid var(--theme-color); padding: 0.5rem 1rem; cursor: pointer; border-radius: 4px; font-family: 'Lora', serif; font-weight: bold;">Go to Next Exhibit &rarr;</button>
                <h1 class="glow-text">Hope 🌅</h1>
                <p>The dawn of a new era, carrying the legacy forward.</p>
            </header>

            <div class="artifacts-grid">
                <div class="artifact-card glass-panel interactive float-anim" data-id="1" data-emotion="hope">
                    <div class="artifact-image" style="background-image: url('./assets/art1.jpg');"></div>
                    <div class="artifact-info">
                        <h3>Varanasi Ghats at Dawn</h3>
                        <p>The eternal city waking up to the light, a symbol of spiritual rebirth.</p>
                        <a href="https://artsandculture.google.com/story/tAVBmspQUGinLw?hl=en" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>

                <div class="artifact-card glass-panel interactive float-anim" data-id="2" data-emotion="hope">
                    <div class="artifact-image" style="background-image: url('./assets/art2.jpg');"></div>
                    <div class="artifact-info">
                        <h3>The Bodhi Tree</h3>
                        <p>Where enlightenment was attained, spreading messages of peace and hope globally.</p>
                        <a href="https://youtu.be/FsWcaYZZ-zM?si=ckj_OK7MiCkIam1I" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>
                
                <div class="artifact-card glass-panel interactive float-anim" data-id="3" data-emotion="hope">
                    <div class="artifact-image" style="background-image: url('./assets/art3.jpg'); background-position: top center;"></div>
                    <div class="artifact-info">
                        <h3>The Constitution of India</h3>
                        <p>The foundational manuscript promising justice, liberty, and equality.</p>
                        <a href="https://artsandculture.google.com/story/yQWhQ126iAYA8A" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

document.addEventListener('viewRendered', (e) => {
    if (e.detail.path === '/hope') {
        document.querySelectorAll('.artifact-card[data-emotion="hope"]').forEach(card => {
            const id = card.getAttribute('data-id');
            card.addEventListener('mouseenter', () => {
                AppState.markArtifactViewed('hope', id);
            });

            const btnExp = card.querySelector('.experience-btn');
            if (btnExp) {
                btnExp.addEventListener('click', (ev) => {
                    ev.stopPropagation();
                    AppState.mark360Viewed('hope', id);
                });
            }
        });

        if (window.gsap) {
            gsap.fromTo('.gallery-header', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 });
            gsap.fromTo('.artifact-card', 
                { opacity: 0, scale: 0.9, y: -50 }, 
                { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
            );
        }
    }
});
