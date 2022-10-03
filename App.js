import React from 'react';
import {NativeBaseProvider} from 'native-base';
import Main from './src/App';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
export default App;
