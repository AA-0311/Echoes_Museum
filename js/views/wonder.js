import { AppState } from '../state.js';

export function renderWonder() {
    return `
        <div class="gallery-container">
            <header class="gallery-header">
                <button class="back-btn interactive" data-link="/museum">&#8592; Back to Museum Map</button>
                <button class="next-btn interactive" data-link="/courage" style="position: absolute; right: 2rem; top: 2rem; background: transparent; color: var(--theme-color); border: 1px solid var(--theme-color); padding: 0.5rem 1rem; cursor: pointer; border-radius: 4px; font-family: 'Lora', serif; font-weight: bold;">Go to Next Exhibit &rarr;</button>
                <h1 class="glow-text">Wonder ✨</h1>
                <p>Architectural marvels and ancient ingenuity.</p>
            </header>

            <div class="artifacts-grid">
                <!-- Taj Mahal -->
                <div class="artifact-card glass-panel interactive float-anim" data-id="1" data-emotion="wonder">
                    <div class="artifact-image" style="background-image: url('https://images.unsplash.com/photo-1548013146-72479768bada?w=800');"></div>
                    <div class="artifact-info">
                        <h3>Taj Mahal</h3>
                        <p>A pristine monument of marble, standing the test of centuries.</p>
                        <a href="https://artsandculture.google.com/streetview/taj-mahal/UwGKcX7FFM5U4g?sv_lng=78.04211969399677&sv_lat=27.17461874830608&sv_h=345.1412804841943&sv_p=1.3515483192169313&sv_pid=7b7Y5hk26s5OZrTqn9Sprg&sv_z=0.06636991142086879" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>

                <!-- Ellora Caves -->
                <div class="artifact-card glass-panel interactive float-anim" data-id="2" data-emotion="wonder">
                    <div class="artifact-image" style="background-image: url('./assets/art5.jpg');"></div>
                    <div class="artifact-info">
                        <h3>Ancient Rock Cut Temples</h3>
                        <p>Monolithic structures carved directly from the basalt cliffs.</p>
                        <a href="https://artsandculture.google.com/streetview/ajanta-caves/pQH62KxODVTBaw?sv_lng=75.7023124959711&sv_lat=20.55253786938109&sv_h=245.05883505712816&sv_p=-8.556948947348133&sv_pid=xMyxS9pYpToAAAQWjI_u-Q&sv_z=0.008619072153202456" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>
                
                <!-- Stepwells -->
                <div class="artifact-card glass-panel interactive float-anim" data-id="3" data-emotion="wonder">
                    <div class="artifact-image" style="background-image: url('./assets/art4.jpg');"></div>
                    <div class="artifact-info">
                        <h3>The Great Stepwells</h3>
                        <p>Intricate, descending subterranean architecture of ancient India.</p>
                        <a href="https://artsandculture.google.com/streetview/rani-ki-vav-the-queen-s-stepwell/SwHoqaQRCBDCdw?sv_lng=72.10189969833931&sv_lat=23.858919157951956&sv_h=274.2305195506384&sv_p=-1.8940452090057107&sv_pid=mw-E3T4d8nEAAAQfCPVuUQ&sv_z=0.9999999999999997" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

document.addEventListener('viewRendered', (e) => {
    if (e.detail.path === '/wonder') {
        document.querySelectorAll('.artifact-card[data-emotion="wonder"]').forEach(card => {
            const id = card.getAttribute('data-id');
            card.addEventListener('mouseenter', () => {
                AppState.markArtifactViewed('wonder', id);
            });

            const btnExp = card.querySelector('.experience-btn');
            if (btnExp) {
                btnExp.addEventListener('click', (ev) => {
                    ev.stopPropagation();
                    AppState.mark360Viewed('wonder', id);
                });
            }
        });

        if (window.gsap) {
            gsap.fromTo('.gallery-header', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 });
            gsap.fromTo('.artifact-card', 
                { opacity: 0, scale: 0.9, rotationY: -15 }, 
                { opacity: 1, scale: 1, rotationY: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)" }
            );
        }
    }
});
