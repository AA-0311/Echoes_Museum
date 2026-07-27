import { navigateTo } from '../router.js';
import { AppState } from '../state.js';

const questions = [
    {
        q: "Which monument is a pristine symbol of Wonder built from marble?",
        options: ["Ellora Caves", "Taj Mahal", "Stepwells"],
        ans: 1
    },
    {
        q: "The Maratha Empire represents which emotion in our journey?",
        options: ["Joy", "Love", "Courage"],
        ans: 2
    },
    {
        q: "Which festival celebrates Joy with vibrant colors?",
        options: ["Holi", "Diwali", "Navratri"],
        ans: 0
    },
    {
        q: "The Jallianwala Bagh memorial is a testament to what?",
        options: ["Resilience", "Hope", "Love"],
        ans: 0
    }
];

export function renderQuiz() {
    let html = `
        <div class="gallery-container" style="display: flex; flex-direction: column; align-items: center; min-height: 100vh;">
            <h1 class="glow-text" style="font-size: 3rem; margin-bottom: 2rem;">Journey Quiz</h1>
            <div id="quiz-container" class="glass-panel" style="padding: 2rem; width: 100%; max-width: 600px;">
    `;
    
    questions.forEach((q, i) => {
        html += `
            <div class="quiz-question" style="margin-bottom: 2rem;">
                <p style="font-size: 1.2rem; font-weight: bold; margin-bottom: 1rem; color: var(--theme-color);">${i + 1}. ${q.q}</p>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        `;
        q.options.forEach((opt, j) => {
            html += `
                <label style="font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
                    <input type="radio" name="q${i}" value="${j}" />
                    ${opt}
                </label>
            `;
        });
        html += `</div></div>`;
    });

    html += `
                <button id="submit-quiz" class="interactive" style="width: 100%; padding: 1rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-size: 1.2rem; font-weight: bold; margin-top: 1rem;">Submit & Claim Certificate</button>
            </div>
        </div>
    `;
    
    return html;
}

document.addEventListener('viewRendered', (e) => {
    if (e.detail.path === '/quiz') {
        const btn = document.getElementById('submit-quiz');
        if (btn) {
            btn.addEventListener('click', () => {
                let score = 0;
                let allAnswered = true;
                
                questions.forEach((q, i) => {
                    const selected = document.querySelector(`input[name="q${i}"]:checked`);
                    if (!selected) {
                        allAnswered = false;
                    } else if (parseInt(selected.value) === q.ans) {
                        score++;
                    }
                });

                if (!allAnswered) {
                    alert("Please answer all questions before submitting.");
                    return;
                }

                AppState.quizCompleted = true;
                alert(`You scored ${score} out of ${questions.length}!`);
                navigateTo('/certificate');
            });
        }
        
        if (window.gsap) {
            gsap.fromTo('#quiz-container', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 });
        }
    }
});
