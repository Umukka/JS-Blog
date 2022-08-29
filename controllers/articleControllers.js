const { join } = require('path');
const Article = require(join(PATHS.models, 'articleModel'))

async function articleRead(req, res) {
    try {
        let article = await Article.findById(req.params.id);
        console.log(article)
        const { 
            title, description, content, visitCount,updated_at
        } = article;
        res.render(join(PATHS.views, 'articleRead'), {
            article: { 
                title, description, content, visitCount, updated_at:updated_at.toLocaleDateString()
            }
        })
    } catch (err) {
        res.json(err)
    }
}

async function createArticle(req, res) {
    let { title, content, description } = req.body;
    let article = await Article.create({
        title, content, description,
    })

    res.redirect(301, '/article/edit/' + article._id)
}

async function saveArticle(req, res) {
    let { title, content, description } = req.body;
    let article = await Article.findByIdAndUpdate(req.params.id, {
        title, content, description,
    })

    res.redirect(302, '/article/edit/' + req.params.id)
}

async function deleteArticle(req, res) {
    try {
        let article = await Article.findByIdAndDelete(req.params.id);
        console.log('hey')
        res.redirect(302, '/')
    } catch (err) {
        res.redirect(404, '/')
    }
}

async function searchArticle(req, res) {
    try {
        let articles = await Article.find({title:{$regex:req.query.search_query}}).limit(6);
        const { 
            title, description, content, visitCount,updated_at
        } = articles;
        articles = articles.map(( article ) => ({
            title: article.title, 
            description: article.description, 
            visitCount:article.visitCount, 
            id:article._id, 
            createdAt: new Date(article.created_at).toLocaleDateString(),
        }))
        res.render(join(PATHS.views, 'index'), { articles })
    } catch(err) {

    }
}

async function loadMoreArticle(req, res) {
    let articles = await Article.find({})
        .sort({visitCount: 1, createdAt: 1})
        .limit(req.params.order*5);
    articles = articles.slice(req.params.order*5-5).map(( article ) => ({
        title: article.title, 
        description: article.description, 
        visitCount:article.visitCount, 
        id:article._id, 
        createdAt: new Date(article.created_at).toLocaleDateString(),
    }))

    console.log()
    res.render(join(PATHS.views, '/index'), { articles, order: req.params.order })
}

module.exports = { createArticle, saveArticle, deleteArticle, articleRead, searchArticle, loadMoreArticle };
