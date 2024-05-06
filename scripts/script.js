"use strict";

// Utile
function rand(min, max) {
    max++;
    return Math.floor(Math.random() * (max - min) + min);
}
function fetchpersonnage(id){
    return fetch("https://hp-api.onrender.com/api/character/" + id)
        .then((response) => response.json())
} // Retourne l'api d'un personnage en particulier avec son id

if(document.title == "Packs"){
    let comptestring = localStorage.getItem("comptes");
    let comptes = JSON.parse(comptestring);
    let registerstring = localStorage.getItem("register");
    let register = JSON.parse(registerstring);
    let inventairestring = localStorage.getItem("inventaire");
    let inventaire = JSON.parse(inventairestring);

    console.log(register);
    console.log(document.title);
    let pack = document.getElementById("pack");
    pack.addEventListener("click", function() {
        localStorage.setItem("maison", 0);
    });
    let packg = document.getElementById("packg");
    packg.addEventListener("click", function() {
        localStorage.setItem("maison", "Gryffindor");
    });
    let packs = document.getElementById("packs");
    packs.addEventListener("click", function() {
        localStorage.setItem("maison", "Slytherin");
    });
    let packse = document.getElementById("packse");
    packse.addEventListener("click", function() {
        localStorage.setItem("maison", "Ravenclaw");
    });
    let packp = document.getElementById("packp");
    packp.addEventListener("click", function() {
        localStorage.setItem("maison", "Hufflepuff");
    });


    comptestring = JSON.stringify(comptes);
    localStorage.setItem("comptes",comptestring);
    localStorage.setItem("register",registerstring);
    inventairestring = JSON.stringify(inventaire);
    localStorage.setItem("inventaire",inventairestring);

}
console.log(window.location.href);
