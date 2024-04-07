let form = document.querySelector('form');
console.log(form);
form.addEventListener('submit', async (e)=> {
    e.preventDefault();
    let email = document.querySelector('input[name="email"]').value;
    let password = document.querySelector('input[name="password"]').value;
    
    let data = { email: email, password: password};
    console.log(data);
    fetch('http://10.188.13.73:3001/auth/login',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(json => {
        console.log(json.token);
        token = json.token;
        localStorage.setItem('token',token);
        window.location.href = "../Pages/compte.html";
    })
})