import React from 'react';
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Сторінку не знайдено</Text>
            <Link href="/(auth)/login">Повернутись на логін</Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 },
    title: { fontSize: 20, fontWeight: '600' }
});