
const firebaseConfig = {
    apiKey: "AIzaSyCzLqy8TJgTtpBbsusyreogoYPyWMTYIw8",
    authDomain: "phathuacademy.firebaseapp.com",
    projectId: "phathuacademy",
    storageBucket: "phathuacademy.firebasestorage.app",
    messagingSenderId: "1068817765082",
    appId: "1:1068817765082:web:26f32d0ec480c3bb9dcbe3",
    measurementId: "G-LWSZLVQJDS"
};

// Initialize Firebase only once.
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Shared Firebase services.
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Make services available to all academy files.
window.academy = {
    auth: auth,
    db: db,
    storage: storage,
    ready: Promise.resolve()
};
