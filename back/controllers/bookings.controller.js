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
    .then(items=>{
        res.status(200).json(items)
    })
    .catch(e=>res.status(500).send(e));
  }

  exports.getBookingsbyVan = function(req, res, next) {
    Booking.find({"_van" : req.params._van})
    .populate("_van")
    .populate("_user")
    .then(items=>res.status(200).json(items))
    .catch (e=> res.status(500).send(e));
  
  }

exports.getBooking = function (req,res,next){
    Booking.findById(req.params.id)
    .populate("_van")
    .populate("_user")
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
};
function TotalDays(start,end){
    var ONE_DAY = 1000 * 60 * 60 * 24
    var totalDays = Math.round(Math.abs(end - start)/ONE_DAY);
    return totalDays;
}

function GetPrice(car,arrayDates,seasons){
    let price=0;
    for (i=0;i<=arrayDates.length-1;i++){
        let date = arrayDates[i];
        seasons[0].dateSeason.forEach(d=>{
         let tDate = new Date (d.date);
          if (tDate.getTime()==date.getTime()){
              let season= d.season ; 
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
                      }  
          }
        })  
      }
      return price;
}


exports.postBooking = (req, res, next)=>{
    console.log("este es mi req.body "+JSON.stringify(req.body))
    // paso las fechas a date y a localtime para quitarle el offset de uso horario
    let start = new Date(req.body.startDate).toLocalTime();
    let end = new Date (req.body.endDate).toLocalTime();
     // The number of milliseconds in one day
    let totalDays= TotalDays(start,end);
    // hago array de fechas de la reserva
    let arrayDates = ArrayDates(start,totalDays);
    Booking.find({$and: [ {"_van" : req.body._van }, {$or:[ { $and: [{"startDate":{$gte: start}},{"endDate":{$lte:end}} ] },{ $and: [{"startDate":{$lte: start}},{"endDate":{$gte:end}} ] },{ $and:[ {"startDate":{$gte:start}},{"startDate":{$lte:end}},{"endDate":{$gte:end}} ] },{$and:[{"startDate":{$lte:start}},{"endDate":{$gte:start}},{"endDate":{$lte:end}}]}]}]})
    .then(b=> {
        console.log("longitud de los bookings "+b.length);
                if (b.length==0){
                    Van.findById(req.body._van)
                    .then(car => {
                        console.log("este es mi car "+car);
                        Season.find().then(seasons =>{
                           console.log("este es el array de fechas "+arrayDates);
                           const newBooking = new Booking({
                           startDate: start,
                           endDate: end,
                           total: totalDays ,
                           price : GetPrice(car,arrayDates,seasons),
                           _van : req.body._van,
                           // cuando tenga login pondre req.user en lugar de req.body._user
                           _user : req.body._user
                            }); 

                            newBooking.save()
                            .then(newBookingCreated=>res.status(201).json(newBookingCreated))
                            .catch(e=>res.status(500).send(e));
                       });
                            });
                       
                }else{
                    res.status(500).json("hay overlapping")
                }
    })
    .catch(e=>res.status(500).send(e));

      
};

// hacer put 


// // user con el ID y ADMIN
// exports.patchBooking = (req,res,next)=>{
// Booking.findByIdAndUpdate(req.params.id, req.body, {new:true})
// .then(item=>res.status(200).json(item))
// .catch(e=>res.status(500).send(e));
// }

// user con el ID y ADMIN
exports.patchBooking = (req,res,next)=>{
    console.log("el req body de put "+JSON.stringify(req.body));
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



