const path = require('path');
const Article = require(path.join(PATHS.models, 'articleModel'))

async function editNewArticle(req, res) {
    res.render(path.join(PATHS.views, 'articleEdit'), { article:{} })
}

async function editArticle(req, res) {
    try {
        const article = await Article.findById(req.params.id);
        const { title, content, description,  _id:id} = article;
        res.render(path.join(PATHS.views, 'articleEdit'), { article:{ title, content, description, id} })
    } catch(err) {
        res.send(err)
    }
}


module.exports = { editArticle, editNewArticle }