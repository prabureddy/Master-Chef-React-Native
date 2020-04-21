import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, Button, TouchableNativeFeedback} from 'react-native';
import {useSelector} from 'react-redux';
import {getFunctionsAsParams, getParams} from '../components/CustomFunctions';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoriesMealsScreen from '../screens/CategoriesMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Colors from '../assets/constants/Colors';
import {CATEGORIES} from '../data/Data';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FavouritiesScreen from './../screens/FavouritiesScreen';
import FiltersScreen from './../screens/FiltersScreen';

const screen = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const defaultOption = {
  headerStyle: {
    backgroundColor: Colors.primaryColor,
  },
  headerTitleStyle: {
    fontFamily: 'OpenSans-Regular',
  },
  headerTintColor: 'white',
  headerTitleAlign: 'center',
  headerBackTitleVisible: true,
  headerLeftContainerStyle: {
    width: '30%',
    overflow: 'hidden',
  },
  headerBackTitle: 'Back',
};

const FiltersNavigator = props => {
  return (
    <screen.Navigator screenOptions={defaultOption} initialRouteName="Filters">
      <screen.Screen
        options={{
          title: 'Meal Filters',
          headerLeft: () => (
            <View
              style={{
                borderRadius: 30,
                overflow: 'hidden',
                marginVertical: 10,
              }}>
              <TouchableNativeFeedback useForeground={true}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={28}
                  style={{padding: 15}}
                  onPress={() => {
                    props.navigation.toggleDrawer();
                  }}
                />
              </TouchableNativeFeedback>
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                borderRadius: 30,
                overflow: 'hidden',
                marginVertical: 10,
              }}>
              <TouchableNativeFeedback>
                <MaterialCommunityIcons
                  name="content-save"
                  color="white"
                  size={28}
                  style={{padding: 15}}
                  onPress={getFunctionsAsParams.bind(this, props, 'Filters Meals', 'save')}
                />
              </TouchableNativeFeedback>
            </View>
          ),
        }}
        name="Filters Meals"
        component={FiltersScreen}
      />
    </screen.Navigator>
  );
};

const MealsNavigator = props => {
  const getIdTitleMeals = catId => {
    const selectedCategory = CATEGORIES.find(cat => cat.id == catId);
    return selectedCategory.title;
  };
  

  return (
    <screen.Navigator screenOptions={defaultOption} initialRouteName="Home">
      <screen.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: 'Meal Categories',
          headerLeft: () => (
            <View
              style={{
                borderRadius: 30,
                overflow: 'hidden',
                marginVertical: 10,
              }}>
              <TouchableNativeFeedback useForeground={true}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={28}
                  style={{padding: 15}}
                  onPress={() => {
                    props.navigation.toggleDrawer();
                  }}
                />
              </TouchableNativeFeedback>
            </View>
          ),
        }}
      />
      <screen.Screen
        name="CategoriesMeals"
        component={CategoriesMealsScreen}
        options={({route}) => ({
          title: getIdTitleMeals(route.params.categoryId),
        })}
      />
      <screen.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={({route}) => ({
          title: route.params.MealTitle,
          headerBackTitleVisible: false,
          headerTitleContainerStyle: {
            paddingHorizontal: '10%',
            textAlign: 'center',
          },
          headerPressColorAndroid: 'white',
          headerRight: () => (
            <View
              style={{
                borderRadius: 30,
                overflow: 'hidden',
                marginVertical: 10,
              }}>
              <TouchableNativeFeedback useForeground={true}>
                <MaterialCommunityIcons
                  name={getParams(props, "MealDetail", "isFav") ? "star" : "star-outline"}
                  color="white"
                  size={28}
                  style={{padding: 15}}
                  onPress={getFunctionsAsParams.bind(
                    this,
                    props,
                    'MealDetail',
                    'toggleFav',
                  )}
                />
              </TouchableNativeFeedback>
            </View>
          ),
        })}
      />
    </screen.Navigator>
  );
};

const FavouritiesNavigator = props => {
  return (
    <screen.Navigator
      screenOptions={defaultOption}
      initialRouteName="FavouritiesNavigator">
      <screen.Screen
        name="Favourities"
        component={FavouritiesScreen}
        options={{
          title: 'Favourities',
          headerLeft: () => (
            <View
              style={{
                borderRadius: 30,
                overflow: 'hidden',
                marginVertical: 10,
              }}>
              <TouchableNativeFeedback useForeground={true}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={28}
                  style={{padding: 15}}
                  onPress={() => {
                    props.navigation.toggleDrawer();
                  }}
                />
              </TouchableNativeFeedback>
            </View>
          ),
        }}
      />
    </screen.Navigator>
  );
};

const WholeNavigator = () => {
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        activeTintColor: 'orange',
        labelStyle: {
          fontSize: 14,
          fontFamily: 'OpenSans-Regular',
        },
        style: {height: 50, paddingTop: 5},
      }}
      screenOptions={defaultOption}
      initialRouteName="Tab">
      <BottomTab.Screen
        name="Home"
        component={MealsNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name={'home-outline'}
              color={color}
              size={27}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Favourities"
        component={FavouritiesNavigator}
        options={{
          tabBarLabel: 'Favourities',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name={'star-outline'}
              color={color}
              size={27}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: 'orange',
          labelStyle: {
            fontFamily: 'OpenSans-Bold',
          },
        }}
        initialRouteName="Home">
        <Drawer.Screen name="Meals Favourities" component={WholeNavigator} />
        <Drawer.Screen name="Filters" component={FiltersNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
