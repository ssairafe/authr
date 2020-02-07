const express = require('express');
const connection = require('./connection');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.get('/', jsonParser, (req, res, next) => {
  if (req.query[0]) {
    let id = parseInt(req.query[0]);
    connection.execute('SELECT * FROM `stories` WHERE stories.storyCompleted = false AND stories.class = ?', [id], (err, rows, fields) => {
      if (err) {
        return next(err);
      }
      if (rows.length === 0) {
        return next(err);
      }
      let length = (Object.keys(rows[0]).length - 4) / 2 + 1;

      let returnArray = rows.filter(story => {
        for (let i = 0; i < length; i++) {
          if (story['author' + i] !== '' && story['part' + i] === '') {
            return false;
          } else if (story['author' + i] === '' && story['part' + i] === '') {
            return true;
          }
        }
      });
      let randomStoryIndex = Math.floor(Math.random() * returnArray.length);
      res.json((returnArray[randomStoryIndex]));
    });
  } else {
    connection.execute('SELECT * FROM `stories` WHERE stories.storyCompleted = false AND stories.class is NULL', (err, rows, fields) => {
      if (err) {
        return next(err);
      }
      if (rows.length === 0) {
        return next(err);
      }
      let length = (Object.keys(rows[0]).length - 4) / 2 + 1;

      let returnArray = rows.filter(story => {
        for (let i = 0; i < length; i++) {
          if (story['author' + i] !== '' && story['part' + i] === '') {
            return false;
          } else if (story['author' + i] === '' && story['part' + i] === '') {
            return true;
          }
        }
      });
      let randomStoryIndex = Math.floor(Math.random() * returnArray.length);
      res.json((returnArray[randomStoryIndex]));
    });
  }
});

function removeAuthor(storyId, part, author) {
  setTimeout(() => {
    connection.execute('SELECT * FROM `stories` WHERE `stories`.`storyID` = ' + storyId, (err, rows, fields) => {
      let story = rows[0];
      if (story[part] === '') {
        connection.execute('UPDATE `stories` SET ' + (author) + ' = ' + (`''`) + ' WHERE `stories`.`storyID` = ' + storyId, (err, rows, fields) => {
          if (err) {
            return err;
          }
        });
      }
      if (err) {
        return err;
      }
    });
  }, 12000000);
}

router.patch('/author', jsonParser, (req, res, next) => {
  let author = req.body.newAuthor;
  let num = author.charAt(author.length - 1);

  let authorQuery = 'UPDATE `stories` SET ' + (author) + ' = ' + (`'${req.body.incompleteStory[author]}'`) + ' WHERE `stories`.`storyID` = ' + req.body.incompleteStory.storyID;

  connection.execute(authorQuery, (err, rows, fields) => {
    if (err) {
      return next(err);
    }
    removeAuthor(req.body.incompleteStory.storyID, 'part' + num, author);
    res.status(201);
  });
});

router.patch('/', jsonParser, (req, res, next) => {
  let part = req.body.partToAdd;
  let partQuery = 'UPDATE `stories` SET ' + (part) + ' = ' + (`'${req.body.incompleteStory[part]}'`) + ' WHERE `stories`.`storyID` = ' + req.body.incompleteStory.storyID;
  let completeStoryQuery = "UPDATE `stories` SET storyCompleted = '1' WHERE `stories`.`storyID` = " + req.body.incompleteStory.storyID;

  connection.execute(partQuery, (err, rows, fields) => {
    if (part === 'part4') {
      connection.execute(completeStoryQuery, (err, rows, fields) => {
        if (err) {
          return next(err);
        }
      });
    }
    if (err) {
      return next(err);
    }
    res.status(201);
  });
});

module.exports = router;
