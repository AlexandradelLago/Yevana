const Booking = require("../models/Booking");
const Van = require("../models/Van");
const User = require('../models/User');
const Season = require("../models/Season");
const moment = require('moment');


// solo para ADMIN
exports.getBookings = function(req, res, next) {
    Booking.find()
    .populate("_van")
    .populate("_user")
    .then(items=>res.status(200).json(items))
    .catch(e=>res.status(500).send(e));
  }

exports.getBooking = function (req,res,next){
    Booking.findById(req.params.id)
    .then(item => res.status(200).json(item))
    .catch (e=> res.status(500).send(e));
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // USER con el ID y ADMIN
function ArrayDates (start,totalDays){
    
     let arrayDates = [start];
    for (var i=1;i<totalDays+1;i++){
        arrayDates.push(arrayDates[i-1].addDays(1));
    }
    return arrayDates;
    //.datepicker("getDate").toLocalTime().toJSON();
};

exports.postBooking = (req, res, next)=>{
    // paso las fechas a date y a localtime para quitarle el offset de uso horario
    let start = new Date(req.body.values.startDate).toLocalTime();
    let end = new Date (req.body.values.endDate).toLocalTime();
     // The number of milliseconds in one day
     var ONE_DAY = 1000 * 60 * 60 * 24
     var totalDays = Math.round(Math.abs(end - start)/ONE_DAY);
    // hago array de fechas de la reserva
    let arrayDates = ArrayDates(start,totalDays);
    var price=0;

    Van.findById(req.body._van)
    .then(car => {
        Season.find().then(seasons =>{
            console.log("este es el array de fechas "+arrayDates);
            for (i=0;i<=arrayDates.length-1;i++){
                let date = arrayDates[i];
                console.log("este es del array de dates "+date);
                seasons[0].dateSeason.forEach(d=>{
                   let tDate = new Date (d.date).toLocalTime();
                  // console.log("este es del d de season "+tDate)
                    if (tDate.getTime()==date.getTime()){
                        let season= d.season ; 
                        console.log("encontre la fecha en season")
                        switch (season) {
                            case "low":
                                price += car.price[0];
                                break;
                                case "medium":
                                price += car.price[1];
                                break;
                                case "high":
                                console.log(car.price[2]);
                                price += car.price[2];
                                break;
                            default:
                                break;
                        };
                    };

                })
            }


              // User.findById(req.body.user)
        // .then (user => {
        //     console.log(req.body.user)
        
// cambiar por req.user
        // total            : { type: Number, required:true},
            const newBooking = new Booking({
                startDate: start,
                endDate: end,
                total: totalDays ,
                price : price ,
                _van : req.body._van,
                // cuando tenga login pondre req.user en lugar de req.body._user
               // _user : req.body._user
            }); 

        newBooking.save()
        .then(newBookingCreated=>{
            console.log("entre en booking")
            console.log(newBooking)
           /* User.findByIdAndUpdate(req.user._id,
                {$push: {_Bookings: newBookingCreated._id } }, {'new': true})
            .then(userUpdated => res.status(201).json(userUpdated))*/
        })
        .catch(e=>res.status(500).send(e));
   // })
            console.log("este es el precio "+price)
        })
      

    })

};
   
 


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



