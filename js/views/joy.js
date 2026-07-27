import { AppState } from '../state.js';

export function renderJoy() {
    return `
        <div class="gallery-container">
            <header class="gallery-header">
                <button class="back-btn interactive" data-link="/museum">&#8592; Back to Museum Map</button>
                <button class="next-btn interactive" data-link="/love" style="position: absolute; right: 2rem; top: 2rem; background: transparent; color: var(--theme-color); border: 1px solid var(--theme-color); padding: 0.5rem 1rem; cursor: pointer; border-radius: 4px; font-family: 'Lora', serif; font-weight: bold;">Go to Next Exhibit &rarr;</button>
                <h1 class="glow-text">Joy 🎉</h1>
                <p>The vibrant colors of festivals and timeless celebrations.</p>
            </header>

            <div class="artifacts-grid">
                <div class="artifact-card glass-panel interactive float-anim" data-id="1" data-emotion="joy">
                    <div class="artifact-image" style="background-image: url('./assets/art11.jpg');"></div>
                    <div class="artifact-info">
                        <h3>Colors of Holi</h3>
                        <p>A vintage depiction of the festival of colors, celebrating the triumph of good.</p>
                        <a href="https://youtu.be/FZ9ed-zDazk?si=-x7FJRDPjktmnMX4" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>

                <div class="artifact-card glass-panel interactive float-anim" data-id="2" data-emotion="joy">
                    <div class="artifact-image" style="background-image: url('./assets/art12.jpg');"></div>
                    <div class="artifact-info">
                        <h3>Diwali Illuminations</h3>
                        <p>Ancient oil lamps lighting up the dark, symbolizing hope and joy.</p>
                        <a href="https://youtu.be/jQQ8DwKjKJI?si=MetLEMnp5Z2-D-Ka" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>
                
                <div class="artifact-card glass-panel interactive float-anim" data-id="3" data-emotion="joy">
                    <div class="artifact-image" style="background-image: url('./assets/art13.jpg');"></div>
                    <div class="artifact-info">
                        <h3>Classical Dance Forms</h3>
                        <p>Bharatanatyam, Kathak, and Odissi—expressing profound joy through movement.</p>
                        <a href="https://youtu.be/w0gamtoWxnE?si=SD_9LGGqX5OD619H" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

document.addEventListener('viewRendered', (e) => {
    if (e.detail.path === '/joy') {
        document.querySelectorAll('.artifact-card[data-emotion="joy"]').forEach(card => {
            const id = card.getAttribute('data-id');
            card.addEventListener('mouseenter', () => {
                AppState.markArtifactViewed('joy', id);
            });

            const btnExp = card.querySelector('.experience-btn');
            if (btnExp) {
                btnExp.addEventListener('click', (ev) => {
                    ev.stopPropagation();
                    AppState.mark360Viewed('joy', id);
                });
            }
        });

        if (window.gsap) {
            gsap.fromTo('.gallery-header', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 });
            gsap.fromTo('.artifact-card', 
                { opacity: 0, scale: 0.9, y: 50 }, 
                { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
            );
        }
    }
});
