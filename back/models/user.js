var mongoose = require("mongoose"),
Schema = mongoose.Schema,
objectId = mongoose.Schema.ObjectId;

var userSchema = new Schema({
    password: { type: String, default: "ADMIN" },
    email:{type:String, default: "ADMIN"},

   username: { type: String, default: "ADMIN" },
    name:{type:String, default: "ADMIN"},
//     password: { type: String, required: true },
//     email:{type:String, required:false},

//    username: { type: String, required: true },
//     name:{type:String, required:true},
    role:{
        type:String,
        enum:["USER", "COLABORATOR", "ADMIN"],
        default: "ADMIN"
    },
});

var User = mongoose.model('User', userSchema);

module.exports = User;


