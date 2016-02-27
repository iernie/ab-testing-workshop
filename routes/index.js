var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('partials/one', {layout: 'layout'});
});

router.post('/', function(req, res, next) {
  res.redirect('/thanks?variant=one');
});

router.get('/variant', function(req, res, next) {
  res.render('partials/two', {layout: 'layout'});
});

router.post('/variant', function(req, res, next) {
  res.redirect('/thanks?variant=two');
});

router.get('/thanks', function(req, res, next) {
  res.render('partials/thanks', {variant: req.query.variant, layout: 'layout'});
});

module.exports = router;
