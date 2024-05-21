document.addEventListener('DOMContentLoaded', (event) => {
    const emailInput = document.getElementById('email');

    // Check if there's a stored email and set it to the input field
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
        emailInput.value = storedEmail;
    }

    // Store the email when the user is about to leave the page
    window.addEventListener('beforeunload', () => {
        const email = emailInput.value;
        localStorage.setItem('email', email);
    });
});