var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var router = express.Router();
var trains=[
  {name:'Jan Shatabdi',TotalSeats:500,AvailableSeats:500},
  {name:'Chemmozhi Express',TotalSeats:200,AvailableSeats:200},
  {name:'PandianExpress',TotalSeats:200,AvailableSeats:200},
  {name:'Chennai Express',TotalSeats:200,AvailableSeats:200},
]

router.get('/',function(req,res,next){
  res.render('index',{title:'Express'});
});

router.get('/train',function(req,res,next){
  res.render('train',{count:trains.length,trains:trains});
});
router.post('/train',function(req,res,next){
  console.log(Object.keys(req.body)[0]);
  check=Object.keys(req.body)[0];
  for (train in trains)
  {
    if (trains[train].name==check)
    {
      console.log(trains[train].name);
      trains[train].AvailableSeats-=1;
    }
  }
  res.render('train',{count:trains.length,trains:trains});
});
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);


app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
