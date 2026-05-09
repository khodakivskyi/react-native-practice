import React from 'react';
import { Stack, Redirect } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function AuthLayout() {
    const { user, loading } = useAuth();

    if (loading) return null;
    if (user) return <Redirect href="/(app)" />;

    return <Stack screenOptions={{ headerTitleAlign: 'center' }} />;
}