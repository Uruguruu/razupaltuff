const mysql = require('mysql');

// Verbindung zur Datenbank herstellen
const connection = mysql.createConnection({
  host: 'localhost', // Hostname der Datenbank
  user: 'db_user', // Benutzername für die Datenbank
  password: 'db_password', // Passwort für die Datenbank
  database: 'db_name' // Name der Datenbank
});

// Verbindung testen
connection.connect();

// Funktion zum Abrufen eines Produkts anhand seiner ID
const getProductById = (id) => {
  // Promise erstellen, das bei erfolgreichem Abschluss das Produkt zurückgibt und bei einem Fehler eine Fehlermeldung
  return new Promise((resolve, reject) => {
    // Abfrage an die Datenbank senden, um das Produkt abzurufen
    connection.query('SELECT * FROM products WHERE id = ?', [id], (error, results, fields) => {
      if (error) {
        // Fehler zurückgeben
        reject(error);
      } else {
        // Ergebnisse zurückgeben
        resolve(results[0]);
      }
    });
  });
};

// Funktionen exportieren, damit sie von anderen Modulen verwendet werden können
module.exports = {
  getProductById
};
