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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { loginStyles } from '../styles/LoginStyles';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigation = useNavigation();
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await signIn(email, password);
      
      if (result.success) {
        navigation.replace('Home');
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };


  return (
    <SafeAreaView style={loginStyles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={loginStyles.keyboardView}
      >
        <ScrollView contentContainerStyle={loginStyles.scrollContent}>
          <View style={loginStyles.loginCard}>
            <Text style={loginStyles.title}>Welcome Back!</Text>
            <Text style={loginStyles.subtitle}>Sign in to continue your recycling journey</Text>
            
            <View style={loginStyles.form}>
              <View style={loginStyles.inputGroup}>
                <Text style={loginStyles.label}>Email</Text>
                <TextInput
                  style={loginStyles.input}
                  placeholder="you@email.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={loginStyles.inputGroup}>
                <Text style={loginStyles.label}>Password</Text>
                <View style={loginStyles.passwordWrapper}>
                  <TextInput
                    style={[loginStyles.input, loginStyles.passwordInput]}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    style={loginStyles.toggleButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Text style={loginStyles.toggleText}>
                      {showPassword ? '🙈' : '👁️'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {error ? (
                <View style={loginStyles.errorContainer}>
                  <Text style={loginStyles.errorText}>{error}</Text>
                </View>
              ) : null}

              <TouchableOpacity style={loginStyles.loginButton} onPress={handleLogin}>
                <Text style={loginStyles.loginButtonText}>Sign In</Text>
              </TouchableOpacity>
            </View>

            <View style={loginStyles.linksContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={loginStyles.linkText}>Forgot password?</Text>
              </TouchableOpacity>
              <Text style={loginStyles.separator}> | </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={loginStyles.linkText}>Create an account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;