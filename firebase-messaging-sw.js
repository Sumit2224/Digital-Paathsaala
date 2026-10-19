importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

// Aapka Firebase Config
firebase.initializeApp({
  apiKey: "AIzaSyArhU80g92Lx9N27E5lFsPdtRPQDefZC3Q",
  authDomain: "digital-paathsaala.firebaseapp.com",
  projectId: "digital-paathsaala",
  storageBucket: "digital-paathsaala.firebasestorage.app",
  messagingSenderId: "137172310340",
  appId: "1:137172310340:web:9e2a8d51d2be41e4311f11"
});

const messaging = firebase.messaging();

// Background mein notification receive karne ka logic
messaging.onBackgroundMessage((payload) => {
  console.log("Background Notification Received:", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "logo.png" // Aapki site ka logo
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});