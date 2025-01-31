import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signin = () => {
const [data,setData]=useState({
    email:"",
    password:""
})

const navigate=useRouter();

  const handleSignin = async() => {
    const {password,email}=data
    const response= await axios.post("http://192.168.0.108:5000/user/login",{
      email,
      password
    })
    const { token } = response.data;
    await AsyncStorage.setItem('authToken', token);
    console.log(response);
    

    navigate.push("/")
  };

  const handleChange = (field: string, value: any) => {
    setData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      
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
        onChangeText={(value)=>handleChange('password',value)}
      />
      
      <TouchableOpacity 
        style={styles.signinButton} 
        onPress={handleSignin}
      >
        <Text style={styles.signinButtonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  signinButton: {
    backgroundColor: 'black',
    padding: 15,
    alignItems: 'center',
  },
  signinButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default Signin;