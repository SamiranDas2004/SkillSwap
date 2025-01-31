import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';
import { Link } from 'expo-router';
import axios from 'axios';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

// CollaborationCard Component
const CollaborationCard = ({
  name,
  skills,
}: {
  name: string;
  skills: string[];
}) => {
  return (
    <View style={styles.collaborationCard}>
      <Text style={styles.cardTitle}>{name}</Text>
      <View style={styles.skillsContainer}>
        {skills.map((skill, index) => (
          <View key={index} style={styles.skillBadge}>
            <Text style={styles.skillText}>{skill}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [collaborationData, setCollaborationData] = useState<any[]>([]);

const router=useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.0.108:5000/user/all');
        
        // Extract only the `data` array from response
        setCollaborationData(response.data.data); 

        console.log("Fetched Data:", response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#888"
        />
      </View>

      <FlatList
        data={collaborationData}
        keyExtractor={(item) => item._id?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
          <Link href={{ pathname: "/SessionBooking", params: { name: item.name, id: item._id, skills: JSON.stringify(item.skills) } }} asChild>
  <TouchableOpacity>
    <CollaborationCard name={item.name} skills={item.skills || []} />
  </TouchableOpacity>
</Link>

        )}
        contentContainerStyle={styles.cardList}
      />
    </SafeAreaView>
  );
};

;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  cardList: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  collaborationCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillBadge: {
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  skillText: {
    fontSize: 12,
    color: '#333',
  },
});

export default SearchScreen;
