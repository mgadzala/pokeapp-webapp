const DetailedInfo = ({ pokemon }) => {

    console.log(pokemon);
    return (
        <div>
            <h1>{pokemon[0].name}</h1>
            <h1>Height: {pokemon[0].height}</h1>
            <h1>Weight: {pokemon[0].weight}</h1>
        </div>
    )
}

export default DetailedInfo
