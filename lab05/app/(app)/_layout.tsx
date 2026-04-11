import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function AppLayout() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) return <Redirect href="/login" />;

    return (
        <Stack screenOptions={{ headerTitleAlign: 'center' }}>
            <Stack.Screen name="index" options={{ title: 'Каталог' }} />
            <Stack.Screen name="details/[id]" options={{ title: 'Деталі товару' }} />
        </Stack>
    );
}