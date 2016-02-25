var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/one', function(req, res, next) {
  res.render('index', { variant: 'one' });
});

router.get('/two', function(req, res, next) {
  res.render('index', { variant: 'two' });
});

module.exports = router;
