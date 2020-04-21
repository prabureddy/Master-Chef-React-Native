import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {CATEGORIES} from '../data/Data';
import CategoryGridTile from '../components/CategoryGridTile';

const CategoriesScreen = props => {
  const renderGridItem = itemData => {
    return (
      <CategoryGridTile
        title={itemData.item.title}
        onSelect={() => {
          props.navigation.navigate('CategoriesMeals', {
            categoryId: itemData.item.id,
          });
        }}
        styleBaseElement={styles.gridItem}
        styleText={styles.textTitle}
        backgroundColor={itemData.item.color}
      />
    );
  };

  return (
    <FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
  },
  textTitle: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    textAlign: 'right',
  },
});

export default CategoriesScreen;
