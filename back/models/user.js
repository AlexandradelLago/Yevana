var mongoose = require("mongoose"),
Schema = mongoose.Schema,
objectId = mongoose.Schema.ObjectId;
const PassportLocalMongooseMail = require("passport-local-mongoose-email");

var userSchema = new Schema({
    password: { type: String, required: [true, 'Please enter your password'],
    minlength: [6, 'Name must be greater than 6 characters']},
    email:{type:String,match: /.+@.+/, required:[true, 'Please enter your email']},
    username: { type: String, default: "USER" },
    name:{type:String, default: "USER"},
    role:{
        type:String,
        enum:["USER", "COLABORATOR", "ADMIN"],
        default: "USER"
    }
});
userSchema.plugin(PassportLocalMongooseMail)
var User = mongoose.model('User', userSchema);

module.exports = User;


