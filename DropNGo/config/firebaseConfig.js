import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Required for persistence

// Your web app's Firebase configuration
// Replace with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6nL9XqgTZIR9WybCeoM06fk82Wln74V0",
  authDomain: "dropngo-884db.firebaseapp.com",
  projectId: "dropngo-884db",
  storageBucket: "dropngo-884db.firebasestorage.app",
  messagingSenderId: "351052226532",
  appId: "1:351052226532:web:85eeac9f89c7f48ee5b1f1",
  measurementId: "G-TEEPNY0H8P"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with React Native persistence
// This is crucial for maintaining user sessions across app restarts
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
export const db = getFirestore(app);

// Export the initialized app and auth instances for use in other services
export { app, auth };
