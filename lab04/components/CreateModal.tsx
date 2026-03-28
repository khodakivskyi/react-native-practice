import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

type Props = {
    visible: boolean;
    mode: 'folder' | 'file';
    onClose: () => void;
    onCreate: (name: string, content?: string) => void;
};

export function CreateModal({ visible, mode, onClose, onCreate }: Props) {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    const submit = () => {
        if (!name.trim()) return;
        onCreate(name.trim(), mode === 'file' ? content : undefined);
        setName('');
        setContent('');
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={s.backdrop}>
                <View style={s.card}>
                    <Text style={s.title}>{mode === 'folder' ? 'Нова папка' : 'Новий .txt файл'}</Text>
                    <TextInput
                        style={s.input}
                        placeholder={mode === 'folder' ? 'Назва папки' : 'Назва файлу (без .txt або з .txt)'}
                        value={name}
                        onChangeText={setName}
                    />
                    {mode === 'file' && (
                        <TextInput
                            style={[s.input, { height: 100, textAlignVertical: 'top' }]}
                            multiline
                            placeholder="Початковий вміст"
                            value={content}
                            onChangeText={setContent}
                        />
                    )}
                    <View style={s.row}>
                        <Pressable style={[s.btn, s.gray]} onPress={onClose}>
                            <Text>Скасувати</Text>
                        </Pressable>
                        <Pressable style={[s.btn, s.blue]} onPress={submit}>
                            <Text style={{ color: '#fff' }}>Створити</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const s = StyleSheet.create({
    backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'center', padding: 16 },
    card: { backgroundColor: '#fff', borderRadius: 12, padding: 14 },
    title: { fontSize: 18, fontWeight: '700', marginBottom: 10 },
    input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, marginBottom: 10 },
    row: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8 },
    btn: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8 },
    gray: { backgroundColor: '#eee' },
    blue: { backgroundColor: '#2563eb' },
});