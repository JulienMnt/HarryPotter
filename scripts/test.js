"use strict";

function rand(min, max) {
  max++;
  return Math.floor(Math.random() * (max - min) + min);
}

function idtoslug(id){
  switch(id){
    case 1:
      return "harry-potter";
    case 2:
      return "ron-weasley";
    case 3:
      return "draco-malfoy";
    case 4:
      return "hermione-granger";
    case 5:
      return "minerva-mcgonagall";
    case 6:
      return "severus-snape";
    case 7:
      return "albus-dumbledore";
    case 8:
      return "lord-voldemort";
    case 9:
      return "sirius-black";
    case 10:
      return "bellatrix-lestrange";
    case 11:
      return "neville-longbottom";
    case 12:
      return "cedric-diggory";
    case 13:
      return "gregory-goyle";
    case 14:
      return "vincent-crabble";
    case 15:
      return ""          
  }
}

function opencard(){
  let x = rand(1,30);
  let y = fetch("https://hp-api.lainocs.fr//characters")
    .then((response) => response.json())
  return y[x];
}
console.log(opencard());