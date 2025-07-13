export function showLocalNotification(title, body) {
  if (Notification.permission === "granted") {
    new Notification(title, {
      body,
      icon: "/favicon.ico"
    });
  } else {
    console.warn("Keine Benachrichtigung, da keine Erlaubnis erteilt wurde.");
  }
}

