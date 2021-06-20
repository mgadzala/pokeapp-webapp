const SearchHistoryTile = ({ history }) => {
    return (
        <div id={history.id} className="history-tile">
            <p>{history.name}</p>
        </div>
    )
}

export default SearchHistoryTile
