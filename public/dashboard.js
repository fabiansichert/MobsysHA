import { auth, db, onAuthStateChanged, logout } from './firebase/firebase-config.js';
import { showLocalNotification } from './notify.js';
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, serverTimestamp, query, orderBy } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const adminUID = "vDAPqylOw0RcAUOnUJHPNZQwMQ23";

const userInfo = document.getElementById('user-info');
const logoutBtn = document.getElementById('logout-btn');
const notesBoard = document.getElementById('notes-board');
const addNoteBtn = document.getElementById('add-note-btn');
const noteModal = document.getElementById('note-modal');
const noteForm = document.getElementById('note-form');
const noteTitleInput = document.getElementById('note-title');
const noteContentInput = document.getElementById('note-content');
const cancelNoteBtn = document.getElementById('cancel-note-btn');

let currentUser = null;
let editNoteId = null;

const statusEl = document.getElementById("connection-status");

function setStatus(online) {
  statusEl.textContent = online ? "Online" : "Offline";
  statusEl.className = online ? "online" : "offline";
}

window.addEventListener("online", () => setStatus(true));
window.addEventListener("offline", () => setStatus(false));
setStatus(navigator.onLine);

onSnapshot(doc(db, "status", "ping"), () => setStatus(false), () => setStatus(true));



onAuthStateChanged(auth, user => {
  if (user) {
    currentUser = user;
    userInfo.textContent = `Eingeloggt als: ${user.email}`;
    listenToNotes();
  } else {
    window.location.href = 'login.php';
  }
});

logoutBtn.addEventListener('click', () => logout());

addNoteBtn.addEventListener('click', () => {
  editNoteId = null;
  noteTitleInput.value = '';
  noteContentInput.value = '';
  noteModal.classList.add('active');
  noteTitleInput.focus();
});

cancelNoteBtn.addEventListener('click', e => {
  e.preventDefault();
  closeModal();
});

noteForm.addEventListener('submit', async e => {
  e.preventDefault();
  const title = noteTitleInput.value.trim();
  const content = noteContentInput.value.trim();
  if (!title) return alert('Bitte einen Titel eingeben.');

  try {
    if (editNoteId) {
      const docRef = doc(db, 'notes', editNoteId);
      await updateDoc(docRef, {
        title,
        content,
        timestamp: serverTimestamp()
      });
      //showLocalNotification("Notiz aktualisiert", `Die Notiz "${title}" wurde aktualisiert.`);
    } else {
      await addDoc(collection(db, 'notes'), {
        title,
        content,
        timestamp: serverTimestamp(),
        createdBy: currentUser.uid
      });
      showLocalNotification("Neue Notiz", `Die Notiz "${title}" wurde erstellt.`);
    }
    closeModal();
  } catch (error) {
    console.error('Fehler beim Speichern:', error);
  }
});

function listenToNotes() {
  const q = query(collection(db, 'notes'), orderBy('timestamp', 'desc'));
  onSnapshot(q, snapshot => {
    notesBoard.innerHTML = '';
    snapshot.forEach(docSnap => {
      const note = docSnap.data();
      const noteId = docSnap.id;

      const noteEl = document.createElement('div');
      noteEl.className = 'note';
      noteEl.dataset.id = noteId;

      noteEl.innerHTML = `
        <strong>${note.title}</strong><br />
        <small>${note.timestamp?.toDate().toLocaleString() || 'Zeit unbekannt'}</small>
        <p>${note.content}</p>
        ${currentUser.uid === adminUID ? '<button class="delete-btn" title="Löschen">&times;</button>' : ''}
      `;

      noteEl.addEventListener('click', e => {
        if (e.target.classList.contains('delete-btn')) return;
        openEditModal(noteId, note);
      });

      if (currentUser.uid === adminUID) {
        const delBtn = noteEl.querySelector('.delete-btn');
        delBtn?.addEventListener('click', async e => {
          e.stopPropagation();
          if (confirm('Notiz wirklich löschen?')) {
            try {
              await deleteDoc(doc(db, 'notes', noteId));
            } catch (error) {
              console.error('Fehler beim Löschen:', error);
            }
          }
        });
      }

      notesBoard.appendChild(noteEl);
    });
  });
}

function openEditModal(id, note) {
  editNoteId = id;
  noteTitleInput.value = note.title;
  noteContentInput.value = note.content;
  noteModal.classList.add('active');
  noteTitleInput.focus();
}

function closeModal() {
  noteModal.classList.remove('active');
}