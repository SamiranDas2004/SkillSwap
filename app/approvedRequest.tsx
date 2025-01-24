import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

interface ApprovedRequest {
  id: string;
  name: string;
  lastMessage: string;
  avatar: string;
  timestamp: string;
  unreadCount: number;
}

const ApprovedRequests = () => {
  const router = useRouter();
  const [chats, setChats] = useState<ApprovedRequest[]>([
    {
      id: '1',
      name: 'John Doe',
      lastMessage: 'Sure, I can help with that.',
      avatar: 'https://example.com/avatar1.jpg',
      timestamp: '2:30 PM',
      unreadCount: 2
    },
    {
      id: '2',
      name: 'Jane Smith',
      lastMessage: 'Please send the details.',
      avatar: 'https://example.com/avatar2.jpg',
      timestamp: '1:45 PM',
      unreadCount: 1
    },
  ]);

  const navigateToChatBox = (item: ApprovedRequest) => {
    router.push({
      pathname: '../chatBox',
    
    });
  };

  const renderChatItem = ({ item }: { item: ApprovedRequest }) => (
    <TouchableOpacity 
      style={styles.chatItem} 
      onPress={() => navigateToChatBox(item)}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <View style={styles.chatFooter}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Approved Requests</Text>
      </View>
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#25D366',
    paddingVertical: 15,
    paddingHorizontal: 80,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  chatList: {
    paddingTop: 10,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timestamp: {
    color: '#888',
    fontSize: 12,
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    color: '#666',
    flex: 1,
    marginRight: 10,
  },
  unreadBadge: {
    backgroundColor: '#25D366',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  unreadText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ApprovedRequests;