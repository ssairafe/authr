const express = require('express');
const connection = require('./connection');
const router = express.Router();

router.get('/', (req, res, next) => {
  connection.execute('SELECT * FROM `stories` WHERE stories.storyCompleted = false', (err, rows, fields) => {
    if (err) return next(err);
    if (rows[0] === undefined) {
      res.send('No stories available');
    }
    res.json(rows[0]);
  });
});

module.exports = router;
