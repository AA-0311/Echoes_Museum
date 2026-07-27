import { AppState } from '../state.js';

export function renderCourage() {
    return `
        <div class="gallery-container">
            <header class="gallery-header">
                <button class="back-btn interactive" data-link="/museum">&#8592; Back to Museum Map</button>
                <button class="next-btn interactive" data-link="/joy" style="position: absolute; right: 2rem; top: 2rem; background: transparent; color: var(--theme-color); border: 1px solid var(--theme-color); padding: 0.5rem 1rem; cursor: pointer; border-radius: 4px; font-family: 'Lora', serif; font-weight: bold;">Go to Next Exhibit &rarr;</button>
                <h1 class="glow-text">Courage 🛡</h1>
                <p>The unyielding spirit of warriors and legendary forts.</p>
            </header>

            <div class="artifacts-grid">
                <div class="artifact-card glass-panel interactive float-anim" data-id="1" data-emotion="courage">
                    <div class="artifact-image" style="background-image: url('./assets/art6.jpg');"></div>
                    <div class="artifact-info">
                        <h3>Rajputana Forts</h3>
                        <p>Impregnable bastions holding centuries of valor and siege history.</p>
                        <a href="https://youtu.be/eEFTIkq9VUA?si=Hi7laVoSTkGdOxKY" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>

                <div class="artifact-card glass-panel interactive float-anim" data-id="2" data-emotion="courage">
                    <div class="artifact-image" style="background-image: url('./assets/art7.jpg');"></div>
                    <div class="artifact-info">
                        <h3>The Maratha Empire</h3>
                        <p>Fierce cavalry and naval dominance under Chhatrapati Shivaji Maharaj.</p>
                        <a href="https://earth.google.com/web/search/raigad+fort/@18.2334802,73.44064497,868.85926138a,218.04171308d,35y,-0h,0t,0r/data=CmgaOhI0CiUweDNiZTgyODNlYjM4YjFjZTU6MHhmYzMxODI2YWQzNGE1YjcwKgtSYWlnYWQgRm9ydBgCIAEiJgokCePX_xCN6zNAEeLX_xCN6zPAGferlvcSUUlAIfWrlvcSUUnAQgIIAToDCgEwQgIIAEoNCP___________wEQAA" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>
                
                <div class="artifact-card glass-panel interactive float-anim" data-id="3" data-emotion="courage">
                    <div class="artifact-image" style="background-image: url('https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800');"></div>
                    <div class="artifact-info">
                        <h3>Freedom Struggle</h3>
                        <p>The relentless pursuit of independence by millions of brave souls.</p>
                        <a href="https://artsandculture.google.com/partner/india-photo-archive-foundation?hl=en" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

document.addEventListener('viewRendered', (e) => {
    if (e.detail.path === '/courage') {
        document.querySelectorAll('.artifact-card[data-emotion="courage"]').forEach(card => {
            const id = card.getAttribute('data-id');
            card.addEventListener('mouseenter', () => {
                AppState.markArtifactViewed('courage', id);
            });

            const btnExp = card.querySelector('.experience-btn');
            if (btnExp) {
                btnExp.addEventListener('click', (ev) => {
                    ev.stopPropagation();
                    AppState.mark360Viewed('courage', id);
                });
            }
        });

        if (window.gsap) {
            gsap.fromTo('.gallery-header', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 });
            gsap.fromTo('.artifact-card', 
                { opacity: 0, scale: 0.9, rotationX: 15 }, 
                { opacity: 1, scale: 1, rotationX: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
            );
        }
    }
});
