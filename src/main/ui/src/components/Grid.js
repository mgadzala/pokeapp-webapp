import Tile from './Tile'
import { useState, useEffect } from 'react'

const Grid = () => {

    useEffect(() => {
        const fetchGridPokemons = async () => {
            const response = await fetch('http://localhost:8080/api/pokemon/list/')
            const data = await response.json()

            console.log(data)
        }

        fetchGridPokemons()
    }, [])

    const [pokemonGrid, setPokemonGrid] = useState([
    ])

    return (
        <div className="grid" >
            {pokemonGrid.map((pokemon) => (
                <Tile key={pokemon.id} pokemon={pokemon}></Tile>
            ))}
        </div>
    )
}

export default Grid