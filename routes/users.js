const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { verifyToken } = require("../config/jwt");

//User model
const User = require("../models/User");

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username }).then(user => {
    if (user) {
      //User already exists
      res.json({
        errors: true,
        msg: "User already exists."
      });
    } else {
      const newUser = new User({
        username,
        password
      });
      bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          if (err) {
            console.log(err);
          }
          newUser.password = hash;
          await newUser.save();
          res.json({
            isAuthenticated: true
          });
        })
      );
    }
  });
});

//Handle login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (user) {
      jwt.sign({ user }, "secretkey", { expiresIn: "1d" }, (err, token) => {
        res.json({
          token,
          username: user.username
        });
      });
    } else {
      res.json({ err: info });
    }
  })(req, res);
});
router.get("/getuser", verifyToken, (req, res) => {
  res.json({
    test: true
  });
});

//Handle logout

router.get("/logout", (req, res) => {
  req.logout();
  res.json({
    isLoggedOut: true
  });
});
module.exports = router;
