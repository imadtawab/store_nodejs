const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registerSchema = new Schema({
  newOrder: Array,
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  storeName: {
    type: String,
    required: true,
    trim: true,
  },
  storeLogo: String,
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  image: String,
  addedIn: String,
  isActive: {
    type: Boolean,
    default: false
  },
  activationCode: String,
  forgotPasswordCode: String
});

const registerAccount = mongoose.model("register_Account", registerSchema);

module.exports = registerAccount;
