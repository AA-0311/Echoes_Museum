import { AppState } from '../state.js';

export function renderResilience() {
    return `
        <div class="gallery-container">
            <header class="gallery-header">
                <button class="back-btn interactive" data-link="/museum">&#8592; Back to Museum Map</button>
                <button class="next-btn interactive" data-link="/hope" style="position: absolute; right: 2rem; top: 2rem; background: transparent; color: var(--theme-color); border: 1px solid var(--theme-color); padding: 0.5rem 1rem; cursor: pointer; border-radius: 4px; font-family: 'Lora', serif; font-weight: bold;">Go to Next Exhibit &rarr;</button>
                <h1 class="glow-text">Resilience 🌱</h1>
                <p>Overcoming the darkest times to rise again.</p>
            </header>

            <div class="artifacts-grid">
                <div class="artifact-card glass-panel interactive float-anim" data-id="1" data-emotion="resilience">
                    <div class="artifact-image" style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Jallianwala_Bagh%2C_Amritsar_01.jpg/960px-Jallianwala_Bagh%2C_Amritsar_01.jpg');"></div>
                    <div class="artifact-info">
                        <h3>Jallianwala Bagh</h3>
                        <p>A somber memorial of the tragic massacre that fueled the freedom movement.</p>
                        <a href="https://youtu.be/9cEAUxjA0rk?si=vxFRanCHsf-b7T2h" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>

                <div class="artifact-card glass-panel interactive float-anim" data-id="2" data-emotion="resilience">
                    <div class="artifact-image" style="background-image: url('./assets/art15.jpg');"></div>
                    <div class="artifact-info">
                        <h3>Rebuilding After Earthquakes</h3>
                        <p>The remarkable survival and reconstruction of ancient temples across the subcontinent.</p>
                        <a href="https://youtube.com/shorts/-cdDE2IGock?si=_-Wp9lOXARFfn5wS" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>
                
                <div class="artifact-card glass-panel interactive float-anim" data-id="3" data-emotion="resilience">
                    <div class="artifact-image" style="background-image: url('./assets/art16.jpg');"></div>
                    <div class="artifact-info">
                        <h3>The Partition Archives</h3>
                        <p>Stories of profound loss, survival, and the enduring human spirit.</p>
                        <a href="https://youtu.be/u2cB-9uM90Y" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

document.addEventListener('viewRendered', (e) => {
    if (e.detail.path === '/resilience') {
        document.querySelectorAll('.artifact-card[data-emotion="resilience"]').forEach(card => {
            const id = card.getAttribute('data-id');
            card.addEventListener('mouseenter', () => {
                AppState.markArtifactViewed('resilience', id);
            });

            const btnExp = card.querySelector('.experience-btn');
            if (btnExp) {
                btnExp.addEventListener('click', (ev) => {
                    ev.stopPropagation();
                    AppState.mark360Viewed('resilience', id);
                });
            }
        });

        if (window.gsap) {
            gsap.fromTo('.gallery-header', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 });
            gsap.fromTo('.artifact-card', 
                { opacity: 0, scale: 0.9, x: -50 }, 
                { opacity: 1, scale: 1, x: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
            );
        }
    }
});
