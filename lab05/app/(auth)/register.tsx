import React, { useState } from 'react';
import { Link, router } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen() {
    const { register } = useAuth();

    const [name, setName] = useState('Іван');
    const [email, setEmail] = useState('test@mail.com');
    const [password, setPassword] = useState('123456');
    const [confirm, setConfirm] = useState('123456');

    const onSubmit = () => {
        if (password !== confirm) {
            Alert.alert('Помилка', 'Паролі не співпадають');
            return;
        }
        register(email, password, name);
        router.replace('/');
    };

    return (
        <View style={s.container}>
            <Text style={s.title}>Реєстрація</Text>

            <TextInput style={s.input} placeholder="Ім'я" value={name} onChangeText={setName} />
            <TextInput
                style={s.input}
                placeholder="Email"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={s.input}
                placeholder="Пароль"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={s.input}
                placeholder="Підтвердження паролю"
                secureTextEntry
                value={confirm}
                onChangeText={setConfirm}
            />

            <Pressable style={s.btn} onPress={onSubmit}>
                <Text style={s.btnText}>Зареєструватися</Text>
            </Pressable>

            <Link href="/login" style={s.link}>
                Вже є акаунт? Увійти
            </Link>
        </View>
    );
}

const s = StyleSheet.create({
    container: { flex: 1, padding: 16, justifyContent: 'center', backgroundColor: '#fff' },
    title: { fontSize: 28, fontWeight: '800', marginBottom: 18, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 12, marginBottom: 10 },
    btn: { backgroundColor: '#16a34a', padding: 12, borderRadius: 10, alignItems: 'center', marginTop: 6 },
    btnText: { color: '#fff', fontWeight: '800' },
    link: { marginTop: 12, textAlign: 'center', color: '#2563eb', fontWeight: '600' },
});