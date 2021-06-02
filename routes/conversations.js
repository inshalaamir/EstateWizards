const router = require("express").Router();
const {createConv,getConv,getOneConv} = require("../controller/Conversations");

//new conv

router.post("/", createConv)

//get conv of a user

router.get("/:userId", getConv)

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId/:postid", getOneConv)

module.exports = router;
