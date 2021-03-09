const express= require( "express");
const {createHosting,  findByBoth, getHostingById } = require("../controller/hostings.js");
const router=express.Router()
const auth=require("../middleware/auth.js")

router.post('/posthosting', auth , createHosting);
router.get('/displayhostings/:dates/:location', findByBoth)
router.get('/viewhosting/:id', getHostingById)




module.exports=router;