import mongoose from "mongoose";


const registrationSchema = new mongoose.Schema({
  name: String,
  email_id: {
    type: String,
    unique: true,
    required: true,
  },
  username: String,
  password: String,
  profile: String,
});
//test

const Registration = mongoose.model('registration', registrationSchema);

export default Registration;
