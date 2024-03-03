"use strict";

function rand(min, max) {
  max++;
  return Math.floor(Math.random() * (max - min) + min);
}
let button = document.getElementById("button");
let bt = document.getElementById("bt");

let inv = [];

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
}

inv.push(opencard(0));
inv.push(opencard(0));
inv.push(opencard(0));
inv.push(opencard(0));

console.log(inv[2]);


