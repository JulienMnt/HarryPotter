document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('burgermenu');
    const toggleContent = document.getElementById('burgercontenu');

    toggleButton.addEventListener('click', function() {
        if (toggleContent.classList.contains('hidden')) {
            toggleContent.classList.remove('hidden');
            toggleContent.classList.add('burgercontenu');
        } else {
            toggleContent.classList.add('hidden');
            toggleContent.classList.remove('burgercontenu');
        }
    });
});