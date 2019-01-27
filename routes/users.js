const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

//User model
const User = require("../models/User");

router.post("/register", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  User.findOne({ username: username }).then(user => {
    if (user) {
      //User already exists
      res.json({
        errors: true,
        msg: "User already exists"
      });
    } else {
      const newUser = new User({
        username,
        password
      });
      bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            console.log(err);
          }
          newUser.password = hash;
          newUser.save().then(() => {
            res.json({
              isRegistered: true
            });
          });
        })
      );
    }
  });
});

//Handle login
router.post("/login", (req, res, next) => {
  res.json({
    isLoggedIn: true
  });
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/users/login"
  })(req, res, next);
});

//Handle logout

router.get("/logout", (req, res) => {
  req.logout();
  res.json({
    isLoggedOut: true
  });
});
module.exports = router;
