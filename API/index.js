const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("my_database.db");

db.serialize(() => {
  db.each("SELECT * FROM users", (error, row) => {
    if (error) {
      console.error(error);
    } else {
      console.log(row);
    }
  });
});

db.close();
