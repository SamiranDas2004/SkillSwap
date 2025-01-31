import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList, ScrollView } from 'react-native';
import axios from "axios";


const skillCategories = [
  'Coding', 'Singing', 'Video Editing', 'Fitness', 
  'Painting', 'Photography', 'Dancing', 'Cooking', 
  'Music', 'Language', 'Design', 'Writing','Others...'
];

const Signup = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    skills: [] as string[],
    password: '',
  });

  const [skillInput, setSkillInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSignup = async () => {
    const { name, email, password, skills } = data;
  
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }
  
    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return;
    }
  
    if (skills.length === 0) {
      Alert.alert('Error', 'Please add at least one skill');
      return;
    }
  
    try {
      const response = await axios.post('http://192.168.0.108:5000/user/create', {
        name,
        email,
        password,
        skills,
        selectedCategory
      });
  
      if (response.status === 201) {
        Alert.alert('Success', 'Account created successfully');
      } else {
        Alert.alert('Error', 'Something went wrong, please try again');
      }
    } catch (error: any) {
      console.error('Signup Error:', error.response?.data || error.message);
      Alert.alert('Error', error.response?.data?.message || 'Failed to sign up');
    }
  };
  

  const handleChange = (field: string, value: string) => {
    setData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  const addSkill = () => {
    if (skillInput.trim() === '') {
      Alert.alert('Error', 'Skill cannot be empty');
      return;
    }

    if (!selectedCategory) {
      Alert.alert('Error', 'Please select a category');
      return;
    }

    const fullSkill = `${selectedCategory}: ${skillInput.trim()}`;

    if (data.skills.includes(fullSkill)) {
      Alert.alert('Error', 'Skill already added');
      return;
    }

    setData(prevData => ({
      ...prevData,
      skills: [...prevData.skills, fullSkill],
    }));
    setSkillInput('');
    setSelectedCategory('');
  };

  const removeSkill = (index: number) => {
    setData(prevData => ({
      ...prevData,
      skills: prevData.skills.filter((_, i) => i !== index),
    }));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Create Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#888"
          value={data.name}
          onChangeText={(value) => handleChange('name', value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={data.email}
          onChangeText={(value) => handleChange('email', value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={data.password}
          onChangeText={(value) => handleChange('password', value)}
        />

        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>Select Category:</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScrollView}
          >
            {skillCategories.map((category) => (
              <TouchableOpacity 
                key={category}
                style={[
                  styles.categoryButton, 
                  selectedCategory === category && styles.selectedCategory
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.selectedCategoryText
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.skillsSection}>
          <TextInput
            style={styles.skillInput}
            placeholder="Add a Specific Skill"
            placeholderTextColor="#888"
            value={skillInput}
            onChangeText={setSkillInput}
          />
          <TouchableOpacity style={styles.addSkillButton} onPress={addSkill}>
            <Text style={styles.addSkillText}>Add</Text>
          </TouchableOpacity>
        </View>

        {data.skills.length > 0 && (
          <View style={styles.skillsContainer}>
            <Text style={styles.skillsTitle}>Your Skills:</Text>
            <FlatList
              data={data.skills}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.skillItem}>
                  <Text style={styles.skillText}>{item}</Text>
                  <TouchableOpacity onPress={() => removeSkill(index)}>
                    <Text style={styles.removeSkillText}>X</Text>
                  </TouchableOpacity>
                </View>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    color: 'black',
    fontSize: 32,
    marginBottom: 40,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  skillsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  skillInput: {
    flex: 1,
    height: 50,
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingHorizontal: 10,
  },
  addSkillButton: {
    backgroundColor: 'black',
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
  },
  addSkillText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  skillsContainer: {
    marginBottom: 20,
  },
  skillsTitle: {
    color: 'black',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  skillText: {
    color: 'black',
    fontSize: 16,
    marginRight: 10,
  },
  removeSkillText: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: 'black',
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 5,
  },
  signupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    color: 'black',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  categoryScrollView: {
    paddingBottom: 10,
  },
  categoryButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: 'black',
  },
  categoryButtonText: {
    color: 'black',
    fontSize: 14,
  },
  selectedCategoryText: {
    color: 'white',
  },
});

export default Signup;