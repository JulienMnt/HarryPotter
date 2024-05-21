window.addEventListener('DOMContentLoaded', () => {
    const imgSrc = localStorage.getItem('cardImg');
    const name = localStorage.getItem('cardName');

    console.log(imgSrc, name);

    // Fetch l'API pour obtenir plus d'informations
    fetch('https://hp-api.lainocs.fr/characters')
        .then(response => response.json())
        .then(data => {
            const character = data.find(character => character.name === name);
            console.log(character);
            let container = document.getElementById('container');
            let titre = document.createElement('h2');
            titre.classList.add('nm');
            titre.textContent = character.name;
            container.appendChild(titre);

            const dv = document.createElement('div');
            dv.classList.add('dv');

            const newcard = document.createElement('section');
            newcard.classList.add('card');
            newcard.innerHTML = `
                <img class="imgcard" src="${character.image}" alt="${character.name}">  
                <h2 class="namecard">${character.name}</h2>
            `;
            dv.appendChild(newcard);

            const infos = document.createElement('div');
            infos.classList.add('infos');
            infos.innerHTML = `
                <p>Maison: ${character.house}</p>
                <p>Espece: ${character.species}</p>
                <p>Sang: ${character.blood}</p>
                <p>Patronus: ${character.patronus}</p>
                <p>Role: ${character.role}</p>
            `;
            dv.appendChild(infos);
            container.appendChild(dv);
        });
});