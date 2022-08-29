const { join } = require('path');
const Article = require( join(PATHS.models, 'articleModel') );


async function loadMainPage(req, res) {
    res.redirect('/article/1')
}

module.exports = { loadMainPage };