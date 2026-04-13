import React, { useState, useCallback, useMemo } from 'react'
import {
  MOCK_USERS, MOCK_AULE, MOCK_CLASSI, INITIAL_BOOKINGS,
  getAula, getUser, getClasse, labelRole,
  formatDate, formatDateLabel, fmtDate,
  checkOverlap, canModify, canDelete
} from './data.js'

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  if (!currentUser) {
    return <LoginScreen onLogin={setCurrentUser} />;
  }
  return <AppShell currentUser={currentUser} onLogout={() => setCurrentUser(null)} />;
}

function LoginScreen({ onLogin }) {
  const handleGoogleLogin = () => {
    const emails = MOCK_USERS.map(u => u.email).join('\n');
    const email  = window.prompt('Inserisci la tua email (demo):\n\n' + emails, 'massimiliano.iommi@ittterni.org');
    if (!email) return;
    const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (!user) {
      window.alert('Accesso negato: email non presente nel sistema.\n(401 Unauthorized)');
      return;
    }
    onLogin(user);
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-logo">P</div>
        <h1>Prenotami</h1>
        <p>Piattaforma di prenotazione aule scolastiche.<br />Accedi con il tuo account scuola.</p>
        <button className="btn-google" onClick={handleGoogleLogin}>
          <div className="google-icon" />
          Continua con Google
        </button>
        <p className="login-note">L'accesso è consentito solo agli utenti già registrati nel sistema.</p>
      </div>
    </div>
  );
}

function AppShell({ currentUser, onLogout }) {
  const [page, setPage] = useState('dashboard');

  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [nextId,   setNextId]   = useState(6);

  const addBooking    = useCallback(b => {
    setBookings(prev => [...prev, { ...b, id: nextId }]);
    setNextId(n => n + 1);
  }, [nextId]);

  const updateBooking = useCallback((id, data) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, ...data } : b));
  }, []);

  const removeBooking = useCallback(id => {
    setBookings(prev => prev.filter(b => b.id !== id));
  }, []);

  const initials = currentUser.nome[0] + currentUser.cognome[0];

  return (
    <div className="app-shell">
      <nav className="topnav">
        <div className="nav-brand" onClick={() => setPage('dashboard')}>
          <div className="nav-brand-icon">P</div>
          Prenotami
        </div>

        <div className="nav-tabs">
          <button
            className={'nav-tab' + (page === 'dashboard' ? ' active' : '')}
            onClick={() => setPage('dashboard')}
          >Dashboard</button>
          <button
            className={'nav-tab' + (page === 'profilo' ? ' active' : '')}
            onClick={() => setPage('profilo')}
          >Profilo</button>
        </div>

        <div className="nav-user">
          <div className="user-info">
            <div className="name">{currentUser.nome} {currentUser.cognome}</div>
            <div className="role">{labelRole(currentUser.ruolo)}</div>
          </div>
          <div className="avatar">{initials}</div>
          <button className="btn-logout" onClick={onLogout}>Esci</button>
        </div>
      </nav>

      <div className="main">
        {page === 'dashboard' && (
          <DashboardPage
            currentUser={currentUser}
            bookings={bookings}
            onAdd={addBooking}
            onUpdate={updateBooking}
            onDelete={removeBooking}
          />
        )}
        {page === 'profilo' && (
          <ProfilePage
            currentUser={currentUser}
            bookings={bookings}
          />
        )}
      </div>
    </div>
  );
}

