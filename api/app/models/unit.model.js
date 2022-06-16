const mongoose = require("mongoose");
const Unit = mongoose.model(
  "unit",
  new mongoose.Schema({
    name: String,
  })
);
module.exports = Unit;