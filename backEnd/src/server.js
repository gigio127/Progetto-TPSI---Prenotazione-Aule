import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server attivo");
});

app.listen(3000, () => {
  console.log("Server avviato sulla porta 3000");

  db.query("SELECT * FROM utenti", (err, results) => {
    if (err) {
      console.log("Errore durante la lettura degli utenti:", err);
      return;
    }
    
    console.table(results);
  });
});