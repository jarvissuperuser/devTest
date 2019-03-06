var express = require('express');
var router = express.Router();
let auth = require("../authMiddleWare");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('okay');
}).put('/auth',function (req,res,next) {
  console.log(typeof req.body);
  auth(req.body,'put');
  res.send('ok');
});

module.exports = router;
