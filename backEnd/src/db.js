import "dotenv/config";
import mysql from "mysql2";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
}).promise();

// AULE
export async function getAule() {
  try {
    const sql = "SELECT * FROM aule";
    const [risultato] = await pool.query(sql);
    return risultato;
  } catch (error) {
    console.log("Errore getAule:", error.message);
    return null;
  }
}

// UTENTI
export async function getUtenti() {
  try {
    const sql = "SELECT * FROM utenti";
    const [risultato] = await pool.query(sql);
    return risultato;
  } catch (error) {
    console.log("Errore getUtenti:", error.message);
    return null;
  }
}

export async function getUtenteById(id_utente) {
  try {
    const sql = "SELECT * FROM utenti WHERE id_utente = ?";
    const [risultato] = await pool.query(sql, [id_utente]);
    return risultato;
  } catch (error) {
    console.log("Errore getUtenteById:", error.message);
    return null;
  }
}

export async function getUtenteByEmail(email) {
  try {
    const sql = "SELECT * FROM utenti WHERE email = ?";
    const [risultato] = await pool.query(sql, [email]);
    return risultato;
  } catch (error) {
    console.log("Errore getUtenteByEmail:", error.message);
    return null;
  }
}

export async function getRuoloUtente(id_utente) {
  try {
    const sql = "SELECT ruolo FROM utenti WHERE id_utente = ?";
    const [risultato] = await pool.query(sql, [id_utente]);
    return risultato;
  } catch (error) {
    console.log("Errore getRuoloUtente:", error.message);
    return null;
  }
}

// PRENOTAZIONI
export async function getPrenotazioni() {
  try {
    const sql = `
      SELECT
        p.id_prenotazione,
        p.data,
        p.ora_inizio,
        p.ora_fine,
        p.motivazione,
        p.id_utente,
        p.id_aula
      FROM prenotazioni p
      ORDER BY p.data, p.ora_inizio
    `;
    const [risultato] = await pool.query(sql);
    return risultato;
  } catch (error) {
    console.log("Errore getPrenotazioni:", error.message);
    return null;
  }
}

export async function getPrenotazione(id_prenotazione) {
  try {
    const sql = "SELECT * FROM prenotazioni WHERE id_prenotazione = ?";
    const [risultato] = await pool.query(sql, [id_prenotazione]);
    return risultato;
  } catch (error) {
    console.log("Errore getPrenotazione:", error.message);
    return null;
  }
}

export async function inserisciPrenotazione(newPren) {
  try {
    const sqlConflitto = `
      SELECT * FROM prenotazioni
      WHERE id_aula = ?
      AND data = ?
      AND ? < ora_fine
      AND ? > ora_inizio
    `;

    const [conflitti] = await pool.query(sqlConflitto, [
      newPren.id_aula,
      newPren.data,
      newPren.ora_inizio,
      newPren.ora_fine
    ]);

    if (conflitti.length > 0) {
      return { errore: "Aula già prenotata in questa fascia oraria" };
    }

    const sqlInsert = `
      INSERT INTO prenotazioni (data, ora_inizio, ora_fine, id_utente, id_aula, motivazione)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [risultato] = await pool.query(sqlInsert, [
      newPren.data,
      newPren.ora_inizio,
      newPren.ora_fine,
      newPren.id_utente,
      newPren.id_aula,
      newPren.motivazione
    ]);

    return risultato;
  } catch (error) {
    console.log("Errore inserisciPrenotazione:", error.message);
    return null;
  }
}

export async function modPrenotazione(id_prenotazione, newPren) {
  try {
    const sqlConflitto = `
      SELECT * FROM prenotazioni
      WHERE id_aula = ?
      AND data = ?
      AND ? < ora_fine
      AND ? > ora_inizio
      AND id_prenotazione <> ?
    `;

    const [conflitti] = await pool.query(sqlConflitto, [
      newPren.id_aula,
      newPren.data,
      newPren.ora_inizio,
      newPren.ora_fine,
      id_prenotazione
    ]);

    if (conflitti.length > 0) {
      return { errore: "Aula già prenotata in questa fascia oraria" };
    }

    const sqlUpdate = `
      UPDATE prenotazioni
      SET data = ?, ora_inizio = ?, ora_fine = ?, id_utente = ?, id_aula = ?, motivazione = ?
      WHERE id_prenotazione = ?
    `;

    const [risultato] = await pool.query(sqlUpdate, [
      newPren.data,
      newPren.ora_inizio,
      newPren.ora_fine,
      newPren.id_utente,
      newPren.id_aula,
      newPren.motivazione,
      id_prenotazione
    ]);

    return risultato;
  } catch (error) {
    console.log("Errore modPrenotazione:", error.message);
    return null;
  }
}

export async function cancPrenotazione(id_prenotazione) {
  try {
    const sql = "DELETE FROM prenotazioni WHERE id_prenotazione = ?";
    const [risultato] = await pool.query(sql, [id_prenotazione]);
    return risultato;
  } catch (error) {
    console.log("Errore cancPrenotazione:", error.message);
    return null;
  }
}