const config = require("../config/auth.config");
const db = require("../models");
const Product = db.product;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var _ = require('lodash');
const { loadingButtonClasses } = require("@mui/lab");

exports.index = async (req, res) => {
  const categories = await Product.find({}).
    limit(10);
  res.status(200).send(categories);
}
exports.save = async (req, res) => {
  if (!_.isUndefined(req.body.name)) {
    const product = new Product({
      name: req.body.name
    });
    product.save((err, product) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      } else {
        res.status(200).send({ message: "product is saved successfully!", data: product });
      }
    })
  } else {
    res.status(500).send({ message: "Required field is needed" });
  }
}
exports.update = async (req, res) => {
  if (!_.isUndefined(req.body.id)) {
    const id = req.body.id;
    const prev = Product.findByIdAndUpdate(id, {
      name: req.body.name
    }, { new: true }, (err, product) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      } else {
        res.status(200).send({ message: "product is updated successfully!", data: product });
      }
    }).clone()
  } else {
    res.status(500).send({ message: "Required field is needed" });
  }
}
exports.delete = async (req, res) => {
  console.log(req.body)
  if (!_.isUndefined(req.body.id)) {
    const id = req.body.id;
    const prev = Product.findByIdAndDelete(id, { new: true }, (err, product) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      } else {
        res.status(200).send({ message: "product is deleted successfully!", data: product });
      }
    }).clone()
  } else {
    res.status(500).send({ message: "Required field is needed" });
  }
}