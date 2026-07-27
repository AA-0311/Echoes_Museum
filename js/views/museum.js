import { navigateTo } from '../router.js';
import { AppState, EMOTIONS } from '../state.js';

export function renderMuseum() {
    const renderHotspot = (emotion, label, icon, top, left) => {
        const isUnlocked = AppState.isEmotionUnlocked(emotion);
        const lockIcon = isUnlocked ? '' : '🔒 ';
        const cssClass = isUnlocked ? 'interactive unlocked-region map-hotspot' : 'locked-region map-hotspot';
        
        return `
            <div class="${cssClass}" style="position: absolute; top: ${top}%; left: ${left}%; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; gap: 0.5rem;" ${isUnlocked ? `data-link="/${emotion}"` : ''}>
                <div class="hotspot-pin" style="width: 20px; height: 20px; background: ${isUnlocked ? 'var(--theme-color)' : 'rgba(255,255,255,0.3)'}; border-radius: 50%; border: 2px solid #000; box-shadow: 0 0 10px ${isUnlocked ? 'var(--theme-glow)' : 'transparent'};"></div>
                <div class="hotspot-label" style="background: rgba(0,0,0,0.7); padding: 0.3rem 0.6rem; border-radius: 4px; font-size: 0.9rem; color: ${isUnlocked ? '#fff' : '#888'}; white-space: nowrap; pointer-events: none;">${lockIcon}${icon} ${label}</div>
            </div>
        `;
    };
    return `
<div class="museum-wrapper">
    <!-- Navigation Ribbon -->
    <nav class="nav-ribbon">
        <div class="nav-brand">Museum of Emotions</div>
        <ul class="nav-links">
            <li><a href="#" data-link="/">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#exhibits">Exhibits</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#reviews" class="active">Leave a Review</a></li>
        </ul>
    </nav>

    <!-- Welcome Canopy -->
    <section class="hero-section">
        <div class="hero-content" id="hero-text">
            <h1>Where feelings find their architecture.</h1>
            <p>An experimental installation mapping the spaces within.</p>
        </div>
    </section>

    <!-- About Section -->
    <section class="about-section" id="about">
        <div class="section-heading-container">
            <span class="section-subtitle-tag">Foundation</span>
            <h2 class="section-title">The Blueprint of Concept</h2>
        </div>
        
        <div class="about-carousel-viewport">
            <div class="about-carousel-slide slide-1">
                <div class="slide-img-side"></div>
                <div class="slide-text-side">
                    <h4>Our Mission</h4>
                    <p>To provide a tangible, architectural space mapping the intricate cartography of the human heart through raw volumetric structural arrangements.</p>
                </div>
            </div>
            <div class="about-carousel-slide slide-2">
                <div class="slide-img-side"></div>
                <div class="slide-text-side">
                    <h4>The Architecture</h4>
                    <p>Designed sensory installations meticulously crafted out of localized natural light, structural depth, stone texturing, and deliberate environmental airflows.</p>
                </div>
            </div>
            <div class="about-carousel-slide slide-3">
                <div class="slide-img-side"></div>
                <div class="slide-text-side">
                    <h4>The Experience</h4>
                    <p>Walk through structural paths curated to stir hidden internal memory layers, encourage personal reflection, and foster emotional clarity.</p>
                </div>
            </div>
            <div class="about-carousel-slide slide-4">
                <div class="slide-img-side"></div>
                <div class="slide-text-side">
                    <h4>Curator Note</h4>
                    <p>"We do not just build frames; we give material dimension to the quiet interior shifts that shape daily human experience."</p>
                </div>
            </div>
        </div>
        <p class="carousel-indicator-tip">↓ Scroll inside the frame to explore the blueprint ↓</p>
    </section>

    <!-- Exhibits Section -->
    <section class="exhibits-section" id="exhibits">
        <div class="section-heading-container">
            <span class="section-subtitle-tag">Exhibitions</span>
            <h2 class="section-title">Active Wings Available</h2>
        </div>
        
        <div class="interactive-map-container" style="position: relative; width: 90vw; max-width: 1200px; margin: 2rem auto; aspect-ratio: 4/3; background: url('assets/rustic_india_map.png') center/cover; border: 2px solid var(--panel-border); border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.8);">
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
    </section>

    <!-- Gallery Section -->
    <section class="gallery-section" id="gallery">
        <div class="section-heading-container">
            <span class="section-subtitle-tag">Archive</span>
            <h2 class="section-title">Atmospheric Studies</h2>
        </div>
        
        <div class="gallery-grid">
            <div class="gallery-item wide g-1">
                <div class="gallery-label">Jhansi Fort</div>
            </div>
            <div class="gallery-item tall g-2">
                <div class="gallery-label">Statue of Unity</div>
            </div>
            <div class="gallery-item g-3">
                <div class="gallery-label">Pushkar Camel Fair</div>
            </div>
            <div class="gallery-item g-4">
                <div class="gallery-label">Victoria Memorial</div>
            </div>
            <div class="gallery-item wide g-5">
                <div class="gallery-label">Cellular Jail</div>
            </div>
            <div class="gallery-item g-6">
                <div class="gallery-label">Vrindavan</div>
            </div>
        </div>
    </section>

    <!-- Reviews Section -->
    <section class="reviews-section" id="reviews">
        <div class="section-heading-container">
            <span class="section-subtitle-tag">Testimonials</span>
            <h2 class="section-title">Visitor Reflections</h2>
        </div>

        <div class="review-carousel-container">
            <div class="review-track" id="review-track">
                <div class="review-card">
                    <p class="review-text">"The Hall of Sorrow completely recalibrated my understanding of minimalist architecture. Breathtaking."</p>
                    <span class="review-author">— Elena R., Athens</span>
                </div>
                <div class="review-card">
                    <p class="review-text">"Walking through the reflection pools brought a stillness I haven’t encountered in modern galleries anywhere else."</p>
                    <span class="review-author">— Julian K., Copenhagen</span>
                </div>
                <div class="review-card">
                    <p class="review-text">"A masterclass in environmental curation. The color palettes and structural airflows truly tell a story."</p>
                    <span class="review-author">— Mateo B., Valencia</span>
                </div>
            </div>
        </div>

        <div class="review-controls">
            <button class="rev-btn" id="rev-left">&#10094;</button>
            <button class="rev-btn" id="rev-right">&#10095;</button>
        </div>

        <!-- Submission Cluster Box -->
        <div class="review-form-wrapper">
            <h4>Leave a Reflection</h4>
            <div class="form-cluster">
                <textarea id="user-review-text" class="input-element" placeholder="Share your experience within the installations..."></textarea>
                <input type="text" id="user-review-name" class="input-element" placeholder="Your Name & Origin (e.g., Sophia M., Rome)">
                <button class="submit-review-btn" id="submit-review-btn">Submit Reflection</button>
            </div>
        </div>
    </section>

    <!-- Custom System Modal Overlay Toast -->
    <div class="custom-toast-overlay" id="custom-toast">
        <div class="toast-box">
            <h5 id="toast-title">Thank You</h5>
            <p id="toast-message">Your artistic perspective has been permanently cataloged into our active visitor archive tracks.</p>
            <button class="toast-close-btn" id="toast-close-btn">Close View</button>
        </div>
    </div>

    <!-- Contextual Information Footer -->
    <footer>
        <div class="footer-wrapper">
            <div class="footer-content">
                <h3>Museum of Emotions</h3>
                <p>1044 Sentient Boulevard, District of Sentiments</p>
                <p>Email: contact@museumofemotions.fic | Phone: +91 98765 43210</p>
                <p>Open Tuesday through Sunday from 10:00 AM to 8:00 PM. Closed major holidays.</p>
            </div>
            <div class="footer-bottom">
                &copy; 2026 Museum of Emotions. Handcrafted architectural presentation interface.
            </div>
        </div>
    </footer>
</div>
    `;
}

