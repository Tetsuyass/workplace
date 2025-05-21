// Slider functionality (conservé de votre code original)
const slides = document.querySelectorAll(".slide");
const navButtons = document.querySelectorAll(".nav-button");
let currentIndex = 0;
let interval;

function showSlide(index) {
    const offset = -index * 100;
    document.querySelector("#slider").style.transform = `translateX(${offset}%)`;

    navButtons.forEach((button, i) => {
        button.classList.toggle("active", i === index);
    });

    currentIndex = index;
}

function goToSlide(index) {
    clearInterval(interval);
    showSlide(index);
    startAutoSlide();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

function startAutoSlide() {
    interval = setInterval(nextSlide, 5000);
}

// Démarrer le slider
if (slides.length > 0 && navButtons.length > 0) {
    startAutoSlide();
    showSlide(currentIndex);
}

