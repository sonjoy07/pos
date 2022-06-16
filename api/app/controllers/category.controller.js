const config = require("../config/auth.config");
const db = require("../models");
const Category = db.category;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var _ = require('lodash');
const { loadingButtonClasses } = require("@mui/lab");

exports.index = async (req, res) => {
  const categories = await Category.find({}).
    limit(10);
  res.status(200).send(categories);
}
exports.save = async (req, res) => {
  if (!_.isUndefined(req.body.name)) {
    const caategory = new Category({
      name: req.body.name
    });
    caategory.save((err, category) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      } else {
        res.status(200).send({ message: "category is saved successfully!", data: category });
      }
    })
  } else {
    res.status(500).send({ message: "Required field is needed" });
  }
}
exports.update = async (req, res) => {
  if (!_.isUndefined(req.body.id)) {
    const id = req.body.id;
    const prev = Category.findByIdAndUpdate(id, {
      name: req.body.name
    }, { new: true }, (err, category) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      } else {
        res.status(200).send({ message: "category is updated successfully!", data: category });
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
    const prev = Category.findByIdAndDelete(id, { new: true }, (err, category) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      } else {
        res.status(200).send({ message: "category is deleted successfully!", data: category });
      }
    }).clone()
  } else {
    res.status(500).send({ message: "Required field is needed" });
  }
}