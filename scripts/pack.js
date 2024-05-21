'use strict';

let token = '';
token = localStorage.getItem('token', token);
console.log(token);
let container = document.getElementById('container');

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
    let createdAt = user.created_at;
    console.log(idUser, 'iduser');
    createdAt = new Date(createdAt);
    console.log(createdAt, 'created_at');
    const response = await fetch('http://localhost:3001/inventory/getuser', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'iduser' : idUser},
        });
    const json = await response.json();
    console.log(json, 'json');
    console.log(json.updated_at, 'json');
    const updatedAt = new Date(json.updated_at);
    const currentTime = new Date();

    if ((currentTime - updatedAt) <= 24*60*60*1000 &&  Math.abs(createdAt.getTime() - updatedAt.getTime()) > 5000) {
        console.log('updated_at is within the last 24 hours');
        let timeRemaining = 24*60*60*1000 - (currentTime - updatedAt);

    // Update the countdown every second
    const countdown = setInterval(() => {
        timeRemaining -= 1000;
        let t = document.createElement('section');
        const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        t.innerHTML = `
        <h2 class='deja'> Vous avez deja ouvert votre pack du jour !</h2>
        <p class='next'> Prochain pack dans </p>
        <p class='temps'>${hours} : ${minutes} : ${seconds}</p>`;
        container.innerHTML = '';
        container.appendChild(t);
    }, 1000);

    } 
    else {
        console.log('updated_at is more than 24 hours ago');
    }
    return json;
};

recupererInventaire();