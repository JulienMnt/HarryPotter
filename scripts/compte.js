let token = '';
token = localStorage.getItem('token', token);
console.log(token);

fetch('http://10.188.13.73:3001/user', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'x-acces-token' : token},
        
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            let bvn = document.getElementById('bvn');
            bvn.textContent = 'Bonjour ' + json.pseudo + '!';
            let rst = document.getElementById('rst');
            rst.textContent = 'Email :' + json.email;
    }) 
