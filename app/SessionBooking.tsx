import React, { useState } from 'react'
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SessionBooking = () => {
  const [offerDescription, setOfferDescription] = useState('')

  return (
    <SafeAreaView style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Image Section */}
        <Image 
          source={{ uri: '/api/placeholder/400/300' }} 
          style={styles.heroImage}
          resizeMode="cover"
        />

        {/* Description Section */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.titleText}>Book Your Session</Text>
          <Text style={styles.descriptionText}>
            Share what you can offer in this collaborative session. 
            Be specific about your skills, expertise, and what makes your contribution unique.
          </Text>
        </View>

        {/* Input Box */}
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

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Request Session</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    paddingBottom: 20, // Space for the submit button
  },
  heroImage: {
    width: '100%',
    height: 250,
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
})

export default SessionBooking
