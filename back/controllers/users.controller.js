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

  // falta hacer un getUser
  exports.getOne = function(req, res, next) {
    User.findById(req.params.id)
    .then(items=>res.status(200).json(items))
    .catch(e=>res.status(500).send(e));
  }

// solo para USER en cuestion
exports.postUser = (req, res, next)=>{
  console.log("este es el req.body de User  s"+req.body)
    const newUser = new User({
      name: req.body.name,
      username:req.body.username,
      email: req.body.email,
      password: req.body.password,
      //role:req.body.role
    });

    newUser.save()
    .then(item=>res.status(201).json(item))
    .catch(e=>res.status(500).send(e));
  }





 
