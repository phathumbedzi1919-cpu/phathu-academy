
/* =========================================
   PHATHU ACADEMY 2.0
   CENTRAL FIREBASE CONFIGURATION
   Firebase SDK v8
========================================= */

(function () {
    "use strict";

    const firebaseConfig = {
        apiKey: "USE_YOUR_EXACT_FIREBASE_API_KEY",
        authDomain: "phathuacademy.firebaseapp.com",
        databaseURL: "https://phathuacademy-default-rtdb.firebaseio.com",
        projectId: "phathuacademy",
        storageBucket: "phathuacademy.firebasestorage.app",
        messagingSenderId: "1068817765082",
        appId: "1:1068817765082:web:26f32d0ec480c3bb9dcbe3",
        measurementId: "G-LWSZLVQJDS"
    };

    // Initialize Firebase.
    if (typeof firebase === "undefined") {
        console.error("Firebase SDK did not load.");
        window.academy = {
            ready: Promise.reject(
                new Error("Firebase SDK did not load.")
            )
        };
        window.academy.ready.catch(console.error);
        return;
    }

    try {
        const app = firebase.apps.length
            ? firebase.app()
            : firebase.initializeApp(firebaseConfig);

        const auth = app.auth();
        const db = app.firestore();
        const storage = app.storage();
        const realtimeDB = app.database();

        // Wait until local authentication persistence is configured.
        const ready = auth.setPersistence(
            firebase.auth.Auth.Persistence.LOCAL
        ).then(function () {

            console.log("Firebase persistence is ready.");

            return true;

        });

        window.academy = {
            app: app,
            auth: auth,
            db: db,
            storage: storage,
            realtimeDB: realtimeDB,
            ready: ready
        };

        window.academyMessage = function (message, type) {
            let notification = document.getElementById(
                "academyNotification"
            );

            if (!notification) {
                notification = document.createElement("div");
                notification.id = "academyNotification";

                notification.style.cssText =
                    "position:fixed;top:20px;right:20px;" +
                    "z-index:99999;max-width:320px;padding:15px;" +
                    "border-radius:10px;color:white;" +
                    "background:#14243c;font-family:Arial;" +
                    "box-shadow:0 10px 35px rgba(0,0,0,.3)";

                document.body.appendChild(notification);
            }

            notification.textContent = message;

            notification.style.borderColor =
                type === "error" ? "#ff5555" :
                type === "success" ? "#22c994" : "#258bff";

            setTimeout(function () {
                notification.remove();
            }, 4500);
        };

        console.log("Phathu Academy Firebase initialized.");

    } catch (error) {
        console.error("Firebase initialization failed:", error);

        window.academy = {
            ready: Promise.reject(error)
        };

        window.academy.ready.catch(console.error);
    }

})();
       
