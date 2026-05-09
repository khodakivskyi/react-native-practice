import React from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
    return (
        <Provider store={store}>
            <PersistGate
                persistor={persistor}
                loading={
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size="large" />
                    </View>
                }
            >
                <Stack>
                    <Stack.Screen name="index" options={{ title: "Каталог товарів" }} />
                    <Stack.Screen name="product/[id]" options={{ title: "Деталі товару" }} />
                    <Stack.Screen name="cart" options={{ title: "Кошик" }} />
                    <Stack.Screen name="checkout" options={{ title: "Оформлення" }} />
                    <Stack.Screen name="orders" options={{ title: "Історія замовлень" }} />
                </Stack>
            </PersistGate>
        </Provider>
    );
}