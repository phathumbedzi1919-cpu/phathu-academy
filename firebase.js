const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "phathuacademy.firebaseapp.com",
  projectId: "phathuacademy",
  storageBucket: "phathuacademy.firebasestorage.app",
  messagingSenderId: "1068817765082",
  appId: "1:1068817765082:web:26f32d0ec480c3bb9dcbe3",
  measurementId: "G-LWSZLVQJDS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Authentication
const auth = firebase.auth();

// Firestore Database
const db = firebase.firestore();
