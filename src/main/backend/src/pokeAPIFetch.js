const fetch = require('node-fetch');

async function getJSONfromURL(url) {

    let jsonBlock;

    try {
        let response = await fetch(url);
        jsonBlock = await response.json();
    } catch (e) {
        console.error(e);
    }

    return jsonBlock;

}

module.exports = { getJSONfromURL };