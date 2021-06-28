let pokemonList = [];

function createList(list) {

    pokemonList = list;

}

function getPokemonList() {

    return pokemonList;

}

function getPokemonPageWithQuery(numberOfPokemons, offset, query) {

    if (query === '') {

        return getPokemonsPageWithoutQuery(numberOfPokemons, offset);

    } else {

        return getQueriedPokemonsPage(numberOfPokemons, offset, query);

    }

}

function getPokemonsPageWithoutQuery(numberOfPokemons, offset) {

    return pokemonList.slice(parseInt(offset), parseInt(offset) + parseInt(numberOfPokemons));

}

function getQueriedPokemonsPage(numberOfPokemons, offset, query) {

    let queryResult = pokemonList.filter((pokemon, index) => {

        if (pokemon.name.indexOf( query ) > -1) {
            return pokemonList[index];
        }

    })

    return queryResult.slice(parseInt(offset), parseInt(offset) + parseInt(numberOfPokemons));

}

module.exports = { createList, getPokemonList, getPokemonPageWithQuery }