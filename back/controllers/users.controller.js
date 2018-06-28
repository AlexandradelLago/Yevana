const User = require("../models/User");
// solo para
exports.deleteUser = (req,res,next)=>{
  User.findByIdAndRemove(req.params.id)
  .then(items=>res.status(200).json(items))
  .catch(e=>res.status(500).send(e));
}

// solo para el USER en cuestion 
exports.patchUser = (req,res,next)=>{
  User.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(item=>res.status(200).json(item))
  .catch(e=>res.status(500).send(e));
}

// solo para ADMIN
exports.getUsers = function(req, res, next) {
    User.find()
    .then(items=>res.status(200).json(items))
    .catch(e=>res.status(500).send(e));
  }

  // // falta hacer un getUser
  // exports.getUser = function(req, res, next) {
  //   User.findbyID(req.user._id)
  //   .then(items=>res.status(200).json(items))
  //   .catch(e=>res.status(500).send(e));
  // }

// solo para USER en cuestion
exports.postUser = (req, res, next)=>{
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    newUser.save()
    .then(item=>res.status(201).json(item))
    .catch(e=>res.status(500).send(e));
  }





 
