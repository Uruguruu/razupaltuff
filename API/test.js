const database = require("./database.js");
const db = new database("./database.db");
const readline = require("readline");

// note do Not change this file unless you know what you are doing else you will lose your head

// prepers the question to ask the user what he wants to do
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// asks the user what he wants to do
rl.question(
  "1. create, 2. delelt, 3. Both, 4. Experimental,  5. Display the data :   ",
  (answer) => {
    if (answer == 1) {
      create();
    } else if (answer == 2) {
      deleteAll();
    } else if (answer == 3) {
      both();
    } else if (answer == 4) {
      idk();
    } else if (answer == 5) {
      dispay();
    } else {
      console.log("fuck you");
    }
    rl.close();
  }
);

//note the change function aren't in this file if you want to test them you have to do it on your own

// creates a user and a product and adds the product to the cart and rates it
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

// deletes all users, products, ratings and cart entries
function deleteAll() {
  console.log(db.kill_all());
}

// calls both functions
function both() {
  create();
  deleteAll();
}

// this is just a test function
function idk() {
  var id = db.get_new_produktID();
  console.log(id);
  // Generate a new ID for the user
  produktID = id["produktID"] + 1;
  console.log(produktID);
}

// dispay the data
// note you have to change the id of cart and rating to see the data
function dispay() {
  console.log(db.getUsers());
  console.log(db.getProducts());
  console.log(db.get_cart(1));
  console.log(db.get_ratings(1));
}
