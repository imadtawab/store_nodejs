const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const allOrderSchema = new Schema({
  userID: String,
  // product: Object,
  products: Array,
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  shoe_size: {
    type: String,
    required: false,
    trim: true,
  },
  color: {
    type: String,
    required: false,
    trim: true,
  },
  clothe_size: {
    type: String,
    required: false,
    trim: true,
  },
  quantite: String,
  total: String,
  status: Array,
  addedIn: String
});

const allOrders = mongoose.model("allOrder", allOrderSchema);

module.exports = allOrders;
