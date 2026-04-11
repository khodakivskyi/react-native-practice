import React, { useMemo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { products } from '../../../data/products';

export default function DetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const product = useMemo(() => products.find((p) => p.id === String(id)), [id]);

    if (!product) {
        return (
            <View style={s.container}>
                <Text style={s.title}>Товар не знайдено</Text>
                <Text style={s.desc}>Спробуй повернутися назад і обрати інший товар.</Text>
            </View>
        );
    }

    return (
        <View style={s.container}>
            <Text>ID: {String(id)}</Text>
            <Image source={{ uri: product.image }} style={s.img} />
            <Text style={s.title}>{product.title}</Text>
            <Text style={s.price}>{product.price} грн</Text>
            <Text style={s.desc}>{product.description}</Text>
        </View>
    );
}

const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 16 },
    img: { width: '100%', height: 220, borderRadius: 14, backgroundColor: '#f3f4f6', marginBottom: 12 },
    title: { fontSize: 24, fontWeight: '900', color: '#111827' },
    price: { fontSize: 18, fontWeight: '900', color: '#2563eb', marginTop: 6, marginBottom: 10 },
    desc: { fontSize: 14, color: '#374151', lineHeight: 20 },
});