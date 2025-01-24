import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Image,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PendingRequest {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'pending' | 'reviewing';
  requestDate: string;
}

const PendingRequests = () => {
  const [requests, setRequests] = useState<PendingRequest[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://example.com/avatar1.jpg',
      status: 'pending',
      requestDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: 'https://example.com/avatar2.jpg',
      status: 'reviewing',
      requestDate: '2024-01-20'
    }
  ]);

  const handleApprove = (request: PendingRequest) => {
    Alert.alert(
      'Approve Request',
      `Do you want to approve ${request.name}'s request?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Approve', 
          onPress: () => {
            // Logic for approving request
            console.log(`Approved request for ${request.name}`);
          }
        }
      ]
    );
  };

  const handleReject = (request: PendingRequest) => {
    Alert.alert(
      'Reject Request',
      `Do you want to reject ${request.name}'s request?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reject', 
          style: 'destructive',
          onPress: () => {
            // Logic for rejecting request
            console.log(`Rejected request for ${request.name}`);
          }
        }
      ]
    );
  };

  const renderRequestItem = ({ item }: { item: PendingRequest }) => (
    <View style={styles.requestItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.requestDetails}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.email}>{item.email}</Text>
        <Text style={styles.date}>Request Date: {item.requestDate}</Text>
        <View style={styles.badgeContainer}>
          <Text style={[
            styles.statusBadge, 
            item.status === 'pending' ? styles.pendingBadge : styles.reviewingBadge
          ]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.approveButton]} 
          onPress={() => handleApprove(item)}
        >
          <Ionicons name="checkmark" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.rejectButton]} 
          onPress={() => handleReject(item)}
        >
          <Ionicons name="close" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pending Requests</Text>
      </View>
      <FlatList
        data={requests}
        renderItem={renderRequestItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
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
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 10,
  },
  requestItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  requestDetails: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    color: '#666',
    marginBottom: 5,
  },
  date: {
    color: '#888',
    fontSize: 12,
  },
  badgeContainer: {
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
    fontSize: 12,
  },
  pendingBadge: {
    backgroundColor: '#FFC107',
    color: 'white',
  },
  reviewingBadge: {
    backgroundColor: '#2196F3',
    color: 'white',
  },
  actionButtons: {
    flexDirection: 'column',
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