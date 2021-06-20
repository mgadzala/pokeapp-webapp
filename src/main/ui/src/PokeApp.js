import Header from './components/Header'
import Grid from './components/Grid'
import SearchHistory from './components/SearchHistory'
import { useState, useEffect } from 'react'


const PokeApp = () => {

    const [pageNumber, setPageNumber] = useState(1);
    const [pokemonSearch, setPokemonSearch] = useState('')
    const [pokemonGridPage, setPokemoneGrid] = useState([])

    const offset = 20;

    useEffect(() => {
        const getGridPageFromAPI = async () => {
            const gridPageFromAPI = await fetchGridPage()
            setPokemoneGrid(gridPageFromAPI)
        }
        

        getGridPageFromAPI()
    }, [pokemonSearch, pageNumber])


      // Fetch Tasks
    const fetchGridPage = async () => {
        const res = await fetch('http://localhost:8080/api/pokemon/?limit=' +
                                offset + '&offset=' + ((pageNumber - 1) * offset) +
                                '&q=' + pokemonSearch)
        const data = await res.json()

        return data
    }

    const searchHandle = (e) => {

        setPokemonSearch(e.target.value)
        setPageNumber(1)

    }

    return (
        <div>
            <Header onChange={searchHandle}/>
            <SearchHistory />
            <Grid 
            pokemons={pokemonGridPage}
            />
           
        </div>
    )
}

export default PokeApp