// Global reference for cleanup or managing state if needed
let autoScrollTimer = null;
let scrollListener = null;

document.addEventListener('viewRendered', (e) => {
    if (e.detail.path === '/museum') {
        const heroText = document.getElementById('hero-text');
        
        // Smooth scroll for internal nav links to prevent router popstate interception
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(ev) {
                ev.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        scrollListener = () => {
            let scrollVal = window.scrollY;
            let windowHeight = window.innerHeight;
            if (scrollVal <= windowHeight && heroText) {
                let opacityFactor = 1 - (scrollVal / (windowHeight * 0.5));
                let transformFactor = scrollVal * 0.35;
                heroText.style.opacity = Math.max(opacityFactor, 0);
                heroText.style.transform = `translateY(-${transformFactor}px)`;
            }
        };
        window.addEventListener('scroll', scrollListener);

        // Map Animations triggered on scroll
        if (window.gsap && window.ScrollTrigger) {
            gsap.fromTo('.interactive-map-container', 
                { opacity: 0, scale: 0.95 }, 
                { 
                    opacity: 1, scale: 1, duration: 1, 
                    scrollTrigger: {
                        trigger: '.interactive-map-container',
                        start: "top 80%"
                    }
                }
            );
            
            gsap.fromTo('.map-hotspot', 
                { opacity: 0, y: -20 }, 
                { 
                    opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "bounce.out", 
                    scrollTrigger: {
                        trigger: '.interactive-map-container',
                        start: "top 75%"
                    }
                }
            );
        }

        // Auto-scrolling & User-controlled Review Carousel
        const reviewTrack = document.getElementById('review-track');

        const revLeft = document.getElementById('rev-left');
        const revRight = document.getElementById('rev-right');
        
        let activeIndex = 0;

        function updateReviewPosition() {
            if (reviewTrack) {
                reviewTrack.style.transform = `translateX(-${activeIndex * 100}%)`;
            }
        }

        function nextReview() {
            let totalReviews = document.querySelectorAll('.review-card').length;
            if (totalReviews > 0) {
                activeIndex = (activeIndex + 1) % totalReviews;
                updateReviewPosition();
            }
        }

        function prevReview() {
            let totalReviews = document.querySelectorAll('.review-card').length;
            if (totalReviews > 0) {
                activeIndex = (activeIndex - 1 + totalReviews) % totalReviews;
                updateReviewPosition();
            }
        }

        function resetAutoScroll() {
            if (autoScrollTimer) clearInterval(autoScrollTimer);
            autoScrollTimer = setInterval(nextReview, 5000);
        }

        if (revRight) {
            revRight.addEventListener('click', () => { nextReview(); resetAutoScroll(); });
        }
        if (revLeft) {
            revLeft.addEventListener('click', () => { prevReview(); resetAutoScroll(); });
        }

        resetAutoScroll();

        // Live Custom Review Submission Framework
        const submitBtn = document.getElementById('submit-review-btn');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                const textField = document.getElementById('user-review-text');
                const nameField = document.getElementById('user-review-name');
                
                const reviewText = textField.value.trim();
                const authorName = nameField.value.trim();

                
                if(!reviewText || !authorName) {
                    alert("Please fill in both fields before submitting your reflection.");
                    return;
                }
                
                // Build new dynamic card element
                const newCard = document.createElement('div');
                newCard.className = 'review-card';
                newCard.innerHTML = `
                    <p class="review-text">"${reviewText}"</p>
                    <span class="review-author">— ${authorName}</span>
                `;
                
                if (reviewTrack) reviewTrack.appendChild(newCard);
                
                // Trigger customized structural system modal overlay
                const toastOverlay = document.getElementById('custom-toast');
                const toastTitle = document.getElementById('toast-title');
                
                // Extract single first name if space exists
                const rawFirstName = authorName.split(',')[0].split(' ')[0];
                if (toastTitle) toastTitle.innerText = `Thank You, ${rawFirstName}`;
                if (toastOverlay) toastOverlay.classList.add('active');
                
                // Reset fields
                textField.value = "";
                nameField.value = "";
                
                // Bring focus seamlessly to the new entry point
                let totalReviews = document.querySelectorAll('.review-card').length;
                activeIndex = totalReviews - 1;
                updateReviewPosition();
                resetAutoScroll();
            });
        }

        const closeToastBtn = document.getElementById('toast-close-btn');
        if (closeToastBtn) {
            closeToastBtn.addEventListener('click', () => {
                const toastOverlay = document.getElementById('custom-toast');
                if (toastOverlay) toastOverlay.classList.remove('active');
            });
        }
    } else {
        // Cleanup if navigating away
        if (autoScrollTimer) {
            clearInterval(autoScrollTimer);
            autoScrollTimer = null;
        }
        if (scrollListener) {
            window.removeEventListener('scroll', scrollListener);
            scrollListener = null;
        }
    }
});
