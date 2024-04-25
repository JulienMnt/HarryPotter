"use strict";

function rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

async function opencard(house){
    let data = [];
    let card = [];
    let response = await fetch("https://hp-api.lainocs.fr/characters",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }}
    )
    if (response.ok) {
        data = await response.json();
    }
    let slug = data[rand(0,30)].slug
    let response2 = await fetch(`https://hp-api.lainocs.fr/characters/${slug}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    if (response2.ok) {
        card = response2.json();
    }
    if((card.house != house || card.house == "") && card.house != 0) opencard(house);
    return card;
}

//function openpack{}

console.log(opencard('Slytherin'));