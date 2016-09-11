/**
 * 定义model和schema
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/201606blog');
//创建用户的schema 记录用户的 用户名 邮箱 头像 密码
var UserSchema = new mongoose.Schema({
    username:{type:String,required:true}, //用户名
    password:{type:String,required:true}, //密码
    email:{type:String}, //邮箱
    avatar:{type:String} //头像 使用全球通用头像，通过邮箱得到
});
//定义一个模型
mongoose.model('User',UserSchema);
//为global上赋一个全局变量 Model全局可以用
global.Model = function(modelName){
    return mongoose.model(modelName);
}

