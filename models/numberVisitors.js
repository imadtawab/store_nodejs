const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VisitorSchema = new Schema({
  storeName: String,
  addedIn : String
});

const visitor = mongoose.model("visitor", VisitorSchema);


module.exports = visitor;
