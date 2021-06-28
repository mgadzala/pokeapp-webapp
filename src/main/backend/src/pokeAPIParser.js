const PokeAPIFetch = require('./pokeAPIFetch');

async function getNumberOfPokemonsFromAPI(url) {

    let jsonObject = await PokeAPIFetch.getJSONfromURL(url)

    return jsonObject.count;

}

async function getPokemonListFromAPI(listURL, habitatURL) {

    let jsonPokemonNameList = await PokeAPIFetch.getJSONfromURL(listURL);
    let jsonPokemonHabitatList = await PokeAPIFetch.getJSONfromURL(habitatURL);

    let habitatLUT = await createHabitatLUT(jsonPokemonHabitatList, habitatURL);

    let pokemonNameList = jsonPokemonNameList['results'].map((function(pokemon) {
        pokemonInfo = { "name": pokemon.name,
                        "id": pokemon.url.split("/")[6],
                        "habitat": 'nohabitat'};
        return pokemonInfo;
    }))

    for (pokemons of pokemonNameList)
        for (habitats of habitatLUT) {
            if (habitats.name === pokemons.name) {
                pokemons.habitat = habitats.habitat;
            }
        }

    
    return pokemonNameList;

}

async function createHabitatLUT(habitatList, habitatURL) {

    numberOfHabitats = habitatList.count

    let habitatLUT = [];

    for (let i = 1; i <= numberOfHabitats; i++) {

        let jsonHabitat = 
            await PokeAPIFetch.getJSONfromURL(habitatURL + '/' + i);

        let habitatName  = jsonHabitat.name;
        let habitatArray = jsonHabitat['pokemon_species']

        let currentHabitat = habitatArray.map((function(pokemon) {
            habitatInfo = { "name": pokemon.name,
                            "habitat": habitatName}
            return habitatInfo;
        }));

        habitatLUT = [...habitatLUT, ...currentHabitat]

    }

    return habitatLUT;

}

async function getPokemonDetailsFromAPI(url) {

    let pokemonInfo = await PokeAPIFetch.getJSONfromURL(url);

    const pokemonDetails = [{
        name: pokemonInfo.name,
        id: pokemonInfo.id,
        height: pokemonInfo.height,
        weight: pokemonInfo.weight
    }];

    return pokemonDetails;

}

module.exports = { getNumberOfPokemonsFromAPI, getPokemonListFromAPI, getPokemonDetailsFromAPI };