import React, { useState, useEffect } from 'react';
import {
  View,
  Text, 
  StyleSheet,
  FlatList,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RequestData {
  name: string;
  email: string;
  department: string;
  message: string;
}

interface SentRequest extends RequestData {
  id: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  date: string;
}

const SendRequest = () => {
  const [sentRequests, setSentRequests] = useState<SentRequest[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        console.log(token); 

        if (!token) {
          alert("You are not signed in. Please sign in to request a session.");
          return;
        }

        const response = await axios.post('http://192.168.0.108:5000/req/showAllRequest', {}, {
          headers: {
            authToken: token,  // Pass the token in the headers
          },
        });

        const requests = response.data.data.map((item: any) => ({
          id: item._id,
          name: item.to.name,  // Display the name from 'to' object
          email: item.to.email,  // Display email from 'to' object
          department: item.to.department || 'Not Provided', // Default if no department
          message: item.message || 'No message provided', // Default if no message
          status: item.status === 'pending' ? 'Pending' : item.status === 'approved' ? 'Approved' : 'Rejected',
          date: new Date(item.date).toLocaleDateString(),
        }));

        setSentRequests(requests);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const renderSentRequestItem = ({ item }: { item: SentRequest }) => (
    <View style={styles.sentRequestItem}>
      <View style={styles.sentRequestHeader}>
        <Text style={styles.sentRequestName}>{item.name}</Text>
        <Text
          style={[
            styles.sentRequestStatus,
            item.status === 'Pending'
              ? styles.pendingStatus
              : item.status === 'Approved'
              ? styles.approvedStatus
              : styles.rejectedStatus,
          ]}
        >
          {item.status}
        </Text>
      </View>
      <Text style={styles.sentRequestEmail}>{item.email}</Text>
      <Text style={styles.sentRequestDate}>{item.date}</Text>
    </View>
  );

  return (
    <FlatList
      data={sentRequests}
      renderItem={renderSentRequestItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View style={styles.sentRequestsHeader}>
          <Text style={styles.sentRequestsHeaderTitle}>Sent Requests</Text>
        </View>
      }
      contentContainerStyle={styles.sentRequestsList}
    />
  );
};

const styles = StyleSheet.create({
  sentRequestsHeader: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sentRequestsHeaderTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sentRequestsList: {
    padding: 15,
  },
  sentRequestItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sentRequestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sentRequestName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sentRequestStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  pendingStatus: {
    backgroundColor: '#FFC107',
    color: 'white',
  },
  approvedStatus: {
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  rejectedStatus: {
    backgroundColor: '#F44336',
    color: 'white',
  },
  sentRequestEmail: {
    color: '#666',
    marginBottom: 5,
  },
  sentRequestDepartment: {
    color: '#333',
    marginBottom: 5,
  },
  sentRequestMessage: {
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 5,
  },
  sentRequestDate: {
    color: '#888',
    fontSize: 12,
    textAlign: 'right',
  },
});

export default SendRequest;
