"use strict";

function rand(min, max) {
  max++;
  return Math.floor(Math.random() * (max - min) + min);
}
let button = document.getElementById("button");

let inventaire = [];

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
          inventaire.push(randomCharacter.id);
      }
      else{
          if(randomCharacter.house == maison){
          inventaire.push(randomCharacter.id);
          }
          else{
              opencard(maison);
          }
      }
      console.log(inventaire);
  }
}
button.addEventListener("click", opencard(0));
