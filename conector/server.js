const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//connecting the db first
connectDB();

app.use(bodyParser.json());

//defining routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/job', require('./routes/api/job'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/blog', require('./routes/api/blog'));
app.use('/api/conversations', require('./routes/api/conversations'));
app.use('/api/messages', require('./routes/api/messages'));

//production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}



const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log("Server started on port " +  PORT));
