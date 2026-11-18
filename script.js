
/* =========================================
   PHATHU ACADEMY 2.0
   CENTRAL FIREBASE CONFIGURATION
   Firebase SDK v8
========================================= */

(function () {
  "use strict";

  // Existing Phathu Academy Firebase project
  const firebaseConfig = {
    apiKey: "AIzaSyCzLqy8TJgTtpBbsusyreogoYPyWMTYIw8",
    authDomain: "phathuacademy.firebaseapp.com",
    databaseURL: "https://phathuacademy-default-rtdb.firebaseio.com",
    projectId: "phathuacademy",
    storageBucket: "phathuacademy.firebasestorage.app",
    messagingSenderId: "1068817765082",
    appId: "1:1068817765082:web:26f32d0ec480c3bb9dcbe3",
    measurementId: "G-LWSZLVQJDS"
  };

  // Prevent duplicate initialization
  if (typeof firebase === "undefined") {
    console.error("Firebase SDK did not load.");
    return;
  }

  try {

    const app = firebase.apps.length
      ? firebase.app()
      : firebase.initializeApp(firebaseConfig);

    const auth = firebase.auth();
    const db = firebase.firestore();
    const storage = firebase.storage();
    const realtimeDB = firebase.database();

    // Set persistent login sessions
    const persistenceReady = auth.setPersistence(
      firebase.auth.Auth.Persistence.LOCAL
    );

    // Global academy services
    window.academy = {
      app: app,
      auth: auth,
      db: db,
      storage: storage,
      realtimeDB: realtimeDB,
      persistenceReady: persistenceReady,
      ready: true
    };

    // Useful shared notification function
    window.academyMessage = function (message, type) {

      let notification = document.getElementById(
        "academyNotification"
      );

      if (!notification) {
        notification = document.createElement("div");
        notification.id = "academyNotification";

        notification.style.cssText = `
          position:fixed;
          top:20px;
          right:20px;
          z-index:99999;
          max-width:320px;
          padding:15px 20px;
          border-radius:10px;
          color:white;
          background:#14243c;
          border:1px solid #258bff;
          font-family:Arial,sans-serif;
          font-size:13px;
          box-shadow:0 10px 35px rgba(0,0,0,.3);
        `;

        document.body.appendChild(notification);
      }

      notification.textContent = message;

      notification.style.borderColor =
        type === "error" ? "#ff5555" :
        type === "success" ? "#22c994" : "#258bff";

      clearTimeout(window.academyMessageTimer);

      window.academyMessageTimer = setTimeout(function () {
        notification.remove();
      }, 4500);
    };

    console.log("Phathu Academy 2.0 Firebase initialized.");

  } catch (error) {

    window.academy = {
      ready: false,
      error: error
    };

    console.error("Firebase initialization error:", error);
  }

})();
