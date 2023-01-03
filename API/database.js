/* jshint esversion: 6 */

module.exports = function (file) {
  const Database = require("better-sqlite3");

  this.db = new Database(file, {
    //  verbose: console.log
  });

  this.connect = function (file) {
    this.db = new Database(file, {
      verbose: console.log,
    });
  };

  // do not touch this function unless you know what you are doing

  this.getUsers = function () {
    return this.db.prepare("SELECT * FROM users").all();
  };

  this.create_user = function (userID, UserName, eMail, birthDate, password) {
    const insert = this.db.prepare(
      "INSERT INTO users (userID, UserName, eMail, birthDate, password) VALUES (@userID, @UserName, @eMail, @birthDate, @password)"
    );
    insert.run({ userID, UserName, eMail, birthDate, password });

    return 200, "User created";
  };

  this.update_user = function (
    UserName,
    newUserName,
    eMail,
    birthDate,
    password
  ) {
    const update = this.db.prepare(
      "UPDATE users SET UserName = @newUserName, eMail = @eMail, birthDate = @birthDate, password = @password WHERE UserName = @UserName"
    );
    update.run({ newUserName, eMail, birthDate, password, UserName });

    return 200, "User updated";
  };

  this.delete_user = function (UserName) {
    const delete_user = this.db.prepare(
      "DELETE FROM users WHERE UserName = @UserName"
    );
    delete_user.run({ UserName });
    return 200, "User deleted";
  };

  // for testing purposes only - do not use in production

  this.test = function () {
    return "up and running";
  };

  // do not touch this function unless you know what you are doing

  this.getProducts = function () {
    return this.db.prepare("select * from Produkte").all();
  };

  this.create_product = function (produktID, Name, Image, price, producer) {
    const insert = this.db.prepare(
      "insert into Produkte (produktID, Name, Image, price, producer) values (@produktID, @Name, @Image, @price, @producer)"
    );
    insert.run({ produktID, Name, Image, price, producer });
    return 200, "Product created";
  };

  this.update_product = function (Name, newName, Image, price, producer) {
    const update = this.db.prepare(
      "update Produkte set Name = @newName, Image = @Image, price = @price, producer = @producer where Name = @Name"
    );
    update.run({ newName, Image, price, producer, Name });
    return 200, "Product updated";
  };

  this.delete_product = function (produktID) {
    const delete_product = this.db.prepare(
      "delete from Produkte where produktID = @produktID"
    );
    delete_product.run({ produktID });
    return 200, "Product deleted";
  };

  this.add_to_cart = function (warenkorbID, produktID, userID) {
    const insert = this.db.prepare(
      "insert into Warenkorb (warenkorbID, produktID, userID) values (@warenkorbID, @produktID, @userID)"
    );
    insert.run({ warenkorbID, produktID, userID });
    return 200, "Product added to cart";
  };

  this.get_cart = function (userID) {
    const get_cart = this.db.prepare(
      "select * from Warenkorb where userID = @userID"
    );
    return get_cart.all({ userID });
  };

  this.delete_from_cart = function (warenkorbID) {
    const delete_from_cart = this.db.prepare(
      "delete from Warenkorb where warenkorbID = @warenkorbID"
    );
    delete_from_cart.run({ warenkorbID });
    return 200, "Product deleted from cart";
  };

  this.get_orders = function () {
    return this.db.prepare("select * from UserOrders").all();
  };

  this.create_order = function (orderID, userID, warenkorbID) {
    const insert = this.db.prepare(
      "insert into UserOrders (orderID, userID, warenkorbID) values (@orderID, @userID, @warenkorbID)"
    );
    insert.run({ orderID, userID, warenkorbID });
    return 200, "Order created";
  };

  this.change_order_status = function (orderID, done) {
    const update = this.db.prepare(
      "update UserOrders set done = @done where orderID = @orderID"
    );
    update.run({ done, orderID });
  };

  this.close = function () {
    this.db.close((error) => {
      if (error) {
        return console.error(error.message);
      }
      console.log("Close the database connection.");
    });
  };
};
