import React, {useEffect, useCallback} from 'react';
import {ScrollView, Image, View, Text, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {toggleFavorite} from '../store/actions/meals';

import DefaultText from '../components/DefaultText';

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <DefaultText> {props.children} </DefaultText>
    </View>
  );
};

const MealDetailScreen = props => {
  const mealId = props.route.params.MealId;

  const CategoriesMealsIsFavorite = useSelector(state =>
    state.meals.favoriteMeals.some(meal => meal.id === mealId),
  );

  const availableMeals = useSelector(state => state.meals.meals);
  const selectedMeal = availableMeals.find(meal => meal.id === mealId);

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({toggleFav: toggleFavoriteHandler});
  }, [selectedMeal]);
  useEffect(() => {
    props.navigation.setParams({isFav: CategoriesMealsIsFavorite});
  }, [CategoriesMealsIsFavorite]);

  return (
    <ScrollView>
      <Image source={{uri: selectedMeal.imageUrl}} style={styles.image} />
      <View style={styles.details}>
        <DefaultText> {selectedMeal.duration}m </DefaultText>
        <DefaultText> {selectedMeal.complexity.toUpperCase()} </DefaultText>
        <DefaultText> {selectedMeal.affordability.toUpperCase()} </DefaultText>
      </View>
      <Text style={styles.title}> Ingredients </Text>
      {selectedMeal.ingredients.map(ingredient => (
        <ListItem key={ingredient}> {ingredient} </ListItem>
      ))}
      <Text style={styles.title}> Steps </Text>
      {selectedMeal.steps.map(step => (
        <ListItem key={step}> {step} </ListItem>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 22,
    textAlign: 'center',
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
});

export default MealDetailScreen;
