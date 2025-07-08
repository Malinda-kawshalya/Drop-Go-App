import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { forgotPasswordStyles } from '../styles/ForgotPasswordStyles';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const navigation = useNavigation();
  const auth = getAuth();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleResetPassword = async () => {
    // Reset states
    setError('');
    setSuccess(false);
    
    // Validate email
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
      Alert.alert(
        'Email Sent',
        'Check your inbox for password reset instructions',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (error) {
      console.error('Password reset error:', error);
      
      // Handle specific Firebase errors
      switch (error.code) {
        case 'auth/user-not-found':
          setError('No account found with this email address');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address');
          break;
        case 'auth/too-many-requests':
          setError('Too many attempts. Please try again later');
          break;
        default:
          setError('Failed to send reset email. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={forgotPasswordStyles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={forgotPasswordStyles.keyboardView}
      >
        <ScrollView contentContainerStyle={forgotPasswordStyles.scrollContent}>
          <View style={forgotPasswordStyles.card}>
            <TouchableOpacity
              style={forgotPasswordStyles.backButton}
              onPress={() => navigation.goBack()}
              disabled={loading}
            >
              <Text style={forgotPasswordStyles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            
            <Text style={forgotPasswordStyles.title}>Reset Password</Text>
            <Text style={forgotPasswordStyles.subtitle}>
              Enter the email associated with your account and we'll send you instructions to reset your password
            </Text>
            
            <View style={forgotPasswordStyles.form}>
              <View style={forgotPasswordStyles.inputGroup}>
                <Text style={forgotPasswordStyles.label}>Email Address</Text>
                <TextInput
                  style={forgotPasswordStyles.input}
                  placeholder="you@email.com"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setError('');
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                />
              </View>

              {error ? (
                <View style={forgotPasswordStyles.errorContainer}>
                  <Text style={forgotPasswordStyles.errorText}>{error}</Text>
                </View>
              ) : null}
              
              {success ? (
                <View style={forgotPasswordStyles.successContainer}>
                  <Text style={forgotPasswordStyles.successText}>
                    Password reset email sent! Check your inbox.
                  </Text>
                </View>
              ) : null}

              <TouchableOpacity 
                style={[
                  forgotPasswordStyles.resetButton, 
                  loading && { opacity: 0.7 }
                ]}
                onPress={handleResetPassword}
                disabled={loading || success}
              >
                {loading ? (
                  <ActivityIndicator color="#ffffff" size="small" />
                ) : (
                  <Text style={forgotPasswordStyles.resetButtonText}>
                    Send Reset Instructions
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            <View style={forgotPasswordStyles.linksContainer}>
              <Text style={forgotPasswordStyles.linkText}>Remember your password? </Text>
              <TouchableOpacity 
                onPress={() => navigation.navigate('Login')}
                disabled={loading}
              >
                <Text style={forgotPasswordStyles.linkTextBold}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;