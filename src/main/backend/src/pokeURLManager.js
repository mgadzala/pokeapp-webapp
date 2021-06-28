const PokeAPIParser = require('./pokeAPIParser.js');

const urlAPI = 'https://pokeapi.co/api/v2/';
const pokemon = 'pokemon';
const habitat = 'pokemon-habitat/';

async function getTotalListOfPokemonURL() {

    let totalCount = await PokeAPIParser.getNumberOfPokemonsFromAPI(urlAPI + pokemon);

    return urlAPI + pokemon + "?limit=" + totalCount + "&offset=0";

}

async function getHabitatURL() {

    return urlAPI + habitat;

}

async function getPokemonURL(id) {

    return urlAPI + pokemon + '/' + parseInt(id);

}

module.exports = { getTotalListOfPokemonURL, getHabitatURL, getPokemonURL }