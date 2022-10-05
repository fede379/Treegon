/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useColorMode, SunIcon, MoonIcon, IconButton} from 'native-base';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InputForm from './screens/InputForm';
import Results from './screens/Results';

const Stack = createNativeStackNavigator();

function ToggleDarkMode() {
  const {colorMode, toggleColorMode} = useColorMode();
  return (
    <IconButton
      onPress={toggleColorMode}
      icon={
        colorMode === 'light' ? (
          <MoonIcon style={{color: 'white'}} />
        ) : (
          <SunIcon style={{color: 'white'}} />
        )
      }
    />
  );
}

const Main = () => {
  return (
    <Stack.Navigator
      initialRouteName="Inputs"
      screenOptions={{
        title: 'Treegon',
        headerStyle: {
          backgroundColor: '#059669',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: ToggleDarkMode,
      }}>
      <Stack.Screen name="Results" component={Results} />
      <Stack.Screen name="Inputs" component={InputForm} />
    </Stack.Navigator>
  );
};

export default Main;
