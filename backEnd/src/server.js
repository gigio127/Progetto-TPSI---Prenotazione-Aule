import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { OAuth2Client } from "google-auth-library";

import {
  getAule,
  getUtenti,
  getPrenotazioni,
  getPrenotazione,
  inserisciPrenotazione,
  cancPrenotazione,
  modPrenotazione,
  getUtenteByEmail,
  getUtenteById,
  getRuoloUtente,
  creaUtenteGoogle
} from "./db.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
    console.error("Errore inserimento prenotazione:", error);
    res.status(500).json({ messaggio: "Errore inserimento prenotazione" });
}
  });

  app.delete("/cancPrenotazione/:id", async (req, res) => {
    try {
      const idPren = req.params.id;
      const idUtente = req.body.id_utente;

      const ruoloRes = await getRuoloUtente(idUtente);

      if (!ruoloRes || ruoloRes.length === 0) {
        return res.status(403).json({ messaggio: "Utente non valido" });
      }

      const ruolo = ruoloRes[0].ruolo;

      // ADMIN → può cancellare tutto
      if (ruolo === "admin") {
        const risultato = await cancPrenotazione(idPren);
        return res.status(200).json({ messaggio: "Prenotazione eliminata" });
      }

      // DOCENTE / ATA → solo le proprie
      if (ruolo === "docente" || ruolo === "ata") {
        const pren = await getPrenotazione(idPren);

        if (!pren || pren.length === 0) {
          return res.status(404).json({ messaggio: "Prenotazione non trovata" });
        }

        if (pren[0].id_utente !== idUtente) {
          return res.status(403).json({ messaggio: "Non puoi eliminare questa prenotazione" });
        }

        const risultato = await cancPrenotazione(idPren);
        return res.status(200).json({ messaggio: "Prenotazione eliminata" });
      }

      // STUDENTE → non può eliminare
      return res.status(403).json({ messaggio: "Permesso negato" });

    } catch (error) {
      res.status(400).json({ messaggio: "Errore eliminazione prenotazione" });
    }
  });

  app.put("/modPrenotazione/:id", async (req, res) => {
    try {
      const idPren = req.params.id;
      const idUtente = req.body.id_utente;

      const ruoloRes = await getRuoloUtente(idUtente);

      if (!ruoloRes || ruoloRes.length === 0) {
        return res.status(403).json({ messaggio: "Utente non valido" });
      }

      const ruolo = ruoloRes[0].ruolo;

      const newPren = {
        data: req.body.data,
        ora_inizio: req.body.ora_inizio,
        ora_fine: req.body.ora_fine,
        id_utente: req.body.id_utente,
        id_aula: req.body.id_aula,
        motivazione: req.body.motivazione
      };

      if (!newPren.data || !newPren.ora_inizio || !newPren.ora_fine || !newPren.id_utente || !newPren.id_aula || !newPren.motivazione) {
        return res.status(400).json({ messaggio: "Campi mancanti" });
      }

      if (newPren.ora_inizio >= newPren.ora_fine) {
        return res.status(400).json({ messaggio: "Orario non valido" });
      }

      if (ruolo === "admin") {
        const risultato = await modPrenotazione(idPren, newPren);

        if (risultato?.errore) {
          return res.status(400).json(risultato);
        }

        if (risultato && risultato.affectedRows > 0) {
          return res.status(200).json({ messaggio: "Prenotazione modificata correttamente" });
        }

        return res.status(404).json({ messaggio: "Prenotazione non trovata" });
      }

      if (ruolo === "docente" || ruolo === "ata") {
        const pren = await getPrenotazione(idPren);

        if (!pren || pren.length === 0) {
          return res.status(404).json({ messaggio: "Prenotazione non trovata" });
        }

        if (pren[0].id_utente !== Number(idUtente)) {
          return res.status(403).json({ messaggio: "Non puoi modificare questa prenotazione" });
        }

        const risultato = await modPrenotazione(idPren, newPren);

        if (risultato?.errore) {
          return res.status(400).json(risultato);
        }

        if (risultato && risultato.affectedRows > 0) {
          return res.status(200).json({ messaggio: "Prenotazione modificata correttamente" });
        }

        return res.status(404).json({ messaggio: "Prenotazione non trovata" });
      }

      return res.status(403).json({ messaggio: "Permesso negato" });

    } catch (error) {
      res.status(400).json({ messaggio: "Errore modifica prenotazione" });
    }
  });

  app.get("/utenti/me/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const risultato = await getUtenteById(id);

      if (!risultato) {
        return res.status(500).json({ messaggio: "Errore database" });
      }

      if (risultato.length === 0) {
        return res.status(404).json({ messaggio: "Utente non trovato" });
      }

      res.status(200).json(risultato[0]);
    } catch (error) {
      res.status(500).json({ messaggio: "Errore lettura utente" });
    }
  });

app.post("/auth/google", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ errore: "Token mancante" });
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const nome = payload.name;
    const email = payload.email;

    let utente = await getUtenteByEmail(email);

    if (!utente || utente.length === 0) {
      await creaUtenteGoogle(nome, email);
      utente = await getUtenteByEmail(email);
    }

    res.status(200).json({
      messaggio: "Login Google riuscito",
      utente: utente[0],
    });
  } catch (errore) {
    console.error("Errore Google Auth:", errore);
    res.status(500).json({ errore: "Errore autenticazione Google" });
  }
});
 app.listen(process.env.PORT || 3000, () => {
  console.log("Server in attesa sulla porta " + (process.env.PORT || 3000));
}); 