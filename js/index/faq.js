document.querySelectorAll('.small-hc-faq-item').forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('open');
    });
});