import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

interface Data{
    id: string,
    image: string,
    skills: any,
}

const dummyData = [
  {
    id: '1',
    image: 'https://via.placeholder.com/150',
    skills: ['React', 'Node.js', 'JavaScript'],
  },
  {
    id: '2',
    image: 'https://via.placeholder.com/150',
    skills: ['Python', 'Django', 'Machine Learning'],
  },
  {
    id: '3',
    image: 'https://via.placeholder.com/150',
    skills: ['Ruby', 'Rails', 'PostgreSQL'],
  },
];

const DedecatedSkills = () => {
  const renderCard = ({ item }:{item:Data}) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.cardTitle}>Skills</Text>
      {item.skills.map((skill: any, index:any) => (
        <Text key={index} style={styles.skill}>
          {skill}
        </Text>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyData}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  skill: {
    fontSize: 14,
    color: '#555',
  },
});

export default DedecatedSkills;
