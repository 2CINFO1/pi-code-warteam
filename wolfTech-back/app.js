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
//var likeRouter = require('./routes/like');
var likeRouter = require('./routes/reaction');
var reponsesRouter = require('./routes/reponse');
var rolesRouter = require('./routes/role');
var congeRouter = require('./routes/congeRoutes')

var app = express();
var mongoose = require('mongoose')
var cors = require("cors");

mongoose.connect('mongodb+srv://esprit:12345678Hr@cluster0.cdl0smd.mongodb.net/wolf-tech-final', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, () => {
    console.log('Connected dataBase');
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'))
var dirProjets = path.join(__dirname, 'routes/projets');
app.use(express.static(dirProjets));
var dirUploads = path.join(__dirname, 'routes/uploads');
app.use(express.static(dirUploads));
var dirUsers = path.join(__dirname, 'uploads');
app.use(express.static(dirUsers));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use('/like', likeRouter);
app.use('/reaction', likeRouter);
app.use('/demandes', demandesRouter);
app.use('/reviews', reviewsRouter);
app.use('/projets', projetsRouter);
app.use('/taches', tachesRouter);
app.use('/commentaires', commentairesRouter);
app.use('/reponses', reponsesRouter);
app.use('/roles', rolesRouter);
app.use('/conges', congeRouter)

app.use('/uploads', express.static('./uploads'));


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