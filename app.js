'use strict';
const express = require('express');
const morgan = require('morgan');


const app = express();
app.use(morgan('dev'));

const googleApps = require('./playstore');

app.get('/', (req, res) =>{
  res.send('Hey this is the homepage');
});

app.get('/apps', (req, res) =>{

  const {sort, genres = ""} = req.query;
  if (sort) {
    if(!['Rating', 'App'].includes(sort)) {
      return res.status(400).send('Apps only sort with Rating or App');
    }
  }
  if(genres) {
    if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
      return res.status(400).send('The only genres are Action, Puzzle, Strategy, Casual, Arcade, Card');
    }
  }
  
  let result= googleApps.filter(app => app.Genres.toLowerCase()
    .includes(genres.toLowerCase()));

  if(sort === 'Rating'){
    result.sort((a,b) => {
      return a[sort] < b[sort] ? 1: a[sort] > b[sort] ? -1 : 0;
    });
  }else if (sort === 'App'){
    result.sort((a,b) => a[sort].localeCompare(b[sort]));
  }

  res.json(result);
});

module.exports = app;