import React from 'react';
import {View, Text, StyleSheet, Button, FlatList} from 'react-native';
import {CATEGORIES} from '../data/Data';
import {useSelector} from 'react-redux';

import MealItem from '../components/MealItem';
import MealDetailScreen from './MealDetailScreen';

const CategoriesMealsScreen = props => {
  const favoriteMeals = useSelector(state => state.meals.favoriteMeals);

  const renderMealItem = itemData => {
    const isFav = favoriteMeals.some(meal => meal.id === itemData.item.id);

    return (
      <MealItem
        title={itemData.item.title}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        onSelect={() => {
          props.navigation.navigate('MealDetail', {
            MealId: itemData.item.id,
            MealTitle: itemData.item.title,
            isFav: isFav,
          });
        }}
        image={itemData.item.imageUrl}
      />
    );
  };

  const catId = props.route.params.categoryId;
  // const displayedMeals = MEALS.find((meal) => cat.id == catId);
  const filteredMeals = useSelector(state => state.meals.filteredMeals);
  const displayedMeals = filteredMeals.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0,
  );

  if (displayedMeals.length === 0) {
    return (
      <View style={styles.screen}>
        <Text>No meals found! maybe check your filters?</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={displayedMeals}
        renderItem={renderMealItem}
        style={{width: '100%'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
});

export default CategoriesMealsScreen;
