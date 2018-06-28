const Season = require("../models/Season");

// solo para ADMIN todas las funcionalidades 

exports.deleteSeason = (req,res,next)=>{
  Season.findByIdAndRemove(req.params.id)
  .then(items=>res.status(200).json(items))
  .catch(e=>res.status(500).send(e));
}


exports.patchSeason = (req,res,next)=>{
  Season.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(item=>res.status(200).json(item))
  .catch(e=>res.status(500).send(e));
}

exports.getSeasons = function(req, res, next) {
    Season.find()
    .then(items=>res.status(200).json(items))
    .catch(e=>res.status(500).send(e));
  }

exports.postSeason = (req, res, next)=>{
    const newSeason = new Season({
      dateSeason: req.body.dateSeason
    });

    newSeason.save()
    .then(item=>res.status(201).json(item))
    .catch(e=>res.status(500).send(e));
  }
