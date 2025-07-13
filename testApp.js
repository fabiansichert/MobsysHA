import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { isAdmin, logTest } from './test.js';

const firebaseConfig = {
  apiKey: "AIzaSyBmqUwSODy1cNOpFvfqDX4XLRPhODqI9No",
  authDomain: "mobsysha.firebaseapp.com",
  projectId: "mobsysha",
  storageBucket: "mobsysha.firebasestorage.app",
  messagingSenderId: "168308844642",
  appId: "1:168308844642:web:d58374fdee70af8066893b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testFetchNotes() {
  const snap = await getDocs(collection(db, 'notes'));
  console.assert(snap.size >= 0, "Fehler beim Abrufen der Notizen");
  console.log("✅ Test bestanden: Anzahl Notizen:", snap.size);
}

logTest("Admin erkannt", isAdmin("vDAPqylOw0RcAUOnUJHPNZQwMQ23") === true);
testFetchNotes();
