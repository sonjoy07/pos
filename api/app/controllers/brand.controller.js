const config = require("../config/auth.config");
const db = require("../models");
const Brand = db.brand;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var _ = require('lodash');
const { loadingButtonClasses } = require("@mui/lab");

exports.index = async (req, res) => {
  const categories = await Brand.find({}).
    limit(10);
  res.status(200).send(categories);
}
exports.save = async (req, res) => {
  if (!_.isUndefined(req.body.name)) {
    const brand = new Brand({
      name: req.body.name
    });
    brand.save((err, brand) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      } else {
        res.status(200).send({ message: "brand is saved successfully!", data: brand });
      }
    })
  } else {
    res.status(500).send({ message: "Required field is needed" });
  }
}
exports.update = async (req, res) => {
  if (!_.isUndefined(req.body.id)) {
    const id = req.body.id;
    const prev = Brand.findByIdAndUpdate(id, {
      name: req.body.name
    }, { new: true }, (err, brand) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      } else {
        res.status(200).send({ message: "brand is updated successfully!", data: brand });
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
    const prev = Brand.findByIdAndDelete(id, { new: true }, (err, brand) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      } else {
        res.status(200).send({ message: "brand is deleted successfully!", data: brand });
      }
    }).clone()
  } else {
    res.status(500).send({ message: "Required field is needed" });
  }
}