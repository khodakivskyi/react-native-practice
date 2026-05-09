import React, { useState } from 'react';
import { Link } from 'expo-router';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen() {
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onRegister = async () => {
        try {
            await register(email, password, name);
        } catch (error: any) {
            Alert.alert('Помилка', error?.message ?? 'Не вдалося зареєструватися');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Реєстрація</Text>
            <TextInput
                style={styles.input}
                placeholder="Ім'я"
                value={name}
                onChangeText={setName}
            />
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
            <Button title="Створити акаунт" onPress={onRegister} />

            <View style={styles.links}>
                <Link href="/(auth)/login">Маю акаунт</Link>
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