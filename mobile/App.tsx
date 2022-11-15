import React from 'react';
import { StatusBar } from 'react-native';

import { Loading } from './src/components/Loading';
import Routes from './src/routes/routes';

import {
  useFonts,
  Inter_300Light,
  Inter_400Regular,
  Inter_700Bold,
  Inter_900Black,
} from '@expo-google-fonts/inter'

import { AuthProvider } from './src/contexts/Auth';
import { PetProvider } from './src/contexts/Pet'
import Toast from 'react-native-toast-message'
import Constants from 'expo-constants';

// Debug with react-devtools dependency
<script src="http://localhost:8097"></script>

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_700Bold,
    Inter_900Black
  })

  return (
    <>
      <StatusBar
        barStyle='light-content'
        backgroundColor="transparent"
        translucent
      />

      {fontsLoaded ? (
        <AuthProvider>
          <PetProvider>
            <Routes />
          </PetProvider>
        </AuthProvider>
      ) : (
        <Loading />
      )}

      <Toast
          position='top'
          topOffset={Constants.statusBarHeight * 2}
      />
    </>
  );
}