"use strict";

// Utile
function rand(min, max) {
    max++;
    return Math.floor(Math.random() * (max - min) + min);
}

// Cartes
function createcardnumber(){
    let tab = ["commune","rare","epique","legendaire"];
    tab[0] = [];
    tab[1] = [];
    tab[2] = [];
    tab[3] = [];
    for(let i = 0 ; i < 1000 ; i++){
        tab[0].push(i+1); 
    }
    for(let i = 0; i<100 ; i++){
        tab[1].push(i+1);
    }
    for(let i = 0; i<10 ; i++){
        tab[2].push(i+1);
    }
    tab[3].push(1);
    return tab;
}

function createcard(nom,maison,debutcode){
    let tab = [nom,maison,debutcode];
    tab.push(createcardnumber());
    return tab;
}

function opencard(pers,libre){ //libre = cards[pers][3]
    let tab = ["nom","Rareté","Numero","Maison","Code","num"]
    tab[0] = pers[0];
    let x = rand(1,1110);
    if(x<1000){
        tab[1] = "Commune";
        tab[2] = libre[0][x];
    }
    else if(x<1100){
        tab[1] = "Rare";
        tab[2] = libre[1][x-1000];

    }
    else if(x<1110){
        tab[1] = "Epique";
        tab[2] = libre[2][x-1100];
    }
    else{
        tab[1] = "Legendaire"
        tab[2] = libre[3][0];
    }
    tab[3] = pers[1];
    x++;
    tab[4] = pers[2];
    tab[5] = x;
    if(verifcard(tab,libre) == 0){
        opencard(pers,libre);
    }
    else{
        return tab;
    }
} // Ca nous donne notre carte a nous

//Packs
function openpers(cards,maison){
    let x = rand(0,24);
    let y = cards[x];
    if(maison==0){
        return x;
    }
    else if(maison==y[1]){
        return x;
    }
    else{
        return "false";
    }
} // Ca nous donne une carte 

function verifcard(card,libre){ // libre = cards[openpers()]
    if(card[1] == "Commune"){
        if(libre[0][card[2]] == 0){
            return 0;
        }
        else{
            return card;
        }
    }
    else if(card[1] == "Rare"){
        if(libre[1][card[2]] == 0){
            return 0;
        }
        else{
            return card;
        }
    }
    else if(card[1] == "Epique"){
        if(libre[2][card[2]] == 0){
            return 0;
        }
        else{
            return card;
        }
    }
    else{
        if(libre[3][card[2]] == 0){
            return 0;
        }
        else{
            return card;
        }
    }
}

function openpack(cards,maison){
    let tab = [];
    let cont = document.getElementById("cont");
    for(let i = 0;i < 3;i++){
        let x = "false";
        while(x == "false"){
            x = openpers(cards,maison);
        }
        let y = opencard(cards[x],cards[x][3]);
        let img = document.createElement("img");
        let z = 0;
        if(y[1] == "Commune"){
            z=1000;
        }
        else if(y[1] == "Rare"){
            z=100;
        }
        else if(y[1] == "Epique"){
            z=10;
        }
        else{
            z=1;
        }
        img.classList.add("carte");
        img.src = "../IMG/cartes/" + cards[x][2] + "/" + cards[x][2] + z + ".png";
        cont.appendChild(img);
        tab.push(y);
    }
    return tab;
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

function afficherinventaire(inventaire){
    let nbrcartes = inventaire.length;
    nbrcartes--;
    let conteneur = document.getElementById("sectinv");
    console.log("1");
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
        let cont = document.getElementById("ligne" + k);
        newdiv.classList.add("cardinv");
        console.log("3");
        img.classList.add("ca");
        if(inventaire[i][1] == "Commune"){
            x=1000;
        }
        else if(inventaire[i][1] == "Rare"){
            x=100;
        }
        else if(inventaire[i][1] == "Epique"){
            x=10;
        }
        else{
            x=1;
        }
        img.src = "../IMG/cartes/" + inventaire[i][4] + "/" + inventaire[i][4] + x + ".png";
        cont.appendChild(newdiv);
        newdiv.appendChild(img);
        if(j<4){
            j++;
        }
        else{
            k++;
            j=0;
        }
        
    }

}
let sectioninv = document.getElementById("sectinv");


//Création de l'inventaire 

//btncreate.addEventListener("click", function(event) {
  //  event.preventDefault(); // Empêche le comportement par défaut du formulaire
    //console.log(createacount());
//});
//let a = openpack(cards,0);
//afficherinventaire(inv);
//console.log(window.location.href);

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
