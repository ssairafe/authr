const express = require('express');
const connection = require('./connection');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.get('/', jsonParser, (req, res, next) => {
  connection.execute('SELECT * FROM `stories` WHERE stories.storyCompleted = false', (err, rows, fields) => {
    if (err) return next(err);
    if (rows[0] === undefined) {
      res.send('No stories available');
    }
    let randomStoryIndex = Math.floor(Math.random() * rows.length);
    res.json((rows[randomStoryIndex]));
  });
});

module.exports = router;
