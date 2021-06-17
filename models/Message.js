const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  groupname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  time: {
    type: String,
  },
});

const Messages = mongoose.model("Message", MessageSchema);

module.exports = Messages;
