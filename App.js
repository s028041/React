import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';


import Login from './Login'
import HomeScreen from './HomeScreen';



const Projektas = StackNavigator({
  
Home: {
    screen: Login},
    Compass: {
      screen:HomeScreen
    }
 
  });


export default class App extends React.Component {
  render() {
    return (
      <Projektas/>
    )
  }
}