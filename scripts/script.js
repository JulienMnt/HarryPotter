"use strict";

// Utile
function rand(min, max) {
    max++;
    return Math.floor(Math.random() * (max - min) + min);
}

// Cartes

async function opencard(maison) {
    inventairestring = localStorage.getItem("inventaire");
    inventaire = JSON.stringify(inventairestring);
    let response = await fetch('https://hp-api.onrender.com/api/characters', {
        headers: {
            'Origin': 'https://hp-api.onrender.com/api/characters'
        }
    });

    if (response.ok) {
        let data = await response.json();
        let numAleatoire = Math.floor(Math.random() * 24);
        let randomCharacter = data[numAleatoire];
        if (maison == 0){
            inventaire.push(randomCharacter.id);
        }
        else{
            if(randomCharacter.maison == maison){
            inventaire.push(randomCharacter.id);
            }
            else{
                opencard(maison);
            }
        }
        inventairestring = JSON.stringify(inventaire);
        localStorage.setItem("inventaire", inventairestring);
    }
}



//Packs




function openpack(maison){
    for(i=0;i<3;i++){
        opencard(maison);
    }
}

function afficherpack(){

}

//Player 

function createacount(e){
    e.preventDefault();
    let compte = ["E-Mail","Pseudo","MDP","Inventaire","NumCompte"];
    let emailvaleur = document.getElementById("email").value;
    let pseudovaleur = document.getElementById("pseudo").value;
    let mdpvaleur = document.getElementById("mdp").value;
    let mdpcvaleur = document.getElementById("mdpc").value;
    let mdpcerreur = document.getElementById("mdpcerreur");
    compte[0] = emailvaleur;
    compte[1] = pseudovaleur;
    if(mdpvaleur == mdpcvaleur){
        compte[2] = mdpvaleur;
        mdpcerreur.textContent = "";
    }
    else{
        mdpcerreur.textContent = "Les deux mots de passe ne correspondent pas";
        compte [2] = 0;
    }

    return compte;
}
function verifiercompte(compte,comptes){
    nbrcomptes = comptes.length;
    let passwordregex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,?~\\/-]).{8,}$/;
    for(let i=0;i<nbrcomptes;i++){
        acc = comptes[i];
        let x = 0;
        if(acc[0] = compte[0]){
            emailerror.textContent = "Un compte est deja connecté a cette adresse e-mail";
            x = 1;
        }
        if(acc[1]){
            pseudoerror.textContent = "Le pseudo est deja utilisé"
            x = 1;
        }
        if(passwordregex.test(compte[2] && compte[2].length >= 8)){
            x = 0;
        }
        else{
            mdperror.textContent = "Le mot de passe doit contenir au moins une majuscule une minuscule et un caractère spécial et faire au moins 8 caractères";
            x = 1;
        }
        compte[4] = nbrcomptes;
        if(x = 1){
            return 0;
        }
        else{
            return compte;
        }
    }
}


//Orga html


let sectioninv = document.getElementById("sectinv");


//Création de l'inventaire 

//btncreate.addEventListener("click", function(event) {
  //  event.preventDefault(); // Empêche le comportement par défaut du formulaire
    //console.log(createacount());
//});
//let a = openpack(cards,0);
//afficherinventaire(inv);
//console.log(window.location.href);

