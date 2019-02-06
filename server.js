const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

//Passport config
require("./config/passport")(passport);

//Mongo config
const db = require("./config/keys").MongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("mongo db connected"))
  .catch(err => console.log(err));

//Express session middleware
app.use(
  session({
    secret: "this is my secret",
    resave: true,
    saveUninitialized: true
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Routes

app.use("/users", require("./routes/users"));
app.use("/groups", require("./routes/groups"));

//Port config

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
