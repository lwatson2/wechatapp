const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const Messages = require("../models/Message");

router.get("/getMessages", (req, res) => {
  const { groupname } = req.params;
  Messages.find({ groupname });
  Messages.findOne({ groupname }).then((group) =>
    res.json({
      chatHistory: group.messages,
    })
  );
});

router.post("/postMessage", async (req, res) => {
  const { username, message, groupname } = req.body;

  const newMessage = new Messages({
    groupname,
    username,
    message,
    time: new Date(),
    userId: req.session.userId,
  });
  await newMessage.save();
  // res.json({
  //   msg: "successful",
  // });
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
