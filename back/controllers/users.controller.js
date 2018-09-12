const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport       = require("passport");
const bcryptSalt     = 2;

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
    console.log(req.user);
    User.findById(req.params.id)
    .then(items=>res.status(200).json(items))
    .catch(e=>res.status(500).send(e));
  }

// solo para USER en cuestion -- cambiar ya que es un signup 
exports.postUser = (req, res, next)=>{
  console.log("este es el req.body de User  s"+req.body)
  let hashPass = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(bcryptSalt), null);
  console.log(hashPass);
    const newUser = new User({
     // name: req.body.name,
      username:req.body.username,
      email: req.body.email,
      password: hashPass,
      //role:req.body.role
    });

    newUser.save()
    .then(item=>res.status(201).json(item))
    .catch(e=>res.status(500).send(e));
  }




exports.signUp = (req,res,next)=>{
  if (!req.body.username || !req.body.password||!req.body.email) {
    res.status(400).json({ message: "Provide all the fields to sign up" });
  }

  User.findOne({ username:req.body.username }, "username", (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: "The username already exists" });
      return;
    }

    let hashPass = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(bcryptSalt), null);
    console.log(hashPass);

    let newUser  = new User({
      username:req.body.username,
      password: hashPass,
      email:req.body.email
    });
   
    console.log(newUser);

//Nueva forma de guardar el user , con Promesas
    console.log("llego a guardar")
    newUser.save()
      .then(user => {
        //esto es opcional, hago que se logee directamente tras signup
        req.login(user, (err) => {
          if (err) { return res.status(500).json({ message: "Something went wrong" });}
          return res.status(200).json(req.user);
        })
      .catch(err => res.status(400).json({ message: "Something went wrong" }))
      })
  });
  
}

exports.login = (req,res,next)=>{
     passport.authenticate("local", (err, user, info) => {
      if (err) { return res.status(401).json(err); }
      if (!user) { return res.status(401).json(info); }
  
      req.login(user, (err) => {
        if (err) { return res.status(500).json({ message: "Something went wrong" }); }
        return res.status(200).json(req.user);
      });
    })(req, res, next);
}

exports.logout = (req, res, next) => {
  
    req.logout();
    res.status(200).json({ message: 'Success' });
  }

exports.loggedin = (req, res, next) => {
  console.log("estoy dentro de logged in")
    if (req.isAuthenticated()) {return res.status(200).json(req.user);}
      return  res.status(403).json({ message: 'Unauthorized' });;
}
  
   
  






 
