const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const bookingSchema = new Schema({
    startDate        : { type: Date , required:true },
    endDate          : { type: Date , required:true},
    total            : { type: Number, required:true},
    price            : {type : Number, required:true},
    paid             : { type: Boolean, default: false},
    _user            : { type: Schema.Types.ObjectId, ref: 'User'},
    _van             :{ type: Schema.Types.ObjectId, ref: 'Van' }
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;