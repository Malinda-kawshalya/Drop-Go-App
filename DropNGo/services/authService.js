// services/authService.js

// Import the initialized auth instance from your firebase config
import { auth } from '../config/firebaseConfig'; // Adjust path if your config file is elsewhere

// Import specific Firebase Auth functions
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut, // Renamed to avoid conflict with local signOut function
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile // Useful for setting display name after signup
} from 'firebase/auth';

export const authService = {
  /**
   * Listens for changes in the user's authentication state.
   * This is the method that AuthContext's useEffect will call.
   * @param {function} callback - The callback function to be called with the user object.
   * @returns {function} An unsubscribe function to stop listening.
   */
  onAuthStateChanged: (callback) => {
    // Ensure 'auth' is defined before calling onAuthStateChanged
    if (!auth) {
      console.error("Firebase Auth is not initialized. Cannot call onAuthStateChanged.");
      // Return a dummy unsubscribe function to prevent errors
      return () => {};
    }
    return onAuthStateChanged(auth, callback);
  },

  /**
   * Registers a new user with email and password.
   * Optionally sets a display name.
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @param {string} [displayName=null] - The user's display name.
   * @returns {object} { success: boolean, user?: object, error?: string }
   */
  signUp: async (email, password, displayName = null) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update user profile with display name immediately after creation
      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error("Firebase signUp error:", error.code, error.message);
      return { success: false, error: error.message, code: error.code };
    }
  },

  /**
   * Signs in an existing user with email and password.
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @returns {object} { success: boolean, user?: object, error?: string }
   */
  signIn: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error("Firebase signIn error:", error.code, error.message);
      return { success: false, error: error.message, code: error.code };
    }
  },

  /**
   * Signs out the currently authenticated user.
   * @returns {object} { success: boolean, error?: string }
   */
  signOut: async () => {
    try {
      await firebaseSignOut(auth);
      return { success: true };
    } catch (error) {
      console.error("Firebase signOut error:", error.code, error.message);
      return { success: false, error: error.message, code: error.code };
    }
  },

  /**
   * Sends a password reset email to the specified email address.
   * @param {string} email - The email address to send the reset link to.
   * @returns {object} { success: boolean, message?: string, error?: string }
   */
  sendPasswordReset: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true, message: "Password reset email sent!" };
    } catch (error) {
      console.error("Firebase sendPasswordReset error:", error.code, error.message);
      return { success: false, error: error.message, code: error.code };
    }
  },

  // Add other authentication related methods here as needed (e.g., update email, change password)
};

// --- Debugging Log (Optional, remove in production) ---
// console.log("authService object exported:", authService);
