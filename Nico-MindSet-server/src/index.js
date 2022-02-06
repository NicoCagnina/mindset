require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL, (error) => {
  if (error) {
    console.log('Error : ', error);
  } else {
    console.log('Mindset db connected');
  }
});

app.use(express.static('public'));

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`App MindSet listening at http://localhost:${PORT}`);
});
