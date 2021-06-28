const express   = require('express');
const cors      = require('cors');

const PokemonWrapper = require('./pokemonWrapper.js');
const logURL         = require('./mware/logURL.js');

// init
const app = express();
PokemonWrapper.createPokemonList();

// use middleware
app.use(logURL);
app.use(cors());
app.use('/api/pokemon', require('./api/routes.js'));

// listen on port
app.listen(8080, () => console.log(`Server started on port 8080`));