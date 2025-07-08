import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const homeStyles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: '#f5f7f5',
  },

  // Header Styles
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    elevation: 4,
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  logoIconText: {
    fontSize: 24,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2E7D32',
    letterSpacing: 0.5,
  },

  // Hero Section Styles with Background Effects
  hero: {
    paddingHorizontal: 20,
    paddingVertical: 50,
    minHeight: screenHeight * 0.7,
    position: 'relative',
    overflow: 'hidden',
  },
  
  heroBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  
  backgroundCircleLarge: {
    position: 'absolute',
    top: -120,
    right: -120,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(76,175,80,0.15)',
    opacity: 0.7,
  },
  
  backgroundCircleMedium: {
    position: 'absolute',
    top: 220,
    left: -100,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(165,214,167,0.2)',
  },
  
  backgroundCircleSmall: {
    position: 'absolute',
    bottom: 80,
    right: -60,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(200,230,201,0.25)',
  },
  
  backgroundDot1: {
    position: 'absolute',
    top: 140,
    right: 60,
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: '#81C784',
    opacity: 0.6,
  },
  
  backgroundDot2: {
    position: 'absolute',
    top: 320,
    left: 40,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#66BB6A',
    opacity: 0.5,
  },
  
  backgroundDot3: {
    position: 'absolute',
    bottom: 180,
    left: 100,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4CAF50',
    opacity: 0.4,
  },

  heroContent: {
    position: 'relative',
    zIndex: 1,
  },
  
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76,175,80,0.1)',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    alignSelf: 'flex-start',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(76,175,80,0.3)',
  },
  heroBadgeIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  heroBadgeText: {
    fontSize: 15,
    color: '#2E7D32',
    fontWeight: '600',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#1a1a1a',
    lineHeight: 44,
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  heroTitleGradient: {
    color: '#4CAF50',
  },
  heroSubtitle: {
    fontSize: 17,
    color: '#555555',
    lineHeight: 26,
    marginBottom: 28,
    maxWidth: 340,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  btnPrimary: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 28,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  btnPrimaryText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
    marginRight: 10,
  },
  btnPrimaryIcon: {
    color: '#ffffff',
    fontSize: 18,
  },
  btnSecondary: {
    backgroundColor: 'transparent',
    paddingHorizontal: 28,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  btnSecondaryText: {
    color: '#4CAF50',
    fontSize: 17,
    fontWeight: '700',
  },

  // Carousel Styles
  carousel: {
    marginTop: 24,
  },
  carouselScroll: {
    height: 220,
  },
  carouselSlide: {
    width: screenWidth - 40,
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    marginHorizontal: 5,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  carouselOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  carouselDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 10,
  },
  carouselDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(76,175,80,0.3)',
  },
  carouselDotActive: {
    backgroundColor: '#4CAF50',
    width: 30,
  },

  // Section Styles
  section: {
    paddingHorizontal: 20,
    paddingVertical: 50,
    minHeight: 400,
    position: 'relative',
  },
  
  sectionWithBackground: {
    backgroundColor: '#f8faf8',
    position: 'relative',
    overflow: 'hidden',
  },
  
  sectionBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  
  sectionBackgroundCircle1: {
    position: 'absolute',
    top: -60,
    left: -60,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(76,175,80,0.1)',
  },
  
  sectionBackgroundCircle2: {
    position: 'absolute',
    bottom: -70,
    right: -70,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(165,214,167,0.15)',
  },
  
  sectionHeader: {
    marginBottom: 36,
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  sectionTitleGradient: {
    color: '#4CAF50',
  },
  sectionSubtitle: {
    fontSize: 17,
    color: '#555555',
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: 320,
  },

  // Steps Grid Styles
  stepsGrid: {
    gap: 24,
    position: 'relative',
    zIndex: 1,
  },
  stepCard: {
    backgroundColor: '#ffffff',
    padding: 28,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 16,
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepNumberText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  stepIcon: {
    fontSize: 36,
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: 15,
    color: '#555555',
    textAlign: 'center',
    lineHeight: 22,
  },

  // Features Section Styles
  featuresSection: {
    backgroundColor: '#f9fbf9',
    position: 'relative',
    overflow: 'hidden',
  },
  
  featuresSectionBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  
  featuresBackgroundShape1: {
    position: 'absolute',
    top: 60,
    right: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(76,175,80,0.15)',
  },
  
  featuresBackgroundShape2: {
    position: 'absolute',
    bottom: 90,
    left: -50,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(165,214,167,0.2)',
  },
  
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 1,
  },
  featureCard: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    width: (screenWidth - 60) / 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  featureIcon: {
    fontSize: 36,
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: '#555555',
    textAlign: 'center',
    lineHeight: 20,
  },

  // CTA Section Styles
  ctaSection: {
    paddingHorizontal: 20,
    paddingVertical: 70,
    backgroundColor: '#2E7D32',
    alignItems: 'center',
    minHeight: 550,
    position: 'relative',
    overflow: 'hidden',
  },
  
  ctaBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  
  ctaBackgroundCircle1: {
    position: 'absolute',
    top: -100,
    left: -100,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  
  ctaBackgroundCircle2: {
    position: 'absolute',
    bottom: -80,
    right: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  
  ctaBackgroundDot1: {
    position: 'absolute',
    top: 120,
    right: 40,
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  
  ctaBackgroundDot2: {
    position: 'absolute',
    bottom: 160,
    left: 50,
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  
  ctaContent: {
    position: 'relative',
    zIndex: 1,
    alignItems: 'center',
  },
  
  ctaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  ctaBadgeIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  ctaBadgeText: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '600',
  },
  ctaTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  ctaSubtitle: {
    fontSize: 17,
    color: 'rgba(255,255,255,0.95)',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 36,
    maxWidth: 340,
  },
  ctaButtons: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 48,
    width: '100%',
  },
  btnCtaPrimary: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 28,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  btnCtaPrimaryText: {
    color: '#2E7D32',
    fontSize: 17,
    fontWeight: '700',
    marginRight: 10,
  },
  btnCtaPrimaryIcon: {
    color: '#2E7D32',
    fontSize: 18,
  },
  btnCtaSecondary: {
    backgroundColor: 'transparent',
    paddingHorizontal: 28,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  btnCtaSecondaryText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },

  // Stats Styles
  stats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    gap: 20,
  },
  stat: {
    alignItems: 'center',
    width: (screenWidth - 80) / 2,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
  },

  // Footer Styles
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 50,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    minHeight: 180,
  },
  footerContent: {
    alignItems: 'center',
  },
  footerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  footerLogoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  footerLogoIconText: {
    fontSize: 20,
  },
  footerLogoText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  footerText: {
    fontSize: 15,
    color: '#888888',
    textAlign: 'center',
  },
});