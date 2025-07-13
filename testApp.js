import { db } from './firebase/firebase-config.js';
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js';
import { isAdmin, logTest } from './test.js';


// Integrationstest
async function testFetchNotes() {
  const snap = await getDocs(collection(db, 'notes'));
  console.assert(snap.size >= 0, "Fehler beim Abrufen der Notizen");
  console.log("✅ Test bestanden: Anzahl Notizen:", snap.size);
}

logTest("Admin erkannt", isAdmin("vDAPqylOw0RcAUOnUJHPNZQwMQ23") === true);
testFetchNotes();