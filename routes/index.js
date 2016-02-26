var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var random = Math.random();
  if(random <= 0.5) {
    res.redirect('/one');
  } else {
    res.redirect('/two');
  }
});

router.get('/one', function(req, res, next) {
  res.render('one');
});

router.post('/one', function(req, res, next) {
  res.render('thanks', {variant: "one"});
});

router.get('/two', function(req, res, next) {
  res.render('two');
});

router.post('/two', function(req, res, next) {
  res.render('thanks', {variant: "two"});
});

module.exports = router;
