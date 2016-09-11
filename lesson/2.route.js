var express = require('express');
var user = require('./routes/user');
var app = express();

app.use('/user',user);
app.listen(8080);