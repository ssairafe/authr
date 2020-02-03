const express = require('express');
const connection = require('./connection');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.get('/', jsonParser, (req, res, next) => {
  if (req.query[0]) {
    connection.execute('SELECT * FROM `stories` WHERE stories.storyCompleted = false AND stories.class = ?', [req.query[0]], (err, rows, fields) => {
      if (err) {
        return next(err);
      }
      let randomStoryIndex = Math.floor(Math.random() * rows.length);
      res.json((rows[randomStoryIndex]));
    });
  } else {
    connection.execute('SELECT * FROM `stories` WHERE stories.storyCompleted = false AND stories.class is NULL', (err, rows, fields) => {
      if (err) {
        return next(err);
      }
      let randomStoryIndex = Math.floor(Math.random() * rows.length);
      res.json((rows[randomStoryIndex]));
    });
  }
});

router.patch('/', jsonParser, (req, res, next) => {
  let author = req.body.newAuthor;
  let part = req.body.partToAdd;
  let authorQuery = 'UPDATE `stories` SET ' + (author) + ' = ' + (`'${req.body.incompleteStory[author]}'`) + ' WHERE `stories`.`storyID` = ' + req.body.incompleteStory.storyID;
  let partQuery = 'UPDATE `stories` SET ' + (part) + ' = ' + (`'${req.body.incompleteStory[part]}'`) + ' WHERE `stories`.`storyID` = ' + req.body.incompleteStory.storyID;
  let completeStoryQuery = "UPDATE `stories` SET storyCompleted = '1' WHERE `stories`.`storyID` = " + req.body.incompleteStory.storyID;

  connection.execute(authorQuery, (err, rows, fields) => {
    if (err) {
      return next(err);
    }

  });

  connection.execute(partQuery, (err, rows, fields) => {
    if (err) {
      return next(err);
    }

    if (part === 'part4') {
      connection.execute(completeStoryQuery, (err, rows, fields) => {
        if (err) {
          return next(err);
        }
      });
    }
  });
});

module.exports = router;
