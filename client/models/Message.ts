import mongoose from "mongoose";

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

export default mongoose.models.Message ||
  mongoose.model("Message", MessageSchema);
