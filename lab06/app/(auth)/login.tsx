import React, { useState } from 'react';
import { Link } from 'expo-router';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = async () => {
        try {
            await login(email, password);
        } catch (error: any) {
            Alert.alert('Помилка', error?.message ?? 'Не вдалося увійти');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Вхід</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Пароль"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Увійти" onPress={onLogin} />

            <View style={styles.links}>
                <Link href="/(auth)/register">Реєстрація</Link>
                <Link href="/(auth)/reset-password">Забули пароль?</Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, flex: 1, justifyContent: 'center', gap: 12 },
    title: { fontSize: 24, fontWeight: '600', textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8 },
    links: { marginTop: 16, gap: 8, alignItems: 'center' }
});