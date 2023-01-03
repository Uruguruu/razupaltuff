const database = require("./database.js");
const db = new database("./database.db");
const fs = require("fs");
var bodyParser = require("body-parser");

//db.addUser(1, "John", "john@example.com", "1970-01-01", "mypassword");
console.log(db.getUsers());
