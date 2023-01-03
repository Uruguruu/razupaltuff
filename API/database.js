/* jshint esversion: 6 */

module.exports = function (file) {
  const database = require("better-sqlite3");

  const db = new sqlite3.Database("my_database.db");

  database.connect(db, function (error) {
    if (error) {
      console.error("Error connecting to database: " + error);
    } else {
      console.log("Connected to database");
    }
  });

  function getUseres() {
    return database.all("SELECT * FROM users");
  }

  this.getMessages = function () {
    return "hi";
  };

  function getUser(id) {
    return database.get("SELECT * FROM users WHERE id = ?", id);
  }

  function addUser(user) {
    return database.run(
      "INSERT INTO users VALUES (?, ?, ?, ?)",
      user.id,
      user.name,
      user.email,
      user.password
    );
  }
};
