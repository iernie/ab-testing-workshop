var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Handlebars = require('express-hbs');

var routes = require('./routes/index');

var app = express();

Handlebars.registerHelper('get', function(object, name) {
    return object.get(name);
});

Handlebars.registerHelper('objectId', function(object) {
    return object.id;
});

Handlebars.registerAsyncHelper('picture', function(objectId, cb) {
    var query = new Parse.Query(UserObject);
    query.get(objectId).then(function(user) {
        var parseFile = user.get('picture');
        if(parseFile) {
            return cb(parseFile.url());
        }
        return cb("");
    });
});

// view engine setup
app.engine('hbs', Handlebars.express4({
  partialsDir: path.join(__dirname, 'views', 'partials')
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('partials/error', {
      message: err.message,
      error: err,
      layout: 'layout'
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('partials/error', {
    message: err.message,
    error: {},
    layout: 'layout'
  });
});


module.exports = app;
