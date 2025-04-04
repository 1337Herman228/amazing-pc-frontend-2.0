"use client";

import { CompareItem } from "@/interfaces/types-v2";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICompareInitialState {
    compareItemsQuantity: number;
    compareItems: CompareItem[];
}

const initialState: ICompareInitialState = {
    compareItemsQuantity: 0,
    compareItems: [],
};

export const compareSlice = createSlice({
    name: "compare",
    initialState,
    reducers: {
        setCompareState: (state, action: PayloadAction<number>) => {
            state.compareItemsQuantity = action.payload;
        },
        setCompareItems: (state, action: PayloadAction<CompareItem[]>) => {
            state.compareItems = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setCompareState, setCompareItems } = compareSlice.actions;

export default compareSlice.reducer;
