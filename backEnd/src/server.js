import express from "express";
import cors from "cors";
import {
  getAule,
  getUtenti,
  getPrenotazioni,
  getPrenotazione,
  inserisciPrenotazione,
  cancPrenotazione,
  modPrenotazione
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

  if (risultato && risultato.length > 0) {
    res.status(200).json(risultato);
  } else {
    res.status(200).json({ messaggio: "nessun utente presente" });
  }
});

// AULE
app.get("/aule", async (req, res) => {
  const risultato = await getAule();

  if (risultato && risultato.length > 0) {
    res.status(200).json(risultato);
  } else {
    res.status(200).json({ messaggio: "nessuna aula presente" });
  }
});

// PRENOTAZIONI
app.get("/prenotazioni", async (req, res) => {
  const risultato = await getPrenotazioni();

  if (risultato) {
    res.status(200).json(risultato);
  } else {
    res.status(500).json({ messaggio: "errore durante la lettura delle prenotazioni" });
  }
});

app.get("/prenotazione/:id", async (req, res) => {
  const id = req.params.id;
  const risultato = await getPrenotazione(id);

  if (risultato && risultato.length > 0) {
    res.status(200).json(risultato);
  } else {
    res.status(404).json({ messaggio: "prenotazione non trovata" });
  }
});

app.post("/insPrenotazione", async (req, res) => {
  try {
    const newData = req.body.data;
    const newOraInizio = req.body.ora_inizio;
    const newOraFine = req.body.ora_fine;
    const newIdUtente = req.body.id_utente;
    const newIdAula = req.body.id_aula;
    const newMotivazione = req.body.motivazione;

    if (!newData || !newOraInizio || !newOraFine || !newIdUtente || !newIdAula || !newMotivazione) {
      return res.status(400).json({ messaggio: "Campi mancanti" });
    }

    if (newOraInizio >= newOraFine) {
      return res.status(400).json({ messaggio: "Orario non valido" });
    }

    const newPren = {
      data: newData,
      ora_inizio: newOraInizio,
      ora_fine: newOraFine,
      id_utente: newIdUtente,
      id_aula: newIdAula,
      motivazione: newMotivazione
    };

    const risultato = await inserisciPrenotazione(newPren);

    if (!risultato) {
      return res.status(500).json({ messaggio: "Errore inserimento prenotazione" });
    }

    if (risultato.errore) {
      return res.status(400).json(risultato);
    }

    res.status(200).json({
      messaggio: "Prenotazione inserita correttamente",
      risultato: risultato
    });
  } catch (error) {
    res.status(400).json({ messaggio: "Errore inserimento prenotazione" });
  }
});

app.delete("/cancPrenotazione/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const risultato = await cancPrenotazione(id);

    if (risultato && risultato.affectedRows > 0) {
      res.status(200).json({ messaggio: "Prenotazione eliminata correttamente" });
    } else {
      res.status(404).json({ messaggio: "Prenotazione non trovata" });
    }
  } catch (error) {
    res.status(400).json({ messaggio: "Errore eliminazione prenotazione" });
  }
});

app.put("/modPrenotazione/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const newPren = {
      data: req.body.data,
      ora_inizio: req.body.ora_inizio,
      ora_fine: req.body.ora_fine,
      id_utente: req.body.id_utente,
      id_aula: req.body.id_aula
    };

    const risultato = await modPrenotazione(id, newPren);

    if (risultato?.errore) {
      return res.status(400).json(risultato);
    }

    if (risultato && risultato.affectedRows > 0) {
      res.status(200).json({ messaggio: "Prenotazione modificata correttamente" });
    } else {
      res.status(404).json({ messaggio: "Prenotazione non trovata" });
    }
  } catch (error) {
    res.status(400).json({ messaggio: "Errore modifica prenotazione" });
  }
});

app.listen(3000, () => {
  console.log("Server in attesa sulla porta 3000");
});