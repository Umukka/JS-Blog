const STATIC_FOLDER = process.env.STATIC_FOLDER;

const { join } = require('path')
const express = require('express');

const rootRoute = require('./routes/rootRoute');
const articleRoute = require('./routes/articleRoute');

const app = express();
app.use(express.static(join(PATHS.root, STATIC_FOLDER)));
app.use(express.urlencoded({ extended: false}));
app.use(require('morgan')('tiny'))
app.set('view engine', 'ejs');

app.use('/', rootRoute);
app.use('/article', articleRoute)

module.exports = app;