const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId && user.socketId==socketId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.filter((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    console.log(userId,socket.id)
    //io.emit("getUsers", users);
  });
  

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text,postid }) => {
    const user = getUser(receiverId);
    console.log(users)
    if(user){
      console.log("yes")
    user.map((u)=>{io.to(u.socketId).emit("getMessage", {
      senderId,
      text,
      postid,
    })});}
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
