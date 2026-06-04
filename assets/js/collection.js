// ============================================
// CHARGEMENT DYNAMIQUE DES PRODUITS DEPUIS L'API
// ============================================

let products = []; // ← Vide au départ, sera rempli par l'API

// Détecte si on est en local ou en production
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const apiUrl = isLocal ? 'api/products.php' : 'https://auchaudronfleuri.com/api/products.php';

// Charger les produits depuis Google Sheets
async function loadProducts() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.success) {
            products = data.products;
            console.log(`✅ ${data.count} produits chargés depuis Google Sheets`);
            renderProducts();
            initFilters();
        } else {
            console.error('❌ Erreur:', data.error);
            document.getElementById('productsGrid').innerHTML = `
                <p style="grid-column: 1/-1; text-align: center; color: #E53935; padding: 3rem;">
                    Erreur de chargement des produits. Veuillez réessayer plus tard.
                </p>
            `;
        }
    } catch (error) {
        console.error('❌ Erreur réseau:', error);
        document.getElementById('productsGrid').innerHTML = `
            <p style="grid-column: 1/-1; text-align: center; color: #E53935; padding: 3rem;">
                Impossible de charger les produits. Vérifiez votre connexion.
            </p>
        `;
    }
}

// ============================================
// GESTION DU PANIER (LocalStorage)
// ============================================

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    showCartFeedback(product.name);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
    }
}

function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function getCartCount() {
    return cart.reduce((count, item) => count + item.quantity, 0);
}

function showCartFeedback(productName) {
    const cartIcon = document.getElementById('cartIcon');
    if (cartIcon) {
        cartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 300);
    }
}

// ============================================
// MISE À JOUR DE L'UI DU PANIER
// ============================================

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartBody = document.getElementById('cartBody');
    const cartFooter = document.getElementById('cartFooter');
    const totalPrice = document.getElementById('totalPrice');
    
    if (!cartCount || !cartBody || !cartFooter || !totalPrice) return;
    
    const count = getCartCount();
    const total = getCartTotal();
    
    // Mise à jour du compteur
    cartCount.textContent = count;
    cartCount.classList.toggle('hidden', count === 0);
    
    // Mise à jour du contenu du panier
    if (cart.length === 0) {
        cartBody.innerHTML = '<p class="cart-empty">Votre panier est vide</p>';
        cartFooter.style.display = 'none';
    } else {
        cartBody.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span class="cart-item-category">${getCategoryLabel(item.category)}</span>
                    <div class="cart-item-price">${item.price.toFixed(2)}€</div>
                </div>
                <div class="cart-item-actions">
                    <button class="btn-remove" onclick="removeFromCart(${item.id})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    <div class="quantity-controls">
                        <button onclick="updateQuantity(${item.id}, -1)">−</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
            </div>
        `).join('');
        
        cartFooter.style.display = 'block';
        totalPrice.textContent = total.toFixed(2) + '€';
    }
}

function getCategoryLabel(category) {
    const labels = {
        'infusion': 'Infusion',
        'sel': 'Sel',
        'sirop': 'Sirop',
        'gelee': 'Gelée'
    };
    return labels[category] || category;
}

// ============================================
// AFFICHAGE DES PRODUITS
// ============================================

function renderProducts(filter = 'all') {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter);
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                ${product.season ? `<span class="product-season">${product.season}</span>` : ''}
            </div>
            <div class="product-info">
                <span class="product-category">${getCategoryLabel(product.category)}</span>
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${product.price.toFixed(2)}€</span>
                    <button class="btn-add-cart" onclick="addToCart(${product.id})">
                        <span>Ajouter</span>
                        <i class="fa-solid fa-basket-shopping"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ============================================
// FILTRES
// ============================================

function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-category');
            renderProducts(category);
        });
    });
}

// ============================================
// MODAL PANIER
// ============================================

function initCartModal() {
    const cartIcon = document.getElementById('cartIcon');
    const cartModal = document.getElementById('cartModal');
    const cartClose = document.getElementById('cartClose');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (!cartIcon || !cartModal) return;
    
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        cartModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    if (cartClose) {
        cartClose.addEventListener('click', () => {
            cartModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    if (cartOverlay) {
        cartOverlay.addEventListener('click', () => {
            cartModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
}

// ============================================
// CHECKOUT
// ============================================

function initCheckout() {
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (!checkoutBtn) return;
    
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Votre panier est vide');
            return;
        }
        
        const orderData = {
            items: cart.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                total: item.price * item.quantity
            })),
            total: getCartTotal(),
            timestamp: new Date().toISOString()
        };
        
        console.log('Commande prête:', orderData);
        alert(`Commande de ${orderData.total.toFixed(2)}€\n\nPaiement SumUp bientôt disponible.\n\n${cart.length} produit(s) au panier.`);
    });
}

// ============================================
// MENU HAMBURGER
// ============================================

function initHamburger() {
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
}

// ============================================
// NEWSLETTER
// ============================================

function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            alert(`Merci ! Inscription avec : ${email}`);
            newsletterForm.reset();
        });
    }
}

// ============================================
// INITIALISATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    loadProducts(); // ← Charge les produits et appelle renderProducts() + initFilters()
    initCartModal();
    initCheckout();
    initHamburger();
    initNewsletter();
    updateCartUI();
});