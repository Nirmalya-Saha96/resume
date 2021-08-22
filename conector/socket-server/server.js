const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const mongoose = require('mongoose');
const Document = require('./models/Document');

const app = express();
const server = require('http').createServer(app);

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.send('success');
});

//Collaborate

mongoose.connect(
  '<mongo url>',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const defaultValue = '';

io.on('connection', (socket) => {

  //Vedio Call
  socket.emit("me", socket.id);

	//to disconnect the socket
	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	//to call the user
	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	//to accept calls
	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});

  //Collaborate
  socket.on('get-document', async (documentId) => {
    const document = await findOrCreateDocument(documentId);
    const data = ''
    socket.join(documentId);
    socket.emit('load-document', document.data);

    socket.on('send-changes', (delta) => {
      socket.broadcast.to(documentId).emit('receive-changes', delta);
    });

    socket.on('save-doc', async (data) => {
      await Document.findByIdAndUpdate(documentId, { data });
    });
  });
});

const findOrCreateDocument = async (id) => {
  if (id == null) return;

  const document = await Document.findById(id);
  if (document) return document;

  return await Document.create({ _id: id, data: defaultValue });
};

server.listen(process.env.PORT || 8000, () => {
  console.log('server running at 8000');
});
