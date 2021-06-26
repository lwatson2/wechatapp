const express = require("express");
const router = express.Router();
const Messages = require("../models/Message");

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
module.exports = router;
