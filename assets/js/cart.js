/**
 * Panier + Checkout SumUp
 * Au Chaudron Fleuri
 */

const CHECKOUT_API = '/chaudron-fleuri/api/checkout.php';

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    initCartModal();
    updateCartCount();
});

/**
 * Initialiser la modal
 */
function initCartModal() {
    const icon = document.querySelector('.cart-icon');
    const modal = document.getElementById('cartModal');
    const close = document.querySelector('.cart-close');
    const overlay = document.querySelector('.cart-modal-overlay');
    
    if (!icon || !modal) return;
    
    icon.addEventListener('click', openCart);
    if (close) close.addEventListener('click', closeCart);
    if (overlay) overlay.addEventListener('click', closeCart);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeCart();
        }
    });
}

/**
 * Ouvrir le panier
 */
function openCart() {
    const modal = document.getElementById('cartModal');
    if (!modal) return;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderCart();
}

/**
 * Fermer le panier
 */
function closeCart() {
    const modal = document.getElementById('cartModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Afficher le panier
 */
function renderCart() {
    const cart = getCart();
    const body = document.querySelector('.cart-body');
    const footer = document.querySelector('.cart-footer');
    
    if (!body) return;
    
    if (cart.length === 0) {
        body.innerHTML = '<p class="cart-empty">Votre panier est vide</p>';
        if (footer) footer.style.display = 'none';
        return;
    }
    
    body.innerHTML = '';
    cart.forEach(item => {
        body.appendChild(createCartItem(item));
    });
    
    if (footer) {
        footer.style.display = 'block';
        updateTotal();
    }
}

/**
 * Créer un item du panier
 */
function createCartItem(item) {
    const div = document.createElement('div');
    div.className = 'cart-item';
    
    div.innerHTML = `
        <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}" onerror="this.src='/chaudron-fleuri/assets/images/default-product.jpg'">
        </div>
        <div class="cart-item-info">
            <h4>${item.name}</h4>
            <span class="cart-item-category">${item.category}</span>
            <span class="cart-item-price">${formatPrice(item.price)} €</span>
        </div>
        <div class="cart-item-actions">
            <button class="btn-remove" onclick="removeItem('${item.id}')">
                <i class="ri-delete-bin-line"></i>
            </button>
            <div class="quantity-controls">
                <button onclick="decreaseQty('${item.id}')">−</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQty('${item.id}')">+</button>
            </div>
        </div>
    `;
    
    return div;
}

/**
 * Gestion panier
 */
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    window.dispatchEvent(new Event('storage'));
}

function increaseQty(id) {
    const cart = getCart();
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity++;
        saveCart(cart);
        renderCart();
    }
}

function decreaseQty(id) {
    const cart = getCart();
    const item = cart.find(i => i.id === id);
    if (item) {
        if (item.quantity > 1) {
            item.quantity--;
            saveCart(cart);
            renderCart();
        } else {
            removeItem(id);
        }
    }
}

function removeItem(id) {
    let cart = getCart();
    cart = cart.filter(i => i.id !== id);
    saveCart(cart);
    renderCart();
}

/**
 * Calculer le total
 */
function calculateTotal() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function updateTotal() {
    const elem = document.querySelector('.total-price');
    if (elem) {
        elem.textContent = formatPrice(calculateTotal()) + ' €';
    }
}

/**
 * Mettre à jour le compteur
 */
function updateCartCount() {
    const cart = getCart();
    const badge = document.querySelector('.cart-count');
    if (!badge) return;
    
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (total > 0) {
        badge.textContent = total;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

/**
 * Checkout SumUp
 */
async function proceedToCheckout() {
    const cart = getCart();
    
    if (cart.length === 0) {
        alert('Votre panier est vide');
        return;
    }
    
    // Demander l'email (optionnel)
    const email = prompt('Email pour la confirmation (optionnel) :');
    
    showCheckoutLoader();
    
    try {
        const response = await fetch(CHECKOUT_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cart: cart,
                email: email || null
            })
        });
        
        const data = await response.json();
        
        if (!data.success) {
            throw new Error(data.error || 'Erreur création paiement');
        }
        
        // Sauvegarder l'ID du checkout
        localStorage.setItem('checkout_id', data.checkout_id);
        
        // Rediriger vers SumUp
        window.location.href = data.checkout_url;
        
    } catch (error) {
        console.error('Erreur:', error);
        hideCheckoutLoader();
        alert('Erreur lors du paiement : ' + error.message);
    }
}

/**
 * Loaders
 */
function showCheckoutLoader() {
    const btn = document.querySelector('.btn-checkout');
    if (!btn) return;
    
    btn.disabled = true;
    btn.innerHTML = `
        <div style="display: inline-block; width: 20px; height: 20px; border: 2px solid white; border-top-color: transparent; border-radius: 50%; animation: spin 0.6s linear infinite;"></div>
        Préparation...
    `;
}

function hideCheckoutLoader() {
    const btn = document.querySelector('.btn-checkout');
    if (!btn) return;
    
    btn.disabled = false;
    btn.innerHTML = `
        <i class="ri-bank-card-line"></i>
        Payer maintenant
    `;
}

/**
 * Helpers
 */
function formatPrice(price) {
    return parseFloat(price).toFixed(2).replace('.', ',');
}

// Synchronisation
window.addEventListener('storage', (e) => {
    if (e.key === 'cart') {
        updateCartCount();
        const modal = document.getElementById('cartModal');
        if (modal && modal.classList.contains('active')) {
            renderCart();
        }
    }
});

// Animation spin
const style = document.createElement('style');
style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
document.head.appendChild(style);