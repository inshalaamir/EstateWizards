const express= require( "express");
const {createHosting,  findByBoth, getHostingById, addRequest, removeRequest, reserve, sendNotification } = require("../controller/hostings.js");
const router=express.Router()
const auth=require("../middleware/auth.js")

router.post('/posthosting', auth , createHosting);
router.get('/displayhostings/:dates/:location', findByBoth)
router.get('/viewhosting/:id', getHostingById)
router.get('/removerequest/:user/:hosting/:poster', removeRequest)
router.get('/addrequest/:user/:sender/:hosting/:dates', addRequest)
router.get('/reserve/:hosting/:dates/:user', reserve)
router.get('/sendnotification/:user/:text', sendNotification)



module.exports=router;