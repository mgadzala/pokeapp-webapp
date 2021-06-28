const express = require('express');
const router  = express.Router();

const PokemonWrapper = require('../pokemonWrapper.js');
const PokemonList    = require('../pokemonList.js');

// Routing
router.get('/list/', function(req, res) {
    res.send(PokemonList.getPokemonList());
});


router.get('/', async function(req, res) {
    try {
        let page = await PokemonList.getPokemonPageWithQuery(
            req.query.limit,
            req.query.offset,
            req.query.q
        )
        res.send(page)
    } catch (error) {
        console.log(error);
    }
    
});

router.get('/det/', async function(req, res) {
    try {
        let details = await PokemonWrapper.getPokemonDetails(
            req.query.id
        )
        res.send(details);
    } catch (error) {
        console.log(error);
    }
});

router.get('/history/', async function(req, res) {
    try {
        let history = await PokemonWrapper.getHistoryQueue()
        res.send(history);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;