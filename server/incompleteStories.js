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
