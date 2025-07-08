// services/userService.js

// Import the initialized Firestore instance from your firebase config
import { db } from '../config/firebaseConfig'; // Adjust path if your config file is elsewhere

// Import specific Firestore functions
import { doc, setDoc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore';

export const userService = {
  /**
   * Creates or updates a user profile in Firestore.
   * @param {string} uid - User's unique ID from Firebase Auth.
   * @param {object} userData - Data to store in the profile (name, email, role, etc.).
   * @returns {object} { success: boolean, error?: string }
   */
  createUserProfile: async (uid, userData) => {
    try {
      // Use setDoc with merge: true to create if not exists, or update if it does.
      // This also prevents overwriting existing fields accidentally.
      await setDoc(doc(db, 'users', uid), {
        ...userData,
        createdAt: new Date().toISOString(), // Add creation timestamp
        uid: uid // Store UID explicitly in the document
      }, { merge: true });
      return { success: true };
    } catch (error) {
      console.error("Error creating/updating user profile:", error.message);
      return {
        success: false,
        error: error.message
      };
    }
  },

  /**
   * Retrieves a user profile from Firestore.
   * @param {string} uid - User's unique ID from Firebase Auth.
   * @returns {object} { success: boolean, userData?: object, error?: string }
   */
  getUserProfile: async (uid) => {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          success: true,
          userData: docSnap.data()
        };
      } else {
        // Handle case where profile does not exist (e.g., new user, or profile wasn't created yet)
        console.warn(`User profile for UID: ${uid} not found.`);
        return {
          success: false,
          error: "User profile not found"
        };
      }
    } catch (error) {
      console.error("Error getting user profile:", error.message);
      return {
        success: false,
        error: error.message
      };
    }
  },

  /**
   * Updates an existing user profile in Firestore.
   * @param {string} uid - User's unique ID from Firebase Auth.
   * @param {object} updateData - Data to update in the profile.
   * @returns {object} { success: boolean, error?: string }
   */
  updateUserProfile: async (uid, updateData) => {
    try {
      const docRef = doc(db, 'users', uid);
      await updateDoc(docRef, {
        ...updateData,
        updatedAt: new Date().toISOString() // Add update timestamp
      });
      return { success: true };
    } catch (error) {
      console.error("Error updating user profile:", error.message);
      return {
        success: false,
        error: error.message
      };
    }
  },

  /**
   * Retrieves all user profiles from Firestore (typically for admin use).
   * @returns {object} { success: boolean, users?: array, error?: string }
   */
  getAllUsers: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      return {
        success: true,
        users: users
      };
    } catch (error) {
      console.error("Error getting all users:", error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }
};

// --- Debugging Log (Optional, remove in production) ---
// console.log("userService object exported:", userService);
