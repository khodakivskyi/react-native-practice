import React from "react";
import { useLocalSearchParams, Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";

export default function ProductDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const product = useAppSelector((state) =>
        state.products.items.find((p) => p.id === id)
    );
    const dispatch = useAppDispatch();

    if (!product) {
        return (
            <View style={styles.container}>
                <Text>Товар не знайдено</Text>
                <Link href="/" style={styles.back}>Назад</Link>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.desc}>{product.description}</Text>
            <Text style={styles.price}>{product.price} ₴</Text>

            <TouchableOpacity
                style={styles.addBtn}
                onPress={() => dispatch(addToCart(product))}
            >
                <Text style={styles.addBtnText}>Додати до кошика</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, gap: 12 },
    image: { width: "100%", height: 220, borderRadius: 12 },
    title: { fontSize: 22, fontWeight: "700" },
    desc: { fontSize: 16, color: "#666" },
    price: { fontSize: 20, fontWeight: "700" },
    addBtn: {
        backgroundColor: "#1e88e5",
        padding: 12,
        borderRadius: 8,
        alignItems: "center"
    },
    addBtnText: { color: "#fff", fontWeight: "700" },
    back: { marginTop: 10 }
});