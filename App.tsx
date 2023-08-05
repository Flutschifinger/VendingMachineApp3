import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';

export type RootStackParamList = {
  Home: undefined;
  Map: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Übersicht' }} />
        <Stack.Screen name="Map" component={MapScreen} options={{ title: 'Karte' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
