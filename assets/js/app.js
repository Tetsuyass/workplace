document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("main-content");

    // Fonction pour charger dynamiquement une page
    async function loadPage(url) {
        const response = await fetch(url);
        const html = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const newContent = doc.querySelector("#main-content");

        if (newContent) {
            content.innerHTML = newContent.innerHTML;
            window.history.pushState({}, "", url); // met à jour l'URL sans recharger
        }
    }

    // Interception des clics
    document.body.addEventListener("click", (e) => {
        const link = e.target.closest("a.spa-link");
        if (link) {
            e.preventDefault();
            const url = link.getAttribute("href");
            loadPage(url);
        }
    });

    // Rechargement depuis historique (back/forward)
    window.addEventListener("popstate", () => {
        loadPage(window.location.pathname);
    });

    // Chargement initial
    loadPage(window.location.pathname);
});
