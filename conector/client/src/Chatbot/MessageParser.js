// MessageParser starter code in MessageParser.js
class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  } 

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes('hello')) {
      this.actionProvider.greet();
    }

    if(lowerCaseMessage.includes('v')) {
      this.actionProvider.vedio();
    }

    if(lowerCaseMessage.includes('fr')) {
      this.actionProvider.Face();
    }

    if(lowerCaseMessage.includes('fu')) {
      this.actionProvider.faceUse();
    }

    if(lowerCaseMessage.includes('c')) {
      this.actionProvider.colab();
    }

    if(lowerCaseMessage.includes('use')) {
      this.actionProvider.colabUse();
    }

    if(lowerCaseMessage.includes('pen')) {
      this.actionProvider.codeP();
    }

    if(lowerCaseMessage.includes('pu')) {
      this.actionProvider.codePUse();
    }

    if (lowerCaseMessage.includes('yes')) {
      this.actionProvider.howToUse();
    }

    if (lowerCaseMessage.includes('how to answer the call')) {
      this.actionProvider.howToAns();
    }

    if (lowerCaseMessage.includes('good')) {
      this.actionProvider.feedback();
    }

    if (lowerCaseMessage.includes('bad')) {
      this.actionProvider.feedback();
    }
  }
}

export default MessageParser;
