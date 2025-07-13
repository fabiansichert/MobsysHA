importScripts("https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/11.9.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyBmqUwSODy1cNOpFvfqDX4XLRPhODqI9No",
  authDomain: "mobsysha.firebaseapp.com",
  projectId: "mobsysha",
  storageBucket: "mobsysha.firebasestorage.app",
  messagingSenderId: "168308844642",
  appId: "1:168308844642:web:d58374fdee70af8066893b"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body, icon } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: icon || "/favicon.ico"
  });
});