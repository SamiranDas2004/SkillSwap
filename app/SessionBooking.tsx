import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SessionBooking = () => {
  const { name, id, skills } = useLocalSearchParams();
  const [offerDescription, setOfferDescription] = useState('');

  // Ensure skills is parsed correctly
  const skillsArray = skills ? JSON.parse(skills as string) : [];

  const handelSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken'); // Await retrieval
  
      if (!token) {
        alert("You are not signed in. Please sign in to request a session.");
        return; // Stop execution if no token
      }
  
      const response = await axios.post(
        "http://192.168.0.108:5000/req/createReq",
        {
          to:id,
          message: offerDescription, // Send the message user wrote
        },
        {
          headers: {
            authToken: token, // Use the retrieved token
          },
        }
      );
  
      console.log("Request successful:", response.data);
      alert("Session request sent successfully!");
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Failed to send request. Please try again.");
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.titleText}>Request Your Session</Text>
          <Text style={styles.descriptionText}>
            {name} is skilled in {skillsArray.join(', ')}. What can you offer to {name}? Please write your message below.
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="What can you offer in this session?"
            value={offerDescription}
            onChangeText={setOfferDescription}
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handelSubmit}>
  <Text style={styles.submitButtonText}>Request Session</Text>
</TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  descriptionContainer: {
    padding: 15,
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionText: {
    color: '#666',
    lineHeight: 22,
  },
  inputContainer: {
    padding: 15,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    minHeight: 120,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 15,
    margin: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SessionBooking;
