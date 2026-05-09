import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
    fullName: string;
    email: string;
    phone: string;
    address: string;
};

const initialState: UserState = {
    fullName: "",
    email: "",
    phone: "",
    address: ""
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        saveUser(state, action: PayloadAction<UserState>) {
            return action.payload;
        }
    }
});

export const { saveUser } = usersSlice.actions;
export default usersSlice.reducer;