
export const MOCK_USERS = [
  { id: 1, email: 'massimiliano.iommi@ittterni.org',     nome: 'Massimiliano',    cognome: 'Iommi',   ruolo: 'docente'  },
  { id: 2, email: 'simone.austeri@ittterni.org', nome: 'Simone', cognome: 'Austeri', ruolo: 'docente'  },
  { id: 3, email: 'attilio.delpico@ittterni.org',            nome: 'Attilio',    cognome: 'Del Pico',  ruolo: 'admin'    },
  { id: 4, email: 'emanuele.smarrazzo@ittterni.org',       nome: 'Emanuele',     cognome: 'Smarrazzo',   ruolo: 'studente' },
  { id: 5, email: 'enrico.tecnico@ittterni.org',              nome: 'Enrico',    cognome: 'Tecnico',    ruolo: 'ata'      },
  {id: 6, email: 'giorgioalessandro.galeanolourido@ittterni.org',      nome: 'Giorgio',        cognome:'Galeano',    ruolo: 'studente'},
  {id: 7, email: 'giacomo.bucciarelli@ittterni.org',      nome: 'Giacomo',        cognome:'Bucciarelli',    ruolo: 'studente'}
  
];

export const MOCK_AULE = [
  { id: 1, codice: 101, descrizione: 'Aula 101' },
  { id: 2, codice: 102, descrizione: 'Aula 102' },
  { id: 3, codice: 103, descrizione: 'Aula 103' },
  { id: 4, codice: 110, descrizione: 'Laboratorio A (110)' },
  { id: 5, codice: 111, descrizione: 'Laboratorio B (111)' },
  { id: 6, codice: 50,  descrizione: 'Palestra (50)' },
  { id: 7, codice: 20,  descrizione: 'Aula Magna (20)' },
];

export const MOCK_CLASSI = [
  { id: 1, label: '1AIA' }, { id: 2, label: '2AIA' },
  { id: 3, label: '3AIA' }, { id: 4, label: '4AIA' }, { id: 5, label: '5AIA' },
  { id: 6, label: '1AIN' }, { id: 7, label: '3AIN' },
  { id: 8, label: '1AMM' }, { id: 9, label: '3AMM' },
];


export function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

export function fmtDate(date) {
  return date.toISOString().split('T')[0];
}

export function getAula(id)   { return MOCK_AULE.find(a => a.id === id)   || { descrizione: 'Aula '  + id }; }
export function getUser(id)   { return MOCK_USERS.find(u => u.id === id)  || { nome: 'Utente', cognome: '#' + id }; }
export function getClasse(id) { return MOCK_CLASSI.find(c => c.id === id) || { label: 'Classe ' + id }; }

export function labelRole(r) {
  const map = { studente: 'Studente', docente: 'Docente', ata: 'Pers. ATA', admin: 'Amministratore' };
  return map[r] || r;
}

export function formatDate(str) {
  const d = new Date(str + 'T12:00:00');
  return d.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function formatDateLabel(str) {
  const today = fmtDate(new Date());
  const tomorrow = fmtDate(addDays(new Date(), 1));
  const d = new Date(str + 'T12:00:00');
  if (str === today)    return 'Oggi — ' + formatDate(str);
  if (str === tomorrow) return 'Domani — ' + formatDate(str);
  return d.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' });
}


export function checkOverlap(bookings, { id_aula, data, ora_inizio, ora_fine, excludeId }) {
  return bookings.find(b => {
    if (b.id_aula !== id_aula) return false;
    if (b.data    !== data)    return false;
    if (excludeId && b.id === excludeId) return false;
    return ora_inizio < b.ora_fine && ora_fine > b.ora_inizio;
  }) || null;
}


export function canModify(booking, currentUser) {
  if (!currentUser) return false;
  if (currentUser.ruolo === 'admin')    return true;
  if (currentUser.ruolo === 'studente') return false;
  return booking.id_utente === currentUser.id;
}

export function canDelete(booking, currentUser) {
  return canModify(booking, currentUser);
}

export const today = new Date();

export const INITIAL_BOOKINGS = [
  {
    id: 1, id_aula: 1, id_utente: 1,
    data: fmtDate(today),
    ora_inizio: '09:00', ora_fine: '10:30',
    motivo: 'Lezione di Matematica', classi: [1, 2], stato: 'attiva',
  },
  {
    id: 2, id_aula: 4, id_utente: 2,
    data: fmtDate(today),
    ora_inizio: '11:00', ora_fine: '13:00',
    motivo: 'Laboratorio di Informatica', classi: [3], stato: 'attiva',
  },
  {
    id: 3, id_aula: 2, id_utente: 1,
    data: fmtDate(addDays(today, 1)),
    ora_inizio: '14:00', ora_fine: '15:30',
    motivo: 'Lezione di Fisica', classi: [5], stato: 'attiva',
  },
  {
    id: 4, id_aula: 7, id_utente: 5,
    data: fmtDate(addDays(today, 2)),
    ora_inizio: '10:00', ora_fine: '12:00',
    motivo: 'Assemblea di Istituto', classi: [1,2,3,4,5,6,7,8,9], stato: 'attiva',
  },
  {
    id: 5, id_aula: 3, id_utente: 2,
    data: fmtDate(addDays(today, -1)),
    ora_inizio: '08:00', ora_fine: '09:30',
    motivo: 'Verifica Scritto Italiano', classi: [4], stato: 'attiva',
  },
];
