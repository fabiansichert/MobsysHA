import { auth, loginWithGoogle, onAuthStateChanged } from './firebase/firebase-config.js';

onAuthStateChanged(auth, user => {
  if (user) {
    window.location.href = 'dashboard.php';
  }
});

document.getElementById('login-btn').addEventListener('click', () => {
  loginWithGoogle();
});

