//please note that this is alredy working code so pleas do not change anything in this file unless you know what you are doing
// wehe niel du machst was kaput😑

//wathever you doing do not touch this please
module.exports = function (file) {
  const Database = require("better-sqlite3");

  this.db = new Database(file, {});

  this.connect = function (file) {
    this.db = new Database(file, {
      verbose: console.log,
    });
  };

  // cheacks if the user is in the database with the mail and password
  this.check_user = function (eMail, password) {
    const check_user = this.db.prepare(
      "SELECT * FROM Users WHERE eMail = @eMail AND password = @password"
    );
    const result = check_user.get({ eMail, password });
    return result === null;
  };

  // gets every user from the database
  this.getUser = function (userId) {
    return this.db.prepare("SELECT * FROM users WHERE userID = " + userId).all();
  };

  // gets the user with the given email
  this.user_exist = function (email) {
    return this.db
      .prepare("SELECT * FROM Users WHERE eMail= '" + email + "'")
      .all();
  };

  // makes a new user
  this.create_user = function (
    userID,
    UserName,
    eMail,
    birthDate,
    password,
    adress
  ) {
    const insert = this.db.prepare(
      "INSERT INTO users (userID, UserName, eMail, birthDate, password) VALUES (@userID, @UserName, @eMail, @birthDate, @password)"
    );
    insert.run({ userID, UserName, eMail, birthDate, password });

    return 200, "User created";
  };

  // updates the user with the given username
  this.update_user = function (
    old_email,
    newUserName,
    eMail,
    birthDate,
    password
  ) {
    const update = this.db.prepare(
      "UPDATE users SET UserName = @newUserName, eMail = @eMail, birthDate = @birthDate, password = @password WHERE eMail = @old_email"
    );
    update.run({ newUserName, eMail, birthDate, password, old_email });

    return 200, "User updated";
  };
  // deletes the user with the given username
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

  // gets all products from the database
  this.getProducts = function () {
    return this.db.prepare("select * from Produkte").all();
  };

  // gets the product with the given ID
  this.get_product = function (produktID) {
    const get_product = this.db.prepare(
      "select * from Produkte where produktID = @produktID"
    );
    return get_product.get({ produktID });
  };
  // creates a new product
  this.create_product = function (
    produktID,
    Name,
    Image,
    price,
    producer,
    description
  ) {
    const insert = this.db.prepare(
      "insert into Produkte (produktID, Name, Image, price, producer, description) values (@produktID, @Name, @Image, @price, @producer, @description)"
    );
    insert.run({ produktID, Name, Image, price, producer, description });
    return 200, "Product created";
  };

  //updates the product with the given name
  this.update_product = function (
    Name,
    newName,
    Image,
    price,
    producer,
    description
  ) {
    const update = this.db.prepare(
      "update Produkte set Name = @newName, Image = @Image, price = @price, producer = @producer, description = @description where Name = @Name"
    );
    update.run({ newName, Image, price, producer, description, Name });
    return 200, "Product updated";
  };

  //deletes the product with the given ID
  this.delete_product = function (produktID) {
    const delete_product = this.db.prepare(
      "delete from Produkte where produktID = @produktID"
    );
    delete_product.run({ produktID });
    return 200, "Product deleted";
  };

  // gets the cart with the given userID
  this.get_cart = function (userID) {
    const get_cart = this.db.prepare(
      "select * from warenkorb where userID = @userID"
    );
    return get_cart.all({ userID });
  };

  // adds a product to the cart
  this.add_to_cart = function (warenkorbID, produktID, userID, status) {
    const insert = this.db.prepare(
      "insert into warenkorb (warenkorbID, produktID, userID, status) values (@warenkorbID, @produktID, @userID, @status)"
    );
    insert.run({ warenkorbID, produktID, userID, status });
    return 200, "Product added to cart";
  };

  // updates the cart with the given userID
  this.update_cart = function (userID, status) {
    const update = this.db.prepare(
      "update warenkorb set status = @status where userID = @userID"
    );
    update.run({ status, userID });
    return 200, "Cart updated";
  };

  // deletes the product with the given warenkorbID
  this.delete_from_cart = function (userID, productID) {
    const delete_from_cart = this.db.prepare(
      "delete from warenkorb where userID = @userID AND produktID = @productID"
    );
    delete_from_cart.run({ userID, productID });
    return 200, "Product deleted from cart";
  };

  // adds a rating to the database
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

  // gets the rating with the given produktID
  this.get_ratings = function (produktID) {
    const get_ratings = this.db.prepare(
      "select * from Rating where produktID = @produktID"
    );
    return get_ratings.all({ produktID });
  };

  // updates the rating with the given ratingID
  this.update_rating = function (ratingID, starts, comment) {
    const update = this.db.prepare(
      "update Rating set starts = @starts, comment = @comment where ratingID = @ratingID"
    );
    update.run({ starts, comment, ratingID });
    return 200, "Rating updated";
  };

  // deletes the rating with the given ratingID
  this.delete_rating = function (ratingID) {
    const delete_rating = this.db.prepare(
      "delete from Rating where ratingID = @ratingID"
    );
    delete_rating.run({ ratingID });
    return 200, "Rating deleted";
  };

  // closes the database connection so simmpli don't touch this unless you know what you're doing
  this.close = function () {
    this.db.close((error) => {
      if (error) {
        return console.error(error.message);
      }
      console.log("Close the database connection.");
    });
  };

  // gets the userID of the last user
  this.get_new_userID = function () {
    const get_new_userID = this.db.prepare(
      "select max(userID) as userID from Users"
    );
    return get_new_userID.get();
  };

  // do i have to explain this?

  // gives the higest id back which is in the database
  this.get_new_warenkorbID = function () {
    const get_new_warenkorbID = this.db.prepare(
      "select max(warenkorbID) as warenkorbID from warenkorb"
    );
    return get_new_warenkorbID.get();
  };

  this.get_new_ratingID = function () {
    const get_new_ratingID = this.db.prepare(
      "select max(ratingID) as ratingID from Rating"
    );
    return get_new_ratingID.get();
  };

  this.get_new_produktID = function () {
    const get_new_produktID = this.db.prepare(
      "select max(produktID) as produktID from Produkte"
    );
    return get_new_produktID.get();
  };

  // deletes evrething thats is in the tabel
  // by the way this is only for testing purposes only so pleas don't use it
  this.kill_all = function () {
    const delete_users = this.db.prepare("delete from users");
    const delete_products = this.db.prepare("delete from Produkte");
    const delete_ratings = this.db.prepare("delete from Rating");
    const delete_cart = this.db.prepare("delete from warenkorb");
    delete_ratings.run();
    delete_cart.run();
    delete_products.run();
    delete_users.run();
    return 200, "All tables cleared";
  };

  this.product_exist = function (name) {
    const product_exist = this.db.prepare(
      "select * from Produkte where Name = @name"
    );
    return product_exist.get({ name });
  };

  this.get_user_ID = function (email) {
    const product_exist = this.db.prepare(
      "select userID from Users where eMail = @email"
    );
    return product_exist.get({ email });
  };

  //use this if you want to delet the user the other don't work's well
  this.delet_all_form_user = function (username) {
    const delete_user = this.db.prepare(
      "delete from users where username = @username"
    );
    const delete_ratings = this.db.prepare(
      "delete from Rating where userID = @userID"
    );
    const delete_cart = this.db.prepare(
      "delete from warenkorb where userID = @userID"
    );
    const userID = this.get_user_ID(username);
    delete_ratings.run({ userID });
    delete_cart.run({ userID });
    delete_user.run({ username });
    return 200, "All of user cleared";
  };

  this.delet_all_from_product = function (produktID) {
    const delete_ratings = this.db.prepare(
      "delete from Rating where produktID = @produktID"
    );
    const delete_cart = this.db.prepare(
      "delete from warenkorb where produktID = @produktID"
    );
    const delete_product = this.db.prepare(
      "delete from Produkte where produktID = @produktID"
    );
    delete_cart.run({ produktID });
    delete_ratings.run({ produktID });
    delete_product.run({ produktID });
    return 200, "All of product cleared";
  };
};
