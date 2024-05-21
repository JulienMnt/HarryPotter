'use strict';

let token = '';
token = localStorage.getItem('token', token);
console.log(token);

function rand(min, max) {
    max++;
    return Math.floor(Math.random() * (max - min) + min);
}

const recupererUserId = async () => {
    const response = await fetch('http://localhost:3001/user/',{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' , 'x-acces-token' : token},
    });
    if(!response.ok){
        console.log('error');
        return;
    }
    const json = await response.json();
    console.log(json,'de');
    return json;
};
const recupererInventaire = async () => {
    let user = await recupererUserId();
    console.log(user, 'user');
    let idUser = JSON.stringify(user.id);
    console.log(idUser, 'iduser');
    const response = await fetch('http://localhost:3001/inventory/getuser', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'iduser' : idUser},
        });
    const json = await response.json();
    console.log(json, 'json');
    return json;
};
const recupererApi = async () => {
    const response = await fetch('https://hp-api.lainocs.fr/characters/',{
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
        });
    const json = await response.json();
    return json;
};
const afficher = async (inventaire) =>{
    inventaire = JSON.parse(inventaire.cards);
    let start = inventaire.length - 3;
    console.log(start, 'start')
    let container = document.getElementById('container');
    inventaire.slice(start).forEach(card => {
        fetch("https://hp-api.lainocs.fr/characters/" + card)
        .then(response => response.json())
        .then(data => {
            let img = data.image;
            let name = data.name;
            const newcard = document.createElement('section');
            newcard.classList.add('card');
            newcard.innerHTML = `
                <img class="imgcard" src="${img}" alt="${name}">  
                <h2 class="namecard">${name}</h2>
            `;
            container.appendChild(newcard);
        });
    });
}

const open = async () => {
    let user = await recupererUserId();
    let idUser = JSON.stringify(user.id);
    console.log(idUser, 'iduser');
    let api = await recupererApi();
    for(let i = 0; i<3 ; i++) {
        console.log("i=",i);
            let slug = api[rand(0,29)].slug;
            const response = await fetch('http://localhost:3001/inventory/addcard', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                idUser: idUser,
                card: slug,
            })
        });
    }
} 


open().then(() => {
    recupererInventaire().then(afficher);
});