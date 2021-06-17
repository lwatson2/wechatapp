const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { verifyToken } = require("../config/jwt");

//User mode
const User = require("../models/User");
const { validateRegister } = require("../utils/validateRegister");

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  const errors = validateRegister(username, password);
  if (errors) {
    return res.json({ errors });
  }

  User.findOne({ username: username }).then((user) => {
    if (user) {
      //User already exists
      return res.json({
        errors: [{ field: "username", message: "User already exists." }],
      });
    }
    const newUser = new User({
      username,
      password,
    });
    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) {
          console.log(err);
        }
        newUser.password = hash;
        const savedUser = await newUser.save();
        req.session.userId = savedUser._id;
        res.json({
          savedUser,
        });
      })
    );
  });
});

//Handle login
router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    return res.json({
      errors: [
        {
          field: "username",
          message: "username is required",
        },
      ],
    });
  }
  if (!password) {
    return res.json({
      errors: [
        {
          field: "password",
          message: "password is required",
        },
      ],
    });
  }
  passport.authenticate("local", (err, user, info) => {
    if (user) {
      req.session.userId = user._id;
      res.json({ user });
      // jwt.sign(
      //   { user },
      //   process,
      //   env.JWT_KEY,
      //   { expiresIn: "1d" },
      //   (err, token) => {
      //     res.json({
      //       token,
      //       username: user.username,
      //     });
      //   }
      // );
    } else {
      res.json({ err: info });
    }
  })(req, res);
});
router.get("/me", async (req, res) => {
  console.log(`req.session.userId`, req.session.userId);
  if (!req.session.userId) {
    return res.json({ id: null });
  }
  try {
    const user = await User.findById(req.session.userId);
    res.json({
      id: user._id,
    });
  } catch (error) {
    console.log(`error`, error);
  }
});

//Handle logout

router.get("/logout", (req, res) => {
  req.logout();
  res.json({
    isLoggedOut: true,
  });
});
module.exports = router;
