const config = require("../config/auth.config");
const db = require("../models");
const Unit = db.unit;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var _ = require('lodash');
const { loadingButtonClasses } = require("@mui/lab");

exports.index = async (req, res) => {
  const categories = await Unit.find({}).
    limit(10);
  res.status(200).send(categories);
}
exports.save = async (req, res) => {
  if (!_.isUndefined(req.body.name)) {
    const unit = new Unit({
      name: req.body.name
    });
    unit.save((err, unit) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      } else {
        res.status(200).send({ message: "unit is saved successfully!", data: unit });
      }
    })
  } else {
    res.status(500).send({ message: "Required field is needed" });
  }
}
exports.update = async (req, res) => {
  if (!_.isUndefined(req.body.id)) {
    const id = req.body.id;
    const prev = Unit.findByIdAndUpdate(id, {
      name: req.body.name
    }, { new: true }, (err, unit) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      } else {
        res.status(200).send({ message: "unit is updated successfully!", data: unit });
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
    const prev = Unit.findByIdAndDelete(id, { new: true }, (err, unit) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      } else {
        res.status(200).send({ message: "unit is deleted successfully!", data: unit });
      }
    }).clone()
  } else {
    res.status(500).send({ message: "Required field is needed" });
  }
}