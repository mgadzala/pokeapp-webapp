const Tile = ({ pokemon, lastPokemonElementRef, onClick}) => {
    return (
        <div id={pokemon.id} ref={lastPokemonElementRef} className="tile" style={habitatColor(pokemon.habitat)} onClick={onClick}>
            <div className="tile-elements">
                <h1>{pokemon.name}</h1>
                <p>{pokemon.habitat}</p>
            </div>
            
        </div>
    )
}

// tile color based on pokemons habitat
const habitatColor = (habitat) => {

    switch(habitat) {
        case "cave":
            return { background: "Sienna" }
            break
        case "forest":
            return { background: "SeaGreen" }
            break
        case "grassland":
            return { background: "SpringGreen" }
            break
        case "mountain":
            return { background: "Peru" }
            break
        case "rare":
            return { background: "Silver" }
            break
        case "rough-terrain":
            return { background: "Thistle" }
            break
        case "sea":
            return { background: "Turquoise" }
            break
        case "urban":
            return { background: "Yellow" }
            break
        case "waters-edge":
            return { background: "SandyBrown" }
            break
        case "nohabitat":
            return { background: "SlateGrey" }
            break
        default:
            return { background: "Plum" }
            break
    }

}

export default Tile
