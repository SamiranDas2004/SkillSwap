import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
  const [requestData, setRequestData] = useState<RequestData>({
    name: '',
    email: '',
    department: '',
    message: '',
  });

  const [sentRequests, setSentRequests] = useState<SentRequest[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      department: 'IT',
      message: 'Request for new laptop',
      status: 'Pending',
      date: '2024-01-15',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      department: 'HR',
      message: 'Request for training program',
      status: 'Approved',
      date: '2024-01-10',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      department: 'Finance',
      message: 'Request for budget allocation',
      status: 'Rejected',
      date: '2024-01-05',
    },
    {
        id: '4',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        department: 'Finance',
        message: 'Request for budget allocation',
        status: 'Rejected',
        date: '2024-01-05',
      },
      {
        id: '5',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        department: 'Finance',
        message: 'Request for budget allocation',
        status: 'Rejected',
        date: '2024-01-05',
      },
      {
        id: '6',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        department: 'Finance',
        message: 'Request for budget allocation',
        status: 'Rejected',
        date: '2024-01-05',
      },
  ]);





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
      <Text style={styles.sentRequestDepartment}>{item.department}</Text>
      <Text style={styles.sentRequestMessage}>{item.message}</Text>
      <Text style={styles.sentRequestDate}>{item.date}</Text>
    </View>
  );

  return (
    <FlatList
      data={sentRequests}
      renderItem={renderSentRequestItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View>
         
          {/* Form */}
          {/* <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" style={styles.inputIcon} size={20} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  value={requestData.name}
                  onChangeText={(value) => handleInputChange('name', value)}
                />
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" style={styles.inputIcon} size={20} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  value={requestData.email}
                  onChangeText={(value) => handleInputChange('email', value)}
                />
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Department</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="briefcase-outline" style={styles.inputIcon} size={20} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your department"
                  value={requestData.department}
                  onChangeText={(value) => handleInputChange('department', value)}
                />
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Message</Text>
              <TextInput
                style={[styles.input, styles.messageInput]}
                placeholder="Enter your message"
                multiline
                value={requestData.message}
                onChangeText={(value) => handleInputChange('message', value)}
              />
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={submitRequest}>
              <Text style={styles.submitButtonText}>Submit Request</Text>
            </TouchableOpacity>
          </View> */}
          <View style={styles.sentRequestsHeader}>
            <Text style={styles.sentRequestsHeaderTitle}>Sent Requests</Text>
          </View>
        </View>
      }
      contentContainerStyle={styles.sentRequestsList}
    />
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
        textAlign: 'center',
      },
      formContainer: {
        padding: 20,
        backgroundColor: 'white',
        margin: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      inputGroup: {
        marginBottom: 15,
      },
      label: {
        marginBottom: 5,
        color: '#333',
        fontWeight: 'bold',
      },
      inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
      },
      inputIcon: {
        marginLeft: 10,
        marginRight: 10,
      },
      input: {
        flex: 1,
        height: 50,
        paddingRight: 15,
      },
      messageInput: {
        height: 100,
        textAlignVertical: 'top',
        paddingTop: 15,
      },
      submitButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
      },
      submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
      },
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
