import React from 'react';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function NotFound() {
    return (
        <View style={s.container}>
            <Text style={s.title}>Екран не знайдено</Text>
            <Pressable style={s.btn} onPress={() => router.replace('/')}>
                <Text style={s.btnText}>На головну</Text>
            </Pressable>
        </View>
    );
}

const s = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16, backgroundColor: '#fff' },
    title: { fontSize: 22, fontWeight: '900', marginBottom: 14, color: '#111827' },
    btn: { backgroundColor: '#2563eb', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12 },
    btnText: { color: '#fff', fontWeight: '900' },
});