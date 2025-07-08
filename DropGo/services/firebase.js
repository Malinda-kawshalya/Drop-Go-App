// services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6nL9XqgTZIR9WybCeoM06fk82Wln74V0",
  authDomain: "dropngo-884db.firebaseapp.com",
  projectId: "dropngo-884db",
  storageBucket: "dropngo-884db.firebasestorage.app",
  messagingSenderId: "351052226532",
  appId: "1:351052226532:web:85eeac9f89c7f48ee5b1f1",
  measurementId: "G-TEEPNY0H8P"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
const auth = getAuth(app);

export { auth };
