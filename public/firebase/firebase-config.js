import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBmqUwSODy1cNOpFvfqDX4XLRPhODqI9No",
  authDomain: "mobsysha.firebaseapp.com",
  projectId: "mobsysha",
  storageBucket: "mobsysha.firebasestorage.app",
  messagingSenderId: "168308844642",
  appId: "1:168308844642:web:d58374fdee70af8066893b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Offline
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn("Offline-Cache konnte nicht aktiviert werden: Mehrere Tabs geöffnet.");
  } else if (err.code === 'unimplemented') {
    console.warn("Offline-Cache wird vom Browser nicht unterstützt.");
  }
});

// Service Worker registrieren
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then(reg => console.log("SW registriert:", reg))
    .catch(err => console.error("SW Registrierung fehlgeschlagen:", err));
}

if (Notification.permission === "granted") {
} else if (Notification.permission !== "denied") {
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
    }
  });
}


const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    window.location.href = "dashboard.php";
  } catch (error) {
    console.error("Login fehlgeschlagen:", error.message);
  }
};


const logout = async () => {
  await signOut(auth);
  window.location.href = "login.php";
};

const adminUID = "vDAPqylOw0RcAUOnUJHPNZQwMQ23";

export { auth, db, loginWithGoogle, logout, onAuthStateChanged, adminUID };