if (localStorage.getItem('init') !== "1" ) {

    let cards =[];
    let comptes = [];
    let register = "false";
    let inventaire = [];

    let inventairestring = JSON.stringify(inventaire);
    let cardstring = JSON.stringify(cards);
    let comptestring = JSON.stringify(comptes);
    let registerstring = JSON.stringify(register);
    localStorage.setItem("inventaire",inventairestring);
    localStorage.setItem("cards", cardstring);
    localStorage.setItem("comptes",comptestring);
    localStorage.setItem("register",registerstring); 
    localStorage.setItem("init", "1");
}
if(window.location.href === "file:///C:/Users/julie/Documents/GitHub/HarryPotter/Pages/packs.html"){
    let cardstring = localStorage.getItem("cards");
    let cards = JSON.parse(cardstring);
    let comptestring = localStorage.getItem("comptes");
    let comptes = JSON.parse(comptestring);
    let registerstring = localStorage.getItem("register");
    let register = JSON.parse(registerstring);
    let inventairestring = localStorage.getItem("inventaire");
    let inventaire = JSON.parse(inventairestring);

    console.log(register);
    let pack = document.getElementById("pack");
    pack.addEventListener("click", function() {
        localStorage.setItem("maison", 0);
    });
    let packg = document.getElementById("packg");
    packg.addEventListener("click", function() {
        localStorage.setItem("maison", "Gryffondor");
    });
    let packs = document.getElementById("packs");
    packs.addEventListener("click", function() {
        localStorage.setItem("maison", "Serpentard");
    });
    let packse = document.getElementById("packse");
    packse.addEventListener("click", function() {
        localStorage.setItem("maison", "Serdaigle");
    });
    let packp = document.getElementById("packp");
    packp.addEventListener("click", function() {
        localStorage.setItem("maison", "Poufsouffle");
    });


    cardstring = JSON.stringify(cards);
    localStorage.setItem("cards", cardstring);
    comptestring = JSON.stringify(comptes);
    localStorage.setItem("comptes",comptestring);
    localStorage.setItem("register",registerstring);
    inventairestring = JSON.stringify(inventaire);
    localStorage.setItem("inventaire",inventairestring);

}
if(window.location.href === "file:///C:/Users/julie/Documents/GitHub/HarryPotter/Pages/openpack.html"){
    let cardstring = localStorage.getItem("cards");
    let cards = JSON.parse(cardstring);
    let comptestring = localStorage.getItem("comptes");
    let comptes = JSON.parse(comptestring);
    let registerstring = localStorage.getItem("register");
    let register = JSON.parse(registerstring);
    let maison = localStorage.getItem("maison");
    let inventairestring = localStorage.getItem("inventaire");
    let inventaire = JSON.parse(inventairestring);

    let a = []
    console.log(a);
    //console.log(cards);
    //console.log(maison);
    let x = openpack(cards,maison);
    console.log(x);
    inventaire.push(x[0],x[1],x[2]);
    console.log(inventaire);

    cardstring = JSON.stringify(cards);
    localStorage.setItem("cards", cardstring);
    comptestring = JSON.stringify(comptes);
    localStorage.setItem("comptes",comptestring);
    localStorage.setItem("register",registerstring);
    inventairestring = JSON.stringify(inventaire);
    localStorage.setItem("inventaire",inventairestring);
}
if(window.location.href === "file:///C:/Users/julie/Documents/GitHub/HarryPotter/Pages/inventaire.html"){
    let cardstring = localStorage.getItem("cards");
    let cards = JSON.parse(cardstring);
    let comptestring = localStorage.getItem("comptes");
    let comptes = JSON.parse(comptestring);
    let registerstring = localStorage.getItem("register");
    let register = JSON.parse(registerstring);
    let maison = localStorage.getItem("maison");
    let inventairestring = localStorage.getItem("inventaire");
    let inventaire = JSON.parse(inventairestring);

    afficherinventaire(inventaire);
    console.log(inventaire);

    cardstring = JSON.stringify(cards);
    localStorage.setItem("cards", cardstring);
    comptestring = JSON.stringify(comptes);
    localStorage.setItem("comptes",comptestring);
    localStorage.setItem("register",registerstring);
    inventairestring = JSON.stringify(inventaire);
    localStorage.setItem("inventaire",inventairestring);
}
if(window.location.href === "file:///C:/Users/julie/Documents/GitHub/HarryPotter/Pages/register.html"){
    let btncreate = document.querySelector("btcreate");
    let cardstring = localStorage.getItem("cards");
    let cards = JSON.parse(cardstring);
    let comptestring = localStorage.getItem("comptes");
    let comptes = JSON.parse(comptestring);
    let registerstring = localStorage.getItem("register");
    let register = JSON.parse(registerstring);
    let inventairestring = localStorage.getItem("inventaire");
    let inventaire = JSON.parse(inventairestring);

    let x = 0;
    btncreate.addEventListener("click", function() {
        e.preventDefault();
        let x = createacount(); // Appel à la fonction createacount()
        console.log(x); // Afficher x dans la console après l'exécution de createacount().
    });

    cardstring = JSON.stringify(cards);
    localStorage.setItem("cards", cardstring);
    comptestring = JSON.stringify(comptes);
    localStorage.setItem("comptes",comptestring);
    localStorage.setItem("register",registerstring);
    inventairestring = JSON.stringify(inventaire);
    localStorage.setItem("inventaire",inventairestring);
}

/* let conexion = document.getElementById("compte");
if(register == 0){
    compte.href = "../Pages/register.html"
}
else{
    compte.href = "../Pages/compte.html"
}*/
console.log(window.location.href);
