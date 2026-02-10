// Navbar scroll effect et menu mobile
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.navbar-menu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Menu hamburger
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

// Active nav link sur scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
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

// Smooth scroll
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

// Craft steps - changer l'image au hover avec preload
const craftSteps = document.querySelectorAll('.craft-step');
const craftMainImage = document.getElementById('craftMainImage');

const stepImages = {
    '01': 'assets/img/about.png',
    '02': 'assets/img/sel.jpg',
    '03': 'assets/img/infusion.jpg',
    '04': 'assets/img/sirop.jpg'
};

// Preload toutes les images
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

// Intersection Observer pour animations au scroll
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

// Observer les éléments
document.querySelectorAll('.story-grid > *, .product-card, .craft-step').forEach(el => {
    observer.observe(el);
});

// Parallax subtil sur le hero product
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const heroProduct = document.querySelector('.hero-product');
            
            if (heroProduct && scrolled < window.innerHeight) {
                heroProduct.style.transform = `translateY(${scrolled * 0.15}px)`;
            }
            
            ticking = false;
        });
        
        ticking = true;
    }
});

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        alert(`Merci ! Vous êtes inscrit avec : ${email}`);
        newsletterForm.reset();
    });
}

// Lazy loading des images
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

// Animation au chargement de la page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});