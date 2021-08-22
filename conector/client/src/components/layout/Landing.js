import React from 'react';
import Chatbot from 'react-chatbot-kit';
import '../../App.css';

import ActionProvider from '../../Chatbot/ActionProvider';
import MessageParser from '../../Chatbot/MessageParser';
import config from '../../Chatbot/config';

const Landing = () => {

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Nirmalya Connector</h1>
          <p className="lead">
            Create a  profile/portfolio, share posts and get help through lots of features
          </p>
          <header className="App-header">
            <Chatbot
              config={config}
              actionProvider={ActionProvider}
              messageParser={MessageParser}
            />
          </header>

        </div>
      </div>
    </section>
  );
}

export default Landing;
