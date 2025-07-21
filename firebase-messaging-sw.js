importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyD1mLsKEpVUvsOsnzaoNmaEHzsNM6ORGqc",
  authDomain: "itext-realme.firebaseapp.com",
  projectId: "itext-realme",
  storageBucket: "itext-realme.firebasestorage.app",
  messagingSenderId: "540414487794",
  appId: "1:540414487794:web:3dca30a050d6b5e131746b",
  measurementId: "G-E9DL66RH8G"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icone-do-app.png' // Ajuste para o caminho do seu ícone
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
