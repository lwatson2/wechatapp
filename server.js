const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const bodyParser = require("body-parser");
const socket = require("socket.io");

//Server setup
const PORT = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json());
const server = app.listen(PORT, console.log(`Server started on port ${PORT}`));

//Passport config
require("./config/passport")(passport);

//Mongo config
const db = require("./keys").MongoURI;

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
app.use("/group", require("./routes/groups"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/client/build"));
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

//Socket setup
const io = socket(server);

let general = [],
  tv = [],
  feedback = [],
  welcome = [],
  movies = [],
  games = [];

io.on("connection", socket => {
  socket.on("joinroom", data => {
    if (data.room === "general") {
      general.push(data.username);
    } else if (data.room === "welcome") {
      welcome.push(data.username);
    } else if (data.room === "tv") {
      tv.push(data.username);
    } else if (data.room === "movies") {
      movies.push(data.username);
    } else if (data.room === "games") {
      games.push(data.username);
    } else if (data.room === "feedback") {
      feedback.push(data.username);
    }
    socket.join(data.room);
  });
  socket.on("test", data => {
    io.sockets.in(data.room).emit("test", "this is a test");
  });
  socket.on("leaveroom", data => {
    if (data.currentroom === "general") {
      const newRoom = general.filter(username => {
        return username != data.username;
      });
      general = newRoom;
    } else if (data.currentroom === "welcome") {
      const newRoom = welcome.filter(username => {
        return username != data.username;
      });
      welcome = newRoom;
    } else if (data.currentroom === "tv") {
      const newRoom = tv.filter(username => {
        return username != data.username;
      });
      tv = newRoom;
    } else if (data.currentroom === "movies") {
      const newRoom = movies.filter(username => {
        return username != data.username;
      });
      movies = newRoom;
    } else if (data.currentroom === "games") {
      const newRoom = games.filter(username => {
        return username != data.username;
      });
      games = newRoom;
    } else if (data.currentroom === "feedback") {
      const newRoom = feedback.filter(username => {
        return username != data.username;
      });
      feedback = newRoom;
    }
    socket.leave(data.currentroom);
  });
  socket.on("sendchat", data => {
    io.sockets.in(data.room).emit("sendchat", data);
  });
});
