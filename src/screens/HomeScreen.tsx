import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Map: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: NavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Willkommen zu unserer Automaten-Karten-App!</Text>
      <Text style={styles.info}>Klicken Sie auf den Button unten, um zur Karte zu navigieren und einen neuen Automatenstandort hinzuzufügen.</Text>
      <Button
        title="Zur Karte gehen"
        onPress={() => navigation.navigate('Map')}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});
