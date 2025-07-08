import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  Animated,
} from 'react-native';
import { homeStyles } from '../styles/HomeStyles';

const { width: screenWidth } = Dimensions.get('window');

const HomeScreen = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;

  const images = [
    'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop',
  ];

  const steps = [
    { 
      icon: '👥', 
      title: 'Sign Up', 
      desc: 'Join the eco-revolution in seconds and connect with a global community.'
    },
    { 
      icon: '📍', 
      title: 'Schedule Pickup', 
      desc: 'AI matches you with nearby collectors for effortless recycling.'
    },
    { 
      icon: '⚡', 
      title: 'Earn Points', 
      desc: 'Turn every recycle into eco-points with our rewarding system.'
    },
    { 
      icon: '🏆', 
      title: 'Claim Rewards', 
      desc: 'Redeem points for eco-products and exclusive green perks.'
    },
  ];

  const features = [
    {
      icon: '⚡',
      title: 'Smart Scheduling',
      desc: 'AI-driven scheduling with instant confirmations for your convenience.',
    },
    {
      icon: '📍',
      title: 'Live Map',
      desc: 'Track collectors and check real-time availability effortlessly.',
    },
    {
      icon: '🏆',
      title: 'Eco Rewards',
      desc: 'Earn badges and perks through our gamified recycling system.',
    },
    {
      icon: '🌿',
      title: 'Trusted Network',
      desc: 'Connect with verified collectors for responsible recycling.',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={homeStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={homeStyles.header}>
          <Animated.View style={[homeStyles.logoSection, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
            <View style={homeStyles.logoIcon}>
              <Text style={homeStyles.logoIconText}>♻️</Text>
            </View>
            <Text style={homeStyles.logoText}>Drop & Go</Text>
          </Animated.View>
        </View>

        {/* Hero Section */}
        <Animated.View style={[homeStyles.hero, { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] }]}>
          <View style={homeStyles.heroBackground}>
            <View style={homeStyles.backgroundCircleLarge} />
            <View style={homeStyles.backgroundCircleMedium} />
            <View style={homeStyles.backgroundCircleSmall} />
            <View style={homeStyles.backgroundDot1} />
            <View style={homeStyles.backgroundDot2} />
            <View style={homeStyles.backgroundDot3} />
          </View>
          
          <View style={homeStyles.heroContent}>
            <View style={homeStyles.heroBadge}>
              <Text style={homeStyles.heroBadgeIcon}>🌍</Text>
              <Text style={homeStyles.heroBadgeText}>Join 50K+ Eco Warriors</Text>
            </View>
            
            <Text style={homeStyles.heroTitle}>
              Turn <Text style={homeStyles.heroTitleGradient}>Waste</Text> Into{' '}
              <Text style={homeStyles.heroTitleGradient}>Wealth</Text>
            </Text>
            
            <Text style={homeStyles.heroSubtitle}>
              Transform recyclables into rewards with our eco-friendly platform. Connect, recycle, and thrive sustainably.
            </Text>
            
            <View style={homeStyles.heroButtons}>
              <TouchableOpacity style={homeStyles.btnPrimary}>
                <Text style={homeStyles.btnPrimaryText}>Start Recycling</Text>
                <Text style={homeStyles.btnPrimaryIcon}>→</Text>
              </TouchableOpacity>
              <TouchableOpacity style={homeStyles.btnSecondary}>
                <Text style={homeStyles.btnSecondaryText}>Explore Now</Text>
              </TouchableOpacity>
            </View>
            
            {/* Carousel */}
            <View style={homeStyles.carousel}>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={homeStyles.carouselScroll}
              >
                {images.map((img, index) => (
                  <View key={index} style={homeStyles.carouselSlide}>
                    <Image source={{ uri: img }} style={homeStyles.carouselImage} />
                    <View style={homeStyles.carouselOverlay}>
                      <Text style={homeStyles.carouselText}>
                        {index === 0 ? 'Recycle Smart' : index === 1 ? 'Earn Rewards' : 'Save the Planet'}
                      </Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
              <View style={homeStyles.carouselDots}>
                {images.map((_, index) => (
                  <Animated.View
                    key={index}
                    style={[
                      homeStyles.carouselDot,
                      index === currentSlide && homeStyles.carouselDotActive,
                    ]}
                  />
                ))}
              </View>
            </View>
          </View>
        </Animated.View>

        {/* How It Works Section */}
        <View style={[homeStyles.section, homeStyles.sectionWithBackground]}>
          <View style={homeStyles.sectionBackground}>
            <View style={homeStyles.sectionBackgroundCircle1} />
            <View style={homeStyles.sectionBackgroundCircle2} />
          </View>
          
          <View style={homeStyles.sectionHeader}>
            <Text style={homeStyles.sectionTitle}>
              How It <Text style={homeStyles.sectionTitleGradient}>Works</Text>
            </Text>
            <Text style={homeStyles.sectionSubtitle}>
              Start your eco-journey with these simple steps to a greener future.
            </Text>
          </View>
          
          <View style={homeStyles.stepsGrid}>
            {steps.map((step, index) => (
              <Animated.View
                key={index}
                style={[
                  homeStyles.stepCard,
                  {
                    opacity: fadeAnim,
                    transform: [{ translateY: translateYAnim }, { scale: scaleAnim }],
                  },
                ]}
              >
                <View style={homeStyles.stepNumber}>
                  <Text style={homeStyles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={homeStyles.stepIcon}>{step.icon}</Text>
                <Text style={homeStyles.stepTitle}>{step.title}</Text>
                <Text style={homeStyles.stepDescription}>{step.desc}</Text>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* Features Section */}
        <View style={[homeStyles.section, homeStyles.featuresSection]}>
          <View style={homeStyles.featuresSectionBackground}>
            <View style={homeStyles.featuresBackgroundShape1} />
            <View style={homeStyles.featuresBackgroundShape2} />
          </View>
          
          <View style={homeStyles.sectionHeader}>
            <Text style={homeStyles.sectionTitle}>
              Top <Text style={homeStyles.sectionTitleGradient}>Features</Text>
            </Text>
            <Text style={homeStyles.sectionSubtitle}>
              Discover innovative tools to revolutionize your recycling experience.
            </Text>
          </View>
          
          <View style={homeStyles.featuresGrid}>
            {features.map((feature, index) => (
              <Animated.View
                key={index}
                style={[
                  homeStyles.featureCard,
                  {
                    opacity: fadeAnim,
                    transform: [{ translateY: translateYAnim }, { scale: scaleAnim }],
                  },
                ]}
              >
                <Text style={homeStyles.featureIcon}>{feature.icon}</Text>
                <Text style={homeStyles.featureTitle}>{feature.title}</Text>
                <Text style={homeStyles.featureDescription}>{feature.desc}</Text>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* CTA Section */}
        <View style={homeStyles.ctaSection}>
          <View style={homeStyles.ctaBackground}>
            <View style={homeStyles.ctaBackgroundCircle1} />
            <View style={homeStyles.ctaBackgroundCircle2} />
            <View style={homeStyles.ctaBackgroundDot1} />
            <View style={homeStyles.ctaBackgroundDot2} />
          </View>
          
          <Animated.View style={[homeStyles.ctaContent, { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] }]}>
            <View style={homeStyles.ctaBadge}>
              <Text style={homeStyles.ctaBadgeIcon}>🌿</Text>
              <Text style={homeStyles.ctaBadgeText}>Start Your Impact</Text>
            </View>
            
            <Text style={homeStyles.ctaTitle}>Join the Green Revolution</Text>
            
            <Text style={homeStyles.ctaSubtitle}>
              Be part of a global movement. Recycle, earn rewards, and make a difference today.
            </Text>
            
            <View style={homeStyles.ctaButtons}>
              <TouchableOpacity style={homeStyles.btnCtaPrimary}>
                <Text style={homeStyles.btnCtaPrimaryText}>Get Started</Text>
                <Text style={homeStyles.btnCtaPrimaryIcon}>→</Text>
              </TouchableOpacity>
              <TouchableOpacity style={homeStyles.btnCtaSecondary}>
                <Text style={homeStyles.btnCtaSecondaryText}>Learn More</Text>
              </TouchableOpacity>
            </View>
            
            <View style={homeStyles.stats}>
              <View style={homeStyles.stat}>
                <Text style={homeStyles.statNumber}>50K+</Text>
                <Text style={homeStyles.statLabel}>Eco Warriors</Text>
              </View>
              <View style={homeStyles.stat}>
                <Text style={homeStyles.statNumber}>2M+</Text>
                <Text style={homeStyles.statLabel}>Items Recycled</Text>
              </View>
              <View style={homeStyles.stat}>
                <Text style={homeStyles.statNumber}>₹10L+</Text>
                <Text style={homeStyles.statLabel}>Rewards Earned</Text>
              </View>
              <View style={homeStyles.stat}>
                <Text style={homeStyles.statNumber}>500+</Text>
                <Text style={homeStyles.statLabel}>Collectors</Text>
              </View>
            </View>
          </Animated.View>
        </View>

        {/* Footer */}
        <View style={homeStyles.footer}>
          <Animated.View style={[homeStyles.footerContent, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
            <View style={homeStyles.footerLogo}>
              <View style={homeStyles.footerLogoIcon}>
                <Text style={homeStyles.footerLogoIconText}>♻️</Text>
              </View>
              <Text style={homeStyles.footerLogoText}>Drop & Go</Text>
            </View>
            <Text style={homeStyles.footerText}>
              © 2025 Drop & Go. All rights reserved.
            </Text>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;