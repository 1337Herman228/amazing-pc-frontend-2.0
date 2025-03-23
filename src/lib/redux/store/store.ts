"use client";

import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import cartSlice from "./slices/cartSlice";
import sessionSlice from "./slices/sessionSlice";
import configuratorSlice from "./slices/configuratorSlice";
import compareSlice from "./slices/compareSlice";

export const makeStore = () =>
    configureStore({
        reducer: {
            cart: cartSlice,
            session: sessionSlice,
            configurator: configuratorSlice,
            compare: compareSlice,
        },
    });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
