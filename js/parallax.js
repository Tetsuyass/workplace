
    document.addEventListener('DOMContentLoaded', function() {
    console.log("Initialisation de l'effet parallaxe avec GSAP");

    // Enregistrer le plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Animation du titre
    gsap.to("#parallax-title", {
    y: -200,
    ease: "none",
    scrollTrigger: {
    trigger: ".home-title",
    start: "top top",
    end: "bottom top",
    scrub: true
}
});

    // Animation de l'image
    gsap.to("#workplace-identity", {
    y: 200,
    ease: "none",
    scrollTrigger: {
    trigger: ".home-title",
    start: "top top",
    end: "bottom top",
    scrub: true
}
});

    console.log("Animations GSAP configurées");
});

