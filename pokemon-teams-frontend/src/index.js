const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainBody = document.getElementById("mainBody")

fetch('http://127.0.0.1:3000/trainers')
    .then(res => res.json())
    .then(trainerArr => {
        trainerArr.forEach(trainerObj => renderOneCard(trainerObj))
    })

    function renderOneCard(trainerObj){
        
        const trainerCard = document.createElement('div')
            trainerCard.dataset.id = trainerObj.id
            trainerCard.classList.add('card') 
        const detH3 = document.createElement('h3')
            detH3.textContent = trainerObj.name
            
        const addBttn = document.createElement('button')
            addBttn.dataset.trainerId = trainerObj.id
            addBttn.classList.add('add-button')
            addBttn.textContent = "Add Pokemon"
            addBttn.addEventListener('click', evt => {
                addPokemon(trainerObj);
            })

        trainerCard.append(detH3, addBttn);
        
            let pokeUl = document.createElement('ul');
                pokeUl.dataset.id = trainerObj.id;
                pokeUl.classList.add('pokemonList');
                trainerCard.append(pokeUl);
                
            const pokeArr = trainerObj.pokemons
                pokeArr.forEach(pokeMon => {
                    const pokeLi = document.createElement('li')
                        pokeLi.innerHTML = `${pokeMon.nickname} (${pokeMon.species})<button class="release" data-pokemon-id="${pokeMon.id}">Release</button>
                        `
                        pokeUl.append(pokeLi);
                }) 
        mainBody.append(trainerCard);

    }

function addPokemon(trainerObj){
    if(trainerObj.pokemons.length < 6){
        fetch('http://localhost:3000/pokemons', {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({trainer_id: trainerObj.id})
        })
        .then(res => res.json())
        .then(console.log)
    }
}