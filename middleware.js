const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const passportConfig = require('./config/passport');
const middleware = express();

passportConfig(passport);

middleware.use(express.static(path.join(__dirname, 'public')));
middleware.use(bodyParser.json());
middleware.use(express.urlencoded({ extended: true }));

middleware.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

middleware.use(passport.initialize());
middleware.use(passport.session());

middleware.use(flash());

middleware.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

middleware.engine('handlebars', exphbs.engine({
  helpers: {
    formatDate: function (date) {
      const d = new Date(date);
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const year = d.getFullYear();
      return `${year}-${month}-${day}`;
    }
  }
}));

middleware.set('view engine', 'handlebars');
middleware.set('views', './views');

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash('error_msg', 'Please log in to see this page');
  res.redirect('/login');
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/dashboard');
  }

  next();
}

module.exports = { middleware, isAuthenticated, isLoggedIn };
