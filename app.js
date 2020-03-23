const express = require('express');
const mongoose = require('mongoose');

mongoose.connect(
    'mongodb+srv://user:aN41&82@cluster0-dzvce.mongodb.net/test?retryWrites=true&w=majority',
    {useNewUrlParser: true}
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db is works');  
});

const app = express();
app.use(express.json());
const gameController = require('./controller');
app.use('/', gameController);

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(503).send('Something broke!');
});

module.exports = app;