require("dotenv-safe/config");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = require("./keys").MONGODB_URI;
//Server setup
const PORT = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json());
const server = app.listen(PORT, console.log(`Server started on port ${PORT}`));
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
//Passport config
require("./config/passport")(passport);

//Mongo config

console.log(`db`, db);

mongoose
  .connect(process.env.MONGODB_URI || db, { useNewUrlParser: true })
  .then(() => console.log("mongo db connected"))
  .catch((err) => console.log(err));

//Express session middleware

app.set("trust proxy", 1);
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  session({
    name: process.env.COOKIE_NAME,
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
      httpOnly: true,
      sameSite: "lax", // csrf
      // secure: __prod__, // cookie only works in https
      // domain: __prod__ ? ".codeponder.com" : undefined,
    },
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Routes

app.use("/users", require("./routes/users"));
app.use("/message", require("./routes/messages"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/client/build"));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

// //Socket setup
// const io = socket(server);

let rooms = {
  general: [],
  tv: [],
  feedback: [],
  welcome: [],
  movies: [],
  games: [],
};

io.on("connection", (socket) => {
  socket.on("join", ({ room, username }) => {
    console.log(`rooms[room]`, username);
    // rooms[room].push(username);
    socket.join(room);
  });
  socket.on("test", (data) => {
    io.sockets.in(data.room).emit("test", "this is a test");
  });
  socket.on("leaveroom", ({ currentroom }) => {
    rooms[currentroom] = rooms[currentroom].filter((username) => {
      return username != data.username;
    });
    socket.leave(data.currentroom);
  });
  socket.on("sendchat", ({ room, message }) => {
    io.to(room).emit("sendchat", message);
    // io.sockets.in(data.room).emit("sendchat", data);
  });
});
