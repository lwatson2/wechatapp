const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const Messages = require("../models/Message");
const User = require("../models/User");

router.get("/getMessages/:groupname", (req, res) => {
  const { groupname } = req.params;

  Messages.find({ groupname }).then((messagesData) =>
    res.json({ messagesData })
  );
});

router.post("/postMessage", async (req, res) => {
  const { message, groupname, username } = req.body;
  // const user = await User.findById(req.session.userId);

  const newMessage = new Messages({
    groupname,
    username,
    message,
    time: new Date(),
    userId: req.session.userId,
  });
  const myMessage = await newMessage.save();

  res.json({
    message: myMessage,
  });
});
// router.post("/:groupname", async (req, res) => {
//   const { username, message, time } = req.body;
//   const { groupname } = req.params;
//   const update = { $push: { messages: [{ username, message, time }] } };
//   Group.findOneAndUpdate({ groupname: groupname }, update, (err, doc) => {
//     if (err) {
//       console.log(err);
//     }
//   });
// });
module.exports = router;
