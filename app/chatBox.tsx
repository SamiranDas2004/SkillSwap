import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  Image, 
  KeyboardAvoidingView, 
  Platform, 
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Chat {
  text: string;
  sender: 'me' | 'other';  // Made sender required and strictly typed
  timestamp?: number;
}

interface Data{
id:any,
name:any
}

interface MessageData {
  recipientId: string;
  text: string;
  timestamp: number;
}

import {jwtDecode} from 'jwt-decode';

// Modify getAuthToken function
const getAuthToken = async () => {
  const token = await AsyncStorage.getItem('authToken');
  if (!token) {
    Alert.alert("Error", "You are not signed in. Please sign in first.");
    return null;
  }
  
  try {
    const decodedToken = jwtDecode<{ id: string; email: string; name: string }>(token);
    return decodedToken.id; // Return the user ID from the decoded token
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};


const ChatBox= () => {
    const { name, id } = useLocalSearchParams();
  const [messages, setMessages] = useState<Chat[]>([
    { text: 'Hello!', sender: 'other', timestamp: Date.now() - 3000 },
    { text: 'Hi there!', sender: 'me', timestamp: Date.now() - 2000 },
    { text: 'How are you?', sender: 'other', timestamp: Date.now() - 1000 },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [ws, setWs] = useState<WebSocket | null>(null);

  console.log(id);
  
  useEffect(() => {
    const setupWebSocket = async () => {
      const userId = await getAuthToken(); // Get user ID from decoded token
      if (!userId) return;
  
      const socket = new WebSocket(`ws://192.168.29.108:5000/?userId=${userId}`);
  
      socket.onopen = () => {
        console.log('WebSocket connected');
      };
  
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log('Received message:', message);
  
        const newMessage: Chat = {
          text: message.text,
          sender: 'other',
          timestamp: Date.now()
        };
  
        setMessages(prevMessages => [...prevMessages, newMessage]);
      };
  
      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
  
      socket.onclose = () => {
        console.log('WebSocket connection closed');
      };
  
      setWs(socket);
    };
  
    setupWebSocket();
  
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);
  
  
  const sendMessage = (recipientId: any) => {
    if (inputMessage.trim() === '' || !ws) return;
  
    const messageData: MessageData = {
      recipientId,
      text: inputMessage,
      timestamp: Date.now()
    };
  
    ws.send(JSON.stringify(messageData));
    console.log('Sent message:', messageData);
  
    const newMessage: Chat = {
      text: inputMessage,
      sender: 'me',
      timestamp: Date.now()
    };
  
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputMessage('');
  };

  const renderMessage = ({ item }: { item: Chat }) => (
    <View style={[
      styles.messageContainer, 
      item.sender === 'me' ? styles.myMessage : styles.otherMessage
    ]}>
      <Text style={[
        styles.messageText,
        item.sender === 'me' ? styles.myMessageText : styles.otherMessageText
      ]}>
        {item.text}
      </Text>
      {item.timestamp && (
        <Text style={styles.timestamp}>
          {new Date(item.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://example.com/avatar.jpg' }} 
          style={styles.avatar} 
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>{name}</Text>
        </View>
      </View>

      {/* Messages List */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        style={styles.messageList}
        inverted={false}
        contentContainerStyle={styles.messageListContent}
      />

      {/* Input Area */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        style={styles.inputContainer}
      >
        <TouchableOpacity style={styles.attachButton}>
          <Ionicons name="attach" size={24} color="#075E54" />
        </TouchableOpacity>
        
        <TextInput
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Type a message"
          style={styles.input}
          multiline
          maxLength={1000}
          placeholderTextColor="#999"
        />
        
        <TouchableOpacity 
          style={[
            styles.sendButton,
            !inputMessage.trim() && styles.sendButtonDisabled
          ]} 
          onPress={() => sendMessage(id)}
          disabled={!inputMessage.trim()}
        >
          <Ionicons 
            name={inputMessage.trim() ? "send" : "mic"} 
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
    backgroundColor: '#E5DDD5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#075E54',
    paddingVertical: 10,
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ddd',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#e0e0e0',
    fontSize: 14,
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    padding: 10,
    paddingBottom: 20,
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
    borderTopRightRadius: 0,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 4,
  },
  myMessageText: {
    color: '#000',
  },
  otherMessageText: {
    color: '#000',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  attachButton: {
    marginRight: 10,
    padding: 5,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#075E54',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#94B3AD',
  },
});

export default ChatBox;