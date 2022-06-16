const mongoose = require("mongoose");
const Product = mongoose.model(
  "product",
  new mongoose.Schema({
    categoryId: String,
    type: String,
    unit: String,
    brand: String,
    purchaseCost: String,
    otherCost: String,
    sellPrice: String,
    minStock: String,
    name: String,
    description: String,
    warranty: String,
  })
);
module.exports = Product;