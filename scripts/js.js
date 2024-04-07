let form = document.querySelector('form');
    console.log(form);
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        let email = document.querySelector('input[name="email"]').value;
        let pseudo = document.querySelector('input[name="pseudo"]').value;
        let password = document.querySelector('input[name="password"]').value;

        let data = {
            pseudo: pseudo, email : email, password : password,
        }
        console.log(data);
        fetch('http://10.188.13.73:3001/auth/signup',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            token = json['token'];
            console.log(token);
            localStorage.setItem('token', token);
            window.location.href = '../Pages/login.html';
        })
        .catch(error => console.error('Error:', error))
    
    })
