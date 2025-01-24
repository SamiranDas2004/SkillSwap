import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router'; // Use router for navigation
const { width } = Dimensions.get('window');

// Mock data for skill categories with image URLs
const categories = [
  { name: 'Coding', image: 'https://via.placeholder.com/150/0000FF?text=Coding' },
  { name: 'Language', image: 'https://via.placeholder.com/150/FF0000?text=Language' },
  { name: 'Cooking', image: 'https://via.placeholder.com/150/00FF00?text=Cooking' },
  { name: 'Football', image: 'https://via.placeholder.com/150/FFA500?text=Football' },
  { name: 'Video Editing', image: 'https://via.placeholder.com/150/8A2BE2?text=Video+Editing' },
  { name: 'Music', image: 'https://via.placeholder.com/150/FFC0CB?text=Music' },
  { name: 'Dance', image: 'https://via.placeholder.com/150/FFFF00?text=Dance' },
  { name: 'Fitness', image: 'https://via.placeholder.com/150/008080?text=Fitness' },
];

// Shuffle function to randomize categories
const shuffleArray = (array: typeof categories) => {
  return array.sort(() => Math.random() - 0.5);
};

const CategoryCard = ({ name, image, onPress }: { name: string; image: string; onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.cardImage} />
      <Text style={styles.cardText}>{name}</Text>
    </TouchableOpacity>
  );
};

const Category = () => {
  const router = useRouter(); // Use the router instance
  const randomizedCategories = shuffleArray(categories);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Explore Skills</Text>
      <FlatList
        data={randomizedCategories}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <CategoryCard
            name={item.name}
            image={item.image}
            onPress={() => router.push('../dedecatedSkills')} 
          />
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.cardList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  cardList: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    width: (width / 2) - 25,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default Category;
