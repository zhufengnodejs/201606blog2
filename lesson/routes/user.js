var express = require('express');
var router = express.Router();
router.get('/add',function(req,res){
    res.send('user add');
});
router.get('/delete',function(req,res){
    res.send('user delete');
});
module.exports = router;