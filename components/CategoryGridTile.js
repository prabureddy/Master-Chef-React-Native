import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

const CategoryGridTile = props => {
  let TouchableCmp = TouchableNativeFeedback;

  if (Platform.OS === 'android' && Platform.Version > 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const backgroundColorStyle = {
    backgroundColor: props.backgroundColor,
  };

  return (
    <View style={{...styles.gridItem, ...props.styleBaseElement}}>
      <TouchableCmp style={{flex: 1}} onPress={props.onSelect}>
        <View style={{...styles.container, ...backgroundColorStyle}}>
          <Text
            style={{...styles.textTitle, ...props.styleText}}
            numberOfLines={2}>
            {props.title}
          </Text>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {},
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 3,
    padding: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  textTitle: {},
});

export default CategoryGridTile;
