/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import 'react-native-gesture-handler';
import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { StyleSheet } from 'react-native';

import MealsNavigator from './navigation/MealsNavigator';
import mealsReducer from './store/reducers/meals';

const rootReducer = combineReducers({
  meals: mealsReducer,
});

const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
