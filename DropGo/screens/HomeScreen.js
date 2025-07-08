import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Animated,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  const images = [
    'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop'
  ];

  const steps = [
    { 
      icon: 'people', 
      title: 'Sign Up', 
      desc: 'Create your eco-warrior account in seconds and join thousands making a difference.',
      color: '#34D399'
    },
    { 
      icon: 'location', 
      title: 'Schedule & Drop-off', 
      desc: 'Smart AI matching connects you with the nearest collectors for seamless pickup.',
      color: '#10B981'
    },
    { 
      icon: 'flash', 
      title: 'Earn Eco-Points', 
      desc: 'Transform every kilogram into valuable points with our gamified reward system.',
      color: '#059669'
    },
    { 
      icon: 'trophy', 
      title: 'Redeem Rewards', 
      desc: 'Unlock premium eco-products, exclusive discounts, and sustainability perks.',
      color: '#047857'
    }
  ];

  const features = [
    {
      icon: 'flash',
      title: 'Real-Time Scheduling',
      desc: 'AI-powered smart scheduling adapts to your lifestyle with instant confirmations.',
      color: '#34D399'
    },
    {
      icon: 'map',
      title: 'Interactive Map',
      desc: 'Live tracking, operating hours, and real-time availability at your fingertips.',
      color: '#10B981'
    },
    {
      icon: 'trophy',
      title: 'Gamified Rewards',
      desc: 'Level up your eco-impact with badges, streaks, and exclusive community perks.',
      color: '#059669'
    },
    {
      icon: 'leaf',
      title: 'Verified Network',
      desc: 'Premium-vetted collectors ensure your recyclables get proper treatment.',
      color: '#047857'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Users' },
    { number: '2M+', label: 'Items Recycled' },
    { number: '₹10L+', label: 'Rewards Earned' },
    { number: '500+', label: 'Verified Collectors' }
  ];

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-slide for carousel
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleGetStarted = () => {
    // Navigate to features or schedule screen
    console.log('Get Started pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#059669" />
      
      <LinearGradient
        colors={['#F0FDF4', '#ECFDF5', '#FFFFFF']}
        style={styles.gradient}
      >
        {/* Floating Background Elements */}
        <View style={styles.backgroundElements}>
          <Animated.View style={[styles.floatingElement, styles.element1]} />
          <Animated.View style={[styles.floatingElement, styles.element2]} />
          <Animated.View style={[styles.floatingElement, styles.element3]} />
        </View>

        {/* Header */}
        <Animated.View 
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.headerContent}>
            <View style={styles.logoSection}>
              <LinearGradient
                colors={['#10B981', '#059669']}
                style={styles.logoIcon}
              >
                <Ionicons name="recycle" size={24} color="white" />
              </LinearGradient>
              <Text style={styles.logoText}>Drop & Go</Text>
            </View>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
              <Ionicons name="log-out-outline" size={24} color="#059669" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollContainer}
        >
          {/* Hero Section */}
          <Animated.View 
            style={[
              styles.heroSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            {/* Badge */}
            <View style={styles.heroBadge}>
              <Ionicons name="star" size={16} color="#F59E0B" />
              <Text style={styles.badgeText}>Join 50,000+ Eco Warriors</Text>
            </View>

            {/* Title */}
            <Text style={styles.heroTitle}>
              Turn Your <Text style={styles.titleGradient}>Waste</Text>{'\n'}
              Into <Text style={styles.titleGradient}>Wealth</Text>
            </Text>

            {/* Subtitle */}
            <Text style={styles.heroSubtitle}>
              Transform your recyclables into{' '}
              <Text style={styles.subtitleHighlight}>real rewards</Text> with our 
              revolutionary platform. Connect with verified collectors, earn points, 
              and make a difference in your community.
            </Text>

            {/* Buttons */}
            <View style={styles.heroButtons}>
              <TouchableOpacity 
                style={styles.primaryButton} 
                onPress={handleGetStarted}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#10B981', '#059669']}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.primaryButtonText}>Start Recycling</Text>
                  <Ionicons name="arrow-forward" size={20} color="white" />
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
                <Text style={styles.secondaryButtonText}>Watch Demo</Text>
              </TouchableOpacity>
            </View>

            {/* Carousel */}
            <Animated.View 
              style={[
                styles.carousel,
                { transform: [{ scale: scaleAnim }] }
              ]}
            >
              <ImageBackground
                source={{ uri: images[currentSlide] }}
                style={styles.carouselImage}
                imageStyle={styles.carouselImageStyle}
              >
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.4)']}
                  style={styles.carouselOverlay}
                />
              </ImageBackground>
              
              {/* Dots */}
              <View style={styles.carouselDots}>
                {images.map((_, index) => (
                  <View 
                    key={index}
                    style={[
                      styles.dot,
                      index === currentSlide && styles.activeDot
                    ]}
                  />
                ))}
              </View>
            </Animated.View>
          </Animated.View>

          {/* How It Works Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                How It <Text style={styles.titleGradient}>Works</Text>
              </Text>
              <Text style={styles.sectionSubtitle}>
                Getting started is simple. Follow these four easy steps to begin your eco-journey.
              </Text>
            </View>

            <View style={styles.stepsGrid}>
              {steps.map((step, index) => (
                <Animated.View 
                  key={index}
                  style={[
                    styles.stepCard,
                    {
                      opacity: fadeAnim,
                      transform: [{ translateY: slideAnim }]
                    }
                  ]}
                >
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  </View>
                  
                  <LinearGradient
                    colors={[step.color, step.color + '80']}
                    style={styles.stepIcon}
                  >
                    <Ionicons name={step.icon} size={32} color="white" />
                  </LinearGradient>
                  
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDescription}>{step.desc}</Text>
                </Animated.View>
              ))}
            </View>
          </View>

          {/* Features Section */}
          <LinearGradient
            colors={['#F0FDF4', '#ECFDF5', '#F8FAFC']}
            style={styles.featuresSection}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Powerful <Text style={styles.titleGradient}>Features</Text>
              </Text>
              <Text style={styles.sectionSubtitle}>
                Experience the future of recycling with our cutting-edge technology and innovative features.
              </Text>
            </View>

            <View style={styles.featuresGrid}>
              {features.map((feature, index) => (
                <Animated.View 
                  key={index}
                  style={[
                    styles.featureCard,
                    {
                      opacity: fadeAnim,
                      transform: [{ translateY: slideAnim }]
                    }
                  ]}
                >
                  <LinearGradient
                    colors={[feature.color, feature.color + '80']}
                    style={styles.featureIcon}
                  >
                    <Ionicons name={feature.icon} size={24} color="white" />
                  </LinearGradient>
                  
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.desc}</Text>
                </Animated.View>
              ))}
            </View>
          </LinearGradient>

          {/* CTA Section */}
          <LinearGradient
            colors={['#059669', '#10B981', '#34D399']}
            style={styles.ctaSection}
          >
            <View style={styles.ctaBadge}>
              <Ionicons name="leaf" size={16} color="white" />
              <Text style={styles.ctaBadgeText}>Make an Impact Today</Text>
            </View>
            
            <Text style={styles.ctaTitle}>Ready to Make a Difference?</Text>
            
            <Text style={styles.ctaSubtitle}>
              Join thousands of eco-warriors who are already transforming waste into wealth. 
              Start your sustainable journey today and earn rewards while saving the planet.
            </Text>
            
            <View style={styles.ctaButtons}>
              <TouchableOpacity 
                style={styles.ctaPrimaryButton}
                onPress={handleGetStarted}
                activeOpacity={0.8}
              >
                <Text style={styles.ctaPrimaryButtonText}>Start Now</Text>
                <Ionicons name="arrow-forward" size={20} color="#059669" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.ctaSecondaryButton} activeOpacity={0.8}>
                <Text style={styles.ctaSecondaryButtonText}>Learn More</Text>
              </TouchableOpacity>
            </View>
            
            {/* Stats */}
            <View style={styles.stats}>
              {stats.map((stat, index) => (
                <View key={index} style={styles.stat}>
                  <Text style={styles.statNumber}>{stat.number}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </LinearGradient>
        </ScrollView>
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
  backgroundElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  floatingElement: {
    position: 'absolute',
    borderRadius: 200,
    opacity: 0.3,
  },
  element1: {
    top: '10%',
    left: '5%',
    width: 200,
    height: 200,
    backgroundColor: '#A7F3D0',
  },
  element2: {
    bottom: '15%',
    right: '10%',
    width: 250,
    height: 250,
    backgroundColor: '#34D399',
  },
  element3: {
    top: '60%',
    left: '60%',
    width: 175,
    height: 175,
    backgroundColor: '#6EE7B7',
  },
  header: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(16, 185, 129, 0.1)',
    zIndex: 10,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#059669',
  },
  logoutBtn: {
    padding: 8,
  },
  scrollContainer: {
    flex: 1,
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    alignItems: 'center',
    zIndex: 5,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  heroTitle: {
    fontSize: width > 400 ? 48 : 36,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: width > 400 ? 52 : 40,
    color: '#1F2937',
  },
  titleGradient: {
    color: '#059669',
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  subtitleHighlight: {
    color: '#059669',
    fontWeight: '600',
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 60,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  primaryButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  secondaryButtonText: {
    color: '#059669',
    fontSize: 16,
    fontWeight: '600',
  },
  carousel: {
    width: width - 40,
    height: 250,
    borderRadius: 24,
    overflow: 'hidden',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  carouselImageStyle: {
    borderRadius: 24,
  },
  carouselOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  carouselDots: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  activeDot: {
    backgroundColor: 'white',
    transform: [{ scale: 1.3 }],
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 50,
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 16,
    color: '#1F2937',
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  stepsGrid: {
    gap: 24,
  },
  stepCard: {
    padding: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.1)',
    position: 'relative',
  },
  stepNumber: {
    position: 'absolute',
    top: -16,
    right: -16,
    width: 40,
    height: 40,
    backgroundColor: '#10B981',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  stepIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  stepDescription: {
    color: '#6B7280',
    fontSize: 14,
    lineHeight: 20,
  },
  featuresSection: {
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'space-between',
  },
  featureCard: {
    width: (width - 60) / 2,
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.1)',
    alignItems: 'center',
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    color: '#6B7280',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
  ctaSection: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    alignItems: 'center',
  },
  ctaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  ctaBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  ctaTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  ctaButtons: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 50,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  ctaPrimaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderRadius: 16,
  },
  ctaPrimaryButtonText: {
    color: '#059669',
    fontSize: 16,
    fontWeight: '700',
  },
  ctaSecondaryButton: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 16,
  },
  ctaSecondaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  stats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    gap: 20,
  },
  stat: {
    alignItems: 'center',
    minWidth: '40%',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: 'white',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export default HomeScreen;