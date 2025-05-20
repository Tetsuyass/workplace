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
    document.querySelector(".slides").style.transform = `translateX(${offset}%)`;
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
