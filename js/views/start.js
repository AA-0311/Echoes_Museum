import { navigateTo } from '../router.js';
import { AppState } from '../state.js';

export function renderStart() {
    return `
        <div class="gallery-container" style="display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 100vh;">
            <h1 class="glow-text" style="font-size: 3.5rem; margin-bottom: 1rem; text-align: center;">Welcome to Echoes</h1>
            <p style="font-size: 1.2rem; margin-bottom: 3rem; text-align: center; max-width: 600px; color: var(--text-secondary);">
                Before you begin your journey across the emotions of India, please register your group.
            </p>

            <div class="start-form glass-panel" style="padding: 3rem; width: 100%; max-width: 500px; display: flex; flex-direction: column; gap: 1.5rem;">
                <div class="form-group">
                    <label for="userName" style="display: block; margin-bottom: 0.5rem; color: var(--text-primary); font-size: 1.1rem;">Lead Explorer Name</label>
                    <input type="text" id="userName" placeholder="Enter your name" class="interactive" style="width: 100%; padding: 1rem; background: rgba(0,0,0,0.5); border: 1px solid var(--panel-border); color: var(--text-primary); border-radius: 4px; font-family: 'Lora', serif; font-size: 1rem;" />
                </div>
                
                <div class="form-group">
                    <label for="memberCount" style="display: block; margin-bottom: 0.5rem; color: var(--text-primary); font-size: 1.1rem;">Number of Members</label>
                    <input type="number" id="memberCount" min="1" placeholder="e.g. 2" class="interactive" style="width: 100%; padding: 1rem; background: rgba(0,0,0,0.5); border: 1px solid var(--panel-border); color: var(--text-primary); border-radius: 4px; font-family: 'Lora', serif; font-size: 1rem;" />
                </div>

                <div class="fee-info" style="margin-top: 0.5rem; text-align: right; color: var(--text-secondary); font-size: 0.9rem; font-style: italic;">
                    (Entry fee for 1 person is Rs. 15)
                </div>
                <div class="fee-display" style="margin-top: 1rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 1.2rem; color: var(--text-secondary);">Total Entry Fee:</span>
                    <span id="totalFee" class="glow-text" style="font-size: 1.5rem; font-weight: bold; color: var(--theme-color);">Rs. 0</span>
                </div>
                
                <div id="form-error" style="color: #ff6b6b; font-weight: bold; font-size: 1.1rem; text-align: center; min-height: 1.5rem; display: none;"></div>

                <button id="startBtn" class="interactive" style="margin-top: 0.5rem; padding: 1rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-size: 1.1rem; font-weight: bold; font-family: 'Lora', serif; transition: transform 0.3s ease;">
                    Begin Journey
                </button>
            </div>
        </div>
    `;
}

document.addEventListener('viewRendered', (e) => {
    if (e.detail.path === '/start') {
        const memberCountInput = document.getElementById('memberCount');
        const userNameInput = document.getElementById('userName');
        const totalFeeDisplay = document.getElementById('totalFee');
        const startBtn = document.getElementById('startBtn');
        const formError = document.getElementById('form-error');

        const showError = (msg) => {
            if (formError) {
                formError.textContent = msg;
                formError.style.display = 'block';
                if (window.gsap) gsap.fromTo(formError, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.3 });
            }
        };

        if (memberCountInput && totalFeeDisplay) {
            memberCountInput.addEventListener('input', (e) => {
                const count = parseInt(e.target.value) || 0;
                const fee = count * 15;
                totalFeeDisplay.textContent = 'Rs. ' + fee;
                if (formError) formError.style.display = 'none';
            });
            userNameInput.addEventListener('input', () => {
                if (formError) formError.style.display = 'none';
            });
        }

        if (startBtn) {
            startBtn.addEventListener('click', () => {
                const name = userNameInput.value.trim();
                const count = parseInt(memberCountInput.value) || 0;

                if (!name) {
                    showError('Please enter your Lead Explorer Name.');
                    return;
                }
                if (count < 1) {
                    showError('Please enter at least 1 member.');
                    return;
                }

                // Save to state
                AppState.userName = name;
                AppState.memberCount = count;
                
                // Navigate directly to the modern architectural wing
                navigateTo('/museum');
            });
        }
        
        if (window.gsap) {
            gsap.fromTo('.start-form', 
                { opacity: 0, y: 30 }, 
                { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.2 }
            );
        }
    }
});
