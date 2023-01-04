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

  this.check_user = function (eMail, password) {
    const check_user = this.db.prepare(
      "SELECT * FROM Users WHERE eMail = @eMail AND password = @password"
    );
    return check_user.get({ eMail, password });
  };

  this.getUsers = function () {
    return this.db.prepare("SELECT * FROM users").all();
  };

  this.user_exist = function (email) {
    return this.db
      .prepare("SELECT * FROM users WHERE '" + email + "' = @eMail")
      .all();
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

  this.get_cart = function (userID) {
    const get_cart = this.db.prepare(
      "select * from warenkorb where userID = @userID"
    );
    return get_cart.all({ userID });
  };

  this.add_to_cart = function (warenkorbID, produktID, userID, status) {
    const insert = this.db.prepare(
      "insert into warenkorb (warenkorbID, produktID, userID, status) values (@warenkorbID, @produktID, @userID, @status)"
    );
    insert.run({ warenkorbID, produktID, userID, status });
    return 200, "Product added to cart";
  };

  this.update_cart = function (userID, status) {
    const update = this.db.prepare(
      "update warenkorb set status = @status where userID = @userID"
    );
    update.run({ status, userID });
    return 200, "Cart updated";
  };

  this.delete_from_cart = function (warenkorbID, produktID) {
    const delete_from_cart = this.db.prepare(
      "delete from warenkorb where warenkorbID = @warenkorbID and produktID = @produktID"
    );
    delete_from_cart.run({ warenkorbID, produktID });
    return 200, "Product deleted from cart";
  };

  this.add_rating = function (
    ratingID,
    starts,
    date,
    produktID,
    userID,
    comment
  ) {
    const insert = this.db.prepare(
      "insert into Rating (ratingID, starts, date, produktID, userID, comment) values (@ratingID, @starts, @date, @produktID, @userID, @comment)"
    );
    insert.run({ ratingID, starts, date, produktID, userID, comment });
    return 200, "Rating added";
  };

  this.get_ratings = function (produktID) {
    const get_ratings = this.db.prepare(
      "select * from Rating where produktID = @produktID"
    );
    return get_ratings.all({ produktID });
  };

  this.update_rating = function (ratingID, starts, comment) {
    const update = this.db.prepare(
      "update Rating set starts = @starts, comment = @comment where ratingID = @ratingID"
    );
    update.run({ starts, comment, ratingID });
    return 200, "Rating updated";
  };

  this.delete_rating = function (ratingID) {
    const delete_rating = this.db.prepare(
      "delete from Rating where ratingID = @ratingID"
    );
    delete_rating.run({ ratingID });
    return 200, "Rating deleted";
  };

  this.close = function () {
    this.db.close((error) => {
      if (error) {
        return console.error(error.message);
      }
      console.log("Close the database connection.");
    });
  };

  this.get_new_id_user = function () {
    return this.db.prepare("SELECT MAX(userID) FROM users").all();
  };
};
