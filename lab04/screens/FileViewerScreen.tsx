import React, { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'FileViewer'>;

export function FileViewerScreen({ route }: Props) {
    const { fileUri, fileName } = route.params;
    const [text, setText] = useState('');

    useEffect(() => {
        (async () => {
            const content = await FileSystem.readAsStringAsync(fileUri);
            setText(content);
        })();
    }, [fileUri]);

    const save = async () => {
        try {
            await FileSystem.writeAsStringAsync(fileUri, text);
            Alert.alert('Успіх', `Файл "${fileName}" збережено`);
        } catch {
            Alert.alert('Помилка', 'Не вдалося зберегти файл');
        }
    };

    return (
        <View style={s.container}>
        <Text style={s.label}>Файл: {fileName}</Text>
    <TextInput style={s.editor} multiline value={text} onChangeText={setText} />
    <Pressable style={s.saveBtn} onPress={save}>
    <Text style={{ color: '#fff', fontWeight: '700' }}>Зберегти</Text>
    </Pressable>
    </View>);
}

const s = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    label: { marginBottom: 8, color: '#374151' },
    editor: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 12,
        textAlignVertical: 'top',
        marginBottom: 12,
    },
    saveBtn: { backgroundColor: '#16a34a', borderRadius: 10, padding: 12, alignItems: 'center' },
});