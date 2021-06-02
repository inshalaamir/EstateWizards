import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";
import image from './noAvatar.png'

export default function Conversation({ conversation, currentUser,active }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        console.log(friendId)
        const res = await axios.get("http://localhost:5000/user/getuserbyid/" + friendId);
        setUser(res.data);
        
        console.log(res.data)

      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <>
    {user?<div className={"conversation"+(active?"active":'')}>
      <div className={"conv"+(active?"active":'')}>
        <img
          className="conversationImg"
          src={image}
          alt=""
        />
        <span className="conversationName">{user?.name}</span>
      </div>  
      <span className="conversationTitle">{conversation.title}</span>
    </div>:''}
    </>
  );
}
