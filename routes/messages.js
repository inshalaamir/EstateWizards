const router = require("express").Router();
const {addMsg,getMsgs}=require("../controller/messages")

//add

router.post("/", addMsg);

//get

router.get("/:conversationId", getMsgs);

module.exports = router;
