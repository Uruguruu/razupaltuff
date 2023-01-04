const database = require("./database.js");
const db = new database("./database.db");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("1. create, 2. delelt, 3. Both, :   ", (answer) => {
  if (answer == 1) {
    create();
  } else if (answer == 2) {
    deleteAll();
  } else if (answer == 3) {
    both();
  } else {
    console.log("fuck you");
  }
  rl.close();
});

function create() {
  db.create_user(1, "John", "john@newMail.com", "1970-01-01", "mypassword");
  console.log(db.getUsers());
  db.create_product(
    1,
    "godProduct",
    "../img/logo.png",
    12.5,
    "God product",
    "this is a very god product"
  );
  console.log(db.getProducts());
  db.add_to_cart(1, 1, 1, "in cart");
  console.log(db.get_cart(1));
  db.update_cart(1, "ordered");
  console.log(db.get_cart(1));
  db.add_rating(1, 5, "2020-01-01", 1, 1, "God product");
  console.log(db.get_ratings(1));
}

function deleteAll() {
  console.log(db.delete_rating(1));
  console.log(db.delete_from_cart(1));
  console.log(db.delete_product(1));
  console.log(db.delete_user("John"));
}

function both() {
  create();
  deleteAll();
}
