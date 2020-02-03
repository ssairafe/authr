require('dotenv/config');
const path = require('path');
const connection = require('./connection');
const express = require('express');
const stories = require('./stories');
const incompleteStories = require('./incompleteStories');
const className = require('./class');

const server = express();
let PORT = process.env.PORT;

connection.connect();

server.use('/api/class', className);
server.use('/api/stories', stories);
server.use('/api/incompleteStories', incompleteStories);
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

server.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error has occurred'
  });

});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('The server is now listening... ALLOWED');
});
