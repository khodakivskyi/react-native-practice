import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Index from '../app/(tabs)';
import { StyleSheet } from 'react-native';

const Tab = createMaterialTopTabNavigator();

export default function TabsMenu() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: styles.menu,
                tabBarLabelStyle: styles.menuButtonText,
                tabBarIndicatorStyle: { backgroundColor: '#2196F3' },
            }}
        >
            <Tab.Screen name="Головна" component={Index} />
            <Tab.Screen name="Галерея" component={Index} />
            <Tab.Screen name="Профіль" component={Index} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    menu: { backgroundColor: '#e0e0e0' },
    menuButtonText: { color: '#000', fontWeight: 'bold' },
});