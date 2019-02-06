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
      }
    }
  ]
});

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;
