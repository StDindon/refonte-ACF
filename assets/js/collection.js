document.addEventListener("DOMContentLoaded", () => {
  // Données des produits
  const produits = [
    {
      id: 1,
      name: "Tea Ceremoniale Cerise",
      prix: "29.66",
      prixBarré: "34.90",
      category: "infusion",
      flavors: ["fruité", "acidulé"],
      image: "../public/assets/img/tea.jpg",
      imageHover: "../public/assets/img/tea-hover.jpg",
      badges: ["NEW", "-15%"],
      description: "Une infusion délicate aux notes fruitées et acidulées"
    },
    {
      id: 2,
      name: "Sel aux Herbes de Provence",
      prix: "12.99",
      prixBarré: null,
      category: "sel",
      flavors: ["épicé"],
      image: "../public/assets/img/sel.jpg",
      imageHover: "../public/assets/img/sel-hover.jpg",
      badges: ["BEST SELLER"],
      description: "Sel artisanal aux herbes aromatiques"
    },
    {
      id: 3,
      name: "Sirop de Lavande",
      prix: "15.50",
      prixBarré: null,
      category: "sirop",
      flavors: ["doux", "fruité"],
      image: "../public/assets/img/sirop.jpg",
      imageHover: "../public/assets/img/sirop-hover.jpg",
      badges: [],
      description: "Sirop artisanal à la lavande"
    },
    {
      id: 4,
      name: "Gelée de Fleurs",
      prix: "18.90",
      prixBarré: "22.00",
      category: "gelee",
      flavors: ["acidulé", "doux"],
      image: "../public/assets/img/gelee.jpg",
      imageHover: "../public/assets/img/gelee-hover.jpg",
      badges: ["NEW", "-15%"],
      description: "Gelée délicate aux fleurs comestibles"
    },
    {
      id: 5,
      name: "Infusion Menthe Poivrée",
      prix: "9.99",
      prixBarré: null,
      category: "infusion",
      flavors: ["fruité"],
      image: "../public/assets/img/tea2.jpg",
      imageHover: "../public/assets/img/tea2-hover.jpg",
      badges: [],
      description: "Infusion rafraîchissante à la menthe"
    },
    {
      id: 6,
      name: "Sel Rose de l'Himalaya",
      prix: "14.50",
      prixBarré: null,
      category: "sel",
      flavors: ["doux"],
      image: "../public/assets/img/sel2.jpg",
      imageHover: "../public/assets/img/sel2-hover.jpg",
      badges: ["BEST SELLER"],
      description: "Sel rose naturellement riche en minéraux"
    },
    {
      id: 7,
      name: "Sirop de Rose",
      prix: "16.90",
      prixBarré: "19.90",
      category: "sirop",
      flavors: ["doux"],
      image: "../public/assets/img/sirop2.jpg",
      imageHover: "../public/assets/img/sirop2-hover.jpg",
      badges: ["-15%"],
      description: "Sirop délicat aux pétales de rose"
    },
    {
      id: 8,
      name: "Gelée d'Églantine",
      prix: "17.50",
      prixBarré: null,
      category: "gelee",
      flavors: ["fruité", "acidulé"],
      image: "../public/assets/img/gelee2.jpg",
      imageHover: "../public/assets/img/gelee2-hover.jpg",
      badges: [],
      description: "Gelée sauvage aux fruits d'églantine"
    }
  ];

  const mainContainer = document.querySelector('main');

  // Fonction pour obtenir l'icône de badge
  function getBadgeClass(badge) {
    if (badge === "NEW") return "new";
    if (badge === "BEST SELLER") return "best-seller";
    if (badge.includes("%")) return "discount";
    return "";
  }

  // Fonction pour obtenir la couleur du dot selon la saveur
  function getFlavorDotClass(flavor) {
    const flavorColors = {
      "fruité": "pink",
      "acidulé": "orange",
      "doux": "yellow",
      "épicé": "green"
    };
    return flavorColors[flavor] || "pink";
  }

  // Fonction pour générer le HTML des badges
  function generateBadgesHTML(badges) {
    if (!badges || badges.length === 0) return '';
    
    return `
      <div class="badges">
        ${badges.map(badge => `
          <span class="badge ${getBadgeClass(badge)}">${badge}</span>
        `).join('')}
      </div>
    `;
  }

  // Fonction pour générer le HTML du prix
  function generatePriceHTML(prix, prixBarré) {
    if (prixBarré) {
      return `
        <div class="price">
          <span class="old-price">${prixBarré}€</span>
          <span class="current-price">${prix}€</span>
        </div>
      `;
    }
    return `
      <div class="price">
        <span class="current-price">${prix}€</span>
      </div>
    `;
  }

  // Fonction pour générer le HTML des saveurs
  function generateFlavorsHTML(flavors) {
    if (!flavors || flavors.length === 0) return '';
    
    return `
      <div class="flavors">
        ${flavors.map(flavor => `
          <div class="flavor">
            <span class="dot ${getFlavorDotClass(flavor)}"></span>
            <span>${flavor.charAt(0).toUpperCase() + flavor.slice(1)}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Fonction pour générer le HTML d'une card produit
function generateProductHTML(produit) {
  const productUrl = `produit/${produit.name.toLowerCase().replace(/\s+/g, '-')}.html`;
  
  return `
    <div class="card" data-category="${produit.category}" data-flavors="${produit.flavors.join(',')}">
      ${generateBadgesHTML(produit.badges)}
      <div class="image-container">
        <img src="${produit.image}" alt="${produit.name}" class="main-image">
        <img src="${produit.imageHover}" alt="${produit.name}" class="hover-image">
        <a href="${productUrl}" class="quick-add">VOIR PLUS</a>
      </div>
      <div class="card-content">
        <h2><a href="${productUrl}">${produit.name}</a></h2>
        ${generatePriceHTML(produit.prix, produit.prixBarré)}
        ${generateFlavorsHTML(produit.flavors)}
      </div>
    </div>
  `;
}

  // Remplir le container avec les produits
  mainContainer.innerHTML = produits.map(generateProductHTML).join('');

  // ============================================
  // SYSTÈME DE FILTRES
  // ============================================
  
  const categoryButtons = document.querySelectorAll('.category-filter');
  const flavorButtons = document.querySelectorAll('.flavor-filter');
  let cards = document.querySelectorAll('main .card');

  let activeCategory = 'all';
  let activeFlavor = 'all';

  // Fonction pour filtrer les cards
  function filterCards() {
    cards = document.querySelectorAll('main .card'); // Re-sélectionner les cards après génération
    
    cards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const cardFlavors = card.getAttribute('data-flavors');
      
      if (!cardCategory) return;
      
      const flavorsArray = cardFlavors ? cardFlavors.split(',').map(f => f.trim()) : [];
      
      const matchesCategory = activeCategory === 'all' || cardCategory === activeCategory;
      const matchesFlavor = activeFlavor === 'all' || flavorsArray.includes(activeFlavor);
      
      if (matchesCategory && matchesFlavor) {
        card.classList.remove('hidden');
        card.style.animation = 'none';
        setTimeout(() => {
          card.style.animation = 'fadeIn 0.5s ease';
        }, 10);
      } else {
        card.classList.add('hidden');
      }
    });
  }

  // Filtre par catégorie
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      activeCategory = button.getAttribute('data-category');
      filterCards();
    });
  });

  // Filtre par saveur
  flavorButtons.forEach(button => {
    button.addEventListener('click', () => {
      flavorButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      activeFlavor = button.getAttribute('data-flavor');
      filterCards();
    });
  });

  // ============================================
  // MENU HAMBURGER
  // ============================================
  
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".categorie");

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.classList.toggle('no-scroll');
    });

    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.classList.remove('no-scroll');
    }));
  }
});