import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  Alert, 
  ActivityIndicator, 
  TouchableOpacity
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

interface PendingRequest {
  _id: string;
  name: string;
  date: string;
  by: any;
  message: string;
}

const getAuthToken = async () => {
  const token = await AsyncStorage.getItem('authToken');
  if (!token) {
    alert("You are not signed in. Please sign in to request a session.");
    return null;
  }
  return token;
};

const PendingRequests = () => {
  const [requests, setRequests] = useState<PendingRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const token = await getAuthToken();
        if (!token) return;

        const response = await axios.post('http://192.168.0.108:5000/req/requestToMe', {}, {
          headers: {
            authToken: token,
          },
        });
        console.log(response.data);
        
        setRequests(response.data.data);
      } catch (error) {
        console.error('Error fetching pending requests:', error);
        Alert.alert('Error', 'Failed to load pending requests');
      } finally {
        setLoading(false);
      }
    };

    fetchPendingRequests();
  }, []);

  const handleApprove = async (id: string, by: string) => {
    const token = await getAuthToken();
    if (!token) return;

    try {
      const response = await axios.post("http://192.168.0.108:5000/req/approvedRequest", {
        anotherUserId: by,
        requestId: id
      }, {
        headers: {
          authToken: token,
        }
      });
      // You might want to handle the response here
      Alert.alert('Success', 'Request approved successfully');
    } catch (error) {
      console.error('Error approving request:', error);
      Alert.alert('Error', 'Failed to approve request');
    }
  };

  const handleReject = async (id: string) => {
    const token = await getAuthToken();
    if (!token) return;
    
    Alert.alert('Rejected', `Request from ${id} has been rejected.`);
    // Add your reject API call here similar to handleApprove
  };

  const renderRequestItem = ({ item }: { item: PendingRequest }) => (
    <View style={styles.requestItem}>
      <View style={styles.itemContent}>
        <View style={styles.requestDetails}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.date}>Requested On: {new Date(item.date).toDateString()}</Text>
          <Text style={styles.message}>{item.message}</Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.approveButton]} 
            onPress={() => handleApprove(item._id, item.by)}
          >
            <Ionicons name="checkmark" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.rejectButton]} 
            onPress={() => handleReject(item._id)}
          >
            <Ionicons name="close" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#FFA500" style={styles.loader} />
      ) : (
        <FlatList
          data={requests}
          renderItem={renderRequestItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 10,
  },
  loader: {
    marginTop: 20,
  },
  requestItem: {
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  requestDetails: {
    flex: 1,
    paddingRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    color: '#888',
    fontSize: 12,
    marginBottom: 5,
  },
  message: {
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  approveButton: {
    backgroundColor: '#4CAF50',
  },
  rejectButton: {
    backgroundColor: '#F44336',
  },
});

export default PendingRequests;