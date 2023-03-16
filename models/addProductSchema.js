const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const allProductsSchema = new Schema({
  userID: String ,
  type: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: String,
    required: true,
    trim: true,
  },
  sub_price: {
    type: String,
    trim: true,
  },
  discount: {
    type: String,
    trim: true,
  },
  shipping: {
    type: String,
    trim: true,
  },
  images: {
    type: Array,
    required: true,
    trim: true,
  },
  shoes_size: {
    type: Array,
    required: true,
    trim: true,
  },
  quantite: String,
  colors: {
    type: Array,
    required: true,
    trim: true,
  },
  clothes_size: {
    type: Array,
    required: true,
    trim: true,
  },
  status: String,
  addedIn: String
});

const allProducts = mongoose.model("allProduct", allProductsSchema);

module.exports = allProducts;
