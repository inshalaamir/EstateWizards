import "./messenger.css";

import Conversation from "./conversations/Conversation";
import Message from "./message/Message";
import ChatOnline from "./chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import {useSelector,useDispatch} from "react-redux";
import FileBase from 'react-file-base64'

export default function Messenger(props) {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const  user  = {_id : useSelector(state=>state.authreducer.user_id),
                  name:useSelector(state=>state.authreducer.name)}
  const scrollRef = useRef();


  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      
        setArrivalMessage({
            sender: data.senderId,
            text: data.text,
            postid:data.postid,
            createdAt: Date.now(),
          });
      
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      currentChat?.postid==arrivalMessage.postid &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    // socket.current.on("getUsers", (users) => {
    //   setOnlineUsers(
    //     user.filter((f) => users.some((u) => u.userId === f))
    //   );
    // });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("http://localhost:5000/conversations/" + user._id);
        
        setConversations(res.data);
        const activeconv=props.location.state?.conversation
        console.log(activeconv)
       
        if(activeconv){
          console.log("S1")
          console.log(activeconv)
          console.log("S11")
          setCurrentChat(res.data.filter((c)=>{ return c.postid==activeconv.postid})[0])
        }
        else if(res.data.length>0){
          setCurrentChat(res.data[res.data.length-1])
          console.log("S2")
          console.log(res.data[res.data.length-1])
          console.log("S22")
        }
        
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(newMessage.length>0){
      const message = {
        sender: user._id,
        text: newMessage,
        conversationId: currentChat._id,
      };

      const receiverId = currentChat.members.find(
        (member) => member !== user._id
      );

      socket.current.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        text: newMessage,
        postid:currentChat.postid
      });

      try {
        const res = await axios.post("http://localhost:5000/messages", message);
        setMessages([...messages, res.data]);
        setNewMessage("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
     
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search Conversation" className="chatMenuInput" />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} active={currentChat==c}/>
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <FileBase className="addpic" type="files"  multiple={false} onDone={(e) =>{ setNewMessage(e.base64)}}> </FileBase>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          {/* <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div> */}
        </div>
      </div>
    </>
  );
}
