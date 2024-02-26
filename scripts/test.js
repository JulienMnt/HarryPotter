"use strict";

function rand(min, max) {
  max++;
  return Math.floor(Math.random() * (max - min) + min);
}

function opencard(){
  let x = rand(0,30);
  return fetch("https://hp-api.lainocs.fr/" + x)
    .then((response) => response.json())
    
}
console.log(opencard());