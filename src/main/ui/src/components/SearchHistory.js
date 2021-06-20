import SearchHistoryTile from "./SearchHistoryTile"

const SearchHistory = ({ history }) => {
    return (
        <div className="searchHistory">
            {history.map((history, index) => {
                return <SearchHistoryTile history={history} key={index}/>  
            })}
        </div>
    )
}

export default SearchHistory
