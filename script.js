
/* ============================================
   PHATHU ACADEMY 2.0
   CENTRAL FIREBASE CONFIGURATION
   Firebase SDK 8.10.1
============================================ */

(function () {
    "use strict";

    // ORIGINAL PHATHU ACADEMY FIREBASE PROJECT
    const firebaseConfig = {
        apiKey: "AIzaSyCzLqy8JGgTtpBbsusyreogoYPyWMTYIw8",
        authDomain: "phathuacademy.firebaseapp.com",
        databaseURL: "https://phathuacademy-default-rtdb.firebaseio.com",
        projectId: "phathuacademy",
        storageBucket: "phathuacademy.firebasestorage.app",
        messagingSenderId: "1068817765082",
        appId: "1:1068817765082:web:26f32d0ec480c3bb9dcbe3",
        measurementId: "G-LWSZLVQJDS"
    };

    // Create the global academy object immediately.
    window.academy = {
        app: null,
        auth: null,
        db: null,
        storage: null,
        realtimeDB: null,
        ready: null
    };

    // Initialize Firebase and wait for authentication persistence.
    window.academy.ready = (async function () {

        try {

            if (typeof firebase === "undefined") {
                throw new Error(
                    "Firebase SDK is missing. Check the Firebase script tags in your HTML."
                );
            }

            // Initialize or reuse the Firebase application.
            const app = firebase.apps.length > 0
                ? firebase.app()
                : firebase.initializeApp(firebaseConfig);

            // Connect Firebase services.
            const auth = app.auth();
            const db = app.firestore();
            const storage = app.storage();
            const realtimeDB = app.database();

            // Store services globally.
            window.academy.app = app;
            window.academy.auth = auth;
            window.academy.db = db;
            window.academy.storage = storage;
            window.academy.realtimeDB = realtimeDB;

            // Configure persistent authentication.
            await auth.setPersistence(
                firebase.auth.Auth.Persistence.LOCAL
            );

            console.log(
                "PHATHU ACADEMY: Firebase connected successfully."
            );

            return true;

        } catch (error) {

            console.error(
                "PHATHU ACADEMY FIREBASE ERROR:",
                error
            );

            throw error;
        }

    })();

    // Shared notification function.
    window.academyMessage = function (message, type) {

        let notification = document.getElementById(
            "academyNotification"
        );

        if (!notification) {

            notification = document.createElement("div");

            notification.id = "academyNotification";

            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 99999;
                max-width: 320px;
                padding: 15px 20px;
                border-radius: 10px;
                color: white;
                background: #14243c;
                border: 1px solid #258bff;
                font-family: Arial, sans-serif;
                font-size: 14px;
                box-shadow: 0 10px 35px rgba(0,0,0,.3);
            `;

            document.body.appendChild(notification);
        }

        notification.textContent = message;

        notification.style.borderColor =
            type === "error" ? "#ff5555" :
            type === "success" ? "#22c994" :
            "#258bff";

        setTimeout(function () {

            if (notification.parentNode) {
                notification.remove();
            }

        }, 4500);
    };

    console.log("PHATHU ACADEMY 2.0: Configuration loaded.");

})();
               
