import React from 'react';
import {useSelector} from 'react-redux';

import MealList from '../components/MealList';
import {View, Text, StyleSheet} from 'react-native';

const FavoritesScreen = props => {
  const favMeals = useSelector(state => state.meals.favoriteMeals);

  if (favMeals.length === 0 || !favMeals) {
    return (
      <View style={styles.screen}>
        <Text>No favorite meal found. Start adding some! </Text>
      </View>
    );
  }

  return <MealList listData={favMeals} navigation={props.navigation} />;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FavoritesScreen;
