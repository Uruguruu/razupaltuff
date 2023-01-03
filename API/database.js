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

  this.getUsers = function () {
    return this.db.prepare("SELECT * FROM users").all();
  };

  this.create_user = function (userID, UserName, eMail, birthDate, password) {
    const insert = this.db.prepare(
      "INSERT INTO users (userID, UserName, eMail, birthDate, password) VALUES (@userID, @UserName, @eMail, @birthDate, @password)"
    );
    insert.run({ userID, UserName, eMail, birthDate, password });
  };

  this.getMessages = function () {
    return "hi";
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
