import React, { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import { useAuth, UserProfile } from '../../context/AuthContext';

export default function ProfileScreen() {
    const { profile, updateProfile, logout, deleteAccount } = useAuth();
    const [form, setForm] = useState<UserProfile>({
        name: '',
        age: '',
        city: ''
    });

    const [passwordForDelete, setPasswordForDelete] = useState('');

    useEffect(() => {
        if (profile) setForm(profile);
    }, [profile]);

    const onSave = async () => {
        try {
            await updateProfile(form);
            Alert.alert('Готово', 'Профіль збережено');
        } catch (error: any) {
            Alert.alert('Помилка', error?.message ?? 'Не вдалося оновити профіль');
        }
    };

    const onDelete = async () => {
        if (!passwordForDelete.trim()) {
            Alert.alert('Потрібен пароль', 'Введи пароль для підтвердження');
            return;
        }

        Alert.alert('Підтвердження', 'Видалити акаунт?', [
            { text: 'Скасувати', style: 'cancel' },
            {
                text: 'Видалити',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await deleteAccount(passwordForDelete);
                    } catch (error: any) {
                        Alert.alert('Помилка', error?.message ?? 'Не вдалося видалити акаунт');
                    }
                }
            }
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Профіль</Text>

            <TextInput
                style={styles.input}
                placeholder="Ім'я"
                value={form.name}
                onChangeText={(name) => setForm((prev) => ({ ...prev, name }))}
            />
            <TextInput
                style={styles.input}
                placeholder="Вік"
                keyboardType="numeric"
                value={form.age}
                onChangeText={(age) => setForm((prev) => ({ ...prev, age }))}
            />
            <TextInput
                style={styles.input}
                placeholder="Місто"
                value={form.city}
                onChangeText={(city) => setForm((prev) => ({ ...prev, city }))}
            />

            <Button title="Зберегти" onPress={onSave} />
            <View style={styles.separator} />
            <Button title="Вийти" onPress={logout} />

            <View style={styles.deleteBlock}>
                <Text style={styles.deleteTitle}>Видалити акаунт</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Пароль для підтвердження"
                    secureTextEntry
                    value={passwordForDelete}
                    onChangeText={setPasswordForDelete}
                />
                <Button title="Видалити акаунт" color="#d33" onPress={onDelete} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, flex: 1, justifyContent: 'center', gap: 12 },
    title: { fontSize: 24, fontWeight: '600', textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8 },
    separator: { height: 10 },
    deleteBlock: { marginTop: 24, gap: 10 },
    deleteTitle: { fontSize: 16, fontWeight: '600', color: '#d33' }
});