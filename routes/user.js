var express = require('express');
//路由容器
var router = express.Router();
//注册
router.get('/reg', function(req, res, next) {
  res.send('用户注册');
});
//登录
router.get('/login', function(req, res, next) {
  res.send('用户登陆');
});
//退出
router.get('/logout', function(req, res, next) {
  res.send('用户退出');
});


module.exports = router;
