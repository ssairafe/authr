const express = require('express');
const connection = require('./connection');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.get('/', jsonParser, (req, res, next) => {
  console.log(req.body);
  // connection.execute('SELECT * FROM `classes` WHERE classes.className = ?', [req.body.className], (err, rows, fields) => {
  //   if (err) return next(err);
  //   res.json(rows);
  // });
});

// router.post('/', jsonParser, (req, res, next) => {
//   let params = [req.body.newStory.title, req.body.newStory.author1, '', '', '', req.body.newStory.part1, '', '', '', 0];
//   connection.execute('INSERT INTO `stories` (`storyID`, `title`, `author1`, `author2`, `author3`, `author4`, `part1`, `part2`, `part3`, `part4`, `storyCompleted`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', params, (err, rows, fields) => {

//     if (err) return next(err);
//     let response = {
//       requestBody: req.body,
//       mySqlRows: rows
//     };
//     if (!err) {
//       res.status(201).json(response);
//     }
//   });
// });

module.exports = router;
