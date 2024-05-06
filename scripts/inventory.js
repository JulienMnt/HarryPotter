'use strict';

let token = '';
token = localStorage.getItem('token', token);
console.log(token);

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
        console.log(json)
    )
})



