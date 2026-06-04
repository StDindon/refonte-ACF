// ============================================
// INDEX.JS - VERSION SIMPLIFIÉE
// ============================================

// ============================================
// NAVBAR & MENU
// ============================================
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.navbar-menu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
});

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
// NAVIGATION ACTIVE
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= (sectionTop - 300)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

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
// CRAFT STEPS - CHANGER IMAGE
// ============================================
const craftSteps = document.querySelectorAll('.craft-step');
const craftMainImage = document.getElementById('craftMainImage');
const stepImages = {
    '01': 'assets/img/respect.jpg',
    '02': 'assets/img/moment.jpg',
    '03': 'assets/img/sechage.jpg',
    '04': 'assets/img/transformation.jpg'
};

Object.values(stepImages).forEach(src => {
    const img = new Image();
    img.src = src;
});

let currentStepImage = '01';
craftSteps.forEach(step => {
    step.addEventListener('mouseenter', () => {
        const stepNum = step.getAttribute('data-step');
        if (stepImages[stepNum] && craftMainImage && stepNum !== currentStepImage) {
            currentStepImage = stepNum;
            craftMainImage.style.opacity = '0';
            setTimeout(() => {
                craftMainImage.src = stepImages[stepNum];
                craftMainImage.style.opacity = '1';
            }, 200);
        }
    });
});

// ============================================
// ANIMATIONS AU SCROLL
// ============================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.story-grid > *, .product-card, .craft-step').forEach(el => {
    observer.observe(el);
});

// ============================================
// HERO SLIDER
// ============================================
function initHeroSlider() {
    const slides = document.querySelectorAll('.product-slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (!slides.length) return;
    
    let current = 0;
    let autoplayTimer = null;
    
    function goTo(index) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
    }
    
    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }
    
    function startAutoplay() {
        autoplayTimer = setInterval(next, 4000);
    }
    
    function resetAutoplay() {
        clearInterval(autoplayTimer);
        startAutoplay();
    }
    
    if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetAutoplay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetAutoplay(); });
    
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => { goTo(i); resetAutoplay(); });
    });
    
    let touchStartX = 0;
    const slider = document.querySelector('.product-slider');
    if (slider) {
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        
        slider.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                diff > 0 ? next() : prev();
                resetAutoplay();
            }
        }, { passive: true });
    }
    
    startAutoplay();
}

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
// LAZY LOADING
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// INITIALISATION
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

document.addEventListener('DOMContentLoaded', () => {
    initCartModal();
    initHeroSlider();
});