function DashboardPage({ currentUser, bookings, onAdd, onUpdate, onDelete }) {
  const [search,       setSearch]       = useState('');
  const [filterAula,   setFilterAula]   = useState('');
  const [filterClasse, setFilterClasse] = useState('');
  const [globalAlert,  setGlobalAlert]  = useState(null);
  const [modalOpen,    setModalOpen]    = useState(false);
  const [editingId,    setEditingId]    = useState(null);

  const canBook = ['docente', 'ata', 'admin'].includes(currentUser.ruolo);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return [...bookings]
      .filter(b => !filterAula   || b.id_aula == filterAula)
      .filter(b => !filterClasse || b.classi.includes(Number(filterClasse)))
      .filter(b => {
        if (!q) return true;
        const aula  = getAula(b.id_aula).descrizione.toLowerCase();
        const u     = getUser(b.id_utente);
        const uName = (u.nome + ' ' + u.cognome).toLowerCase();
        const moti  = b.motivo.toLowerCase();
        const cls   = b.classi.map(id => getClasse(id).label.toLowerCase()).join(' ');
        return aula.includes(q) || uName.includes(q) || moti.includes(q) || cls.includes(q);
      })
      .sort((a, b) => (a.data + a.ora_inizio).localeCompare(b.data + b.ora_inizio));
  }, [bookings, search, filterAula, filterClasse]);

  const groups = useMemo(() => {
    const map = new Map();
    filtered.forEach(b => {
      if (!map.has(b.data)) map.set(b.data, []);
      map.get(b.data).push(b);
    });
    return Array.from(map.entries());
  }, [filtered]);

  const showGlobal = (msg, type) => {
    setGlobalAlert({ msg, type });
    setTimeout(() => setGlobalAlert(null), 4000);
  };

  const handleDelete = (id) => {
    const b = bookings.find(x => x.id === id);
    if (!b || !canDelete(b, currentUser)) {
      showGlobal('Non hai i permessi per eliminare questa prenotazione. (403 Forbidden)', 'error');
      return;
    }
    if (!window.confirm('Sei sicuro di voler eliminare questa prenotazione?')) return;
    onDelete(id);
    showGlobal('Prenotazione eliminata.', 'success');
  };

  const handleSave = ({ isNew, id, data }) => {
    if (isNew) {
      onAdd({ ...data, id_utente: currentUser.id, stato: 'attiva' });
      showGlobal('Prenotazione creata con successo.', 'success');
    } else {
      onUpdate(id, data);
      showGlobal('Prenotazione modificata con successo.', 'success');
    }
    setModalOpen(false);
    setEditingId(null);
  };

  const openNew  = () => { setEditingId(null); setModalOpen(true); };
  const openEdit = id  => { setEditingId(id);  setModalOpen(true); };

  const editingBooking = editingId ? bookings.find(b => b.id === editingId) : null;

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Gestisci le prenotazioni delle aule</p>
        </div>
        {canBook && (
          <button className="btn btn-primary" onClick={openNew}>
            + Nuova Prenotazione
          </button>
        )}
      </div>

      <div className="toolbar">
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Cerca per aula, utente, motivo…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="filter-select" value={filterAula} onChange={e => setFilterAula(e.target.value)}>
          <option value="">Tutte le aule</option>
          {MOCK_AULE.map(a => <option key={a.id} value={a.id}>{a.descrizione}</option>)}
        </select>
        <select className="filter-select" value={filterClasse} onChange={e => setFilterClasse(e.target.value)}>
          <option value="">Tutte le classi</option>
          {MOCK_CLASSI.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
      </div>

      {globalAlert && (
        <div className={`alert alert-${globalAlert.type}`}>{globalAlert.msg}</div>
      )}

      <div className="bookings-list">
        {groups.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <h3>Nessuna prenotazione trovata</h3>
            <p>Prova a modificare i filtri di ricerca.</p>
          </div>
        ) : (
          groups.map(([date, items]) => (
            <React.Fragment key={date}>
              <div className="date-divider">{formatDateLabel(date)}</div>
              {items.map(b => (
                <BookingCard
                  key={b.id}
                  booking={b}
                  currentUser={currentUser}
                  onEdit={openEdit}
                  onDelete={handleDelete}
                />
              ))}
            </React.Fragment>
          ))
        )}
      </div>

      {modalOpen && (
        <BookingModal
          bookings={bookings}
          editing={editingBooking}
          currentUser={currentUser}
          onSave={handleSave}
          onClose={() => { setModalOpen(false); setEditingId(null); }}
        />
      )}
    </>
  );
}

