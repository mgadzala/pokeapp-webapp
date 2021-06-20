import Header from './components/Header'
import DetailedInfo from 'react-modal'
import Grid from './components/Grid'
import SearchHistory from './components/SearchHistory'
import { useState, useEffect, useRef, useCallback } from 'react'


const PokeApp = () => {

    const [loading, setLoading] = useState(true)
    const [hasMore, setHasMore] = useState(false)
    const [pageNumber, setPageNumber] = useState(1);
    const [pokemonSearch, setPokemonSearch] = useState('')
    const [pokemonGridPage, setPokemoneGrid] = useState([])
    const [pokemonDetails, setPokemoneDetails] = useState([])
    const [pokemonDetailsID, setPokemoneDetailsID] = useState(1)
    const [pokemonSearchHistory, setPokemonSearchHistory] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false)



    const offset = 100;

    useEffect(() => {
        setLoading(true)
        const getGridPageFromAPI = async () => {
            const gridPageFromAPI = await fetchGridPage()
            setPokemoneGrid([...pokemonGridPage, ...gridPageFromAPI])
        }
        
        getGridPageFromAPI()
    }, [pokemonSearch, pageNumber])

    useEffect(() => {
         const getPokemonDetailsFromAPI = async () => {
            const pokemonDetails = await fetchPokeDetails()
            setPokemoneDetails(pokemonDetails)
        }
        
        getPokemonDetailsFromAPI()    
    }, [pokemonDetailsID])

    useEffect(() => {
        const getPokemonHistoryFromAPI = async () => {
           const pokemonSearchHistory = await fetchSearchHistory()
           setPokemonSearchHistory(pokemonSearchHistory)
       }
       
       getPokemonHistoryFromAPI()    
   }, [pokemonDetails])



      // Fetch Tasks
    const fetchGridPage = async () => {
        const res = await fetch('http://localhost:8080/api/pokemon/?limit=' +
                                offset + '&offset=' + ((pageNumber - 1) * offset) +
                                '&q=' + pokemonSearch)



        const data = await res.json()

        setHasMore(data.length > 0)
        setLoading(false)
        
        return data
    }

    const fetchPokeDetails = async () => {

        const res = await fetch(`http://localhost:8080/api/pokemon/det/?id=${pokemonDetailsID}`)
                
        const data = await res.json()
        
        return data
    }

    const fetchSearchHistory = async () => {

        const res = await fetch(`http://localhost:8080/api/pokemon/history/`)
                
        const data = await res.json()
        
        return data
    }


    const observer = useRef()
    const lastPokemonElementRef = useCallback(node => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(pageNumber + 1)
        }
      })
      if (node) observer.current.observe(node)
    }, [loading])

    const searchHandle = (e) => {

        setPokemonSearch(e.target.value)
        setPokemoneGrid([])
        setPageNumber(1);

    }

    const historyHandle = (e) => {

        console.log(e);
        setPokemoneDetailsID(e.target.id)
        openModal()
    }

    const closeModal = () => {
        setModalIsOpen(false)
        console.log(modalIsOpen)
    }

    const openModal = () => {
        setModalIsOpen(true)
        console.log(modalIsOpen)
    }

    const renderModal = () => {

        if (pokemonDetails[0] !== undefined && pokemonDetailsID !== 0 ) {
            return ( 
                <DetailedInfo 
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="modal"
                overlayClassName="overlaymodal"
                ariaHideApp={false}
                >
                    <h1>{pokemonDetails[0].name}</h1>
                    <h1>{pokemonDetails[0].height}</h1>
                    <h1>{pokemonDetails[0].weight}</h1>
                </DetailedInfo>
            )
        }

    }

    return (
        <div>
            {renderModal()}
            <Header onChange={searchHandle}/>
            <SearchHistory history={pokemonSearchHistory}/>
            <Grid 
            onClick={historyHandle}
            pokemons={pokemonGridPage}
            lastPokemonElementRef={lastPokemonElementRef}
            length={pokemonGridPage.length}
            />
           
        </div>
    )
}

export default PokeApp
