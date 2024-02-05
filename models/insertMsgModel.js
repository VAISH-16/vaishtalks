import mongoose from "mongoose";

const InsertMsgSchema = new mongoose.Schema({
  text: String,
  timestamp: {
    type: String,
    default: () => new Date().toLocaleTimeString(),
  },
  sender: String,
  receiver: String
});

const InsertMsgDB = mongoose.model('chat', InsertMsgSchema);

export default InsertMsgDB;
