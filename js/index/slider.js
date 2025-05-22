const slider = document.querySelector("#slider");
const slides = document.querySelectorAll(".slide");
const navButtons = document.querySelectorAll(".nav-button");
let currentIndex = 0;
let interval;

// Dupliquer la première slide à la fin
const firstSlideClone = slides[0].cloneNode(true);
slider.appendChild(firstSlideClone);

function showSlide(index, withTransition = true) {
    const slider = document.querySelector("#slider");
    const offset = -index * 100;

    if (!withTransition) {
        slider.style.transition = "none";
    } else {
        slider.style.transition = "transform 0.5s ease-in-out";
    }

    slider.style.transform = `translateX(${offset}%)`;

    // Ne pas changer l'état des boutons pour le clone
    if (index < slides.length) {
        navButtons.forEach((button, i) => {
            button.classList.toggle("active", i === index);
        });
        currentIndex = index;
    }
}

function goToSlide(index) {
    clearInterval(interval);
    showSlide(index);
    startAutoSlide();
}

function nextSlide() {
    currentIndex++;
    showSlide(currentIndex);

    if (currentIndex === slides.length) {
        // Si on est sur la slide clonée, revenir instantanément à la vraie première
        setTimeout(() => {
            showSlide(0, false);
            currentIndex = 0;
        }, 500); // Correspond à la durée de la transition CSS
    }
}

function startAutoSlide() {
    interval = setInterval(nextSlide, 5000);
}

if (slides.length > 0 && navButtons.length > 0) {
    startAutoSlide();
    showSlide(currentIndex);
}
