//creo sql
const mysql = require("mysql2");

//collego il Db
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // metti la tua se ce l'hai
  database: "prenotami"
});

db.connect((err) => {
  if (err) {
    console.log("Errore connessione DB");
    return;
  }
  console.log("Connesso al database");
});

module.exports = db;