import axios from "axios";
import React, { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState({});
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get(`/api/profile/user/${friendId}`);
        setUser(res.data.user);
        console.log(user);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  //delete blog
   const deleteConversation = async (id) => {
    try {
      const res = await axios.delete(`/api/conversations/${id}`);

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }



  return (
    <div className="conversation">

      <span className="conversationName">{user?.name}</span>
      <button onClick={() => deleteConversation(conversation._id)} ><i className='fas fa-trash-alt'></i></button>
    </div>
  );
}
