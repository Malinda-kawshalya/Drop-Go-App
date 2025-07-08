import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SignupScreen = ({ navigation }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSignup = () => {
        const { fullName, email, password, confirmPassword } = formData;

        if (!fullName || !email || !password || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setError('');
        // Navigate to login screen after successful signup
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#d8f3dc', '#b7e4c7']}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <Header showBackButton={true} />
                
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardAvoid}
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.signupCard}>
                            <Text style={styles.title}>Create Account</Text>
                            <Text style={styles.subtitle}>Join us in making the world greener</Text>
                            
                            <View style={styles.form}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Full Name</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter your full name"
                                        placeholderTextColor="#7f8c8d"
                                        value={formData.fullName}
                                        onChangeText={(value) => handleInputChange('fullName', value)}
                                        autoCapitalize="words"
                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Email</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="you@email.com"
                                        placeholderTextColor="#7f8c8d"
                                        value={formData.email}
                                        onChangeText={(value) => handleInputChange('email', value)}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        autoComplete="email"
                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Password</Text>
                                    <View style={styles.passwordWrapper}>
                                        <TextInput
                                            style={styles.passwordInput}
                                            placeholder="Create a password"
                                            placeholderTextColor="#7f8c8d"
                                            value={formData.password}
                                            onChangeText={(value) => handleInputChange('password', value)}
                                            secureTextEntry={!showPassword}
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.eyeIcon}
                                            onPress={() => setShowPassword(!showPassword)}
                                        >
                                            <Ionicons
                                                name={showPassword ? 'eye-off' : 'eye'}
                                                size={20}
                                                color="#2d6a4f"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Confirm Password</Text>
                                    <View style={styles.passwordWrapper}>
                                        <TextInput
                                            style={styles.passwordInput}
                                            placeholder="Confirm your password"
                                            placeholderTextColor="#7f8c8d"
                                            value={formData.confirmPassword}
                                            onChangeText={(value) => handleInputChange('confirmPassword', value)}
                                            secureTextEntry={!showConfirmPassword}
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.eyeIcon}
                                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            <Ionicons
                                                name={showConfirmPassword ? 'eye-off' : 'eye'}
                                                size={20}
                                                color="#2d6a4f"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {error ? (
                                    <View style={styles.errorContainer}>
                                        <Text style={styles.errorText}>{error}</Text>
                                    </View>
                                ) : null}

                                <TouchableOpacity
                                    style={styles.signupButton}
                                    onPress={handleSignup}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.signupButtonText}>Create Account</Text>
                                </TouchableOpacity>

                                <View style={styles.linksContainer}>
                                    <Text style={styles.linkLabel}>Already have an account? </Text>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Login')}
                                    >
                                        <Text style={styles.linkText}>Sign In</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                
                <Footer />
            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    keyboardAvoid: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    signupCard: {
        backgroundColor: '#fff',
        borderRadius: 18,
        paddingHorizontal: 30,
        paddingVertical: 40,
        marginHorizontal: 10,
        shadowColor: '#2c3e50',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.12,
        shadowRadius: 16,
        elevation: 8,
        borderWidth: 1.5,
        borderColor: '#b7e4c7',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#2d6a4f',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#1b4332',
        textAlign: 'center',
        marginBottom: 30,
    },
    form: {
        width: '100%',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#2d6a4f',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#f0fdf4',
        borderWidth: 1,
        borderColor: '#b7e4c7',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: '#2f3e46',
    },
    passwordWrapper: {
        position: 'relative',
    },
    passwordInput: {
        backgroundColor: '#f0fdf4',
        borderWidth: 1,
        borderColor: '#b7e4c7',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 14,
        paddingRight: 50,
        fontSize: 16,
        color: '#2f3e46',
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
        top: 17,
    },
    errorContainer: {
        backgroundColor: '#ffebee',
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 12,
    },
    errorText: {
        color: '#d32f2f',
        fontSize: 14,
        textAlign: 'center',
    },
    signupButton: {
        backgroundColor: '#2d6a4f',
        borderRadius: 8,
        paddingVertical: 16,
        marginTop: 12,
        shadowColor: '#2c3e50',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    signupButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    linksContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    linkLabel: {
        color: '#7f8c8d',
        fontSize: 15,
    },
    linkText: {
        color: '#2d6a4f',
        fontSize: 15,
        fontWeight: '500',
    },
});

export default SignupScreen;