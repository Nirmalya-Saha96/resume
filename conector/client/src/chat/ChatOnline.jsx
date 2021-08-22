import axios from "axios";
import React, { useEffect, useState } from "react";
import "./chatOnline.css";

export default function ChatOnline({ profiles, currentUserId }) {
  const [formData, setFormData] = useState({
    senderId: '',
    receiverId: ''
  });

  const { senderId, receiverId } = formData;


  const handleClick = async (profile) => {
    setFormData({ ["senderId"]: currentUserId, ["receiverId"]: profile.user._id });
    console.log(formData);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const res = await axios.post('/api/conversations', formData, config);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div className="chatOnline">
        {profiles.map((o) => (
          o.user._id !== currentUserId && (
          <div className="chatOnlineFriend" onClick={()=> handleClick(o)}>
            <div className="chatOnlineImgContainer">
              <img
                className="chatOnlineImg"
                src={
                  o?.user.avatar
                }
                alt="avatar"
              />
              <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{o?.user.name}</span>
          </div>
        )))}
    </div>
  );
}
