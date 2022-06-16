const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/product.controller");
const bodyParser = require('body-parser');
const { authJwt } = require("../middlewares");
module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get(
        "/api/product/index",
        [authJwt.verifyToken],
        controller.index
      );
    app.post(
        "/api/product/save",
        [authJwt.verifyToken],
        controller.save
      );
    app.put(
        "/api/product/update",
        [authJwt.verifyToken],
        controller.update
      );
    app.delete(
        "/api/product/delete",
        [authJwt.verifyToken],
        controller.delete
      );
};