import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";

export default function CatalogScreen() {
    const products = useAppSelector((state) => state.products.items);
    const dispatch = useAppDispatch();

    return (
        <View style={styles.container}>
            <View style={styles.topActions}>
                <Link href="/cart" style={styles.linkBtn}>Кошик</Link>
                <Link href="/orders" style={styles.linkBtn}>Історія</Link>
            </View>

            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.title}>{item.name}</Text>
                            <Text style={styles.desc}>{item.description}</Text>
                            <Text style={styles.price}>{item.price} ₴</Text>
                            <View style={styles.row}>
                                <Link href={`/product/${item.id}`} style={styles.detailBtn}>
                                    Деталі
                                </Link>
                                <TouchableOpacity
                                    style={styles.addBtn}
                                    onPress={() => dispatch(addToCart(item))}
                                >
                                    <Text style={styles.addBtnText}>Додати до кошика</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    topActions: { flexDirection: "row", gap: 12, marginBottom: 12 },
    linkBtn: {
        backgroundColor: "#e3e3e3",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8
    },
    card: {
        flexDirection: "row",
        gap: 12,
        padding: 12,
        borderRadius: 12,
        backgroundColor: "#fff",
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#eee"
    },
    image: { width: 90, height: 90, borderRadius: 8 },
    title: { fontSize: 16, fontWeight: "700" },
    desc: { color: "#666", marginVertical: 6 },
    price: { fontSize: 16, fontWeight: "700" },
    row: { flexDirection: "row", gap: 10, marginTop: 8 },
    detailBtn: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        backgroundColor: "#eef",
        borderRadius: 6
    },
    addBtn: {
        backgroundColor: "#1e88e5",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6
    },
    addBtnText: { color: "#fff", fontWeight: "600" }
});