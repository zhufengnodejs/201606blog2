var express = require('express');
var util = require('../util');
//路由容器
var router = express.Router();
//注册
router.get('/reg', function (req, res, next) {
    //相对于views的相对路径

    res.render('user/reg', {title: '用户注册',
        //消息一旦取出则清除
         success:req.flash('success').toString(),
         error:req.flash('error').toString()
    });
});
//提交用户的注册表单
router.post('/reg', function (req, res, next) {
    var user = req.body; // {username,password,repassword,email}
    if (user.password != user.repassword) {
        //两个参数表示赋值，error是消息类型 第二个参数是消息内容
        req.flash('error','密码和重复密码不一致!');
        return res.redirect('back');//回到上一个路径
    }
    //1.对密码进行md5加密
    user.password = util.md5(user.password);
    //得到头像地址
    user.avatar = `https://secure.gravatar.com/avatar/${util.md5(user.email)}?s=30`;
    Model('User').findOne({username: user.username})
        .then(function (userDb) {
            if (userDb) {
                // 如果有同名的记录，则注册失败，编写一个错误提示
                req.flash('error','此用户名已经被占用!');
                return res.redirect('back');
            } else {
                return Model('User').create(user);
            }
        })
        .then(function (doc) {
            req.session.user = doc;//给当前用户的会话赋一个user属性
            //写入sessoin
            //返回客户端
            req.flash('success','恭喜!此用户注册成功');
            res.redirect('/');
        }).catch(function(err){
           req.flash('error',err.toString());
           res.redirect('back');
    })


});
//登录
router.get('/login', function (req, res, next) {
    res.render('user/login', {title: '用户登录'});
});
//退出
router.get('/logout', function (req, res, next) {
    res.redirect('/');
});


module.exports = router;
