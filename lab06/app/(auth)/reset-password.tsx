import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function ResetPasswordScreen() {
    const { resetPassword } = useAuth();
    const [email, setEmail] = useState('');

    const onReset = async () => {
        try {
            await resetPassword(email);
            Alert.alert('Готово', 'Лист для зміни паролю надіслано');
        } catch (error: any) {
            Alert.alert('Помилка', error?.message ?? 'Не вдалося надіслати лист');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Відновлення паролю</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <Button title="Надіслати" onPress={onReset} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, flex: 1, justifyContent: 'center', gap: 12 },
    title: { fontSize: 24, fontWeight: '600', textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8 }
});