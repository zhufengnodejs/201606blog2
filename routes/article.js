var express = require('express');
//生成一个router的实例
var router =  express.Router();
//增加文章
router.get('/add',function(req,res){
   res.render('article/add',{title:'增加文章'});
});
//导出此路由实例
module.exports = router;