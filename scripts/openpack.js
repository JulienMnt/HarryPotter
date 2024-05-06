'use strict';

let token = '';
token = localStorage.getItem('token', token);
console.log(token);

function rand(min, max) {
    max++;
    return Math.floor(Math.random() * (max - min) + min);
}

fetch('http://localhost:3001/user/',{
    method: 'GET',
    headers: { 'Content-Type': 'application/json' , 'x-acces-token' : token},
})
.then(response => response.json())
.then(json => {
    console.log(json);
    const idUser = json.id;
    console.log(idUser);
    fetch('http://localhost:3001/inventory/getuser', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'iduser' : idUser},
    })
    .then(response => response.json())
    .then(json =>
        fetch('https://hp-api.lainocs.fr/characters/',{
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
        })
        .then(response => response.json())
        .then(jsonapi => {
            console.log(jsonapi);
            const addCards = async() => {
                for(let i = 0; i<3 ; i++) {
                        await fetch('http://localhost:3001/inventory/addcard', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            idUser: idUser,
                            card: jsonapi[rand(0,29)].slug
                        })
                    })
                    .then(response => response.json())
                    .then(jsoninv => console.log(jsoninv))
                };
            }
            addCards();
        })
        
    )
})