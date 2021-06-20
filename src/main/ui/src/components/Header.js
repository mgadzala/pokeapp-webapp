import SearchBar from "./SearchBar"

const Header = ({ onChange }) => {
    return (
        <header className='header'>
            <SearchBar onChange={onChange}/>
        </header>
    )
}

export default Header