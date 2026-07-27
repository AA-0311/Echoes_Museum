
import { renderWonder } from './views/wonder.js';
import { renderCourage } from './views/courage.js';
import { renderJoy } from './views/joy.js';
import { renderLove } from './views/love.js';
import { renderResilience } from './views/resilience.js';
import { renderHope } from './views/hope.js';
import { renderStart } from './views/start.js';
import { renderQuiz } from './views/quiz.js';
import { renderCertificate } from './views/certificate.js';
import { renderMuseum } from './views/museum.js';
import { AppState } from './state.js';

export const routes = {
    '/start': renderStart,
    '/': renderMuseum,
    '/wonder': renderWonder,
    '/courage': renderCourage,
    '/joy': renderJoy,
    '/love': renderLove,
    '/resilience': renderResilience,
    '/hope': renderHope,
    '/quiz': renderQuiz,
    '/certificate': renderCertificate,
    '/museum': renderMuseum
};

export const themes = {
    '/start': 'entrance',
    '/': 'museum',
    '/wonder': 'wonder',
    '/courage': 'courage',
    '/joy': 'joy',
    '/love': 'love',
    '/resilience': 'resilience',
    '/hope': 'hope',
    '/quiz': 'entrance',
    '/certificate': 'entrance',
    '/museum': 'museum'
};

export async function navigateTo(url) {
    history.pushState(null, null, url);
    await renderView();
}

export async function renderView() {
    let path = window.location.pathname;
    
    // For local file testing
    if (path.endsWith('.html') || path === '/Echoes/' || path === '/C:/Echoes/index.html') {
        path = '/start';
    }
    
    if (path === '/' && !AppState.userName) {
        path = '/start';
        history.replaceState(null, null, '/start');
    }

    let routeFunc = routes[path] || routes['/start'];

    const appRoot = document.getElementById('app-root');
    
    // Exit animation if there's already content
    if (appRoot.innerHTML.trim() !== '') {
        appRoot.classList.add('view-exit-active');
        await new Promise(resolve => setTimeout(resolve, 500)); // wait for transition
    }
    
    // Change Theme
    const newTheme = themes[path] || themes['/start'];
    document.body.setAttribute('data-theme', newTheme);
    
    // Inject new HTML
    appRoot.innerHTML = routeFunc();
    
    // Ensure we start at the top of the page
    window.scrollTo(0,0);
    
    // Enter animation setup
    appRoot.classList.remove('view-exit-active');
    appRoot.classList.add('view-enter');
    
    // Trigger reflow
    void appRoot.offsetWidth; 
    
    appRoot.classList.remove('view-enter');
    appRoot.classList.add('view-enter-active');
    
    // After animation, remove class
    setTimeout(() => {
        appRoot.classList.remove('view-enter-active');
        
        // Dispatch a custom event so views can run their specific JS/GSAP logic
        const event = new CustomEvent('viewRendered', { detail: { path } });
        document.dispatchEvent(event);
    }, 800);
}
