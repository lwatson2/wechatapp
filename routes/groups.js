const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const Group = require("../models/Groups");

router.get("/:groupname", (req, res) => {
  const { groupname } = req.params;
  Group.findOne({ groupname }).then(group =>
    res.json({
      chatHistory: group.messages
    })
  );
});

/* router.post("/:groupname", async (req, res) => {
  console.log(req.body);
  console.log(req.params.groupname);
  const { username, message } = req.body;
  const { groupname } = req.params;
  const newGroup = new Group({
    groupname,
    messages: [
      {
        username,
        message
      }
    ]
  });
  await newGroup.save();
  res.json({
    msg: "successful"
  });
}); */
router.post("/:groupname", async (req, res) => {
  const { username, message, time } = req.body;
  console.log(req.body);
  const { groupname } = req.params;
  const update = { $push: { messages: [{ username, message, time }] } };
  Group.findOneAndUpdate({ groupname: groupname }, update, (err, doc) => {
    if (err) {
      console.log(err);
    }
  });
});
module.exports = router;
