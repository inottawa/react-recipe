import * as React from 'react';
import { Platform, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealScreen from '../screens/CategoryMealsScreen';
import MealDetailsScreen from '../screens/MealDetailScreen';
import FavouritesScreen from '../screens/FavouritesScreen';

import HeaderButton from '../components/HeaderButton';

import {
  HeaderButtons,
  Item,
} from 'react-navigation-header-buttons';

import { CATEGORIES, MEALS } from '../data/dummy-data';
import Colors from '../constants/Colors';

const defaultStackNavOptions = {
  gestureEnabled: true,
  headerStyle: {
    backgroundColor:
      Platform.OS === 'android'
        ? Colors.primaryColor
        : 'white',
  },
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerTintColor:
    Platform.OS === 'android'
      ? 'white'
      : Colors.primaryColor,
  headerBackTitleVisible: false,
};

const MealsStack = createStackNavigator();
const FavsStack = createStackNavigator();

const Tab =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator();

const NewMealsNavigator = () => {
  const getCategoryFromId = catId => {
    const selectedCat = CATEGORIES.find(
      cat => cat.id === catId
    );
    return selectedCat;
  };
  const getMealFromId = mealId => {
    const selectedMeal = MEALS.find(
      meal => meal.id === mealId
    );
    return selectedMeal;
  };
  return (
    <MealsStack.Navigator
      initialRouteName="Categories"
      screenOptions={defaultStackNavOptions}
      headerMode="float"
    >
      <MealsStack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{ title: 'Food Types' }}
      />
      <MealsStack.Screen
        name="CategoryMeals"
        component={CategoryMealScreen}
        options={({ route }) => ({
          title: getCategoryFromId(route.params.categoryId)
            .title,
        })}
      />
      <MealsStack.Screen
        name="MealDetail"
        component={MealDetailsScreen}
        options={({ route }) => ({
          title: getMealFromId(route.params.mealId).title,
          headerRight: () => (
            <HeaderButtons
              HeaderButtonComponent={HeaderButton}
            >
              <Item
                title="Fav"
                iconName="ios-star"
                onPress={() => {
                  console.log('Mark as fav');
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
    </MealsStack.Navigator>
  );
};

const FavsStackNavigator = () => {
  return (
    <FavsStack.Navigator
      initialRouteName="FavsList"
      screenOptions={defaultStackNavOptions}
      headerMode="float"
    >
      <FavsStack.Screen
        name="FavsList"
        component={FavouritesScreen}
        options={{ title: 'Your Favourites' }}
      />
      <FavsStack.Screen
        name="MealDetail"
        component={MealDetailsScreen}
        options={{ title: 'Fav Meal' }}
      />
    </FavsStack.Navigator>
  );
};

const MealsFavTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const iconName =
              route.name === 'Meals'
                ? 'ios-restaurant'
                : 'ios-star';

            return (
              <Ionicons
                name={iconName}
                size={25}
                color={color}
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: Colors.accentColor,
        }}
        activeColor={'white'}
        shifting={true}
        barStyle={{ backgroundColor: Colors.primaryColor }}
      >
        <Tab.Screen
          name="Meals"
          component={NewMealsNavigator}
          options={{
            tabBarColor: Colors.primaryColor,
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavsStackNavigator}
          options={{
            tabBarLabel: 'Favs!',
            tabBarColor: Colors.accentColor,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MealsFavTabNavigator;
