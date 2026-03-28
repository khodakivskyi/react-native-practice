import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { formatBytes, formatDate } from '../utils/fileHelpers';

type Props = {
    visible: boolean;
    onClose: () => void;
    data: {
        name: string;
        type: string;
        size?: number;
        modificationTime?: number;
    } | null;
};

export function InfoModal({ visible, onClose, data }: Props) {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={s.backdrop}>
                <View style={s.card}>
                    <Text style={s.title}>Інформація про файл</Text>
                    {data ? (
                        <>
                            <Text>Назва: {data.name}</Text>
                            <Text>Тип: {data.type}</Text>
                            <Text>Розмір: {formatBytes(data.size ?? 0)}</Text>
                            <Text>Остання модифікація: {formatDate(data.modificationTime)}</Text>
                        </>
                    ) : (
                        <Text>Немає даних</Text>
                    )}
                    <Pressable style={s.btn} onPress={onClose}>
                        <Text style={{ color: '#fff' }}>Закрити</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const s = StyleSheet.create({
    backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'center', padding: 16 },
    card: { backgroundColor: '#fff', borderRadius: 12, padding: 14, gap: 6 },
    title: { fontSize: 18, fontWeight: '700', marginBottom: 6 },
    btn: { marginTop: 12, backgroundColor: '#2563eb', borderRadius: 8, padding: 10, alignItems: 'center' },
});