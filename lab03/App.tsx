import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import { GameProvider, useGame } from './context/GameContext';
import { darkTheme, lightTheme } from './styles/theme';
import {AppNavigator} from "./navigation/AppNavigation";

function AppContent() {
  const { isDarkMode } = useGame();

  return (
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
          <StatusBar style={isDarkMode ? 'light' : 'dark'} />
          <AppNavigator />
        </NavigationContainer>
      </ThemeProvider>
  );
}

export default function App() {
  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GameProvider>
          <AppContent />
        </GameProvider>
      </GestureHandlerRootView>
  );
}