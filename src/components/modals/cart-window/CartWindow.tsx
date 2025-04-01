"use client";

import Link from "next/link";
import "./CartWindow.scss";
import { useCallback, useEffect } from "react";
import { signOut } from "next-auth/react";
import { IPurchaseItem } from "@/interfaces/types-v2";

interface CartWindowProps {
    isCartWindowOpen: boolean;
    setIsCartWindowOpen: (value: boolean) => void;
    cartItems: IPurchaseItem[] | null;
}

const CartWindow = ({
    isCartWindowOpen,
    setIsCartWindowOpen,
    cartItems,
}: CartWindowProps) => {
    useEffect(() => {
        document.addEventListener("click", addClickOutOfWindowListener);
        return () => {
            document.removeEventListener("click", addClickOutOfWindowListener);
        };
    }, [isCartWindowOpen]);

    const addClickOutOfWindowListener = useCallback(
        (event: any) => {
            if (isCartWindowOpen) {
                const block = document.querySelector("._cart-window");
                if (!block?.contains(event.target)) {
                    setIsCartWindowOpen(false);
                }
            }
        },
        [isCartWindowOpen]
    );

    return (
        <div className={`_cart-window ${isCartWindowOpen ? "open" : ""}`}>
            <div className="close-btn-container">
                <button className="close-btn">
                    <img
                        className="close-btn--icon"
                        src="/configurator-svg/close.svg"
                        alt="close"
                        width={20}
                        height={20}
                        onClick={() => setIsCartWindowOpen(false)}
                    />
                </button>
            </div>
            <div className="_cart-window__inner">
                <ul className="cart-list">
                    {cartItems && cartItems.length > 0 ? (
                        cartItems.map((item, i) => (
                            <Link
                                key={i}
                                href="/cart"
                                className="cart-list__item"
                            >
                                <img
                                    className="cart-list__item-img"
                                    src={item.product.image}
                                    alt=""
                                    width={100}
                                    height={100}
                                />
                                <div className="cart-list__item-name">
                                    {item.product.name}
                                </div>
                            </Link>
                        ))
                    ) : (
                        <span className="cart-list__empty-text">
                            В корзине пока ничего нет...
                        </span>
                    )}
                </ul>
                <Link
                    onClick={() => setIsCartWindowOpen(false)}
                    className="to-cart-link green-filled-link"
                    href="/cart"
                >
                    Перейти в корзину
                </Link>
                <Link
                    className="_cart-window__inner-link"
                    href="/my-configurations"
                >
                    Мои конфигурации
                </Link>
                <Link className="_cart-window__inner-link" href="/my-purchases">
                    Мои заказы
                </Link>
                <Link
                    onClick={() => signOut()}
                    className="_cart-window__inner-link"
                    href=""
                >
                    Выйти
                </Link>
            </div>
        </div>
    );
};

export default CartWindow;
