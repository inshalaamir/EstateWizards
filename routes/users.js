const express= require( "express");
const {getallusers,signin,createuser,myprofile, getUserById,addBid}=require("../controller/users.js");
const router=express.Router()
const auth=require("../middleware/auth.js")

router.post('/signup',createuser);
router.post('/signin', signin);
router.get('/all',getallusers)
router.get('/myprofile',auth,myprofile)
router.get('/getuserbyid/:id', getUserById)
router.get('/addbid/:userid/:postid/:bid',addBid)
module.exports=router;