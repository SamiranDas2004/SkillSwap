import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import ApprovedRequests from '../approvedRequest';

const { width } = Dimensions.get('window');

const Explore = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = await AsyncStorage.getItem('authToken');
    setIsSignedIn(!!token);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await AsyncStorage.removeItem('authToken');
    setIsSignedIn(false);
    setIsMenuOpen(false);
    router.push("../signin");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Hamburger Menu Button */}
      <TouchableOpacity style={styles.hamburgerButton} onPress={toggleMenu}>
        <Ionicons name="menu" size={30} color="#4CAF50" />
      </TouchableOpacity>

      <View style={styles.content}>
        <ApprovedRequests />
      </View>

      {/* Sliding Menu */}
      {isMenuOpen && (
        <View style={styles.menuOverlay}>
          <View style={styles.menuContainer}>
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => router.push("../pendingRequest")}
            >
              <Ionicons name="time-outline" size={20} color="#4CAF50" />
              <Text style={styles.menuItemText}>Pending Requests</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => router.push("../sendRequest")}
            >
              <Ionicons name="send-outline" size={20} color="#4CAF50" />
              <Text style={styles.menuItemText}>Send Request</Text>
            </TouchableOpacity>
            
            

            {/* Horizontal Line Separator */}
            <View style={styles.horizontalLine} />

            {isSignedIn ? (
              <TouchableOpacity style={styles.menuItem} onPress={handleSignOut}>
                <Ionicons name="log-out-outline" size={20} color="#4CAF50" />
                <Text style={styles.menuItemText}>Sign Out</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity 
                  style={styles.menuItem} 
                  onPress={() => router.push("../signup")}
                >
                  <Ionicons name="person-add-outline" size={20} color="#4CAF50" />
                  <Text style={styles.menuItemText}>Sign Up</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.menuItem} 
                  onPress={() => router.push("../signin")}
                >
                  <Ionicons name="log-in-outline" size={20} color="#4CAF50" />
                  <Text style={styles.menuItemText}>Sign In</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  hamburgerButton: {
    position: 'absolute',
    top: 35,
    left: 20,
    zIndex: 20,
    paddingVertical: 15,
  },
  content: {
    flex: 1,
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 10,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: width * 0.7,
    backgroundColor: 'white',
    paddingTop: 80,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginVertical: 10,
  },
});

export default Explore;