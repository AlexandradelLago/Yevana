var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://localhost/yevana')
    .then(console.log("Connected to DB!!"));

module.exports = connection;