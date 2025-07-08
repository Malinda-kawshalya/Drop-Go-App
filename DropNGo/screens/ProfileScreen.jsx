import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { profileStyles } from '../styles/ProfileStyles';
import { Ionicons } from '@expo/vector-icons';
import { userService } from '../services/userService';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ProfileScreen = () => {
  const { user, userProfile, signOut } = useAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  
  // Profile state
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    profileImage: null,
  });

  // Load user profile data
  useEffect(() => {
    if (userProfile) {
      setProfile({
        name: userProfile.name || '',
        email: userProfile.email || '',
        phone: userProfile.phone || '',
        address: userProfile.address || '',
        bio: userProfile.bio || '',
        profileImage: userProfile.profileImage || null,
      });
    }
  }, [userProfile]);

  // Handle profile image picker
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissionResult.granted) {
      Alert.alert('Permission Needed', 'We need permission to access your photos');
      return;
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    
    if (!result.cancelled && result.uri) {
      setProfile({ ...profile, profileImage: result.uri });
    }
  };

  // Upload profile image to Firebase Storage
  const uploadProfileImage = async (uri) => {
    if (!uri) return null;
    
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      
      const storage = getStorage();
      const storageRef = ref(storage, `profileImages/${user.uid}`);
      
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image: ", error);
      return null;
    }
  };

  // Save profile changes
  const saveProfile = async () => {
    if (!profile.name.trim()) {
      Alert.alert('Error', 'Name cannot be empty');
      return;
    }
    
    setSaving(true);
    
    try {
      // If we have a new profile image that is a local URI (not a URL)
      let profileImageUrl = profile.profileImage;
      if (profile.profileImage && profile.profileImage.startsWith('file://')) {
        profileImageUrl = await uploadProfileImage(profile.profileImage);
      }
      
      // Update user profile
      const result = await userService.updateUserProfile(user.uid, {
        ...profile,
        profileImage: profileImageUrl,
        updatedAt: new Date().toISOString()
      });
      
      if (result.success) {
        Alert.alert('Success', 'Profile updated successfully');
        setEditMode(false);
        setEditModalVisible(false);
      } else {
        Alert.alert('Error', result.error || 'Failed to update profile');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              await signOut();
              // Navigation happens automatically through AuthContext
            } catch (error) {
              Alert.alert('Error', 'Failed to sign out');
              setLoading(false);
            }
          }
        },
      ]
    );
  };

  // Edit Profile Modal
  const renderEditProfileModal = () => (
    <Modal
      visible={editModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setEditModalVisible(false)}
    >
      <KeyboardAvoidingView
        style={profileStyles.modalContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={profileStyles.modalContent}>
          <View style={profileStyles.modalHeader}>
            <Text style={profileStyles.modalTitle}>Edit Profile</Text>
            <TouchableOpacity 
              onPress={() => setEditModalVisible(false)}
              style={profileStyles.closeButton}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={profileStyles.modalScrollView}>
            <View style={profileStyles.imagePickerContainer}>
              <TouchableOpacity onPress={pickImage} style={profileStyles.imagePicker}>
                {profile.profileImage ? (
                  <Image 
                    source={{ uri: profile.profileImage }} 
                    style={profileStyles.profileImageLarge}
                  />
                ) : (
                  <View style={profileStyles.profileImagePlaceholder}>
                    <Ionicons name="person" size={50} color="#4CAF50" />
                  </View>
                )}
                <View style={profileStyles.cameraIconContainer}>
                  <Ionicons name="camera" size={20} color="#fff" />
                </View>
              </TouchableOpacity>
              <Text style={profileStyles.changePhotoText}>Change Photo</Text>
            </View>
            
            <View style={profileStyles.inputGroup}>
              <Text style={profileStyles.inputLabel}>Full Name</Text>
              <TextInput
                style={profileStyles.input}
                value={profile.name}
                onChangeText={(text) => setProfile({ ...profile, name: text })}
                placeholder="Your full name"
                autoCapitalize="words"
              />
            </View>
            
            <View style={profileStyles.inputGroup}>
              <Text style={profileStyles.inputLabel}>Email</Text>
              <TextInput
                style={[profileStyles.input, { color: '#888' }]}
                value={profile.email}
                editable={false}
                placeholder="Your email"
              />
              <Text style={profileStyles.disabledInputNote}>Email cannot be changed</Text>
            </View>
            
            <View style={profileStyles.inputGroup}>
              <Text style={profileStyles.inputLabel}>Phone</Text>
              <TextInput
                style={profileStyles.input}
                value={profile.phone}
                onChangeText={(text) => setProfile({ ...profile, phone: text })}
                placeholder="Your phone number"
                keyboardType="phone-pad"
              />
            </View>
            
            <View style={profileStyles.inputGroup}>
              <Text style={profileStyles.inputLabel}>Address</Text>
              <TextInput
                style={profileStyles.input}
                value={profile.address}
                onChangeText={(text) => setProfile({ ...profile, address: text })}
                placeholder="Your address"
              />
            </View>
            
            <View style={profileStyles.inputGroup}>
              <Text style={profileStyles.inputLabel}>Bio</Text>
              <TextInput
                style={[profileStyles.input, profileStyles.textArea]}
                value={profile.bio}
                onChangeText={(text) => setProfile({ ...profile, bio: text })}
                placeholder="Tell us about yourself"
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </ScrollView>
          
          <View style={profileStyles.modalFooter}>
            <TouchableOpacity 
              style={[profileStyles.cancelButton]}
              onPress={() => setEditModalVisible(false)}
              disabled={saving}
            >
              <Text style={profileStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[profileStyles.saveButton, saving && profileStyles.disabledButton]}
              onPress={saveProfile}
              disabled={saving}
            >
              {saving ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={profileStyles.saveButtonText}>Save Changes</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );

  // Main profile render
  return (
    <SafeAreaView style={profileStyles.container}>
      {/* Header */}
      <View style={profileStyles.header}>
        <TouchableOpacity 
          style={profileStyles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={profileStyles.headerTitle}>Profile</Text>
        <TouchableOpacity 
          style={profileStyles.editButton}
          onPress={() => setEditModalVisible(true)}
        >
          <Ionicons name="create-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <View style={profileStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      ) : (
        <ScrollView style={profileStyles.scrollContent}>
          {/* Profile Card */}
          <View style={profileStyles.profileCard}>
            <View style={profileStyles.profileHeader}>
              {profile.profileImage ? (
                <Image 
                  source={{ uri: profile.profileImage }} 
                  style={profileStyles.profileImage} 
                />
              ) : (
                <View style={profileStyles.profileImageDefault}>
                  <Text style={profileStyles.profileImageInitials}>
                    {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
                  </Text>
                </View>
              )}
              
              <View style={profileStyles.profileInfo}>
                <Text style={profileStyles.profileName}>{profile.name || 'User'}</Text>
                <Text style={profileStyles.profileRole}>
                  {userProfile?.role === 'collector' ? 'Collector' : 'Recycler'}
                </Text>
                <View style={profileStyles.badgeContainer}>
                  <View style={profileStyles.badge}>
                    <Ionicons name="leaf" size={14} color="#fff" />
                    <Text style={profileStyles.badgeText}>Eco Warrior</Text>
                  </View>
                </View>
              </View>
            </View>

            <Text style={profileStyles.bioText}>
              {profile.bio || "No bio available. Tap the edit button to add your bio."}
            </Text>
          </View>

          {/* Contact Information */}
          <View style={profileStyles.sectionCard}>
            <Text style={profileStyles.sectionTitle}>Contact Information</Text>
            
            <View style={profileStyles.infoRow}>
              <View style={profileStyles.infoIconContainer}>
                <Ionicons name="mail-outline" size={20} color="#4CAF50" />
              </View>
              <View style={profileStyles.infoContent}>
                <Text style={profileStyles.infoLabel}>Email</Text>
                <Text style={profileStyles.infoValue}>{profile.email || 'Not provided'}</Text>
              </View>
            </View>
            
            <View style={profileStyles.infoRow}>
              <View style={profileStyles.infoIconContainer}>
                <Ionicons name="call-outline" size={20} color="#4CAF50" />
              </View>
              <View style={profileStyles.infoContent}>
                <Text style={profileStyles.infoLabel}>Phone</Text>
                <Text style={profileStyles.infoValue}>{profile.phone || 'Not provided'}</Text>
              </View>
            </View>
            
            <View style={profileStyles.infoRow}>
              <View style={profileStyles.infoIconContainer}>
                <Ionicons name="location-outline" size={20} color="#4CAF50" />
              </View>
              <View style={profileStyles.infoContent}>
                <Text style={profileStyles.infoLabel}>Address</Text>
                <Text style={profileStyles.infoValue}>{profile.address || 'Not provided'}</Text>
              </View>
            </View>
          </View>

          {/* Statistics Section */}
          <View style={profileStyles.sectionCard}>
            <Text style={profileStyles.sectionTitle}>Your Impact</Text>
            
            <View style={profileStyles.statsContainer}>
              <View style={profileStyles.statItem}>
                <Text style={profileStyles.statValue}>24</Text>
                <Text style={profileStyles.statLabel}>Pickups</Text>
              </View>
              
              <View style={profileStyles.statItem}>
                <Text style={profileStyles.statValue}>142</Text>
                <Text style={profileStyles.statLabel}>kg Recycled</Text>
              </View>
              
              <View style={profileStyles.statItem}>
                <Text style={profileStyles.statValue}>320</Text>
                <Text style={profileStyles.statLabel}>Points</Text>
              </View>
            </View>
          </View>
          
          {/* Account Actions */}
          <View style={profileStyles.accountActions}>
            <TouchableOpacity style={profileStyles.actionButton}>
              <Ionicons name="settings-outline" size={20} color="#4CAF50" />
              <Text style={profileStyles.actionButtonText}>Settings</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={profileStyles.actionButton}>
              <Ionicons name="help-circle-outline" size={20} color="#4CAF50" />
              <Text style={profileStyles.actionButtonText}>Help & Support</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[profileStyles.actionButton, profileStyles.signOutButton]} 
              onPress={handleSignOut}
              disabled={loading}
            >
              <Ionicons name="log-out-outline" size={20} color="#FF5252" />
              <Text style={[profileStyles.actionButtonText, profileStyles.signOutText]}>
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
      
      {/* Edit Profile Modal */}
      {renderEditProfileModal()}
    </SafeAreaView>
  );
};

export default ProfileScreen;