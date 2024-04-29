let form = document.querySelector('form');
console.log(form);
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let email = document.querySelector('input[name="email"]').value;
    let pseudo = document.querySelector('input[name="pseudo"]').value;
    let password = document.querySelector('input[name="password"]').value;

    let data = {
        pseudo: pseudo,
        email: email,
        password: password,
    };
    console.log(data);
    try {
        const response = await fetch('http://localhost:3001/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        
        const inventoryResponse = await fetch('http://localhost:3001/inventory/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idUser: jsonResponse.id, cards: '' }),
        });
        const inventoryJson = await inventoryResponse.json();
        console.log(inventoryJson);

        const token = jsonResponse.token;
        console.log(token);
        localStorage.setItem('token', token);
        window.location.href = '../Pages/login.html';
    } catch (error) {
        console.error('Error:', error);
    }
});