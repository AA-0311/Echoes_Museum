const monumentData = {
    '/taj-mahal': {
        title: 'Taj Mahal',
        category: 'Architectural Wonder',
        location: 'Agra, Uttar Pradesh',
        image: 'https://images.unsplash.com/photo-1564507592208-027f6608307a?auto=format&fit=crop&q=80&w=800',
        facts: [
            "Commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife.",
            "The Taj Mahal complex is believed to have been completed in its entirety in 1653 at a cost estimated to be around 32 million rupees.",
            "It is regarded by many as the best example of Mughal architecture and a symbol of India's rich history.",
            "The marble changes color depending on the time of day, glowing pinkish in the morning, milky white in the evening, and golden under the moon."
        ]
    },
    '/hampi': {
        title: 'Hampi',
        category: 'Ancient Ruins',
        location: 'Vijayanagara, Karnataka',
        image: 'https://images.unsplash.com/photo-1620766165457-a80fe592173d?auto=format&fit=crop&q=80&w=800',
        facts: [
            "Hampi was the capital of the Vijayanagara Empire in the 14th century.",
            "By 1500 CE, Hampi-Vijayanagara was the world's second-largest medieval-era city after Beijing.",
            "The ruins are spread over 4,100 hectares and encompass more than 1,600 surviving remains.",
            "The musical pillars of the Vittala Temple produce sounds of 7 different musical instruments when tapped."
        ]
    },
    '/konark': {
        title: 'Konark Sun Temple',
        category: 'Historical Monument',
        location: 'Konark, Odisha',
        image: 'https://images.unsplash.com/photo-1600100397608-251f0436d1ff?auto=format&fit=crop&q=80&w=800',
        facts: [
            "Built in the 13th century, it is designed in the shape of a colossal chariot.",
            "The chariot has 24 wheels, which are intricately carved and act as sundials, able to calculate time to the exact minute.",
            "It was originally built at the mouth of the Chandrabhaga river, but the waterline has receded since then.",
            "Much of the temple is now in ruins due to a combination of natural forces and historical plunder."
        ]
    }
};

export function renderMonument(path) {
    const data = monumentData[path];
    if (!data) return `<div class="monument-container"><h1>Not Found</h1></div>`;

    const factsHtml = data.facts.map(fact => `<p class="fact-item">❖ ${fact}</p>`).join('');

    return `
        <div class="monument-container">
            <div class="monument-image-col">
                <img src="${data.image}" alt="${data.title}">
            </div>
            
            <div class="monument-info-col">
                <h1>${data.title}</h1>
                <div class="meta-info">
                    <p>Category: <span>${data.category}</span></p>
                    <p>Location: <span>${data.location}</span></p>
                </div>
                
                <div class="facts-container">
                    <h3>Amazing Facts</h3>
                    ${factsHtml}
                </div>
            </div>
        </div>
    `;
}

// Ensure GSAP animates monument entrance
document.addEventListener('viewRendered', (e) => {
    if (e.detail.path !== '/' && !e.detail.path.endsWith('.html')) {
        if (window.gsap) {
            gsap.fromTo('.monument-image-col', 
                { opacity: 0, x: -50, rotationY: -10 }, 
                { opacity: 1, x: 0, rotationY: 0, duration: 1.2, ease: "power3.out" }
            );
            gsap.fromTo('.monument-info-col h1, .meta-info, .facts-container', 
                { opacity: 0, x: 50 }, 
                { opacity: 1, x: 0, duration: 1, stagger: 0.2, ease: "power2.out", delay: 0.3 }
            );
        }
    }
});
