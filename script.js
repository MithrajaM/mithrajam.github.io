const hero = document.querySelector('.hero-visual');
const cards = document.querySelectorAll('.tilt-card');

window.addEventListener('mousemove', (event) => {
    const { innerWidth, innerHeight } = window;
    const x = (event.clientX / innerWidth - 0.5) * 24;
    const y = (event.clientY / innerHeight - 0.5) * 24;

    if (hero) {
        hero.style.transform = `rotateX(${y}deg) rotateY(${-x}deg)`;
    }

    cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardX = event.clientX - (rect.left + rect.width / 2);
        const cardY = event.clientY - (rect.top + rect.height / 2);
        card.style.transform = `perspective(1200px) rotateX(${cardY / 18}deg) rotateY(${-cardX / 18}deg) translateZ(0)`;
    });
});

window.addEventListener('mouseout', () => {
    if (hero) hero.style.transform = '';
    cards.forEach((card) => card.style.transform = '');
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
        }
    });
}, { threshold: 0.25 });

document.querySelectorAll('.reveal').forEach((section) => observer.observe(section));
