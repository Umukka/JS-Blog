const { join } = require('path');
const express = require('express');

const { editNewArticle, editArticle } = require(join(PATHS.controllers, 'articleEditorControllers'))
const { 
    createArticle, 
    saveArticle, deleteArticle, 
    articleRead, 
    searchArticle,
    loadMoreArticle,
} = require(join(PATHS.controllers, 'articleControllers'))

const router = express.Router();

router.get('/read/:id', articleRead);
router.get('/edit', editNewArticle)
router.get('/edit/:id', editArticle);
router.get('/:order', loadMoreArticle);
router.post('/save/', createArticle);
router.post('/save/:id', saveArticle);
router.post('/delete/:id', deleteArticle);
router.get('/search', searchArticle);

module.exports = router;