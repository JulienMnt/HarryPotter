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

// Cartes

async function opencard(maison){
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
            return randomCharacter.id;
        }
        else{
            if(randomCharacter.house == maison){
            return randomCharacter.id;
            }
            else{
                return opencard(maison);
            }
        }
    }
} //Récupere l'id d'une carte aléatoire avec l'api




//Packs




async function openpack(maison){
    let tab = [];
    for(let i=0 ; i<3 ; i++){
        tab[i] = await opencard(maison);
        let cont = document.getElementById("cont");
        let contener = document.createElement("div");
        let titre = document.createElement("h3");
        let data = await fetchpersonnage(tab[i]);
        console.log(data[0].image);
        let img = document.createElement("img");
        img.classList.add("carte");
        titre.classList.add("titre");
        titre.textContent = data[0].name;
        img.src = data[0].image;
        contener.appendChild(img);
        contener.appendChild(titre);
        cont.appendChild(contener);
    }
    return tab;
} // Avec la function opencard récupere les cartes aléatoires de l'api et les affiches

async function afficherinventaire(inventaire){
    let nbrcartes = inventaire.length;
    let conteneur = document.getElementById("sectinv");
    for(let i=0;i<nbrcartes;i++){
        let nouvellediv = document.createElement("div");
        nouvellediv.classList.add("ligne");
        nouvellediv.id = "ligne"+ i;
        conteneur.appendChild(nouvellediv);
        console.log("2");
    }
    let j = 0;
    let k = 0;
    for(let i=0;i<nbrcartes +1;i++){
        let x = 0;
        let newdiv = document.createElement("div");
        let img = document.createElement("img");
        let titre = document.createElement("h3");
        let cont = document.getElementById("ligne" + k);
        newdiv.classList.add("cardinv");
        console.log("3");
        img.classList.add("ca");
        titre.classList.add("titre");
        let data = await fetchpersonnage(inventaire[i]);
        console.log(data);
        titre.textContent = data[0].name;
        img.src = data[0].image;
        cont.appendChild(newdiv);
        newdiv.appendChild(img);
        newdiv.appendChild(titre);
        if(j<4){
            j++;
        }
        else{
            k++;
            j=0;
        }
    }
} // Récupere les données de l'inventaire et affiche les images de l'API

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

    let comptes = [];
    let register = "false";
    let inventaire = [];

    let inventairestring = JSON.stringify(inventaire);
    let comptestring = JSON.stringify(comptes);
    let registerstring = JSON.stringify(register);
    localStorage.setItem("inventaire",inventairestring);
    localStorage.setItem("comptes",comptestring);
    localStorage.setItem("register",registerstring); 
    localStorage.setItem("init", "1");
}
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
if(document.title == "Open pack"){
    (async function () {
        let comptestring = localStorage.getItem("comptes");
        let comptes = JSON.parse(comptestring);
        let registerstring = localStorage.getItem("register");
        let register = JSON.parse(registerstring);
        let maison = localStorage.getItem("maison");
        let inventairestring = localStorage.getItem("inventaire");
        let inventaire = JSON.parse(inventairestring);

        //console.log(cards);
        //console.log(maison);
        let x = await openpack(maison);
        console.log(x);
        inventaire.push(x[0], x[1], x[2]);
        console.log(inventaire);


        comptestring = JSON.stringify(comptes);
        localStorage.setItem("comptes", comptestring);
        localStorage.setItem("register", registerstring);
        inventairestring = JSON.stringify(inventaire);
        localStorage.setItem("inventaire", inventairestring);
    })();
}
if(document.title == "Inventaire"){
    let comptestring = localStorage.getItem("comptes");
    let comptes = JSON.parse(comptestring);
    let registerstring = localStorage.getItem("register");
    let register = JSON.parse(registerstring);
    let maison = localStorage.getItem("maison");
    let inventairestring = localStorage.getItem("inventaire");
    let inventaire = JSON.parse(inventairestring);

    afficherinventaire(inventaire);
    console.log(inventaire);


    comptestring = JSON.stringify(comptes);
    localStorage.setItem("comptes",comptestring);
    localStorage.setItem("register",registerstring);
    inventairestring = JSON.stringify(inventaire);
    localStorage.setItem("inventaire",inventairestring);
}
if(document.title === "Register"){
    let btncreate = document.querySelector("btcreate");
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
