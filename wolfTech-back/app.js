var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var demandesRouter = require('./routes/demandes');
var reviewsRouter = require('./routes/reviews');
var projetsRouter = require('./routes/projet');
var tachesRouter = require('./routes/tache');
var commentairesRouter = require('./routes/commentaire');
var reponsesRouter = require('./routes/reponse');

var app = express();
var mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/wolf-tech', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}, () => {
  console.log('Connected dataBase');
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var dirProjets = path.join(__dirname, 'routes/projets');
app.use(express.static(dirProjets));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/demandes', demandesRouter);
app.use('/reviews', reviewsRouter);
app.use('/projets', projetsRouter);
app.use('/taches', tachesRouter);
app.use('/commentaires', commentairesRouter);
app.use('/reponses', reponsesRouter);

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
