import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-messaging.js";

const vapidKey = "BApzGRNhN-lVcZg59cxwTMYraX5Vy4zIQZOkRKWdLzXCtNfnHmibm4id85SS2CxrXlp3OpaFOWAhlHwQphNx_DA";

let messaging;

export async function initNotifications(app) {
  messaging = getMessaging(app);

  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("Notification permission denied");
      return;
    }

    const token = await getToken(messaging, { vapidKey });
    console.log("Firebase Push Token:", token);

  } catch (error) {
    console.error("Failed to get push token:", error);
  }

  onMessage(messaging, (payload) => {
    console.log("Message received:", payload);
    const { title, body, icon } = payload.notification;
    new Notification(title, {
      body,
      icon: icon || "/favicon.ico"
    });
  });
}

export function showLocalNotification(title, body) {
  if (Notification.permission === "granted") {
    new Notification(title, {
      body,
      icon: "/favicon.ico"
    });
  }
}
