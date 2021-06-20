import PropTypes from 'prop-types'

const Tile = ({ pokemon }) => {
    return (
        <div className="tile">
            <h1>{pokemon.name}</h1>
            <p>{pokemon.habitat}</p>
        </div>
    )
}

Tile.defaultProps = {
    pokemon: "placeholder"
}

export default Tile
