import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Chatbot from 'react-chatbot-kit';
import './LandingPage.css'

import VideoPlayer from './components/Vedio/VideoPlayer';
import Sidebar from './components/Vedio/Sidebar';
import Notifications from './components/Vedio/Notifications';
import ActionProvider from './Chatbot/ActionProvider';
import MessageParser from './Chatbot/MessageParser';
import config from './Chatbot/config';

const useStyles = makeStyles((theme) => ({
  appBar: {
    margin: '30px 100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',

    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));

const Vedio = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>

      <Typography variant="h2" align="center">Video Chat</Typography>
      <VideoPlayer />
      <Sidebar>
        <Notifications />
      </Sidebar>
      <header className="App-header">
        <Chatbot
          config={config}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
        />
      </header>
    </div>
  );
};

export default Vedio;
