var express = require('express'),
    router = express.Router(),
    path = require("path");

var absPath = path.join(__dirname, "../../front");

// route to handle home page 

router.get('/',function(req,res,next){
    res.sendFile(absPath+"/src/index.html");
});

module.exports = router;