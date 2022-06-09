const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
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
    app.get("/api/test/all", controller.allAccess);
    app.get(
        "/api/category/index",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.index
      );
};