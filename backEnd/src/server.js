//connessione DB 
const db = require("./db");

//Creazione express e cors
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

//server
app.get("/", (req, res) => {
  res.send("Server backend attivo");
});

app.listen(3001, () => {
  console.log("Server avviato sulla porta 3001");
});