const DetailedInfo = ({ pokemon }) => {

    console.log(pokemon);
    return (
        <div>
            <h1>{pokemon[0].name}</h1>
            <h1>{pokemon[0].height}</h1>
            <h1>{pokemon[0].weight}</h1>
            <p>2</p>
        </div>
    )
}

export default DetailedInfo
