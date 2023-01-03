const database = require("./database.js");
const db = new database("./database.db");
const fs = require("fs");
var bodyParser = require("body-parser");

db.update_user("John", "john@newMail.com", "1970-01-01", "mypassword", "John");
console.log(db.getUsers());
db.delete_user("John");
console.log(db.getUsers());
db.create_product(1, "godProduct", "../img/logo.png", 12.5, "God product");
console.log(db.getProducts());
db.update_product(
  "godProduct",
  "godProduct",
  "../img/logo.png",
  15.8,
  "God product"
);
console.log(db.getProducts());
db.delete_product(1);
console.log(db.getProducts());
