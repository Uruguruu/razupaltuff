const database = require("./database.js");
const db = new database("./database.db");
const readline = require("readline");

db.create_user(1, "John", "john@newMail.com", "1970-01-01", "mypassword");
console.log(db.getUsers());
db.create_product(1, "godProduct", "../img/logo.png", 12.5, "God product");
console.log(db.getProducts());
db.add_to_cart(1, 1, 1, "in cart");
console.log(db.get_cart(1));
db.update_cart(1, "ordered");
console.log(db.get_cart(1));
db.add_rating(1, 5, "2020-01-01", 1, 1, "God product");

console.log(db.delete_rating(1));
console.log(db.delete_from_cart(1));
console.log(db.delete_product(1));
console.log(db.delete_user("John"));
