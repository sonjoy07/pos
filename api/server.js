const express = require("express");
const cors = require("cors");
const app = express();
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/category.routes')(app);
require('./app/routes/product.routes')(app);
require('./app/routes/unit.routes')(app);
require('./app/routes/brand.routes')(app);
var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
const dbConfig = require("./app/config/db.config");
const db = require("./app/models");
const Role = db.role;
const Category = db.category;
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

function initial() {
  Category.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Category({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'user' to roles collection");
        });
        new Category({
          name: "moderator"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'moderator' to roles collection");
        });
        new Category({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }
  // initial()
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});