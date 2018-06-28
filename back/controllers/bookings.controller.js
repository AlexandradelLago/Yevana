const Booking = require("../models/Booking");
const Van = require("../models/Van");
const User = require('../models/User');
const Season = require("../models/Season");
const moment = require('moment');

// solo para ADMIN
exports.getBookings = function(req, res, next) {
    Booking.find()
    .populate("_van")
    .then(items=>res.status(200).json(items))
    .catch(e=>res.status(500).send(e));
  }

  // USER con el ID y ADMIN
exports.postBooking = (req, res, next)=>{
    // days-- change to dates!!
    console.log(req.body)
   /* var result = moment(req.body.endDate,"YYYY-MM-DD HH:mm:ss" ).diff(req.body.startDate,"YYYY-MM-DD HH:mm:ss" )
    var hours = moment.duration(result);
    var finalResult = hours.asHours();
    finalResult = Math.round(finalResult)*/
    
    Van.findById(req.body._van)
    .then(car => {
        const newBooking = new Booking({
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            //total: 50,
            _van : req.body._van,
            _creator : req.user._id
        });

        newBooking.save()
        .then(newBookingCreated=>{
           /* User.findByIdAndUpdate(req.user._id,
                {$push: {_Bookings: newBookingCreated._id } }, {'new': true})
            .then(userUpdated => res.status(201).json(userUpdated))*/
        })
        .catch(e=>res.status(500).send(e));
      })
}

// user con el ID y ADMIN
exports.patchBooking = (req,res,next)=>{
Booking.findByIdAndUpdate(req.params.id, req.body, {new:true})
.then(item=>res.status(200).json(item))
.catch(e=>res.status(500).send(e));
}

// user con el ID y ADMIN
exports.deleteBooking = (req,res,next)=>{
Booking.findByIdAndRemove(req.params.id)
.then(lists=>res.status(200).json(lists))
.catch(e=>res.status(500).send(e));
}