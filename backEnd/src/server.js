import express from "express";
import cors from "cors";
import {
  getAule,
  getUtenti,
  getUtenteById,
  getUtenteByEmail,
  getRuoloUtente,
  getPrenotazioni,
  getPrenotazione,
  inserisciPrenotazione,
  modPrenotazione,
  cancPrenotazione
} from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server attivo");
});

// UTENTI
app.get("/utenti", async (req, res) => {
  const risultato = await getUtenti();

  if (risultato === null) {
    return res.status(500).json({ messaggio: "Errore database" });
  }

  return res.status(200).json(risultato);
});

app.get("/utenti/me/:id", async (req, res) => {
  const id = req.params.id;
  const risultato = await getUtenteById(id);

  if (risultato === null) {
    return res.status(500).json({ messaggio: "Errore database" });
  }

  if (risultato.length === 0) {
    return res.status(404).json({ messaggio: "Utente non trovato" });
  }

  return res.status(200).json(risultato[0]);
});

// GOOGLE AUTH SEMPLICE
app.post("/auth/google", async (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).json({ messaggio: "Email mancante" });
  }

  const risultato = await getUtenteByEmail(email);

  if (risultato === null) {
    return res.status(500).json({ messaggio: "Errore database" });
  }

  if (risultato.length === 0) {
    return res.status(401).json({ messaggio: "Utente non autorizzato" });
  }

  return res.status(200).json({
    messaggio: "Accesso consentito",
    autorizzato: true,
    utente: risultato[0]
  });
});

// AULE
app.get("/aule", async (req, res) => {
  const risultato = await getAule();

  if (risultato === null) {
    return res.status(500).json({ messaggio: "Errore database" });
  }

  return res.status(200).json(risultato);
});

// PRENOTAZIONI
app.get("/prenotazioni", async (req, res) => {
  const risultato = await getPrenotazioni();

  if (risultato === null) {
    return res.status(500).json({ messaggio: "Errore database" });
  }

  return res.status(200).json(risultato);
});

app.get("/prenotazione/:id", async (req, res) => {
  const id = req.params.id;
  const risultato = await getPrenotazione(id);

  if (risultato === null) {
    return res.status(500).json({ messaggio: "Errore database" });
  }

  if (risultato.length === 0) {
    return res.status(404).json({ messaggio: "Prenotazione non trovata" });
  }

  return res.status(200).json(risultato[0]);
});

app.post("/insPrenotazione", async (req, res) => {
  const newPren = {
    data: req.body.data,
    ora_inizio: req.body.ora_inizio,
    ora_fine: req.body.ora_fine,
    id_utente: req.body.id_utente,
    id_aula: req.body.id_aula,
    motivazione: req.body.motivazione
  };

  if (
    !newPren.data ||
    !newPren.ora_inizio ||
    !newPren.ora_fine ||
    !newPren.id_utente ||
    !newPren.id_aula ||
    !newPren.motivazione
  ) {
    return res.status(400).json({ messaggio: "Campi mancanti" });
  }

  if (newPren.ora_inizio >= newPren.ora_fine) {
    return res.status(400).json({ messaggio: "Orario non valido" });
  }

  const ruoloRes = await getRuoloUtente(newPren.id_utente);

  if (!ruoloRes || ruoloRes.length === 0) {
    return res.status(403).json({ messaggio: "Utente non valido" });
  }

  const ruolo = ruoloRes[0].ruolo;

  if (ruolo === "studente") {
    return res.status(403).json({ messaggio: "Permesso negato" });
  }

  const risultato = await inserisciPrenotazione(newPren);

  if (risultato === null) {
    return res.status(500).json({ messaggio: "Errore database" });
  }

  if (risultato.errore) {
    return res.status(400).json(risultato);
  }

  return res.status(200).json({
    messaggio: "Prenotazione inserita correttamente",
    risultato
  });
});

app.put("/modPrenotazione/:id", async (req, res) => {
  const idPren = req.params.id;
  const idUtente = req.body.id_utente;

  const newPren = {
    data: req.body.data,
    ora_inizio: req.body.ora_inizio,
    ora_fine: req.body.ora_fine,
    id_utente: req.body.id_utente,
    id_aula: req.body.id_aula,
    motivazione: req.body.motivazione
  };

  if (
    !newPren.data ||
    !newPren.ora_inizio ||
    !newPren.ora_fine ||
    !newPren.id_utente ||
    !newPren.id_aula ||
    !newPren.motivazione
  ) {
    return res.status(400).json({ messaggio: "Campi mancanti" });
  }

  if (newPren.ora_inizio >= newPren.ora_fine) {
    return res.status(400).json({ messaggio: "Orario non valido" });
  }

  const ruoloRes = await getRuoloUtente(idUtente);

  if (!ruoloRes || ruoloRes.length === 0) {
    return res.status(403).json({ messaggio: "Utente non valido" });
  }

  const ruolo = ruoloRes[0].ruolo;

  if (ruolo === "studente") {
    return res.status(403).json({ messaggio: "Permesso negato" });
  }

  if (ruolo === "docente" || ruolo === "ata") {
    const pren = await getPrenotazione(idPren);

    if (!pren || pren.length === 0) {
      return res.status(404).json({ messaggio: "Prenotazione non trovata" });
    }

    if (pren[0].id_utente !== Number(idUtente)) {
      return res.status(403).json({ messaggio: "Non puoi modificare questa prenotazione" });
    }
  }

  const risultato = await modPrenotazione(idPren, newPren);

  if (risultato === null) {
    return res.status(500).json({ messaggio: "Errore database" });
  }

  if (risultato.errore) {
    return res.status(400).json(risultato);
  }

  if (risultato.affectedRows === 0) {
    return res.status(404).json({ messaggio: "Prenotazione non trovata" });
  }

  return res.status(200).json({ messaggio: "Prenotazione modificata correttamente" });
});

app.delete("/cancPrenotazione/:id", async (req, res) => {
  const idPren = req.params.id;
  const idUtente = req.body.id_utente;

  const ruoloRes = await getRuoloUtente(idUtente);

  if (!ruoloRes || ruoloRes.length === 0) {
    return res.status(403).json({ messaggio: "Utente non valido" });
  }

  const ruolo = ruoloRes[0].ruolo;

  if (ruolo === "studente") {
    return res.status(403).json({ messaggio: "Permesso negato" });
  }

  if (ruolo === "docente" || ruolo === "ata") {
    const pren = await getPrenotazione(idPren);

    if (!pren || pren.length === 0) {
      return res.status(404).json({ messaggio: "Prenotazione non trovata" });
    }

    if (pren[0].id_utente !== Number(idUtente)) {
      return res.status(403).json({ messaggio: "Non puoi eliminare questa prenotazione" });
    }
  }

  const risultato = await cancPrenotazione(idPren);

  if (risultato === null) {
    return res.status(500).json({ messaggio: "Errore database" });
  }

  if (risultato.affectedRows === 0) {
    return res.status(404).json({ messaggio: "Prenotazione non trovata" });
  }

  return res.status(200).json({ messaggio: "Prenotazione eliminata correttamente" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server in attesa sulla porta " + (process.env.PORT || 3000));
});