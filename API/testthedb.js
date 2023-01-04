const database = require("./database.js");
const db = new database("./database.db");

console.log(db.getProducts());