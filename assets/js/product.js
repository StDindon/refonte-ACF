function changeImage(thumbnail) {
    // Récupère l'image principale
    const mainImage = document.getElementById('mainImage');
    
    // Retire la classe active de toutes les miniatures
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    
    // Ajoute la classe active à la miniature cliquée
    thumbnail.classList.add('active');
    
    // Change l'image principale avec un effet de transition
    mainImage.style.opacity = '0';
    
    setTimeout(() => {
        mainImage.src = thumbnail.src;
        mainImage.alt = thumbnail.alt;
        mainImage.style.opacity = '1';
    }, 200);
}

// Fonction pour changer les étapes de préparation
function changeStep(stepNumber) {
    // Retire la classe active de tous les thumbnails
    const stepThumbs = document.querySelectorAll('.step-thumb');
    stepThumbs.forEach(thumb => thumb.classList.remove('active'));
    
    // Retire la classe active de tous les contenus
    const stepContents = document.querySelectorAll('.step-content');
    stepContents.forEach(content => content.classList.remove('active'));
    
    // Ajoute la classe active au thumbnail cliqué
    const activeThumb = document.querySelector(`.step-thumb[data-step="${stepNumber}"]`);
    if (activeThumb) {
        activeThumb.classList.add('active');
    }
    
    // Affiche le contenu correspondant
    const activeContent = document.getElementById(`step-${stepNumber}`);
    if (activeContent) {
        activeContent.classList.add('active');
    }
}

// Fonction pour changer d'onglet
function switchTab(tabName) {
    // Retire la classe active de tous les boutons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => button.classList.remove('active'));
    
    // Retire la classe active de tous les contenus
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Ajoute la classe active au bouton cliqué
    event.target.closest('.tab-button').classList.add('active');
    
    // Affiche le contenu correspondant
    const activeContent = document.getElementById(tabName);
    if (activeContent) {
        activeContent.classList.add('active');
    }
}