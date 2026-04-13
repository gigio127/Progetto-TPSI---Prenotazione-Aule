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

app.get("/utenti", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM utenti");
    res.json(results);
  } catch (err) {
    console.log("Errore durante la lettura degli utenti:", err);
    res.status(500).json({ errore: "Errore database" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server avviato sulla porta " + (process.env.PORT || 3000));
});