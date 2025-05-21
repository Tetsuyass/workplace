
//// //// //// SLIDER //// //// ////

//constantes :
const slides = document.querySelectorAll(".slide"); //on récupère tous les items de la class slide de la page
const navButtons = document.querySelectorAll(".nav-button"); //idem pour nav button mais c'est plus particulier.
let currentIndex = 0; //slide courante
let interval; //temps entre chaque défilement

//afficher la slide courante
/**
 * Fonction qui affiche la slide courante
 * @param index
 * @return void
 */
function showSlide(index) {
    //maj de la position des slides (c'est facile vous allez voir)
    const offset = -index * 100; //on prend le pourcentage de la largeur du conteneur des slides pour déplacer (une slide = 100%)
    document.querySelector("#slider").style.transform = `translateX(${offset}%)`;
    //maj du bouton qui correspond à la slide courante
    navButtons.forEach((button,i) => {
        button.classList.toggle("active",i===index);
    })
    //de même on met à jour l'index courant
    currentIndex = index;
}

/**
 * Fonction qui permet d'aller à une slide via les boutons de navigation
 * @param index
 * @return void
 */
function goToSlide(index) {
    //on stoppe l'autodéfilement le temps du traitement :
    clearInterval(interval);
    showSlide(index);
    //rédémarre l'autodéfilement après le traitement
    startAutoSlide();
}

/**
 * Fonction pour changer automatiquement de slide
 * @param void
 * @return void
 */
function nextSlide() {
    currentIndex = (currentIndex +1) % slides.length; //boucler à l'infini (le fait revenir à 0 après la dernière slide)
    showSlide(currentIndex);
}

/**
 * Démarre le défilement automatique
 * @param void
 * @return void
 */
function startAutoSlide() {
    interval = setInterval(nextSlide, 5000); //change toutes les 5 secondes (à diminuer au besoin)
}

//on démarre le slider
startAutoSlide();
showSlide(currentIndex); //affiche la première slide
//// //// //// ADD EVNT LISTENER POUR LE SCROLL DOWN //// //// ////
// Fonction pour l'effet de parallaxe au scroll
function handleParallax() {
    const image = document.querySelector('.workplace-identity');
    const title = document.querySelector('.background-index-title');

    if (!image || !title) return;

    let scrollPosition = window.pageYOffset;

    // Effet de parallaxe pour l'image (mouvement vers le bas)
    const imageTranslateY = scrollPosition * 0.2;
    image.style.transform = `translateY(${imageTranslateY}px)`;

    // Effet de parallaxe pour le titre (mouvement plus lent)
    const titleTranslateY = scrollPosition * 0.1;
    title.style.transform = `translate(-50%, -50%) translateY(${titleTranslateY}px)`;
}

// Initialiser l'effet de parallaxe
document.addEventListener('DOMContentLoaded', function() {
    // Appliquer l'effet au chargement initial
    handleParallax();

    // Appliquer l'effet lors du défilement
    window.addEventListener('scroll', handleParallax);

    // Appliquer l'effet lors du redimensionnement de la fenêtre
    window.addEventListener('resize', handleParallax);
});

