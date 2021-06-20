import PropTypes from 'prop-types'

const Tile = ({ pokemon, lastPokemonElementRef, onClick}) => {
    return (
        <div id={pokemon.id} ref={lastPokemonElementRef} className="tile" onClick={onClick}>
            <div className="tile-elements">
                <h1>{pokemon.name}</h1>
                <p>{pokemon.habitat}</p>
            </div>
            
        </div>
    )
}

Tile.defaultProps = {
    pokemon: ""
}

export default Tile
