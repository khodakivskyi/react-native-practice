import { createSlice } from "@reduxjs/toolkit";

export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
};

const initialState = {
    items: [
        {
            id: "1",
            name: "Навушники X1",
            description: "Бездротові навушники з шумозаглушенням",
            price: 1999,
            image: "https://picsum.photos/200/200?1"
        },
        {
            id: "2",
            name: "Смарт-годинник A2",
            description: "Фітнес-трекер з пульсометром",
            price: 2499,
            image: "https://picsum.photos/200/200?2"
        },
        {
            id: "3",
            name: "Портативна колонка S3",
            description: "Потужний звук у компактному корпусі",
            price: 1599,
            image: "https://picsum.photos/200/200?3"
        }
    ] as Product[]
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {}
});

export default productsSlice.reducer;