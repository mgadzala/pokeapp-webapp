import Tile from './Tile'

const Grid = ({ pokemons, onClick, lastPokemonElementRef, length }) => {

    return (
        <div className="grid" >
            {pokemons.map((pokemon, index) => {
                console.log(length);
                if (length === index + 1) {
                    return <Tile lastPokemonElementRef={lastPokemonElementRef} key={pokemon.id} pokemon={pokemon} onClick={onClick}/>
                }
                else {
                    return <Tile  key={pokemon.id} pokemon={pokemon} onClick={onClick}/>
                }      
            })}
        </div>
    )
}

export default Grid