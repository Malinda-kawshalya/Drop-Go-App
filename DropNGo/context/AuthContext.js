// context/AuthContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService'; // Correct import path
import { userService } from '../services/userService'; // Correct import path

const AuthContext = createContext();


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Provides authentication state and functions to its children.
 * Manages user authentication status, user profile, and loading state.
 * @param {object} { children } - React children to be rendered within the provider.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Firebase user object
  const [userProfile, setUserProfile] = useState(null); // Custom user profile from Firestore
  const [loading, setLoading] = useState(true); // Loading state for initial auth check

  // Effect to listen for authentication state changes
  useEffect(() => {
    // Subscribe to Firebase auth state changes
    const unsubscribe = authService.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        // If a user is logged in, set the user and fetch their profile
        setUser(firebaseUser);
        try {
          const profileResult = await userService.getUserProfile(firebaseUser.uid);
          if (profileResult.success) {
            setUserProfile(profileResult.userData);
          } else {
            // If profile not found, ensure userProfile is null
            setUserProfile(null);
            console.warn("User profile not found for authenticated user:", firebaseUser.uid);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setUserProfile(null); // Ensure profile is null on error
        }
      } else {
        // If no user is logged in, clear user and profile
        setUser(null);
        setUserProfile(null);
      }
      // Set loading to false once the initial auth state is determined
      setLoading(false);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []); // Empty dependency array ensures this runs only once on mount

  /**
   * Handles user sign-up, including creating a profile in Firestore.
   * @param {string} email - User's email.
   * @param {string} password - User's password.
   * @param {string} name - User's name for the profile.
   * @param {string} role - User's role for the profile.
   * @returns {object} The result from authService.signUp.
   */
  const signUp = async (email, password, name, role) => {
    const authResult = await authService.signUp(email, password, name); // Pass name for display name
    if (authResult.success) {
      // If authentication is successful, create user profile in Firestore
      await userService.createUserProfile(authResult.user.uid, {
        name,
        email,
        role
      });
    }
    return authResult;
  };

  /**
   * Handles user sign-in.
   * @param {string} email - User's email.
   * @param {string} password - User's password.
   * @returns {object} The result from authService.signIn.
   */
  const signIn = async (email, password) => {
    return await authService.signIn(email, password);
  };

  /**
   * Handles user sign-out.
   * @returns {object} The result from authService.signOut.
   */
  const signOut = async () => {
    return await authService.signOut();
  };

  // The value provided to consumers of this context
  const value = {
    user,
    userProfile,
    loading,
    signUp,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
