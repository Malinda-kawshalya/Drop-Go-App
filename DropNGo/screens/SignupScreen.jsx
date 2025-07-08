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
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { signupStyles } from '../styles/SignupStyles';
import { useAuth } from '../context/AuthContext';

const SignupScreen = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'recycler', // Default role
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigation = useNavigation();
  const { signUp } = useAuth();

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setError(''); // Clear errors when user makes changes
  };

  const validateForm = () => {
    // Check for empty fields
    if (!form.name.trim()) {
      setError('Please enter your full name');
      return false;
    }
    if (!form.email.trim()) {
      setError('Please enter your email address');
      return false;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!form.password) {
      setError('Please enter a password');
      return false;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const result = await signUp(form.email, form.password, form.name, form.role);
      
      if (result.success) {
        navigation.navigate('Login', { 
          message: 'Account created successfully! Please sign in.' 
        });
      } else {
        setError(result.error || 'Failed to create account. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={signupStyles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={signupStyles.keyboardView}
      >
        <ScrollView contentContainerStyle={signupStyles.scrollContent}>
          <View style={signupStyles.signupCard}>
            <Text style={signupStyles.title}>Create Account</Text>
            <Text style={signupStyles.subtitle}>Join our eco-friendly community today</Text>
            
            <View style={signupStyles.form}>
              <View style={signupStyles.inputGroup}>
                <Text style={signupStyles.label}>Full Name</Text>
                <TextInput
                  style={signupStyles.input}
                  placeholder="Your full name"
                  value={form.name}
                  onChangeText={(text) => handleChange('name', text)}
                  autoCapitalize="words"
                  editable={!loading}
                />
              </View>
              
              <View style={signupStyles.inputGroup}>
                <Text style={signupStyles.label}>Email</Text>
                <TextInput
                  style={signupStyles.input}
                  placeholder="you@email.com"
                  value={form.email}
                  onChangeText={(text) => handleChange('email', text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                />
              </View>
              
              <View style={signupStyles.inputGroup}>
                <Text style={signupStyles.label}>Password</Text>
                <View style={signupStyles.passwordWrapper}>
                  <TextInput
                    style={[signupStyles.input, signupStyles.passwordInput]}
                    placeholder="Create a password"
                    value={form.password}
                    onChangeText={(text) => handleChange('password', text)}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!loading}
                  />
                  <TouchableOpacity
                    style={signupStyles.toggleButton}
                    onPress={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    <Text style={signupStyles.toggleText}>
                      {showPassword ? '🙈' : '👁️'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={signupStyles.inputGroup}>
                <Text style={signupStyles.label}>Confirm Password</Text>
                <View style={signupStyles.passwordWrapper}>
                  <TextInput
                    style={[signupStyles.input, signupStyles.passwordInput]}
                    placeholder="Confirm your password"
                    value={form.confirmPassword}
                    onChangeText={(text) => handleChange('confirmPassword', text)}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!loading}
                  />
                  <TouchableOpacity
                    style={signupStyles.toggleButton}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading}
                  >
                    <Text style={signupStyles.toggleText}>
                      {showConfirmPassword ? '🙈' : '👁️'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={signupStyles.inputGroup}>
                <Text style={signupStyles.label}>I am a</Text>
                <View style={signupStyles.pickerContainer}>
                  <Picker
                    selectedValue={form.role}
                    style={signupStyles.picker}
                    onValueChange={(value) => handleChange('role', value)}
                    enabled={!loading}
                  >
                    <Picker.Item label="Recycler" value="recycler" />
                    <Picker.Item label="Collector" value="collector" />
                  </Picker>
                </View>
              </View>
              
              {error ? (
                <View style={signupStyles.errorContainer}>
                  <Text style={signupStyles.errorText}>{error}</Text>
                </View>
              ) : null}
              
              <TouchableOpacity 
                style={[signupStyles.signupButton, loading && { opacity: 0.7 }]}
                onPress={handleSignup}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#ffffff" size="small" />
                ) : (
                  <Text style={signupStyles.signupButtonText}>Create Account</Text>
                )}
              </TouchableOpacity>
            </View>
            
            <View style={signupStyles.linksContainer}>
              <Text style={signupStyles.linkText}>Already have an account? </Text>
              <TouchableOpacity 
                onPress={() => navigation.navigate('Login')}
                disabled={loading}
              >
                <Text style={signupStyles.linkTextBold}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;