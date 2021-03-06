const express = require('express');
const connection = require('./connection');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.get('/id', (req, res, next) => {
  let val = JSON.parse(req.query.className);
  connection.execute('SELECT * FROM `classes` WHERE classes.className = ?', [val.className], (err, rows, fields) => {
    if (err) return next(err);
    if (rows.length === 0) {
      res.json(rows);
    } else {
      res.json(rows);
    }
  });
});

router.get('/', jsonParser, (req, res, next) => {
  connection.execute('SELECT * FROM `classes` WHERE classes.className = ?', [req.query.className], (err, rows, fields) => {
    if (err) return next(err);
    if (rows.length === 0) {
      res.json(rows);
      return;
    }
    let classId = rows[0].classID;
    connection.execute('SELECT * FROM `stories` WHERE stories.class = ? AND stories.storyCompleted = true', [classId], (err, rows, fields) => {
      if (err) return next(err);
      res.json(rows.reverse());
    });
  });
});

module.exports = router;
