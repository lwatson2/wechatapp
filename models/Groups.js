const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  groupname: {
    type: String,
    required: true
  },
  messages: [
    {
      username: {
        type: String,
        required: true
      },
      message: {
        type: String,
        required: true
      },
      time: {
        type: String
      }
    }
  ]
});

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;
