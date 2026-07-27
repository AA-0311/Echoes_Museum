import { navigateTo } from '../router.js';
import { AppState, EMOTIONS } from '../state.js';

export function renderEntrance() {
    const renderHotspot = (emotion, label, icon, top, left) => {
        const isUnlocked = AppState.isEmotionUnlocked(emotion);
        const lockIcon = isUnlocked ? '' : '🔒 ';
        const cssClass = isUnlocked ? 'interactive unlocked-region' : 'locked-region';
        
        return `
            <div class="map-hotspot ${cssClass}" style="position: absolute; top: ${top}%; left: ${left}%; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; gap: 0.5rem;" ${isUnlocked ? `data-link="/${emotion}"` : ''}>
                <div class="hotspot-pin" style="width: 20px; height: 20px; background: ${isUnlocked ? 'var(--theme-color)' : 'rgba(255,255,255,0.3)'}; border-radius: 50%; border: 2px solid #000; box-shadow: 0 0 10px ${isUnlocked ? 'var(--theme-glow)' : 'transparent'};"></div>
                <div class="hotspot-label" style="background: rgba(0,0,0,0.7); padding: 0.3rem 0.6rem; border-radius: 4px; font-size: 0.9rem; color: ${isUnlocked ? '#fff' : '#888'}; white-space: nowrap; pointer-events: none;">${lockIcon}${icon} ${label}</div>
            </div>
        `;
    };

    return `
        <div class="entrance-container" style="z-index: 10; position: relative;">
            <header style="margin-bottom: 2rem; text-align: center;">
                <h1 class="entrance-quote glow-text" style="font-size: 2.5rem; margin-bottom: 0.5rem;">
                    "Museums preserve objects.<br>
                    <strong>We preserve emotions.</strong>"
                </h1>
                <p style="color: var(--text-secondary); font-size: 1.2rem; margin-bottom: 1rem;">Welcome, ${AppState.userName || 'Explorer'}. Navigate the map to explore.</p>
                <button class="interactive" data-link="/museum" style="background: var(--theme-color); color: #000; padding: 10px 20px; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 1.1rem; box-shadow: 0 4px 15px var(--theme-glow);">Visit the Modern Architectural Wing</button>
            </header>
            
            <div class="interactive-map-container" style="position: relative; width: 90vw; max-width: 1200px; aspect-ratio: 4/3; background: url('assets/rustic_india_map.png') center/cover; border: 2px solid var(--panel-border); border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.8);">
                
                ${renderHotspot('wonder', 'Wonder', '✨', 30, 45)}
                ${renderHotspot('courage', 'Courage', '🛡', 45, 30)}
                ${renderHotspot('joy', 'Joy', '🎉', 55, 60)}
                ${renderHotspot('love', 'Love', '❤️', 75, 45)}
                ${renderHotspot('resilience', 'Resilience', '🌱', 40, 75)}
                ${renderHotspot('hope', 'Hope', '🌅', 85, 55)}

                <!-- Quiz hotspot, unlocked at the end -->
                ${AppState.isJourneyComplete() ? `
                    <div class="map-hotspot interactive unlocked-region quiz-hotspot" style="position: absolute; top: 90%; left: 85%; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; gap: 0.5rem;" data-link="/quiz">
                        <div class="hotspot-pin" style="width: 25px; height: 25px; background: gold; border-radius: 50%; border: 2px solid #000; box-shadow: 0 0 15px gold;"></div>
                        <div class="hotspot-label" style="background: rgba(0,0,0,0.9); padding: 0.4rem 0.8rem; border-radius: 4px; font-size: 1rem; color: gold; white-space: nowrap; font-weight: bold; pointer-events: none;">🏆 Final Quiz</div>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

document.addEventListener('viewRendered', (e) => {
    if (e.detail.path === '/') {
        if (window.gsap) {
            gsap.fromTo('.entrance-quote', 
                { opacity: 0, y: 30 }, 
                { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
            );
            
            gsap.fromTo('.interactive-map-container', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1, delay: 0.3 });
            
            gsap.fromTo('.map-hotspot', 
                { opacity: 0, y: -20 }, 
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "bounce.out", delay: 1 }
            );
        }
    }
});
