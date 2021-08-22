import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

//connecting socket.io
const socket = io('http://localhost:8000');

const ContextProvider = ({ children }) => {
  //states
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');

  //reference
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  //notification box to allow camera and audio, setting the current stream with the vedio stream
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });

      //getting the id of the socket and the caller
    socket.on('me', (id) => setMe(id));

    //updating the caller information
    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  //function to ans a call
  const answerCall = () => {
    setCallAccepted(true);

    //initiating webrtc api to make a new peer
    const peer = new Peer({ initiator: false, trickle: false, stream });

    //after receiving the signal from the peer
    peer.on('signal', (data) => {
      //emit the signal to the socket server
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    //setting the vedio
    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };


  //function to call user
  //calls when the useeffect is triggered
  const callUser = (id) => {
    //initiating the webrtc api
    const peer = new Peer({ initiator: true, trickle: false, stream });

    //receiving the signal from peer and emiting the calluser to the socket server
    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    //setting up the vedio
    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  //function to leave call
  const leaveCall = () => {
    setCallEnded(true);

    //destroys the refference
    connectionRef.current.destroy();

    //reloads the window
    window.location.reload();
  };

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
