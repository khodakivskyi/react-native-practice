import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "./productsSlice";

export type CartItem = {
    product: Product;
    quantity: number;
};

type CartState = {
    items: Record<string, CartItem>;
    total: number;
};

const initialState: CartState = {
    items: {},
    total: 0
};

const calcTotal = (items: Record<string, CartItem>) =>
    Object.values(items).reduce((sum, i) => sum + i.quantity * i.product.price, 0);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<Product>) {
            const product = action.payload;
            const existing = state.items[product.id];
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items[product.id] = { product, quantity: 1 };
            }
            state.total = calcTotal(state.items);
        },
        incrementQty(state, action: PayloadAction<string>) {
            const id = action.payload;
            if (state.items[id]) {
                state.items[id].quantity += 1;
            }
            state.total = calcTotal(state.items);
        },
        decrementQty(state, action: PayloadAction<string>) {
            const id = action.payload;
            if (state.items[id]) {
                state.items[id].quantity -= 1;
                if (state.items[id].quantity <= 0) {
                    delete state.items[id];
                }
            }
            state.total = calcTotal(state.items);
        },
        removeFromCart(state, action: PayloadAction<string>) {
            delete state.items[action.payload];
            state.total = calcTotal(state.items);
        },
        clearCart(state) {
            state.items = {};
            state.total = 0;
        }
    }
});

export const { addToCart, incrementQty, decrementQty, removeFromCart, clearCart } =
    cartSlice.actions;

export default cartSlice.reducer;