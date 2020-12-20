const express= require( "express");
const {getallusers,signin,createuser,myprofile, getUserById}=require("../controller/users.js");
const router=express.Router()
const auth=require("../middleware/auth.js")

router.post('/signup',createuser);
router.post('/signin', signin);
router.get('/all',getallusers)
router.get('/myprofile',auth,myprofile)
router.get('/getuserbyid/:id', getUserById)
module.exports=router;