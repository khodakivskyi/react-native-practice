import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import usersReducer from "./slices/usersSlice";
import ordersReducer from "./slices/ordersSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    users: usersReducer,
    orders: ordersReducer
});

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["cart", "users", "orders"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;