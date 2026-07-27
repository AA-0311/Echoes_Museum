import { AppState } from '../state.js';

export function renderLove() {
    return `
        <div class="gallery-container">
            <header class="gallery-header">
                <button class="back-btn interactive" data-link="/museum">&#8592; Back to Museum Map</button>
                <button class="next-btn interactive" data-link="/resilience" style="position: absolute; right: 2rem; top: 2rem; background: transparent; color: var(--theme-color); border: 1px solid var(--theme-color); padding: 0.5rem 1rem; cursor: pointer; border-radius: 4px; font-family: 'Lora', serif; font-weight: bold;">Go to Next Exhibit &rarr;</button>
                <h1 class="glow-text">Love ❤️</h1>
                <p>Tales of romance woven into art and architecture.</p>
            </header>

            <div class="artifacts-grid">
                <div class="artifact-card glass-panel interactive float-anim" data-id="1" data-emotion="love">
                    <div class="artifact-image" style="background-image: url('./assets/art8.png');"></div>
                    <div class="artifact-info">
                        <h3>Mughal Miniature Paintings</h3>
                        <p>Intricate, centuries-old art depicting epic tales of romance and courtly love.</p>
                        <a href="https://artsandculture.google.com/story/hwUB2ZXP7c1MLg" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>

                <div class="artifact-card glass-panel interactive float-anim" data-id="2" data-emotion="love">
                    <div class="artifact-image" style="background-image: url('./assets/art9.jpg');"></div>
                    <div class="artifact-info">
                        <h3>Heer Ranjha Legends</h3>
                        <p>The tragic romance of Punjab, echoed through centuries of folk music.</p>
                        <a href="https://medium.com/@shariqbhai138/heer-ranjha-a-timeless-love-story-and-its-powerful-lessons-for-todays-world-7eb717fef424" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>
                
                <div class="artifact-card glass-panel interactive float-anim" data-id="3" data-emotion="love">
                    <div class="artifact-image" style="background-image: url('./assets/art10.png');"></div>
                    <div class="artifact-info">
                        <h3>The Poems of Meera Bai</h3>
                        <p>Immortal devotion and spiritual love etched in ancient manuscripts.</p>
                        <a href="https://www.poetryfoundation.org/poets/mirabai" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

document.addEventListener('viewRendered', (e) => {
    if (e.detail.path === '/love') {
        document.querySelectorAll('.artifact-card[data-emotion="love"]').forEach(card => {
            const id = card.getAttribute('data-id');
            card.addEventListener('mouseenter', () => {
                AppState.markArtifactViewed('love', id);
            });

            const btnExp = card.querySelector('.experience-btn');
            if (btnExp) {
                btnExp.addEventListener('click', (ev) => {
                    ev.stopPropagation();
                    AppState.mark360Viewed('love', id);
                });
            }
        });

        if (window.gsap) {
            gsap.fromTo('.gallery-header', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 });
            gsap.fromTo('.artifact-card', 
                { opacity: 0, scale: 0.9, rotationZ: 5 }, 
                { opacity: 1, scale: 1, rotationZ: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
            );
        }
    }
});
