import React from 'react';

import { CATEGORIES, MEALS } from '../data/dummy-data';

import MealList from '../components/MealList';

const CategoryMealsScreen = props => {
  const { categoryId } = props.route.params;

  const displayMeals = MEALS.filter(
    meal => meal.categoryIds.indexOf(categoryId) >= 0
  );

  return (
    <MealList
      listData={displayMeals}
      navigation={props.navigation}
    />
  );
};

CategoryMealsScreen.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam(
    'categoryId'
  );

  const selectedCat = CATEGORIES.find(
    cat => cat.id === categoryId
  );

  return { headerTitle: selectedCat.title };
};

export default CategoryMealsScreen;
