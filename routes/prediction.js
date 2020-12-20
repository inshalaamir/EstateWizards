const express= require( "express");
const {predict} = require("../controller/predict.js");
const router=express.Router()


router.post('/', predict);

module.exports=router;