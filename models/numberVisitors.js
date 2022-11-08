const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VisitorSchema = new Schema({
  numberVisitor: Number
});

const visitor = mongoose.model("visitor", VisitorSchema);


module.exports = visitor;
