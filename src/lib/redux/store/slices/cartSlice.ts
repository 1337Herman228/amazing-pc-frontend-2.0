"use client";

import { createSlice } from "@reduxjs/toolkit";

interface IinitialState {

}

const initialState = {
    items: [
        {
            id: 22,
            partition: "24″",
            name: "Dell Alienware AW2523HF",
            price: 800,
            img: "/components/monitor/dell-alienware-aw2523hf-314x177.jpg",
            category: "Переферия",
            title: "Монитор",
            quantity: 1,
        },
        {
            id: 31,
            partition: "27″",
            name: "LG UltraGear 27GR75Q",
            price: 400,
            img: "/components/monitor/lg-ultragear-27gr75q-b-314x177.jpg",
            category: "Переферия",
            title: "Монитор",
            quantity: 1,
        },
        {
            id: 21,
            partition: "24″",
            name: "LG UltraGear 24GN65R",
            price: 300,
            img: "/components/monitor/lg-ultragear-24gn65r-b-314x177.jpg",
            category: "Переферия",
            title: "Монитор",
            quantity: 1,
        },
        {
            id: 12,
            partition: "Razer",
            name: "Razer Viper",
            price: 230,
            img: "/components/mouse/razer-basilisk-v2.jpg",
            category: "Переферия",
            title: "Мышь",
            quantity: 1,
        },
        {
            name: "Конфигурация",
            id: "6d8e5ce0-17b4-4266-a837-7e0d6bd13d4b",
            price: 8500,
            isPc: true,
            isConfiguration: true,
            img: "/components/case/no-case.jpg",
            gpu: {
                id: 11,
                partition: "RTX 4060",
                name: "Palit GeForce RTX 4060 Ti Dual [8GB, 4352 CUDA]",
                price: "3000",
                img: "/components/gpu/palit-rtx-4060-ti-dual.png",
                category: "Комплектующие",
                title: "Видеокарта",
            },
            cpu: {
                id: 11,
                partition: "Intel Core 12th",
                name: "Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер]",
                price: "1500",
                img: "/components/cpu/intel-core-i5-12th.jpg",
                category: "Комплектующие",
                title: "Процессор",
            },
            motherboard: {
                id: 11,
                partition: "Intel B760",
                name: "MSI PRO B760M-A [DDR4, Wi-Fi]",
                price: "400",
                img: "/components/mb/msi-pro-b760m-awifi-314x177.jpg",
                category: "Комплектующие",
                title: "Материнская плата",
            },
            cpu_fan: {
                id: 11,
                partition: "Asus",
                name: "ASUS ROG RYUO III 360 White",
                price: "450",
                img: "/components/cpu-fan/asus-rog-ryuo-iii-360-argb-white-314x177.jpg",
                category: "Комплектующие",
                title: "Охлаждение",
            },
            ram: {
                id: 11,
                partition: "16 ГБ",
                name: "16GB Kingston FURY Beast RGB [DDR4, 3600MHz, 2x8GB]",
                price: "220",
                img: "/components/ram/kingston-fury-beast-ddr4-rgb-2x-314x177.jpg",
                category: "Комплектующие",
                title: "Оперативная память",
            },
            power_supply: {
                id: 11,
                partition: "От 500W",
                name: "550W DeepCool PK550D [80+ Bronze]",
                price: "160",
                img: "/components/pow-sup/deepcool-pk550d-314x177.jpg",
                category: "Комплектующие",
                title: "Блок питания",
            },
            quantity: 1,
        },
    ],

    // loading:false,
    // error:false,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        getCartItems: (state) => {
            //TODO: получение данных из БД
        },
        addCartItem: (state, action) => {
            state.items = state.items.concat(action.payload);
        },
        deleteCartItem: (state, action) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
        },
        // changeItemQuantity: (state, action) => {
        //     state.items.find((item) => item.id === action.payload.id).quantity =
        //         action.payload.quantity;
        // },
    },
});

// Action creators are generated for each case reducer function
export const { getCartItems, addCartItem, deleteCartItem, 
    // changeItemQuantity 
} =
    cartSlice.actions;

export default cartSlice.reducer;
