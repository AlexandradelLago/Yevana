var mongoose = require("mongoose"),
Schema = mongoose.Schema,
objectId = mongoose.Schema.ObjectId;

var vanSchema = new Schema({
    price: {type:Array, required:true},
    brand: { type: String, default: 'Vios' },
    description       :{
        short: { type: String },
        long: {type:String}
    },
    image:{type:String, required:true},
    features:{
    motor:{type:String,required:true },
    pax:{type:Number,required:true },
    beds:{type:Number,required:true },
    fuel:{type:String,required:true }
    }
});

var Van = mongoose.model('Van', vanSchema);

module.exports = Van;





