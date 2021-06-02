const express= require( "express");
const {createProject, findByLoc } = require("../controller/project.js");
const router=express.Router()
const auth=require("../middleware/auth.js")

router.post('/addproject', createProject);
router.get('/displayproject/:location', findByLoc)

module.exports=router