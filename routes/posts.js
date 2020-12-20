const express= require( "express");
const {createPost, viewAllPosts, findByLocation, myPosts, findByType, findByBoth, getPostById } = require("../controller/posts.js");
const router=express.Router()
const auth=require("../middleware/auth.js")

router.post('/postad', auth , createPost);

router.get('/displayallads', viewAllPosts);

router.get('/displaybyloc', findByLocation);
router.get('/displaybytype', findByType);
router.get('/displayads/:location/:propertytype/:type', findByBoth)
router.get('/viewpost/:id', getPostById)

router.get('/myads', auth , myPosts);



module.exports=router;