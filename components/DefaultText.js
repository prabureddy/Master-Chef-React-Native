import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const DefaultText = props => {
  return <Text style={styles.text}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'OpenSans',
  },
});

export default DefaultText;
