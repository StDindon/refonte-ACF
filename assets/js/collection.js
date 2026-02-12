// ============================================
// DONNÉES PRODUITS (Catalogue réel du site)
// ============================================

const products = [
    // INFUSIONS
    {
        id: 1,
        name: "Souffle d'Ares",
        category: "infusion",
        price: 6.50,
        image: "assets/img/infusion.jpg",
        description: "Infusion tonique et revigorante aux notes boisées",
        ingredients: "Romarin, Ortie, Fleur de sauge ananas",
        availability: "Toute l'année",
        badge: "Nouveau"
    },
    {
        id: 2,
        name: "Secret de Scylla",
        category: "infusion",
        price: 6.50,
        image: "assets/img/infusion.jpg",
        description: "Alliance rafraîchissante de thym et menthe",
        ingredients: "Thym, Menthe",
        availability: "Toute l'année"
    },
    {
        id: 3,
        name: "Harmonie de Freyja",
        category: "infusion",
        price: 6.50,
        image: "assets/img/infusion.jpg",
        description: "Mélange doux et apaisant aux feuilles nobles",
        ingredients: "Feuilles d'olivier, Feuilles de figuier, Feuilles de framboisier",
        availability: "Toute l'année"
    },
    {
        id: 4,
        name: "Voile d'Artémis",
        category: "infusion",
        price: 6.50,
        image: "assets/img/infusion.jpg",
        description: "Infusion florale délicate et parfumée",
        ingredients: "Feuilles de mûrier, Thym, Rose",
        availability: "Toute l'année"
    },
    {
        id: 5,
        name: "Etreinte de Nyx",
        category: "infusion",
        price: 6.50,
        image: "assets/img/infusion.jpg",
        description: "Tisane apaisante pour les moments de détente",
        ingredients: "Camomille, Verveine, Lavande",
        availability: "Toute l'année"
    },
    {
        id: 6,
        name: "Lunes d'Hécate",
        category: "infusion",
        price: 6.50,
        image: "assets/img/infusion.jpg",
        description: "Mélange floral et herbacé aux vertus apaisantes",
        ingredients: "Achillée millefeuille, Angélique, Feuilles de framboisier, Bourrache",
        availability: "Toute l'année"
    },
    {
        id: 7,
        name: "Eclat d'Ondine",
        category: "infusion",
        price: 6.50,
        image: "assets/img/infusion.jpg",
        description: "Infusion fraîche aux notes mentholées et florales",
        ingredients: "Menthe chocolat, Sauge ananas, Bleuet, Mauve",
        availability: "Toute l'année"
    },
    
    // SELS
    {
        id: 8,
        name: "Sel de Thym",
        category: "sel",
        price: 4.50,
        image: "assets/img/sel.jpg",
        description: "Sel aromatique aux notes de garrigue provençale",
        ingredients: "Sel marin, Thym séché",
        availability: "Toute l'année"
    },
    {
        id: 9,
        name: "Sel au Romarin",
        category: "sel",
        price: 4.50,
        image: "assets/img/sel.jpg",
        description: "Sel parfumé idéal pour viandes et légumes rôtis",
        ingredients: "Sel marin, Romarin séché",
        availability: "Toute l'année"
    },
    {
        id: 10,
        name: "Sel à la Sarriette",
        category: "sel",
        price: 4.50,
        image: "assets/img/sel.jpg",
        description: "Sel relevé aux saveurs méditerranéennes",
        ingredients: "Sel marin, Sarriette séchée",
        availability: "Toute l'année"
    },
    {
        id: 11,
        name: "Sel au Thym Citron",
        category: "sel",
        price: 4.50,
        image: "assets/img/sel.jpg",
        description: "Sel aux notes citronnées et herbacées",
        ingredients: "Sel marin, Thym citron séché",
        availability: "Automne - Hiver",
        season: "Hiver"
    },
    
    // SIROPS
    {
        id: 12,
        name: "Sirop de Thym",
        category: "sirop",
        price: 5.50,
        image: "assets/img/sirop.jpg",
        description: "Sirop aromatique aux vertus apaisantes",
        ingredients: "Infusion de thym, Sucre de canne, Citron",
        availability: "Toute l'année"
    },
    {
        id: 13,
        name: "Sirop d'Hibiscus (Bisap)",
        category: "sirop",
        price: 5.50,
        image: "assets/img/sirop.jpg",
        description: "Sirop floral aux notes acidulées et rafraîchissantes",
        ingredients: "Infusion d'hibiscus, Sucre de canne, Citron",
        availability: "Toute l'année"
    },
    {
        id: 14,
        name: "Sirop de Feuilles de Mûrier",
        category: "sirop",
        price: 5.50,
        image: "assets/img/sirop.jpg",
        description: "Sirop doux aux notes végétales délicates",
        ingredients: "Infusion de feuilles de mûrier, Sucre de canne, Citron",
        availability: "Toute l'année"
    },
    {
        id: 15,
        name: "Sirop de Lavande",
        category: "sirop",
        price: 5.50,
        image: "assets/img/sirop.jpg",
        description: "Sirop floral et parfumé aux arômes provençaux",
        ingredients: "Infusion de lavande, Sucre de canne, Citron",
        availability: "Printemps - Été",
        season: "Été"
    },
    
    // GELÉES
    {
        id: 16,
        name: "Gelée de Thym",
        category: "gelee",
        price: 4.50,
        image: "assets/img/gelee.jpg",
        description: "Gelée aromatique parfaite avec les fromages",
        ingredients: "Infusion de thym, Sucre, Pectine",
        availability: "Toute l'année"
    },
    {
        id: 17,
        name: "Gelée de Verveine",
        category: "gelee",
        price: 4.50,
        image: "assets/img/gelee.jpg",
        description: "Gelée délicate aux notes citronnées",
        ingredients: "Infusion de verveine, Sucre, Pectine",
        availability: "Toute l'année"
    },
    {
        id: 18,
        name: "Gelée de Coquelicot",
        category: "gelee",
        price: 4.50,
        image: "assets/img/gelee.jpg",
        description: "Gelée florale délicate et raffinée",
        ingredients: "Infusion de coquelicot, Sucre, Pectine",
        availability: "Printemps - Été",
        season: "Été"
    },
    {
        id: 19,
        name: "Gelée de Rose",
        category: "gelee",
        price: 4.50,
        image: "assets/img/gelee.jpg",
        description: "Gelée élégante aux pétales de rose",
        ingredients: "Infusion de rose, Sucre, Pectine",
        availability: "Printemps - Été",
        season: "Été"
    }
];

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
    // Petit feedback visuel quand on ajoute au panier
    const cartIcon = document.getElementById('cartIcon');
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
    }, 300);
}

