const Van = require("../models/Van");


// este para USER y para ADMIN - si admin sale boton editar
exports.getVans = function(req, res, next) {
    Van.find()
   // .then(items=>res.render('alquiler/vans',{items:items}))
   // .catch(e=>res.status(500).send(e));
    // estoy es cuando angular
    .then(items=>res.status(200).json(items))
    .catch(e=>res.status(500).send(e));
  }


  exports.getVan = function (req,res,next){
      Van.findById(req.params.id)
      .then(item => res.status(200).json(item))
      .catch (e=> res.status(500).send(e));
  }

//   function checkRoles(role) {
//     return function(req, res, next) {
//       if (req.isAuthenticated() && req.user.role === role) {
//         return next();
//       } else {
//         res.redirect('/login')
//       }
//     }
//   }



  // solo para rol ADMIN
exports.postVan = (req, res, next)=>{
    Van.find()
        .then(VanList => {
            const newVan = new Van({
                price: req.body.price,
                brand: req.body.brand,
                description:{
                    short: req.body.short,
                    long: req.body.long
                },
                image: `/images/Vans/${req.body.image}`,
                features:{
                    motor:req.body.motor,
                    pax:req.body.pax,
                    beds:req.body.beds,
                    fuel:req.body.fuel
                    },
                bookedDays:[]
            });
            
            newVan.save()
            .then(item=>res.status(201).json(item))
            .catch(e=>res.status(500).send(e));
        })

}
// solo para ADMIN
exports.patchVan = (req,res,next)=>{
Van.findByIdAndUpdate(req.params.id, req.body, {new:true})
.then(item=>res.status(200).json(item))
.catch(e=>res.status(500).send(e));
}

// solo para ADMIN
exports.deleteVan = (req,res,next)=>{
Van.findByIdAndRemove(req.params.id)
.then(lists=>res.status(200).json(lists))
.catch(e=>res.status(500).send(e));
}