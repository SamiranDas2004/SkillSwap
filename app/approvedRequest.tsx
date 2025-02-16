import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

interface ApprovedRequest {
  _id: string;
  name: string;
}

const ApprovedRequests = () => {
  const router = useRouter();
  const [approvedRequests, setApprovedRequests] = useState<ApprovedRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApprovedRequests();
  }, []);

  const getAuthToken = async () => {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      Alert.alert("Error", "You are not signed in. Please sign in first.");
      return null;
    }
    return token;
  };

  const fetchApprovedRequests = async () => {
    try {
      const token = await getAuthToken();
      if (!token) return;

      const response = await axios.post('http://192.168.29.108:5000/req/showApprovedRequest', {}, {
        headers: {
          authToken: token
        }
      });

      console.log(response.data);
      
      const requestsData = Array.isArray(response.data.data) 
        ? response.data.data 
        : [response.data.data];

      setApprovedRequests(requestsData);
    } catch (error) {
      console.error('Error fetching approved requests:', error);
      Alert.alert('Error', 'Failed to load approved requests');
    } finally {
      setLoading(false);
    }
  };

  const navigateToChatBox = (item: ApprovedRequest) => {
    router.push({
      pathname: '../chatBox',
      params: { 
        id: item._id,
        name: item.name
      }
    });
  };

  const renderChatItem = ({ item }: { item: ApprovedRequest }) => (
    <TouchableOpacity 
      style={styles.chatItem}
      onPress={() => navigateToChatBox(item)}
    >
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.name.charAt(0).toUpperCase()}
          </Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.topLine}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.time}>Today</Text>
        </View>
        <View style={styles.bottomLine}>
          <View style={styles.messageContainer}>
            <Ionicons name="checkmark-done" size={16} color="#8696a0" style={styles.messageIcon} />
            <Text style={styles.lastMessage} numberOfLines={1}>
              Tap to start chatting
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Approved Requests</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#25D366" style={styles.loader} />
      ) : (
        <FlatList
          data={approvedRequests}
          renderItem={renderChatItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.chatList}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No chats available</Text>
              <Text style={styles.emptySubText}>Start a new chat with your approved connections</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#075e54',
    paddingTop: 35,
    paddingBottom: 15,
    paddingHorizontal: 20,
    elevation: 3,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 50,
  },
  chatList: {
    flexGrow: 1,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#128C7E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  topLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
    marginRight: 10,
  },
  time: {
    fontSize: 12,
    color: '#8696a0',
  },
  bottomLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  messageIcon: {
    marginRight: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#8696a0',
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#075e54',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#8696a0',
    textAlign: 'center',
  },
});

export default ApprovedRequests;