// ============================================
// MISE À JOUR DE L'UI DU PANIER
// ============================================

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartBody = document.getElementById('cartBody');
    const cartFooter = document.getElementById('cartFooter');
    const totalPrice = document.getElementById('totalPrice');
    
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
                <p class="product-ingredients">${product.ingredients}</p>
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
            // Retirer active de tous les boutons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Ajouter active au bouton cliqué
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
    
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        cartModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    cartClose.addEventListener('click', () => {
        cartModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    cartOverlay.addEventListener('click', () => {
        cartModal.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// ============================================
// CHECKOUT (Préparation SumUp)
// ============================================

function initCheckout() {
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Votre panier est vide');
            return;
        }
        
        // PRÉPARATION DES DONNÉES POUR SUMUP
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
        
        console.log('Commande prête pour SumUp:', orderData);
        
        // TODO: Quand SumUp sera intégré, appeler l'API ici
        // createSumUpCheckout(orderData);
        
        // Pour l'instant, on simule
        alert(`Commande de ${orderData.total.toFixed(2)}€\n\nL'intégration SumUp sera ajoutée prochainement.\n\nVotre panier contient ${cart.length} produit(s).`);
        
        // Optionnel: Vider le panier après commande
        // cart = [];
        // saveCart();
        // document.getElementById('cartModal').classList.remove('active');
    });
}

// Cette fonction sera utilisée quand SumUp sera intégré
function createSumUpCheckout(orderData) {
    // FUTUR: Appel à l'API SumUp
    /*
    fetch('/api/create-sumup-checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            amount: orderData.total,
            currency: 'EUR',
            checkout_reference: 'ORDER-' + Date.now(),
            merchant_code: 'VOTRE_CODE_MARCHAND_SUMUP',
            description: 'Commande Au Chaudron Fleuri',
            line_items: orderData.items
        })
    })
    .then(response => response.json())
    .then(data => {
        // Rediriger vers la page de paiement SumUp
        window.location.href = data.checkout_url;
    })
    .catch(error => {
        console.error('Erreur SumUp:', error);
        alert('Erreur lors de la création du paiement');
    });
    */
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
            alert(`Merci ! Vous êtes inscrit avec : ${email}`);
            newsletterForm.reset();
        });
    }
}

// ============================================
// INITIALISATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    initFilters();
    initCartModal();
    initCheckout();
    initHamburger();
    initNewsletter();
    updateCartUI();
});