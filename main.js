const path = require('path');

require('dotenv').config();
global.PATHS = {
  views: path.join(__dirname, 'views'),
  controllers: path.join(__dirname, 'controllers'),
  routes: path.join(__dirname, 'routes'),
  models: path.join(__dirname, 'models'),
  root: __dirname,
}


const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;

const mongoose = require('mongoose');
const server = require('./server.js');

mongoose.connect(DB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('open', () => {
    console.log(`Connected database on ${DB_URI}`)
    server.listen(PORT, () => {
        console.log(`Server is listening on http://localhost:${PORT}`)
    })
})
