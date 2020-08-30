import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { MEALS } from '../data/dummy-data';

const MealDetailScreen = props => {
  const { mealId } = props.route.params;

  const selectedMeal = MEALS.find(
    meal => meal.id === mealId
  );

  return (
    <View style={styles.container}>
      <Text>Meal with ID: {selectedMeal.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MealDetailScreen;
