var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cors=require('cors')
var cookieParser = require('cookie-parser');
var bodyParser=require('body-parser')
var logger = require('morgan');
const mongoose=require('mongoose')
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport=require('passport')
var authenticate=require('./authenticate')
const Dishes=require('./models/dishes')
var config=require('./config')
var indexRouter = require('./routes/index');
var app = express();
app.use(cors())
app.options('*',cors())
// var corsOptions={
//   origin:'http://127.0.0.1:5501',
//   optionSucessStatus:200,

// }
// app.use(cors(corsOptions))
 const url='mongodb://localhost:27017/confusion'
//const url = "mongodb+srv://venkatsai:venkatsai@sample.jmaef.mongodb.net/test?retryWrites=true&w=majority";
const connect=mongoose.connect(url,{useNewUrlParser:true})
connect.then((db)=>
{
  console.log("connected correctly to the server")
},(err)=>
{
  console.log(err)
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser('12345-67890-09876-54321'));
app.use(passport.initialize())
app.use('/', indexRouter);
app.use('/courseusers',require('./routes/courseusers'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/dishes',require('./routes/dishrouter'))
app.use('/promotions',require('./routes/promotions'))
app.use('/leaders',require('./routes/leaders'))
app.use('/users',require('./routes/users1'))
app.use('/movies',require('./routes/moviereview'))
app.use('/trackusers',require('./routes/userstrack'))
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

module.exports = app;
