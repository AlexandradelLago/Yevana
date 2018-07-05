var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://localhost/yevana')
    .then(console.log("Connected to DB!!"));

//module.exports = connection;


// routes 
//var indexRouter = require('./routes/index');
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

app.use(logger('dev'));
app.use(express.json());
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



