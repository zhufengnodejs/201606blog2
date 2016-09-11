var express = require('express');
var router = express.Router();
router.get('/add',function(req,res){
    res.send('user add');
});
module.exports = router;