import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { decrementQty, incrementQty, removeFromCart } from "@/store/slices/cartSlice";
import { Link } from "expo-router";

export default function CartScreen() {
    const cartItems = useAppSelector((state) => state.cart.items);
    const total = useAppSelector((state) => state.cart.total);
    const dispatch = useAppDispatch();

    const itemsArray = Object.values(cartItems);

    return (
        <View style={styles.container}>
            <FlatList
                data={itemsArray}
                keyExtractor={(item) => item.product.id}
                ListEmptyComponent={<Text>Кошик порожній</Text>}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.title}>{item.product.name}</Text>
                            <Text>Кількість: {item.quantity}</Text>
                            <Text>Сума: {item.quantity * item.product.price} ₴</Text>
                        </View>
                        <View style={styles.actions}>
                            <TouchableOpacity onPress={() => dispatch(incrementQty(item.product.id))}>
                                <Text style={styles.actionBtn}>+</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => dispatch(decrementQty(item.product.id))}>
                                <Text style={styles.actionBtn}>-</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => dispatch(removeFromCart(item.product.id))}>
                                <Text style={styles.removeBtn}>Видалити</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            <View style={styles.footer}>
                <Text style={styles.total}>Загальна сума: {total} ₴</Text>
                <Link href="/checkout" style={styles.checkoutBtn}>
                    Оформити замовлення
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    row: {
        padding: 12,
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 10,
        marginBottom: 12,
        flexDirection: "row",
        gap: 10
    },
    title: { fontSize: 16, fontWeight: "700" },
    actions: { justifyContent: "space-between", alignItems: "center" },
    actionBtn: { fontSize: 20, paddingHorizontal: 10, paddingVertical: 4 },
    removeBtn: { color: "red", marginTop: 6 },
    footer: { marginTop: 10, gap: 10 },
    total: { fontSize: 18, fontWeight: "700" },
    checkoutBtn: {
        backgroundColor: "#1e88e5",
        color: "#fff",
        textAlign: "center",
        padding: 12,
        borderRadius: 8
    }
});