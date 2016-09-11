var express = require('express');
//路由容器
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/add', function(req, res, next) {
  res.send('user add');
});

module.exports = router;
