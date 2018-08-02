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

  exports.getBookingsbyVan = function(req, res, next) {
    Booking.find({"_van" : req.params._van})
    .populate("_van")
    .populate("_user")
    .then(items=>res.status(200).json(items))
    .catch (e=> res.status(500).send(e));
  
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
                      }  
          }
        })  
      }
      return price;
}


exports.postBooking = (req, res, next)=>{
    // paso las fechas a date y a localtime para quitarle el offset de uso horario
    let start = new Date(req.body.values.startDate).toLocalTime();
    let end = new Date (req.body.values.endDate).toLocalTime();
     // The number of milliseconds in one day
    let totalDays= TotalDays(start,end);
    // hago array de fechas de la reserva
    let arrayDates = ArrayDates(start,totalDays);
    console.log("estoy aqui")
    // tengo que mirar bien la query de mongoose para hacer el filtrado !!!!!
    Booking.find({$or:[ { $and: [{"startDate":{$gte: start}},{"endDate":{$lte:end}} ] },{ $and: [{"startDate":{$lte: start}},{"endDate":{$gte:end}} ] },{ $and:[ {"startDate":{$gte:start}},{"startDate":{$lte:end}},{"endDate":{$gte:end}} ] },{$and:[{"startDate":{$lte:start}},{"endDate":{$gte:start}},{"endDate":{$lte:end}}]}]})
    .then(b=> {
        console.log("longitud de los bookings "+b.length);
                if (b.length==0){
                    Van.findById(req.body._van)
                    .then(car => {
                        let price = 0;
                        Season.find().then(seasons =>{
                            console.log("este es el array de fechas "+arrayDates);
                           var price = GetPrice(car,arrayDates,seasons);
                           console.log("ya he salido de price"+price)
                           const newBooking = new Booking({
                           startDate: start,
                           endDate: end,
                           total: totalDays ,
                           price : price ,
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
                    console.log("hay overlapping")
                }
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



