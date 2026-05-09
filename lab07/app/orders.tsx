import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "@/store/hooks";

export default function OrdersScreen() {
    const orders = useAppSelector((state) => state.orders.items);

    return (
        <View style={styles.container}>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Text>Історія порожня</Text>}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.date}>Дата: {new Date(item.date).toLocaleString()}</Text>
                        <Text style={styles.total}>Сума: {item.total} ₴</Text>
                        <Text style={styles.itemsTitle}>Товари:</Text>
                        {item.items.map((ci) => (
                            <Text key={ci.product.id}>
                                • {ci.product.name} x {ci.quantity}
                            </Text>
                        ))}
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    card: {
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 10,
        padding: 12,
        marginBottom: 12
    },
    date: { fontWeight: "700" },
    total: { marginTop: 6, fontWeight: "700" },
    itemsTitle: { marginTop: 6 }
});