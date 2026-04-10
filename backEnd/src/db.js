import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "!Blondie16",
  database: "prenotami"
});

db.connect((err) => {
  if (err) {
    console.log("Errore connessione DB");
    return;
  }
  console.log("Connesso al database");
});

export default db;