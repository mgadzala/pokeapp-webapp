import Header from './components/Header'
import Modal from 'react-modal'
import DetailedInfo from './components/DetailedInfo'
import Grid from './components/Grid'
import SearchHistory from './components/SearchHistory'
import { useState, useEffect, useRef, useCallback } from 'react'


const PokeApp = () => {

    const [firstLoad, setFirstLoad] = useState(true)
    const [loading, setLoading] = useState(true)
    const [loadingDetails, setLoadingDetails] = useState(true)
    const [hasMore, setHasMore] = useState(false)
    const [pageNumber, setPageNumber] = useState(1);
    const [pokemonSearch, setPokemonSearch] = useState('')
    const [pokemonGridPage, setPokemoneGrid] = useState([])
    const [pokemonDetails, setPokemoneDetails] = useState([])
    const [pokemonDetailsID, setPokemoneDetailsID] = useState(1)
    const [pokemonSearchHistory, setPokemonSearchHistory] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const offset = 100;

    // grid content fetch hook
    useEffect(() => {
        setLoading(true)
        const getGridPageFromAPI = async () => {
            const gridPageFromAPI = await fetchGridPage()
            setPokemoneGrid(prevPokemonGridPage => {
                return [...new Set([...prevPokemonGridPage, ...gridPageFromAPI])]})
        }
        getGridPageFromAPI()
    }, [pokemonSearch, pageNumber])

    // modal content fetch hook
    useEffect(() => {
        setLoadingDetails(true)
         const getPokemonDetailsFromAPI = async () => {
            const pokemonDetails = await fetchPokeDetails()
            setPokemoneDetails(pokemonDetails)
        }
        
        (firstLoad == true ) ? setFirstLoad(false) : getPokemonDetailsFromAPI()    
    }, [pokemonDetailsID])

    // side history fetch hook
    useEffect(() => {
        const getPokemonHistoryFromAPI = async () => {
           const pokemonSearchHistory = await fetchSearchHistory()
           setPokemonSearchHistory(pokemonSearchHistory)
       }
       
       getPokemonHistoryFromAPI()    
   }, [pokemonDetails])


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

        setLoadingDetails(false)
        
        return data
    }

    const fetchSearchHistory = async () => {
        const res = await fetch(`http://localhost:8080/api/pokemon/history/`)               
        const data = await res.json()
        
        return data
    }

    // Setting observer to the last tile of the visible grid
    const observer = useRef()
    const lastPokemonElementRef = useCallback(node => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      // async observing if element is visible in window
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
        setPokemoneDetailsID(e.target.id)
        openModal()
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }

    const openModal = () => {
        setModalIsOpen(true)
    }

    // react-modal logic
    const renderModal = () => {
        if (pokemonDetails[0] !== undefined && pokemonDetailsID !== 0 ) {
            return ( 
                <Modal 
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="modal"
                overlayClassName="overlaymodal"
                ariaHideApp={false}
                >
                    {loadingDetails == false ? (
                        <DetailedInfo pokemon={pokemonDetails}/>
                    ) : ""}
                </Modal>
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
            loading={loading}
            />
           
        </div>
    )
}

export default PokeApp
