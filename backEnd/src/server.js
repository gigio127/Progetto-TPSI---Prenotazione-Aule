
import express from "express";
import cors from "cors";

//connessione DB 
import db from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server attivo");
});

app.listen(3000, () => {
  console.log("Server avviato sulla porta 3000");
  console.table(db.query("SELECT * FROM utenti"));
});