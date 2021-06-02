
const Conversation = require("../models/Conversation");

//new conv

exports.createConv =  async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
    title:req.body.title,
    postid:req.body.postid
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get conv's of a user

exports.getConv =  async (req, res) => {
  console.log("ok")
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    console.log(conversation)
    res.status(200).json(conversation);
    console.log("ok")
  } catch (err) {
    res.status(500).json(err);
  }
};

// get conv includes two userId

exports.getOneConv =  async (req, res) => {
  try {
    console.log(req.params.title)
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      postid:req.params.postid,  
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
};


