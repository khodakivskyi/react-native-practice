import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { TasksScreen } from '../screens/TasksScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export function AppNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
            }}>
            <Tab.Screen name="Гра" component={HomeScreen} />
            <Tab.Screen name="Завдання" component={TasksScreen} />
            <Tab.Screen name="Налаштування" component={SettingsScreen} />
        </Tab.Navigator>
    );
}