function ProfilePage({ currentUser, bookings }) {
  const todayStr   = fmtDate(new Date());
  const myBookings = bookings.filter(b => b.id_utente === currentUser.id);
  const upcoming   = myBookings
    .filter(b => b.data >= todayStr)
    .sort((a, b) => (a.data + a.ora_inizio).localeCompare(b.data + b.ora_inizio));

  const initials = currentUser.nome[0] + currentUser.cognome[0];

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Profilo</h1>
          <p className="page-subtitle">Le tue informazioni e prenotazioni</p>
        </div>
      </div>

      <div className="profile-layout">
        <div className="profile-card">
          <div className="profile-avatar">{initials}</div>
          <div className="profile-name">{currentUser.nome} {currentUser.cognome}</div>
          <div className="profile-email">{currentUser.email}</div>
          <div className="profile-role">{labelRole(currentUser.ruolo)}</div>
          <div className="profile-stats">
            <div className="stat-box">
              <div className="stat-label">Totale</div>
              <div className="stat-value">{myBookings.length}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Prossime</div>
              <div className="stat-value">{upcoming.length}</div>
            </div>
          </div>
        </div>

        <div className="profile-upcoming">
          <h3>Prossime prenotazioni</h3>
          <div className="bookings-list">
            {upcoming.length === 0 ? (
              <div className="empty-state" style={{ padding: '30px 0' }}>
                <div className="empty-icon">✅</div>
                <h3>Nessuna prenotazione futura</h3>
                <p>Le tue prossime prenotazioni appariranno qui.</p>
              </div>
            ) : (
              upcoming.map(b => (
                <BookingCard key={b.id} booking={b} currentUser={currentUser} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function BookingCard({ booking: b, currentUser, onEdit, onDelete }) {
  const aula   = getAula(b.id_aula);
  const utente = getUser(b.id_utente);
  const todayStr = fmtDate(new Date());
  const isPast   = b.data < todayStr;

  const d     = new Date(b.data + 'T12:00:00');
  const day   = d.getDate();
  const month = d.toLocaleDateString('it-IT', { month: 'short' });

  const mayEdit   = onEdit   && canModify(b, currentUser) && !isPast;
  const mayDelete = onDelete && canDelete(b, currentUser);

  return (
    <div className="booking-card">
      <div className="booking-date-col">
        <div className="booking-day">{day}</div>
        <div className="booking-month">{month}</div>
      </div>

      <div>
        <div className="booking-header">
          <span className="booking-aula">{aula.descrizione}</span>
          <span className={'badge ' + (isPast ? 'badge-amber' : 'badge-green')}>
            {isPast ? 'Passata' : 'Attiva'}
          </span>
        </div>
        <div className="booking-meta">
          <span>🕐 {b.ora_inizio} – {b.ora_fine}</span>
          <span>👤 {utente.nome} {utente.cognome}</span>
          <span>📅 {formatDate(b.data)}</span>
        </div>
        <div className="booking-motivo">{b.motivo}</div>
        {b.classi.length > 0 && (
          <div className="booking-classes">
            {b.classi.map(id => (
              <span key={id} className="class-pill">{getClasse(id).label}</span>
            ))}
          </div>
        )}
      </div>

      <div className="booking-actions">
        {mayEdit   && <button className="btn-icon"        title="Modifica" onClick={() => onEdit(b.id)}>✏️</button>}
        {mayDelete && <button className="btn-icon danger" title="Elimina"  onClick={() => onDelete(b.id)}>🗑️</button>}
      </div>
    </div>
  );
}

function BookingModal({ bookings, editing, currentUser, onSave, onClose }) {
  const todayStr = fmtDate(new Date());
  const isEdit   = !!editing;

  const [idAula,      setIdAula]      = useState(editing ? editing.id_aula    : '');
  const [data,        setData]        = useState(editing ? editing.data        : todayStr);
  const [oraInizio,   setOraInizio]   = useState(editing ? editing.ora_inizio  : '08:00');
  const [oraFine,     setOraFine]     = useState(editing ? editing.ora_fine    : '10:00');
  const [motivo,      setMotivo]      = useState(editing ? editing.motivo      : '');
  const [classi,      setClassi]      = useState(editing ? [...editing.classi] : []);
  const [errorMsg,    setErrorMsg]    = useState('');

  const toggleClasse = (id) => {
    setClassi(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleSubmit = () => {
    setErrorMsg('');

    if (!idAula)               return setErrorMsg("Seleziona un'aula.");
    if (!data)                 return setErrorMsg('Inserisci una data.');
    if (!oraInizio || !oraFine) return setErrorMsg("Inserisci orario di inizio e fine.");
    if (oraInizio >= oraFine)  return setErrorMsg("L'orario di fine deve essere successivo all'inizio.");
    if (!motivo.trim())        return setErrorMsg('Inserisci un motivo per la prenotazione.');

    const conflict = checkOverlap(bookings, {
      id_aula:    Number(idAula),
      data,
      ora_inizio: oraInizio,
      ora_fine:   oraFine,
      excludeId:  editing ? editing.id : null,
    });

    if (conflict) {
      const u = getUser(conflict.id_utente);
      setErrorMsg(
        `⚠️ Aula già prenotata dalle ${conflict.ora_inizio} alle ${conflict.ora_fine} ` +
        `da ${u.nome} ${u.cognome}. Scegli un orario diverso.`
      );
      return;
    }

    onSave({
      isNew: !isEdit,
      id: editing ? editing.id : null,
      data: {
        id_aula:    Number(idAula),
        data,
        ora_inizio: oraInizio,
        ora_fine:   oraFine,
        motivo:     motivo.trim(),
        classi,
      },
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">{isEdit ? 'Modifica Prenotazione' : 'Crea Prenotazione'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {errorMsg && <div className="alert alert-error">{errorMsg}</div>}

        <div className="form-group">
          <label className="form-label">Aula *</label>
          <select className="form-select" value={idAula} onChange={e => setIdAula(e.target.value)}>
            <option value="">Seleziona un'aula</option>
            {MOCK_AULE.map(a => <option key={a.id} value={a.id}>{a.descrizione}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Data *</label>
          <input type="date" className="form-input" value={data} onChange={e => setData(e.target.value)} />
        </div>

        <div className="form-row">
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Ora inizio *</label>
            <input type="time" className="form-input" value={oraInizio} onChange={e => setOraInizio(e.target.value)} />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Ora fine *</label>
            <input type="time" className="form-input" value={oraFine} onChange={e => setOraFine(e.target.value)} />
          </div>
        </div>

        <div className="form-group" style={{ marginTop: 16 }}>
          <label className="form-label">Motivo *</label>
          <textarea
            className="form-textarea"
            placeholder="es. Lezione di Matematica, Attività laboratoriale…"
            value={motivo}
            onChange={e => setMotivo(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Classi coinvolte</label>
          <div className="classes-grid">
            {MOCK_CLASSI.map(c => (
              <button
                key={c.id}
                className={'class-chip' + (classi.includes(c.id) ? ' selected' : '')}
                onClick={() => toggleClasse(c.id)}
                type="button"
              >
                {c.label}
              </button>
            ))}
          </div>
          <p className="form-hint">Puoi selezionare più classi.</p>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Annulla</button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {isEdit ? 'Salva Modifiche' : 'Crea Prenotazione'}
          </button>
        </div>
      </div>
    </div>
  );
}
