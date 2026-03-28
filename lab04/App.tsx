import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FileManagerScreen } from './screens/FileManagerScreen';
import { FileViewerScreen } from './screens/FileViewerScreen';

export type RootStackParamList = {
  FileManager: undefined;
  FileViewer: { fileUri: string; fileName: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="FileManager" component={FileManagerScreen} options={{ title: 'Файловий менеджер' }} />
          <Stack.Screen name="FileViewer" component={FileViewerScreen} options={{ title: 'Редактор файлу' }} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}