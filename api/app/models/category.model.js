const mongoose = require("mongoose");
const Category = mongoose.model(
  "category",
  new mongoose.Schema({
    name: String,
  })
);
module.exports = Category;