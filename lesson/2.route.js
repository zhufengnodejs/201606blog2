var express = require('express');
var user = require('./routes/user');
var app = express();
app.get('/',function(req,res){
    res.send('主页');
});
app.use('/user',user);
app.listen(8080);