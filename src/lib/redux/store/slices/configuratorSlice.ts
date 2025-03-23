"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
    hasErrors: boolean;
}

const initialState: IInitialState = {
    hasErrors: false,
};

export const configuratorSlice = createSlice({
    name: "configurator",
    initialState,
    reducers: {
        setHasErrors: (state, action: PayloadAction<boolean>) => {
            state.hasErrors = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setHasErrors } = configuratorSlice.actions;

export default configuratorSlice.reducer;
