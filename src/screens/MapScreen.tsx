import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import MapView, { Marker, MapEvent } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geocoder from 'react-native-geocoding';

Geocoder.init('YOUR_GEOCODING_API_KEY'); // Setzen Sie Ihren API-Schlüssel hier

interface Location {
  id: string;
  latitude: number;
  longitude: number;
}

const MapScreen: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [cityName, setCityName] = useState<string>('');

  useEffect(() => {
    const loadLocations = async () => {
      const savedLocations = await AsyncStorage.getItem('locations');
      if (savedLocations) {
        setLocations(JSON.parse(savedLocations));
      }
    };

    loadLocations();
  }, []);

  const handlePress = (event: MapEvent) => {
    const newLocation = {
      id: Math.random().toString(),
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude
    };
    setSelectedLocation(newLocation);
  };

  const confirmAddLocation = async () => {
    if (selectedLocation) {
      const updatedLocations = [...locations, selectedLocation];
      setLocations(updatedLocations);
      setSelectedLocation(null);
      await AsyncStorage.setItem('locations', JSON.stringify(updatedLocations));
    }
  };

  const removeLocation = async (id: string) => {
    const updatedLocations = locations.filter(location => location.id !== id);
    setLocations(updatedLocations);
    await AsyncStorage.setItem('locations', JSON.stringify(updatedLocations));
  };

  const searchCity = async () => {
    Geocoder.from(cityName)
      .then(json => {
        var location = json.results[0].geometry.location;
        setSelectedLocation({
          id: Math.random().toString(),
          latitude: location.lat,
          longitude: location.lng
        });
      })
      .catch(error => console.warn(error));
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setCityName(text)}
        value={cityName}
        placeholder="Stadtname eingeben"
      />
      <Button
        title="Suche Stadt"
        onPress={searchCity}
      />
      {selectedLocation && (
        <>
          <Button
            title="Füge Standort hinzu"
            onPress={confirmAddLocation}
          />
          <Button
            title="Entferne Standort"
            onPress={() => selectedLocation && removeLocation(selectedLocation.id)}
          />
        </>
      )}
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 51.1657,
          longitude: 10.4515,
          latitudeDelta: 5.0,
          longitudeDelta: 5.0,
        }}
        onPress={handlePress}
      >
        {locations.map(location => (
          <Marker
            key={location.id}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            onPress={() => setSelectedLocation(location)}
          />
        ))}
        {selectedLocation && (
          <Marker
            coordinate={{ latitude: selectedLocation.latitude, longitude: selectedLocation.longitude }}
            pinColor="blue"
          />
        )}
      </MapView>
    </View>
  );
}

export default MapScreen;
