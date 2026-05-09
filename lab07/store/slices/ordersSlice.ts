import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "./cartSlice";

type Order = {
    id: string;
    date: string;
    items: CartItem[];
    total: number;
};

type OrdersState = {
    items: Order[];
};

const initialState: OrdersState = {
    items: []
};

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        addOrder(state, action: PayloadAction<Order>) {
            state.items.unshift(action.payload);
        }
    }
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;