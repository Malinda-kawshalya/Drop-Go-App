import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomeScreen = ({ navigation }) => {
  const handleLogout = () => {
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
        <Header />
        
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.welcomeCard}>
            <Text style={styles.welcomeTitle}>Welcome to EcoRecycle!</Text>
            <Text style={styles.welcomeSubtitle}>
              Your journey to a sustainable future starts here
            </Text>
          </View>

          <View style={styles.featuresContainer}>
            <TouchableOpacity style={styles.featureCard}>
              <Ionicons name="recycle" size={40} color="#2d6a4f" />
              <Text style={styles.featureTitle}>Recycle Guide</Text>
              <Text style={styles.featureDescription}>
                Learn how to properly recycle different materials
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.featureCard}>
              <Ionicons name="location" size={40} color="#2d6a4f" />
              <Text style={styles.featureTitle}>Find Centers</Text>
              <Text style={styles.featureDescription}>
                Locate recycling centers near you
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.featureCard}>
              <Ionicons name="bar-chart" size={40} color="#2d6a4f" />
              <Text style={styles.featureTitle}>Track Impact</Text>
              <Text style={styles.featureDescription}>
                Monitor your environmental impact
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.featureCard}>
              <Ionicons name="people" size={40} color="#2d6a4f" />
              <Text style={styles.featureTitle}>Community</Text>
              <Text style={styles.featureDescription}>
                Join eco-friendly communities
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Text style={styles.logoutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </ScrollView>
        
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  welcomeCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 25,
    marginBottom: 25,
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
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2d6a4f',
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#1b4332',
    textAlign: 'center',
    lineHeight: 22,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  featureCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '48%',
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#2c3e50',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#b7e4c7',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d6a4f',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 13,
    color: '#1b4332',
    textAlign: 'center',
    lineHeight: 18,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 8,
    paddingVertical: 16,
    marginTop: 10,
    shadowColor: '#2c3e50',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default HomeScreen;