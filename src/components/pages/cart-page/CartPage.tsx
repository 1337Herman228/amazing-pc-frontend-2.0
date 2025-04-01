"use client";

import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import { IPurchaseItem } from "@/interfaces/types-v2";
import useFetch from "@/lib/hooks/useFetch";
import { useEffect, useState } from "react";
import "./CartPage.scss";
import CartTableItem from "./CartTableItem";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store/store";
import { setCartState } from "@/lib/redux/store/slices/cartSlice";
import { useRouter } from "next/navigation";

const CartPage = () => {
    const [cartItems, setCartItems] = useState<IPurchaseItem[] | null>(null);
    const cart = useAppSelector((state) => state.cart);

    const { getUserCartItems } = useFetch();
    const { push } = useRouter();

    const dispatch = useAppDispatch();

    useEffect(() => {
        fetchCartItems();
        styleBody();

        return () => {
            unstyleBody();
        };
    }, []);

    const fetchCartItems = async () => {
        const data: IPurchaseItem[] = await getUserCartItems();
        setCartItems(data);
        dispatch(setCartState(data));
    };

    const styleBody = () => {
        document.body.style.backgroundColor = "var(--tm-color-dark-black-2)";
    };
    const unstyleBody = () => {
        document.body.style.backgroundColor = "var(--background-main-color)";
    };

    const isLoading = !cartItems;

    if (isLoading) return <LoadingPage />;

    return (
        <section className="cart container section">
            <h1 className="cart__main-title">Корзина</h1>
            {cartItems.length === 0 ? (
                <div className="cart-is-empty">Ваша корзина пуста</div>
            ) : (
                <table className="cart__products-table">
                    <thead className="cart__products-table-header hidden-tablet">
                        <tr className="table-row-header">
                            <th
                                className="table-row-header__cell text-align-left"
                                colSpan={2}
                            >
                                Товар
                            </th>
                            <th className="table-row-header__cell text-align-center">
                                Количество
                            </th>
                            <th className="table-row-header__cell text-align-center">
                                Цена
                            </th>
                            <th className="table-row-header__cell"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {cartItems.map((item, i) => (
                            <CartTableItem
                                key={i}
                                item={item}
                                fetchCartItems={fetchCartItems}
                            />
                        ))}
                    </tbody>
                </table>
            )}

            {cartItems.length > 0 && (
                <div className="flex flex-col justify-center place-items-center mt-10">
                    <div className="mb-4 text-xl">
                        Итого:{" "}
                        <span className="main-color">
                            {cart.items?.reduce(
                                (a, b) => a + b.product.price * b.quantity,
                                0
                            )}{" "}
                            BYN
                        </span>
                    </div>
                    <button
                        onClick={() => push("/cart/checkout")}
                        className="main-color-submit-btn text-black deal-btn"
                    >
                        Оформить заказ
                    </button>
                </div>
            )}
        </section>
    );
};

export default CartPage;
