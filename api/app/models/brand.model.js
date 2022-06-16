const mongoose = require("mongoose");
const Brand = mongoose.model(
  "brand",
  new mongoose.Schema({
    name: String,
  })
);
module.exports = Brand;