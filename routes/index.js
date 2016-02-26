var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('one');
});

router.post('/', function(req, res, next) {
  res.render('thanks', {variant: "one"});
});

router.get('/variant', function(req, res, next) {
  res.render('two');
});

router.post('/variant', function(req, res, next) {
  res.render('thanks', {variant: "two"});
});

module.exports = router;
