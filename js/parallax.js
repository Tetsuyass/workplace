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
            lerp: 0.06,  // Valeur plus basse pour un défilement plus fluide
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

        // Définir les animations avec des paramètres optimisés
        const animations = [
            {
                element: "#parallax-title",
                properties: { y: -400, opacity: 1 }
            },
            {
                element: "#workplace-identity",
                properties: { y: -200, opacity: 1 }
            },
            {
                element: "#credential-txt",
                properties: { y: -650, opacity: 0 }
            }
        ];

        animations.forEach(animation => {
            if (document.querySelector(animation.element)) {
                gsap.to(animation.element, {
                    y: animation.properties.y,
                    scrollTrigger: {
                        trigger: ".home-title",
                        scroller: scrollContainer,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                        invalidateOnRefresh: true
                    }
                });
            }
        });

        // Animation d'opacité commune
        gsap.to(animations.map(a => a.element), {
            opacity: 1,
            scrollTrigger: {
                trigger: ".home-title",
                scroller: scrollContainer,
                start: "top top",
                end: "center top",
                scrub: true,
                invalidateOnRefresh: true
            }
        });

        // Gérer le redimensionnement de la fenêtre
        window.addEventListener('resize', debounce(function() {
            locoScroll.update();
            ScrollTrigger.refresh();
        }, 200));

        // Rafraîchir ScrollTrigger après l'initialisation
        ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
        ScrollTrigger.refresh();
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
