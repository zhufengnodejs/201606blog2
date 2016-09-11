var express = require('express');
//路由容器
var router = express.Router();
//注册
router.get('/reg', function(req, res, next) {
  //相对于views的相对路径
  res.render('user/reg',{title:'用户注册'});
});
//登录
router.get('/login', function(req, res, next) {
  res.render('user/login',{title:'用户登录'});
});
//退出
router.get('/logout', function(req, res, next) {
  res.redirect('/');
});


module.exports = router;
