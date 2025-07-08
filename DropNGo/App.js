// App.js

import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './context/AuthContext'; // Correct import path for AuthProvider
import { ActivityIndicator, View, StyleSheet } from 'react-native';

// Import your screen components
// Ensure these files exist and export their components as default exports
import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import SignupScreen from './screens/SignupScreen.jsx';
import ForgotPasswordScreen from './screens/ForgotpasswordScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';

const Stack = createStackNavigator();

/**
 * Stack navigator for authentication-related screens (e.g., Login, Signup).
 */
const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false, // Hides the header for all screens in this stack
    }}
  >
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </Stack.Navigator>
);

/**
 * Stack navigator for authenticated application screens (e.g., Home, Profile).
 */
const AppStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false, // Hides the header for all screens in this stack
    }}
  >
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    {/* Add more authenticated screens here as your app grows */}
  </Stack.Navigator>
);

/**
 * Root Navigation component that conditionally renders AuthStack or AppStack
 * based on the user's authentication status.
 */
const RootNavigation = () => {
  const { user, loading } = useAuth(); // Get user and loading state from AuthContext

  // Display a loading indicator while the authentication state is being determined
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      {/* Conditionally render the appropriate stack based on user authentication */}
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

/**
 * Main App component that wraps the RootNavigation with AuthProvider.
 * This ensures the entire application has access to authentication context.
 */
export default function App() {
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
}

// Styles for the loading container
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // White background for loading screen
  },
});
