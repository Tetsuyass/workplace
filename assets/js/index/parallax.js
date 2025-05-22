document.addEventListener('DOMContentLoaded', function () {
    // Attendre que les images et autres ressources soient chargées
    window.addEventListener('load', function() {
        initScrollAnimations();
    });

    function initScrollAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        const scrollContainer = document.querySelector('[data-scroll-container]');

        // S'assurer que le conteneur existe
        if (!scrollContainer) {
            console.error("Conteneur de défilement non trouvé");
            return;
        }

        // Initialiser Locomotive Scroll avec des options optimisées
        const locoScroll = new LocomotiveScroll({
            el: scrollContainer,
            smooth: true,
            multiplier: 1,
            lerp: 0.06,
            smartphone: {
                smooth: true,
                multiplier: 0.8
            },
            tablet: {
                smooth: true,
                multiplier: 1
            }
        });

        // Configuration du proxy ScrollTrigger
        ScrollTrigger.scrollerProxy(scrollContainer, {
            scrollTop(value) {
                return arguments.length
                    ? locoScroll.scrollTo(value, {duration: 0})
                    : locoScroll.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight
                };
            },
            pinType: scrollContainer.style.transform ? "transform" : "fixed"
        });

        // Mettre à jour ScrollTrigger quand le défilement se produit
        locoScroll.on("scroll", ScrollTrigger.update);

        // Définir les animations
        const animations = [
            {
                element: "#parallax-title",
                properties: { y: -100, opacity: 1 }
            },
            {
                element: "#workplace-identity",
                properties: { y: -200, opacity: 1 }
            },
            {
                element: "#credential-txt",
                properties: { y: -300, opacity: 0 }
            }
        ];

        // Appliquer les animations avec des paramètres optimisés
        animations.forEach(animation => {
            if (document.querySelector(animation.element)) {
                gsap.fromTo(
                    animation.element,
                    { y: 0 }, // État initial
                    {
                        y: animation.properties.y,
                        scrollTrigger: {
                            trigger: ".home-title",
                            scroller: scrollContainer,
                            start: "top top",
                            end: "bottom top",
                            scrub: 0.8, // Valeur ajustée pour une animation plus fluide
                            invalidateOnRefresh: false,
                            // Pas de onLeaveBack pour permettre à l'animation de se terminer naturellement
                        }
                    }
                );
            }
        });

        // Animation d'opacité commune
        gsap.fromTo(
            animations.map(a => a.element),
            { opacity: 1 }, // État initial
            {
                opacity: 1,
                scrollTrigger: {
                    trigger: ".home-title",
                    scroller: scrollContainer,
                    start: "top top",
                    end: "center top",
                    scrub: 0.8,
                    invalidateOnRefresh: false
                }
            }
        );

        // Gérer le redimensionnement de la fenêtre
        window.addEventListener('resize', debounce(function() {
            locoScroll.update();
            ScrollTrigger.refresh();
        }, 200));

        // Rafraîchir ScrollTrigger après l'initialisation
        ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

        // Utiliser un délai pour s'assurer que tout est bien initialisé
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);
    }

    // Fonction utilitaire pour limiter les appels lors du redimensionnement
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }
});
