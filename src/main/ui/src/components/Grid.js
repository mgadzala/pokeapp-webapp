import Tile from './Tile'

const Grid = ({ pokemons, onClick, lastPokemonElementRef, length, loading }) => {

    return (
        <div className="grid" >
            {pokemons.map((pokemon, index) => {
                if (length === index + 1) {
                    return (loading == false) ? (<Tile lastPokemonElementRef={lastPokemonElementRef} key={pokemon.id} pokemon={pokemon} onClick={onClick}/>) : "" 
                }
                else {
                    return <Tile  key={pokemon.id} pokemon={pokemon} onClick={onClick}/>
                }      
            })}
        </div>
    )
}

export default Grid