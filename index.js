require('dotenv').config();

const path = require('path');
const express = require('express');
const router = require('./app/router');
const session = require('express-session');
const cors = require('cors');

const port = process.env.PORT || 3000;

const app = express();

app.use(
  session({
    secret: 'princess consuela banana hammock',
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60, // 1h
    },
  })
);

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static(path.join(__dirname, './public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

app.use((req, res, next) => {
  res.locals.userID = req.session.userID;
  res.locals.userMail = req.session.userMail;
  res.locals.username = req.session.username;
  next();
});

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

app.use(router);

app.listen(port, (_) => {
  console.log(`http://localhost:${port}`);
});
