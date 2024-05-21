let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(n) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Afficher la première diapositive au chargement de la page
showSlide(currentSlide);

// Automatiser le changement de diapositives toutes les quelques secondes (par exemple, toutes les 5 secondes)
setInterval(nextSlide, 5000);