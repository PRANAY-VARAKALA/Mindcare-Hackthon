import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { images } from '/workspaces/Mindcare-Hackthon/MindCare/assets/images';

const acuPointsData = [
  {
    title: 'LI4 (Hegu)',
    image: require('../../assets/images/1.jpg'),
    benefits: 'Relieves headaches, stress, and facial pain. Promotes overall well-being.',
  },
  {
    title: 'ST36 (Zusanli)',
    image: 'https://example.com/image2.jpg',
    benefits: 'Boosts energy, strengthens the immune system, and aids digestion.',
  },
  {
    title: 'SP6 (Sanyinjiao)',
    image: 'https://example.com/image3.jpg',
    benefits: 'Helps with digestion, menstrual pain, and anxiety. Supports kidney, liver, and spleen health.',
  },
  {
    title: 'LV3 (Taichong)',
    image: 'https://example.com/image4.jpg',
    benefits: 'Relieves stress, irritability, and headaches; balances emotions.',
  },
  {
    title: 'PC6 (Neiguan)',
    image: 'https://example.com/image5.jpg',
    benefits: 'Eases nausea, motion sickness, anxiety, and carpal tunnel syndrome.',
  },
  {
    title: 'GB20 (Fengchi)',
    image: 'https://example.com/image6.jpg',
    benefits: 'Relieves headaches, dizziness, neck pain, and colds.',
  },
  {
    title: 'CV17 (Shanzhong)',
    image: 'https://example.com/image7.jpg',
    benefits: 'Opens the chest, promotes emotional balance, reduces anxiety.',
  },
  {
    title: 'BL60 (Kunlun)',
    image: 'https://example.com/image8.jpg',
    benefits: 'Alleviates back pain, headaches, and stress.',
  },
  {
    title: 'KD1 (Yongquan)',
    image: 'https://example.com/image9.jpg',
    benefits: 'Grounds energy, relieves dizziness, promotes calmness.',
  },
  {
    title: 'HT7 (Shenmen)',
    image: 'https://example.com/image10.jpg',
    benefits: 'Calms the mind, reduces anxiety, helps with insomnia.',
  },
  {
    title: 'BL23 (Shenshu)',
    image: 'https://example.com/image11.jpg',
    benefits: 'Strengthens kidney energy, relieves lower back pain and fatigue.',
  },
  {
    title: 'SI3 (Houxi)',
    image: 'https://example.com/image12.jpg',
    benefits: 'Relieves headaches, neck pain, and shoulder tension.',
  },
];

const App = () => {
  const [selectedPoint, setSelectedPoint] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.gradientBackground} />
      <Text style={styles.title}>Acu Points and Benefits</Text>
      <ScrollView>
        {acuPointsData.map((point, index) => (
          <View key={index}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => 
                setSelectedPoint(selectedPoint === point.title ? null : point.title)
              }
            >
              <Text style={styles.pointTitle}>{point.title}</Text>
            </TouchableOpacity>

            {selectedPoint === point.title && (
              <View style={styles.detailsContainer}>
                <Text style={styles.subtitle}>{point.title}</Text>
                <Image
                  source={{ uri: point.image }}
                  style={styles.image}
                />
                <Text style={styles.benefitsTitle}>Benefits:</Text>
                <Text style={styles.benefitDescription}>{point.benefits}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    position: 'relative',
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#4B0082', // Dark purple
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    zIndex: -1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#ffffff', // White text color for better contrast
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  pointTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsContainer: {
    backgroundColor: '#e8f0fe',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  benefitDescription: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default App;
