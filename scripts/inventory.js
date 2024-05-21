'use strict';

let token = '';
token = localStorage.getItem('token', token);
console.log(token);

let gryf = document.getElementById('Gryffindor');
let sly = document.getElementById('Slytherin');
let huff = document.getElementById('Hufflepuff');
let raven = document.getElementById('Ravenclaw');

let half = document.getElementById('Mele');
let pure = document.getElementById('Pur');
let muggle = document.getElementById('Moldu');

let reset = document.getElementById('reset');

const searchInput = document.getElementById('searchInput');

let filtres = {
    maison : '',
    blood : '',
};
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
    return json;
};

const filtrerInventaire = async (inventaire,filtre) => {
    let newInventaire = [];
    console.log(inventaire, 'in');
    const promises = inventaire.map(async (card) =>{
        console.log(card, 'card');
        const response = await fetch("https://hp-api.lainocs.fr/characters/" + card, 
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
        });
        const json = await response.json();
        console.log(json, 'jsonoui');
        if((filtre.maison == json.house || filtre.maison == '') && (filtre.blood == json.blood || filtre.blood == '')){
            console.log(json.house, 'name');
            newInventaire.push(json.slug);
            return newInventaire;
        }
    });
    const results = await Promise.all(promises);
    newInventaire = results.filter(result => result !== undefined);

    console.log(newInventaire[0], 'new');
    afficherInventaire(newInventaire[0]);
};
function afficherInventaire(inventaire){
    let container = document.getElementById('container');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
        console.log('remove');
    }
    inventaire.forEach(card => {
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

function checkInput(e) {
    const allCards = document.querySelectorAll('.card');
    console.log('sr')
    allCards.forEach(card => {
        console.log("srea",card.querySelector('.namecard').textContent.toLowerCase());
        const name = card.querySelector('.namecard').textContent.toLowerCase();
        const search = e.target.value.toLowerCase();
        if (name.includes(search)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Usage
recupererInventaire().then(async inventaire => {
    let ilove = JSON.parse(inventaire.cards);
    console.log(ilove, 'il');
    console.log(ilove, 'ilove');

    // Attendre que filtrerInventaire se termine
    filtrerInventaire(ilove, filtres);
});




searchInput.addEventListener('input', checkInput);

gryf.addEventListener('change', (event) =>{
    if(event.target.checked){
        filtres.maison = 'Gryffindor';
        console.log(filtres.maison);
        recupererInventaire().then(async inventaire => {
            let ilove = JSON.parse(inventaire.cards);
            console.log(ilove, 'il');
            console.log(ilove, 'ilove');
            filtrerInventaire(ilove, filtres);
        });
    }
});
sly.addEventListener('change', (event) => {
    if(event.target.checked){
        filtres.maison = 'Slytherin';
        console.log(filtres.maison); 
        recupererInventaire().then(async inventaire => {
            let ilove = JSON.parse(inventaire.cards);
            console.log(ilove, 'il');
            console.log(ilove, 'ilove');
            filtrerInventaire(ilove, filtres);
        }); 
    }
});
huff.addEventListener('change', (event) => {
    if(event.target.checked){
        filtres.maison = 'Hufflepuff';
        console.log(filtres.maison);  
        recupererInventaire().then(async inventaire => {
            let ilove = JSON.parse(inventaire.cards);
            console.log(ilove, 'il');
            console.log(ilove, 'ilove');
            filtrerInventaire(ilove, filtres);
        });
    }
});
raven.addEventListener('change', (event) => {
    if(event.target.checked){
        filtres.maison = 'Ravenclaw';
        console.log(filtres.maison);
        recupererInventaire().then(async inventaire => {
            let ilove = JSON.parse(inventaire.cards);
            console.log(ilove, 'il');
            console.log(ilove, 'ilove');
            filtrerInventaire(ilove, filtres);
        });
    }
});

half.addEventListener('change', (event) => {
    if(event.target.checked){
        filtres.blood = 'Half-Blood';
        console.log(filtres.blood);
        recupererInventaire().then(async inventaire => {
            let ilove = JSON.parse(inventaire.cards);
            console.log(ilove, 'il');
            console.log(ilove, 'ilove');
            filtrerInventaire(ilove, filtres);
        });
    }
});
pure.addEventListener('change', (event) => {
    if(event.target.checked){
        filtres.blood = 'Pure-Blood';
        console.log(filtres.blood);
        recupererInventaire().then(async inventaire => {
            let ilove = JSON.parse(inventaire.cards);
            console.log(ilove, 'il');
            console.log(ilove, 'ilove');
            filtrerInventaire(ilove, filtres);
        });
    }
});
muggle.addEventListener('change', (event) => {
    if(event.target.checked){
        filtres.blood = 'Muggle-Born';
        console.log(filtres.blood);
        recupererInventaire().then(async inventaire => {
            let ilove = JSON.parse(inventaire.cards);
            console.log(ilove, 'il');
            console.log(ilove, 'ilove');
            filtrerInventaire(ilove, filtres);
        });
    }
});
reset.addEventListener('click', () => {
    filtres = {
        maison : '',
        blood : '',
    };
    recupererInventaire().then(async inventaire => {
        let ilove = JSON.parse(inventaire.cards);
        console.log(ilove, 'il');
        console.log(ilove, 'ilove');
        filtrerInventaire(ilove, filtres);
    });
});