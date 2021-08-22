import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  botName: 'Nirmalya',
  initialMessages: [
    createChatBotMessage('Hey, its Nirmalya the developer would you want to continue the chat and know more about this social media website then drop a hello', {
    }),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: '#0d46b9',
      color: 'black',
    },
    chatButton: {
      backgroundColor: '#f3e565',
      color: 'black',
    },
  },
};

export default config;
