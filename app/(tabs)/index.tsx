import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';
import { Link } from 'expo-router'; // Import Link from expo-router

const { width } = Dimensions.get('window');

// CollaborationCard Component
const CollaborationCard = ({
  title,
  description,
  skills,
}: {
  title: string;
  description: string;
  skills: string[];
}) => {
  return (
    <View style={styles.collaborationCard}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
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

  const carouselData = [
    {
      id: '1',
      title: 'Featured 1',
      image:
        'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*TJo21kFWygMtGs04sJsIJQ.jpeg',
    },
    {
      id: '2',
      title: 'Featured 2',
      image:
        'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*TJo21kFWygMtGs04sJsIJQ.jpeg',
    },
    {
      id: '3',
      title: 'Featured 3',
      image:
        'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*TJo21kFWygMtGs04sJsIJQ.jpeg',
    },
    {
      id: '4',
      title: 'Featured 4',
      image:
        'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*TJo21kFWygMtGs04sJsIJQ.jpeg',
    },
  ];

  const collaborationData = [
    {
      id: '1',
      title: 'Collaboration 1',
      description: 'Description 1',
      skills: ['React', 'Node.js', 'MongoDB'],
    },
    {
      id: '2',
      title: 'Collaboration 2',
      description: 'Description 2',
      skills: ['Python', 'Data Analysis', 'Machine Learning'],
    },
    {
      id: '3',
      title: 'Collaboration 3',
      description: 'Description 3',
      skills: ['UI/UX Design', 'Figma', 'Prototyping'],
    },
    {
      id: '4',
      title: 'Collaboration 4',
      description: 'Description 4',
      skills: ['Video Editing', 'Adobe Premiere', 'After Effects'],
    },
  ];

  const renderCarouselItem = ({ item }: { item: typeof carouselData[0] }) => (
    <View style={styles.carouselItem}>
      <Image source={{ uri: item.image }} style={styles.carouselImage} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
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

      {/* Carousel */}
      {/* <FlatList
        data={carouselData}
        keyExtractor={(item) => item.id}
        renderItem={renderCarouselItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width * 0.8}
        decelerationRate="fast"
        contentContainerStyle={styles.carouselContainer}
      /> */}

      {/* Collaboration Cards */}
      <FlatList
        data={collaborationData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href="../SessionBooking" asChild>
            <TouchableOpacity>
              <CollaborationCard
                title={item.title}
                description={item.description}
                skills={item.skills}
              />
            </TouchableOpacity>
          </Link>
        )}
        contentContainerStyle={styles.cardList}
      />
    </SafeAreaView>
  );
};

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
  carouselContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  carouselItem: {
    width: width * 0.8,
    height: 180,
    marginHorizontal: 5,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
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
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
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
