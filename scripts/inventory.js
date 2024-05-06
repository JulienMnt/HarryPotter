'use strict';

let token = '';
token = localStorage.getItem('token', token);
console.log(token);
let filtres = {
    maison : 'Gryffindor',
    blood : '',
    role : '',
};
const recupererUserId = async () => {
    const response = await fetch('http://localhost:3001/user/',{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' , 'x-acces-token' : token},
    });
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

const filtrerInventaire = (inventaire,filtre) => {
    let newInventaire = [];
    inventaire.forEach(card => {
        if(filtre.maison == card.house || filtre.maison == '' && filtre.blood == card.blood || filtre.blood == '' && filtre.role == card.role || filtre.role == ''){
            newInventaire.push(card);
        }
    });
    console.log(newInventaire);
    return newInventaire;
};
// Usage
recupererInventaire().then(inventaire => {
    let ilove = JSON.parse(inventaire);
    console.log(ilove);
    filtrerInventaire(ilove,filtres);
});
