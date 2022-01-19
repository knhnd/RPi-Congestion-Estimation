'use strict';
const express = require('express');

// create express app
const app = express();

// routing
// test
app.get('/', (req, res) => {
  const test = [{ message: 'It Works!' }];
  res.json(test);
});

// 混雑度の推定
app.get(`/congestion`, (req, res) => {
  const result = 'Work in Progress.';
  res.json(result);
});

// Webサーバの起動
const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
