document.addEventListener('DOMContentLoaded', () => {
    const dashboardBtn = document.getElementById('dashboard-btn');
    const dashboardMenu = document.getElementById('dashboard-menu');
    if (dashboardBtn && dashboardMenu) {
        dashboardBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dashboardMenu.classList.toggle('hidden');
        });
        document.addEventListener('click', () => dashboardMenu.classList.add('hidden'));
        dashboardMenu.addEventListener('click', (e) => e.stopPropagation());
    }
});

// Mobile Menu Toggle
const menuBtn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');

if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });
}

// Intersection Observer for Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Smooth Scroll for Anchor Links (for older browsers)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Only if it's a hash link on the same page
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            if (menu) menu.classList.add('hidden'); // Close mobile menu on click
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('Service Worker registered successfully:', registration);
        })
        .catch(error => {
            console.log('Service Worker registration failed:', error);
        });
}