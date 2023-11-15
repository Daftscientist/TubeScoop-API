const { default: axios } = require('axios');

function reform_url(id){
    // reforms the url using the id. (uniformly formats the url)
    return `https://www.youtube.com/watch?v=${id}`;
}

exports.index =  function (request, response){

    // if no search term was provided, return an error
    if (!request.body.search) {
        return response.status(400).send('No search term provided');
    }

    
    
}