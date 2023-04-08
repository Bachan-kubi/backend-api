const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//2- midddleware
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());

app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
