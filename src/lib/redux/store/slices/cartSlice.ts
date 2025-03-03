"use client";

import { IPurchaseItem } from "@/interfaces/types-v2";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
    items: IPurchaseItem[] | null;
}

const initialState: IInitialState = {
    items: null,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartState: (state, action: PayloadAction<IPurchaseItem[]>) => {
            state.items = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setCartState } = cartSlice.actions;

export default cartSlice.reducer;
