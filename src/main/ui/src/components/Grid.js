import Tile from './Tile'

const Grid = ({ pokemons }) => {

    return (
        <div className="grid" >
            {pokemons.map((pokemon, id) => (             
                <Tile key={id} pokemon={pokemon}/>
            ))}
        </div>
    )
}

export default Grid