import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

const symptomsData = [
  { title: 'Brain Fog' },
  { title: 'PTSD' },
  { title: 'ADHD' },
  { title: 'Anxiety' },
  { title: 'Depression' },
  { title: 'Stress' },
];

const foodRecommendations = {
  'Brain Fog': {
    take: [
      'Fatty fish (salmon)',
      'Blueberries',
      'Dark chocolate',
      'Nuts (almonds, walnuts)',
      'Leafy greens (spinach, kale)',
      'Avocado',
      'Turmeric',
      'Eggs',
      'Beets',
      'Pumpkin seeds',
    ],
    avoid: [
      'Processed sugars',
      'High-fat junk foods',
      'Excess caffeine',
      'White bread',
      'Artificial sweeteners',
    ],
  },
  'PTSD': {
    take: [
      'Omega-3 rich foods (salmon, flaxseeds)',
      'Lean proteins (chicken, turkey)',
      'Whole grains (brown rice, quinoa)',
      'Antioxidant-rich fruits (berries, oranges)',
      'Leafy greens (spinach, collard greens)',
      'Dark chocolate',
      'Nuts and seeds (chia seeds, walnuts)',
      'Yogurt',
      'Oats',
    ],
    avoid: [
      'Caffeine',
      'Alcohol',
      'Refined sugars',
      'Processed foods',
      'High-fat dairy products',
    ],
  },
  'ADHD': {
    take: [
      'Lean proteins (chicken, turkey, fish)',
      'Fruits and vegetables (especially berries and broccoli)',
      'Whole grains (brown rice, quinoa, oats)',
      'Legumes (beans, lentils)',
      'Healthy fats (avocado, olive oil)',
      'Eggs',
      'Dark chocolate',
    ],
    avoid: [
      'Sugary snacks (candy, soda)',
      'Fast food',
      'Caffeine',
      'Artificial food colorings',
      'Highly processed foods',
    ],
  },
  'Anxiety': {
    take: [
      'Omega-3 fatty acids (fatty fish, chia seeds)',
      'Whole grains (brown rice, oatmeal)',
      'Leafy greens (spinach, kale)',
      'Berries (blueberries, strawberries)',
      'Turmeric',
      'Dark chocolate',
      'Nuts (walnuts, almonds)',
      'Green tea',
      'Yogurt',
    ],
    avoid: [
      'Caffeine',
      'Sugar',
      'Alcohol',
      'High-sugar snacks',
      'Processed foods',
    ],
  },
  'Depression': {
    take: [
      'Fruits (bananas, oranges, apples)',
      'Vegetables (carrots, bell peppers, broccoli)',
      'Whole grains (quinoa, brown rice, oats)',
      'Fatty fish (salmon, mackerel)',
      'Lean proteins (chicken, turkey)',
      'Dark chocolate',
      'Nuts (brazil nuts, almonds)',
      'Olive oil',
      'Greek yogurt',
    ],
    avoid: [
      'Processed foods',
      'High-sugar snacks',
      'Excessive caffeine',
      'Alcohol',
      'Trans fats (found in many fried foods)',
    ],
  },
  'Stress': {
    take: [
      'Dark chocolate',
      'Berries (strawberries, blueberries)',
      'Green tea',
      'Oats',
      'Fatty fish (salmon)',
      'Nuts (walnuts, almonds)',
      'Bananas',
      'Leafy greens (spinach, kale)',
      'Herbal teas (chamomile, peppermint)',
    ],
    avoid: [
      'Excess caffeine',
      'Alcohol',
      'Fast food',
      'Highly processed snacks',
      'Refined carbohydrates (white bread, pastries)',
    ],
  },
};

const App = () => {
  const [selectedSymptom, setSelectedSymptom] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mental Health Issues</Text>
      <ScrollView>
        {symptomsData.map((symptom, index) => (
          <View key={index}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => 
                setSelectedSymptom(selectedSymptom === symptom.title ? null : symptom.title)
              }
            >
              <Text style={styles.symptomTitle}>{symptom.title}</Text>
            </TouchableOpacity>

            {selectedSymptom === symptom.title && (
              <View style={styles.detailsContainer}>
                <Text style={styles.subtitle}>{symptom.title}</Text>
                <Text style={styles.foodTitle}>Foods to Take:</Text>
                {foodRecommendations[symptom.title].take.map((food, index) => (
                  <Text key={index} style={styles.foodItem}>- {food}</Text>
                ))}
                <Text style={styles.foodTitle}>Foods to Avoid:</Text>
                {foodRecommendations[symptom.title].avoid.map((food, index) => (
                  <Text key={index} style={styles.foodItem}>- {food}</Text>
                ))}
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
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  symptomTitle: {
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
  },
  foodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  foodItem: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default App;