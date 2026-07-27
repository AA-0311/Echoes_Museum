import { AppState } from '../state.js';

export function renderCertificate() {
    return `
        <div class="gallery-container" style="display: flex; flex-direction: column; align-items: center; min-height: 100vh;">
            <h1 class="glow-text" style="font-size: 3rem; margin-bottom: 1rem;">Congratulations!</h1>
            <p style="font-size: 1.2rem; color: var(--text-secondary); margin-bottom: 2rem;">You have successfully explored the Echoes of India.</p>
            
            <div id="certificate-wrapper" class="glass-panel" style="padding: 2rem; display: flex; flex-direction: column; align-items: center; gap: 1rem; width: 100%; max-width: 800px;">
                <canvas id="cert-canvas" width="800" height="600" style="width: 100%; max-width: 800px; border: 5px solid var(--theme-color); border-radius: 8px; box-shadow: 0 0 20px rgba(0,0,0,0.8);"></canvas>
                <a id="download-cert" class="interactive" style="display: inline-block; padding: 1rem 2rem; background: var(--theme-color); color: #000; text-decoration: none; font-weight: bold; font-size: 1.2rem; border-radius: 4px; margin-top: 1rem;">Download Certificate</a>
            </div>
        </div>
    `;
}

document.addEventListener('viewRendered', (e) => {
    if (e.detail.path === '/certificate') {
        const canvas = document.getElementById('cert-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            
            // Draw background (Radial Gradient)
            const gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, canvas.width/2);
            gradient.addColorStop(0, '#2a1b10');
            gradient.addColorStop(1, '#1a110a');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw border
            ctx.strokeStyle = '#d4af37'; // gold
            ctx.lineWidth = 10;
            ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
            
            ctx.strokeStyle = '#d4af37'; 
            ctx.lineWidth = 2;
            ctx.strokeRect(34, 34, canvas.width - 68, canvas.height - 68);

            // Draw Gold Seal/Stamp
            ctx.save();
            ctx.translate(canvas.width - 120, canvas.height - 60);
            ctx.beginPath();
            for (let i = 0; i < 30; i++) {
                const angle = (i * Math.PI) / 15;
                const r = i % 2 === 0 ? 45 : 40;
                ctx.lineTo(r * Math.cos(angle), r * Math.sin(angle));
            }
            ctx.closePath();
            ctx.fillStyle = '#d4af37';
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#fff';
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(0, 0, 30, 0, Math.PI * 2);
            ctx.fillStyle = '#b8860b';
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.stroke();
            
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 12px "Lora", serif';
            ctx.textAlign = 'center';
            ctx.fillText('ECHOES', 0, 4);
            ctx.restore();

            // Text
            ctx.fillStyle = '#d4af37';
            ctx.textAlign = 'center';
            ctx.font = 'bold 45px "Playfair Display", serif';
            ctx.fillText('CERTIFICATE OF EXPLORATION', canvas.width / 2, 130, canvas.width - 100);
            
            ctx.fillStyle = '#aaaaaa';
            ctx.font = '24px "Lora", serif';
            ctx.fillText('This certifies that', canvas.width / 2, 230);
            
            ctx.fillStyle = '#ffffff';
            ctx.font = 'italic bold 55px "Playfair Display", serif';
            const name = AppState.userName || 'Valiant Explorer';
            ctx.fillText(name, canvas.width / 2, 320, canvas.width - 100);
            
            ctx.fillStyle = '#aaaaaa';
            ctx.font = '24px "Lora", serif';
            ctx.fillText('has successfully completed the immersive journey through', canvas.width / 2, 400, canvas.width - 100);
            
            ctx.fillStyle = '#d4af37';
            ctx.font = 'bold 32px "Playfair Display", serif';
            ctx.fillText('Echoes: A Museum of India\'s Emotions', canvas.width / 2, 460, canvas.width - 100);
            
            const date = new Date().toLocaleDateString();
            ctx.fillStyle = '#888888';
            ctx.font = '18px "Lora", serif';
            ctx.fillText(`Date: ${date}`, canvas.width / 2, 530);

            // Prepare download link
            const downloadBtn = document.getElementById('download-cert');
            if (downloadBtn) {
                downloadBtn.href = canvas.toDataURL('image/png');
                downloadBtn.download = `Echoes_Certificate_${name.replace(/\s+/g, '_')}.png`;
            }
        }
        
        if (window.gsap) {
            gsap.fromTo('#certificate-wrapper', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1, ease: "power2.out" });
        }
    }
});
