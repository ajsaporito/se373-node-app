const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

router.get('/register', isLoggedIn, (req, res) => {
  res.render('register', {
    title: "Register"
  });
});

router.post('/register', async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  let errors = [];
  let errorCt = 0;

  const usernameExists = await User.findOne({username});
  const emailExists = await User.findOne({email});

  if (!username || !email || !password || !confirmPassword) {
    errors.push({ msg: "Please fill all fields." });
    errorCt++;
  }

  if (password !== confirmPassword) {
    errors.push({ msg: "Passwords do not match." });
    errorCt++;
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters." });
    errorCt++;
  }

  if (errors.length > 0) {
    return res.render('register', {
      title: "Register",
      errors,
      username,
      email,
      password,
      confirmPassword
    });
  }

  if (usernameExists) {
    req.flash('error_msg', "Username is already taken.");
    errorCt++;
    return res.render('register', {
      title: "Register",
      errors,
      username,
      email,
      password,
      confirmPassword,
      error_msg: req.flash('error_msg')
    });
  }

  if (emailExists) {
    req.flash('error_msg', "Email is already registered.");
    errorCt++;
    return res.render('register', {
      title: "Register",
      errors,
      username,
      email,
      password,
      confirmPassword,
      error_msg: req.flash('error_msg')
    });
  }

  if (errorCt === 0) {
    const newUser = new User({username, email, password});
    await newUser.save();
    req.flash('success_msg', "You are now a registered user.");
    res.redirect('/login');
  }
});

router.get('/login', isLoggedIn, (req, res) => {
  res.render('login', {
    title: "Login"
  })
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  }) (req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout(() => {
    req.flash('success_msg', "You logged out.");
    res.redirect('/login');
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/dashboard');
  }

  next();
}

module.exports = router;
