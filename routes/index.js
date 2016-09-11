var express = require('express');
var router = express.Router();

//首页
router.get('/', function(req, res, next) {
  //渲染模板=模板+数据
  res.render('index', { title: 'Express' });
});

module.exports = router;
