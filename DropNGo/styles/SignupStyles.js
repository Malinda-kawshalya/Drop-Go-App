import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const signupStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FDF4',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  signupCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 32,
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
    fontSize: 28,
    fontWeight: '900',
    color: '#059669',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 22,
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#059669',
    marginBottom: 6,
  },
  input: {
    width: '100%',
    padding: 14,
    borderWidth: 1,
    borderColor: '#b7e4c7',
    borderRadius: 10,
    fontSize: 15,
    backgroundColor: '#F0FDF4',
    color: '#1F2937',
    fontFamily: 'System',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#b7e4c7',
    borderRadius: 10,
    backgroundColor: '#F0FDF4',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    color: '#1F2937',
  },
  passwordWrapper: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  toggleButton: {
    position: 'absolute',
    right: 14,
    top: 14,
    padding: 6,
    borderRadius: 6,
  },
  toggleText: {
    fontSize: 18,
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
  signupButton: {
    backgroundColor: '#059669',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    shadowColor: '#059669',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  signupButtonText: {
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
    color: '#6B7280',
    fontSize: 15,
    fontWeight: '500',
  },
  signInLink: {
    color: '#059669',
    fontWeight: '600',
    marginLeft: 4,
  },
});