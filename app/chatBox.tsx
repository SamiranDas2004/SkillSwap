import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  Image, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Chat{
    id:string,
    text:string,
    sender:string
}

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello!', sender: 'other' },
    { id: '2', text: 'Hi there!', sender: 'me' },
    { id: '3', text: 'How are you?', sender: 'other' },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'me'
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
  };

  const renderMessage = ({ item }:{item:Chat}) => (
    <View style={[
      styles.messageContainer, 
      item.sender === 'me' ? styles.myMessage : styles.otherMessage
    ]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Image 
          source={{ uri: 'https://example.com/avatar.jpg' }} 
          style={styles.avatar} 
        />
        <Text style={styles.headerTitle}>John Doe</Text>
      </View>

      {/* Messages List */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
      />

      {/* Input Area */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <TouchableOpacity style={styles.attachButton}>
          <Ionicons name="attach" size={24} color="gray" />
        </TouchableOpacity>
        
        <TextInput
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Type a message"
          style={styles.input}
          multiline
        />
        
        <TouchableOpacity 
          style={styles.sendButton} 
          onPress={sendMessage}
        >
          <Ionicons 
            name={inputMessage ? "send" : "mic"} 
            size={24} 
            color="white" 
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#075E54',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  backButton: {
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageList: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  attachButton: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#075E54',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatBox;