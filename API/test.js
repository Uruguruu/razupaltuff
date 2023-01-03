const database = require("./database.js");
const db = new database("./database.db");
const fs = require("fs");
var bodyParser = require("body-parser");

db.update_user("John", "john@newMail.com", "1970-01-01", "mypassword", "John");
console.log(db.getUsers());
