import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { CreateModal } from '../components/CreateModal';
import { InfoModal } from '../components/InfoModal';
import { formatBytes, getExtension, getNameFromUri } from '../utils/fileHelpers';

type Nav = NativeStackNavigationProp<RootStackParamList, 'FileManager'>;

type Item = {
    uri: string;
    name: string;
    isDirectory: boolean;
};

export function FileManagerScreen() {
    const navigation = useNavigation<Nav>();
    const root = FileSystem.documentDirectory ?? '';
    const [currentDir, setCurrentDir] = useState(root);
    const [items, setItems] = useState<Item[]>([]);
    const [createFolderVisible, setCreateFolderVisible] = useState(false);
    const [createFileVisible, setCreateFileVisible] = useState(false);
    const [infoVisible, setInfoVisible] = useState(false);
    const [infoData, setInfoData] = useState<any>(null);
    const [space, setSpace] = useState({ total: 0, free: 0, used: 0 });

    const canGoUp = useMemo(() => currentDir !== root, [currentDir, root]);

    const loadStats = useCallback(async () => {
        const total = await FileSystem.getTotalDiskCapacityAsync();
        const free = await FileSystem.getFreeDiskStorageAsync();
        setSpace({ total, free, used: total - free });
    }, []);

    const loadDir = useCallback(async (dir: string) => {
        try {
            const names = await FileSystem.readDirectoryAsync(dir);
            const list: Item[] = [];
            for (const name of names) {
                const uri = dir + name;
                const info = await FileSystem.getInfoAsync(uri);
                list.push({ uri, name, isDirectory: !!(info as any).isDirectory });
            }
            list.sort((a, b) => Number(b.isDirectory) - Number(a.isDirectory) || a.name.localeCompare(b.name));
            setItems(list);
            setCurrentDir(dir);
        } catch {
            Alert.alert('Помилка', 'Не вдалося зчитати директорію');
        }
    }, []);

    useEffect(() => {
        if (!root) return;
        loadDir(root).then();
        loadStats().then();
    }, [root, loadDir, loadStats]);

    const goUp = async () => {
        if (!canGoUp) return;
        const clean = currentDir.endsWith('/') ? currentDir.slice(0, -1) : currentDir;
        const parent = clean.substring(0, clean.lastIndexOf('/') + 1);
        await loadDir(parent || root);
    };

    const openItem = async (item: Item) => {
        if (item.isDirectory) {
            await loadDir(item.uri.endsWith('/') ? item.uri : item.uri + '/');
        } else if (item.name.toLowerCase().endsWith('.txt')) {
            navigation.navigate('FileViewer', { fileUri: item.uri, fileName: item.name });
        } else {
            Alert.alert('Інфо', 'Відкривати можна тільки .txt файли');
        }
    };

    const createFolder = async (name: string) => {
        try {
            const uri = currentDir + name + '/';
            await FileSystem.makeDirectoryAsync(uri, { intermediates: true });
            setCreateFolderVisible(false);
            await loadDir(currentDir);
        } catch {
            Alert.alert('Помилка', 'Не вдалося створити папку');
        }
    };

    const createFile = async (name: string, content = '') => {
        try {
            const fileName = name.toLowerCase().endsWith('.txt') ? name : `${name}.txt`;
            const uri = currentDir + fileName;
            await FileSystem.writeAsStringAsync(uri, content);
            setCreateFileVisible(false);
            await loadDir(currentDir);
        } catch {
            Alert.alert('Помилка', 'Не вдалося створити файл');
        }
    };

    const deleteItem = (item: Item) => {
        Alert.alert('Підтвердження', `Видалити "${item.name}"?`, [
            { text: 'Скасувати', style: 'cancel' },
            {
                text: 'Видалити',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await FileSystem.deleteAsync(item.uri, { idempotent: true });
                        await loadDir(currentDir);
                    } catch {
                        Alert.alert('Помилка', 'Не вдалося видалити');
                    }
                },
            },
        ]);
    };

    const showInfo = async (item: Item) => {
        const info = await FileSystem.getInfoAsync(item.uri, { size: true });
        setInfoData({
            name: item.name,
            type: item.isDirectory ? 'folder' : getExtension(item.name),
            size: (info as any).size ?? 0,
            modificationTime: (info as any).modificationTime ? (info as any).modificationTime * 1000 : undefined,
        });
        setInfoVisible(true);
    };

    return (
        <View style={s.container}>
            <Text style={s.path}>Поточний шлях: {currentDir}</Text>

            <View style={s.statsBox}>
                <Text>Всього: {formatBytes(space.total)}</Text>
                <Text>Вільно: {formatBytes(space.free)}</Text>
                <Text>Зайнято: {formatBytes(space.used)}</Text>
            </View>

            <View style={s.actions}>
                <Pressable style={s.btn} onPress={goUp} disabled={!canGoUp}>
                    <Text style={s.btnText}>⬆ Вгору</Text>
                </Pressable>
                <Pressable style={s.btn} onPress={() => setCreateFolderVisible(true)}>
                    <Text style={s.btnText}>+ Папка</Text>
                </Pressable>
                <Pressable style={s.btn} onPress={() => setCreateFileVisible(true)}>
                    <Text style={s.btnText}>+ Файл .txt</Text>
                </Pressable>
            </View>

            <FlatList
                data={items}
                keyExtractor={(i) => i.uri}
                renderItem={({ item }) => (
                    <View style={s.item}>
                        <Pressable style={{ flex: 1 }} onPress={() => openItem(item)}>
                            <Text style={s.itemTitle}>
                                {item.isDirectory ? '📁' : '📄'} {item.name || getNameFromUri(item.uri)}
                            </Text>
                        </Pressable>
                        <Pressable onPress={() => showInfo(item)} style={[s.smallBtn, { backgroundColor: '#eab308' }]}>
                            <Text style={s.smallText}>i</Text>
                        </Pressable>
                        <Pressable onPress={() => deleteItem(item)} style={[s.smallBtn, { backgroundColor: '#dc2626' }]}>
                            <Text style={s.smallText}>X</Text>
                        </Pressable>
                    </View>
                )}
                ListEmptyComponent={<Text style={{ textAlign: 'center', color: '#6b7280', marginTop: 20 }}>Папка порожня</Text>}
            />

            <CreateModal
                visible={createFolderVisible}
                mode="folder"
                onClose={() => setCreateFolderVisible(false)}
                onCreate={(name) => createFolder(name)}
            />
            <CreateModal
                visible={createFileVisible}
                mode="file"
                onClose={() => setCreateFileVisible(false)}
                onCreate={(name, content) => createFile(name, content)}
            />
            <InfoModal visible={infoVisible} onClose={() => setInfoVisible(false)} data={infoData} />
        </View>);
}

const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 12 },
    path: { fontSize: 12, color: '#374151', marginBottom: 8 },
    statsBox: { backgroundColor: '#f3f4f6', borderRadius: 10, padding: 10, marginBottom: 10, gap: 2 },
    actions: { flexDirection: 'row', gap: 8, marginBottom: 10 },
    btn: { backgroundColor: '#2563eb', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8 },
    btnText: { color: '#fff', fontWeight: '700' },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 10,
        padding: 10,
        marginBottom: 8,
        gap: 8,
    },
    itemTitle: { fontSize: 16, color: '#111827' },
    smallBtn: { width: 30, height: 30, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
    smallText: { color: '#fff', fontWeight: '700' },
});