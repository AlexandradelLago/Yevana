require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const bodyParser = require('body-parser');

// passport 
const session = require("express-session");
const passport = require("passport");


// routes 
var usersRouter = require('./routes/users');
const bookingsRouter = require ('./routes/bookings');
const vansRouter = require ('./routes/vans');
const seasonsRouter = require('./routes/seasons');
const frontRouter = require('./routes/web');


// añado metodos a Date++++++++++++++++++
Date.prototype.addDays = function (days) {
  var dat = new Date(this.valueOf())
  dat.setDate(dat.getDate() + days);
  return dat;
}

Date.prototype.toLocalTime = function () {
      return new Date(this.getTime() - (this.getTimezoneOffset() * 60000));
}
//++++++++++++++++++++++++++++++++



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


var mongoose = require('mongoose');
mongoose.connect("mongodb://admin:admin1@ds263571.mlab.com:63571/yevana")
.then(console.log("connected to mongodb://admin:admin1@ds263571.mlab.com:63571/yevana")) 
.catch((err) => {
  console.log("Not Connected to Database ERROR! "+err);
 });


// cors para la integracion con el front que va a ir en otro puerto, no 3000 si no 4200
const corsOptions= {
  origin:true,
  credentials:true
}
app.use(cors(corsOptions));

// mongoose.connect(process.env.MONGODB_URL)
// .then(console.log(`connected to ${process.env.MONGODB_URL}`)) 
// .catch((err) => {
//   console.log("Not Connected to Database ERROR! "+err);
//  });



app.use(logger('dev'));
app.use(express.json());
//añadi esta linea despues del bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//passport 
app.use(session({
  secret: 'yevana',
  resave: true,
  saveUninitialized: true,
  cookie : { httpOnly: true, maxAge: 2419200000 }
}));

// Passport configuration
require("./config/passport")(passport,app);


app.use('/', frontRouter);
app.use('/api/user', usersRouter);
app.use('/api/van', vansRouter);
app.use('/api/booking', bookingsRouter);
app.use('/api/season', seasonsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.all('/*', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html');
// });


module.exports = app;



