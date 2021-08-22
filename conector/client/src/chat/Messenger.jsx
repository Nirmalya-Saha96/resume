import React, { Fragment, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './messenger.css';
import { getProfiles } from '../actions/profile';
import Conversation from './Conversation';
import Message from './Message';
import ChatOnline from './ChatOnline';
import axios from "axios";

const Messenger = ({ getProfiles, profile: { profiles, loading }, auth }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`/api/conversations/${auth.user._id}`);
        setConversations(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, []);


  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/api/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: auth.user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    try {
      const res = await axios.post("/api/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    <Fragment>

    <div className='messenger'>
    <div className="chatMenu">
      <div className="chatMenuWrapper">
        {conversations.map((c) => (
          <div onClick={() => setCurrentChat(c)}>
            <Conversation key={c.id}  conversation={c} currentUser={auth.user}/>
          </div>
        ))}
      </div>
    </div>
    <div className="chatBox">
      <div className="chatBoxWrapper">
        <div className="chatBoxTop">
        {currentChat ? (
          <>
            <div className="chatBoxTop">
              {messages.map((m) => (
                <div ref={scrollRef}>
                  <Message message={m} own={m.sender === auth.user._id} />
                </div>
              ))}
            </div>

          </>
        ) : (
          <span className="noConversationText">
            Open a conversation to start a chat.
          </span>
        )}

        </div>
        <div className="chatBoxBottom">
          <textarea
            className="chatMessageInput"
            placeholder="write something..."
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          ></textarea>
          <button className="chatSubmitButton" onClick={handleSubmit}>
            Send
          </button>
        </div>
      </div>

    </div>
    <div className="chatOnline">
      <div className="chatOnlineWrapper">
      <ChatOnline
        profiles={profiles}
        currentUserId={auth.user._id}
      />
      </div>
    </div>
    </div>
    </Fragment>
  );
}

Messenger.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfiles })(Messenger);
