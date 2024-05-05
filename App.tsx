import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Details from './src/screens/Details';
import Payments from './src/screens/Payments';

import TabNavigation from './src/navigators/TabNavigation';
const Stack= createNativeStackNavigator();

Payments
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen
          name='Tabs'
          component={TabNavigation}>

        </Stack.Screen>
        <Stack.Screen 
          name='Details' 
          component={Details} 
          options={{animation:'slide_from_bottom'}}>

        </Stack.Screen>

        <Stack.Screen 
          name='Payments' 
          component={Payments} 
          options={{animation:'slide_from_bottom'}}>

        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
};
export default App;
const styles = StyleSheet.create({});