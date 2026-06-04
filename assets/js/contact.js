// ============================================
// CONTACT.JS - VERSION SIMPLIFIÉE
// ============================================

// ============================================
// MENU HAMBURGER
// ============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.navbar-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    document.querySelectorAll('.navbar-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ============================================
// FORMULAIRE DE CONTACT
// ============================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            nom: document.getElementById('nom').value,
            email: document.getElementById('email').value,
            telephone: document.getElementById('telephone')?.value,
            sujet: document.getElementById('sujet').value,
            message: document.getElementById('message').value
        };
        
        console.log('Formulaire soumis:', formData);
        alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.');
        contactForm.reset();
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// PANIER → REDIRECTION
// ============================================
function initCartModal() {
    const cartIcon = document.getElementById('cartIcon');
    if (!cartIcon) return;
    
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'collection.html';
    });
}

// ============================================
// NEWSLETTER
// ============================================
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        alert(`Merci ! Vous êtes inscrit avec : ${email}`);
        newsletterForm.reset();
    });
}

// ============================================
// INITIALISATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initCartModal();
});