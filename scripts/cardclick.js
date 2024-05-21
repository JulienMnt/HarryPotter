document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        const imgSrc = card.querySelector('.imgcard').src;
        const name = card.querySelector('.namecard').textContent;

        // Stocke les informations de la carte dans le localStorage
        localStorage.setItem('cardImg', imgSrc);
        localStorage.setItem('cardName', name);

        // Redirige vers detail.html
        window.location.href = 'detail.html';
    });
});