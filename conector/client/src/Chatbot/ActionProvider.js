class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  // new method
  greet() {
    const greetingMessage = this.createChatBotMessage('Hi, friend this is a social media website, you can create your profile update and share posts');
    const greeting = this.createChatBotMessage('It has a dedicated Jobs section and has 3 features Colaborate Codepen and Vedio Call');
    const greetnext = this.createChatBotMessage('If you want to know more about any specific features just type ');
    const greetnextnext = this.createChatBotMessage('FR for Jobs Section');
    const greetnextnextnext = this.createChatBotMessage('C for Colaborate');
    const greetnextnextnextnext = this.createChatBotMessage('PEN for CodePen and V for Vedio call');

    this.updateChatbotState(greetingMessage);
    this.updateChatbotState(greeting);
    this.updateChatbotState(greetnext);
    this.updateChatbotState(greetnextnext);
    this.updateChatbotState(greetnextnextnext);
    this.updateChatbotState(greetnextnextnextnext);
  }

  vedio = () => {
    const v = this.createChatBotMessage(
      'This is a vedio calling feature which uses peer connection to connect two user with vedio and audio',
    );
    const u = this.createChatBotMessage('Do you want to know how to use it');
    this.updateChatbotState(v);
    this.updateChatbotState(u);
  }

  Face = () => {
    const f = this.createChatBotMessage(
      'You can create jobs and can apply to any Jobs',
    );
    const hu = this.createChatBotMessage('Do you want to know how to use it then type FU');
    this.updateChatbotState(f);
    this.updateChatbotState(hu);
  }

  faceUse = () => {
    const fu = this.createChatBotMessage('Just go to the create jobs section and pass the neccessary fields');
    const fuuu = this.createChatBotMessage('If you are a applicant then give all the urls to your work');
    const ff = this.createChatBotMessage(
      'Please pass your feedback',
    );
    this.updateChatbotState(fu);
    this.updateChatbotState(fuuu);
    this.updateChatbotState(ff);
  }

  colab = () => {
    const cz = this.createChatBotMessage(
      'It is used to create presentation and get rendered my multiple users to exchange thoughts at same point of time.',
      );
    const cuf = this.createChatBotMessage('Do you want to know how to use it then type USE');
    this.updateChatbotState(cz);
    this.updateChatbotState(cuf);
  }

  colabUse = () => {
    const cuu = this.createChatBotMessage('create a new doccument or open an existing doccument by entering the room id.');
    const ccc = this.createChatBotMessage(
      'Please pass your feedback',
    );
    this.updateChatbotState(cuu);
    this.updateChatbotState(ccc);
  }

  codeP = () => {
    const pen = this.createChatBotMessage('It is an online code editor for html css and javascript');
    const penu = this.createChatBotMessage(
      'Do you want to know how to use it then type PU',
    );
    this.updateChatbotState(pen);
    this.updateChatbotState(penu);
  }

  codePUse = () => {
    const penuu = this.createChatBotMessage('Give the code scipetts and get the output below.');
    const penf = this.createChatBotMessage(
      'Please pass your feedback',
    );
    this.updateChatbotState(penuu);
    this.updateChatbotState(penf);
  }

  howToUse = () => {
    const message = this.createChatBotMessage(
      'enter your name and copy/paste the caller id and click the call button to create a peer call. ',
    );
    this.updateChatbotState(message);
  }

  howToAns = () => {
    const ans = this.createChatBotMessage(
      'Accept the call by clicking the answer button when someone calls by using your id',
    );
    const con = this.createChatBotMessage(
      'Please pass your feedback',
    );
    this.updateChatbotState(ans);
    this.updateChatbotState(con);
  }

  feedback = () => {
    const feedback = this.createChatBotMessage(
      'Thankyou..',
    );
    this.updateChatbotState(feedback);
  }



  updateChatbotState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
