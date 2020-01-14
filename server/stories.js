const express = require('express');
const connection = require('./connection');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.get('/', (req, res, next) => {
  connection.execute('SELECT * FROM `stories` WHERE stories.storyCompleted = true', (err, rows, fields) => {
    if (err) return next(err);
    if (rows[0] === undefined) {
      res.send('No stories available');
    }
    res.json(rows[0]);
  });
});

router.post('/', jsonParser, (req, res, next) => {
  let params = [req.body.newStory.title, req.body.newStory.creator, '', '', '', req.body.newStory.part1, '', '', '', 0];
  connection.execute('INSERT INTO `stories` (`storyID`, `title`, `creator`, `author1`, `author2`, `author3`, `part1`, `part2`, `part3`, `part4`, `storyCompleted`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', params, (err, rows, fields) => {

    if (err) return next(err);
    let response = {
      requestBody: req.body,
      mySqlRows: rows
    };
    if (!err) {
      res.status(201).json(response);
    }
  });
});

module.exports = router;
