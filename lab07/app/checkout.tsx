import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearCart } from "@/store/slices/cartSlice";
import { saveUser } from "@/store/slices/usersSlice";
import { addOrder } from "@/store/slices/ordersSlice";

export default function CheckoutScreen() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);
    const total = useAppSelector((state) => state.cart.total);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = () => {
        if (!fullName || !email || !phone || !address) {
            Alert.alert("Помилка", "Заповніть усі поля");
            return;
        }
        if (!email.includes("@")) {
            Alert.alert("Помилка", "Некоректний email");
            return;
        }
        if (Object.keys(cartItems).length === 0) {
            Alert.alert("Помилка", "Кошик порожній");
            return;
        }

        dispatch(saveUser({ fullName, email, phone, address }));

        dispatch(
            addOrder({
                id: Date.now().toString(),
                date: new Date().toISOString(),
                items: Object.values(cartItems),
                total
            })
        );

        dispatch(clearCart());

        Alert.alert("Успіх", "Замовлення оформлено!");
        router.replace("/orders");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Форма оформлення</Text>

            <TextInput
                placeholder="ПІБ"
                value={fullName}
                onChangeText={setFullName}
                style={styles.input}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                style={styles.input}
            />
            <TextInput
                placeholder="Телефон"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                style={styles.input}
            />
            <TextInput
                placeholder="Адреса"
                value={address}
                onChangeText={setAddress}
                style={styles.input}
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
                <Text style={styles.submitText}>Підтвердити</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, gap: 12 },
    title: { fontSize: 20, fontWeight: "700", marginBottom: 10 },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        borderRadius: 8
    },
    submitBtn: {
        backgroundColor: "#1e88e5",
        padding: 12,
        borderRadius: 8,
        alignItems: "center"
    },
    submitText: { color: "#fff", fontWeight: "700" }
});