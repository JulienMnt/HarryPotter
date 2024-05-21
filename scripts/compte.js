let token = '';
token = localStorage.getItem('token', token);
console.log(token);
btn = document.getElementById('deco');


fetch('http://localhost:3001/user', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'x-acces-token' : token},
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            console.log(json.pseudo);
            if (json.pseudo === undefined) {
                window.location.href = "../Pages/login.html";
            }
            let bvn = document.getElementById('bvn');
            bvn.textContent = 'Bonjour ' + json.pseudo + '!';
            let rst = document.getElementById('rst');
            rst.textContent = 'Email :' + json.email;
    }) 
btn.addEventListener("click", function(){
    localStorage.setItem('token', '');
    window.location.href = "../Pages/login.html";
});
