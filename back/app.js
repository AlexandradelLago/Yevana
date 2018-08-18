require('dotenv').config()
// var app = require('../app');//
// var port = normalizePort(process.env.PORT || '3000');
// app.set('port', port);
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const expressLayouts     = require('express-ejs-layouts');
// passport 
const bodyParser = require('body-parser');
const session = require("express-session");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
require("./config/passport");

var mongoose = require('mongoose');

// var connection = mongoose.connect('mongodb://admin:admin1@ds263571.mlab.com:63571/yevana')
//     .then(console.log("Connected to DB!!"));

// // utilizando variable de entorno y localhost 3000
// mongoose.connect(process.env.LOCAL)
// .then(console.log(`connected to ${process.env.LOCAL}`));

   mongoose.connect(process.env.MONGODB_URL)
  .then(console.log(`connected to ${process.env.MONGODB_URL}`));




//module.exports = connection;

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

// routes 
var usersRouter = require('./routes/users');
const bookingsRouter = require ('./routes/bookings');
const vansRouter = require ('./routes/vans');
const seasonsRouter = require('./routes/seasons');


var app = express();

// cors para la integracion con el front que va a ir en otro puerto, no 3000 si no 4200
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//passport 
app.use(session({
  secret: 'yevana',
  resave: true,
  saveUninitialized: true,
  cookie : { httpOnly: true, maxAge: 2419200000 }
}));

app.use(passport.initialize());
app.use(passport.session());



app.use(logger('dev'));
app.use(express.json());
//añadi esta linea despues del bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/van', vansRouter);
app.use('/booking', bookingsRouter);
app.use('/season', seasonsRouter);

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

app.all('/*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

module.exports = app;



