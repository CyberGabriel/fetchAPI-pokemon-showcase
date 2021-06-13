let submitBtn = document.querySelector('#submitIdBtn');
let submitRandom = document.querySelector('#randomIdBtn');
let choosePoke = document.querySelector('#choosePoke');
let myPokemon = document.querySelector('.pokemon');
let image = myPokemon.querySelector('#pokeImg');
let header = myPokemon.querySelector('.pokeName');
let displayStats = myPokemon.querySelector('.displayStats');
let idNumber = myPokemon.querySelector('.idNumber');
let pokeType = myPokemon.querySelector('.pokeType');
let hitpoints = myPokemon.querySelector('.hitpoints');
let attack = myPokemon.querySelector('.attack');
let defense = myPokemon.querySelector('.defense');
let move1 = myPokemon.querySelector('.move1');
let move2 = myPokemon.querySelector('.move2');
let move3 = myPokemon.querySelector('.move3');
let move4 = myPokemon.querySelector('.move4');
let name = "";
let randomPokemonId;
let sprite;
let moves;
let stats;
let movesArr;


submitBtn.addEventListener('click', () => {
    choosePoke.value = Math.abs(choosePoke.value);
    (choosePoke.value < 1)? choosePoke.value = 1 : (choosePoke.value > 898)? choosePoke.value = 898 : choosePoke.value = Math.round(choosePoke.value);
    displayPokemon(choosePoke.value);
    choosePoke.value = "";
});

submitRandom.addEventListener('click', () => {
    randomPokemonId = Math.round(Math.random() * 898);
    displayPokemon(randomPokemonId);
});

function displayPokemon (pokemonId) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then(response => response.json())
    .then(pokemon => {
    name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    header.innerText = name;
    idNumber.innerText = `id: ${pokemonId}`;
    pokeType.innerText = `type: ${pokemon.types[0].type.name}`;
	sprite = pokemon.sprites.front_default;
    moves = pokemon.moves;
    stats = pokemon.stats;
    hitpoints.innerText = `HP: ${stats[0].base_stat}`;
    attack.innerText = `ATT: ${stats[1].base_stat}`;
    defense.innerText = `DEF: ${stats[2].base_stat}`;
    image.setAttribute('src', sprite);
    movesArr = [];
    if (moves == "") {
        [move1.innerText, move2.innerText, move3.innerText, move4.innerText] = ["This Pokemon has no known moves.", "", "", ""];
    } else {
        for (let i = 0; i < 4; i++) {
            movesArr.push(moves[i].move.name);
        }
        [move1.innerText, move2.innerText, move3.innerText, move4.innerText] = movesArr;
    }
    })
    .catch(err => {
	    console.log(err);
    })
}
