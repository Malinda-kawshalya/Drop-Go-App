import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FDF4', // Linear gradient approximation
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 45,
  },
  loginCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 40,
    marginHorizontal: 10,
    shadowColor: '#2c3e50',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1.5,
    borderColor: '#b7e4c7',
    alignItems: 'stretch',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#059669',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 17,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#059669',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    padding: 16,
    borderWidth: 1,
    borderColor: '#b7e4c7',
    borderRadius: 12,
    fontSize: 16,
    backgroundColor: '#F0FDF4',
    color: '#1F2937',
    fontFamily: 'System',
  },
  passwordWrapper: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 55,
  },
  toggleButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 8,
    borderRadius: 8,
  },
  toggleText: {
    fontSize: 20,
    color: '#059669',
  },
  errorContainer: {
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#059669',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    shadowColor: '#059669',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    flexWrap: 'wrap',
  },
  linkText: {
    color: '#059669',
    fontSize: 15,
    fontWeight: '600',
  },
  separator: {
    color: '#6B7280',
    fontSize: 15,
    marginHorizontal: 8,
  },
});