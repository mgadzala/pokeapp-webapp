const SearchBar = () => {

    const onClick = () => {
        console.log('click');
    }

    return (
        <form action="/" method="get" onClick={onClick}>
            <input
                type="text"
                placeholder="XD"
            />
        </form>
    )
}

export default SearchBar
