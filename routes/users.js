var express = require('express');
var router = express.Router();
let auth = require("../authMiddleWare");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('');
}).put('/auth',function (req,res,next) {
  auth(req.body,'put');
});

module.exports = router;
