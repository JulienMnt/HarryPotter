const searchInput = document.querySelector('.searchI    nput');
searchInput.addEventListener('input', checkInput);

function checkInput(e) {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
        const name = card.querySelector('.namecard').textContent.toLowerCase();
        const search = e.target.value.toLowerCase();
        if (name.includes(search)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}