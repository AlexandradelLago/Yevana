var mongoose = require("mongoose"),
Schema = mongoose.Schema,
objectId = mongoose.Schema.ObjectId;

var seasonSchema = new Schema({
    dateSeason: { type: Array, required: true }
    // arry de 364 dates con alto, bajo, medio string al lado
});

var Season = mongoose.model('Season', seasonSchema);

module.exports = Season;