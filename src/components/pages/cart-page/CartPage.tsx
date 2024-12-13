"use client";

import useFetch from "@/lib/hooks/useFetch";
import { use, useEffect, useState } from "react";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);

    const { getUserCartItems } = useFetch();

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        const data = await getUserCartItems();
        setCartItems(data);
    };

    // console.log(cartItems);

    return <div></div>;
};

export default CartPage;
