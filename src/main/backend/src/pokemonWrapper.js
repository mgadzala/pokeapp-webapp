const PokeURLManager = require('./pokeURLManager.js');
const PokemonList    = require('./pokemonList.js');
const PokeAPIParser  = require('./pokeAPIParser.js');

let historyQueue = [];

async function createPokemonList() {

    pokemonList = await PokeAPIParser.getPokemonListFromAPI(
        await PokeURLManager.getTotalListOfPokemonURL(),
        await PokeURLManager.getHabitatURL());


    PokemonList.createList(pokemonList);

}

async function getPokemonDetails(id) {

    let pokemonDetails = await PokeAPIParser.getPokemonDetailsFromAPI(
        await PokeURLManager.getPokemonURL(id));

    addToHistoryQueue(pokemonDetails);

    return pokemonDetails;

}

async function addToHistoryQueue(pokemonDetails) {

    let isInHistory = false;

    for (pokemons of historyQueue) {
        if (pokemons.name === pokemonDetails[0].name) {
            isInHistory = true;
        }
    }

    if (isInHistory) {
        return;
    }
    
    historyQueue.unshift(pokemonDetails[0])

    if (historyQueue.length > 10) {
        historyQueue.pop();
    }

}

async function getHistoryQueue() {

    return historyQueue;

}

module.exports = { createPokemonList, getPokemonDetails, getHistoryQueue }