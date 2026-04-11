import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { products } from '../../data/products';
import { useAuth } from '../../context/AuthContext';

export default function CatalogScreen() {
    const { logout, userName } = useAuth();

    return (
        <View style={s.container}>
            <View style={s.header}>
                <Text style={s.hello}>Привіт, {userName ?? 'Користувач'}</Text>
                <Pressable style={s.logoutBtn} onPress={logout}>
                    <Text style={s.logoutText}>Вийти</Text>
                </Pressable>
            </View>


            <FlatList
                data={products}
                keyExtractor={(p) => p.id}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <Link href={`/details/${item.id}`} asChild>
                        <Pressable style={s.card}>
                            <Image source={{ uri: item.image }} style={s.img} />
                            <View style={{ flex: 1 }}>
                                <Text style={s.title}>{item.title}</Text>
                                <Text style={s.price}>{item.price} грн</Text>
                            </View>
                        </Pressable>
                    </Link>
                )}
            />
        </View>
    );
}

const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 12 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
    hello: { fontSize: 16, fontWeight: '700', color: '#111827' },
    logoutBtn: { backgroundColor: '#dc2626', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10 },
    logoutText: { color: '#fff', fontWeight: '800' },

    card: {
        flexDirection: 'row',
        gap: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 12,
        marginBottom: 10,
        alignItems: 'center',
    },
    img: { width: 80, height: 60, borderRadius: 10, backgroundColor: '#f3f4f6' },
    title: { fontSize: 16, fontWeight: '800', color: '#111827' },
    price: { marginTop: 4, fontSize: 14, color: '#2563eb', fontWeight: '800' },
});