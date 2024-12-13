"use client";

import Link from "next/link";
import "./UserNavbar.scss";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CartWindow from "@/components/modals/cart-window/CartWindow";
import { useAppSelector } from "@/lib/redux/store/store";
import useFetch from "@/lib/hooks/useFetch";

export default function UserNavbar() {
    const [isCartWindowOpen, setIsCartWindowOpen] = useState(false);
    const [cartProductCount, setCartProductCount] = useState(0);

    const [cartItems, setCartItems] = useState([]);
    const { getUserCartItems } = useFetch();
    useEffect(() => {
        fetchCartItems();
    }, [isCartWindowOpen]);
    const fetchCartItems = async () => {
        const data = await getUserCartItems();
        setCartItems(data);
    };
    console.log(cartItems);

    const cart_items = useAppSelector((state) => state.cart);
    useEffect(() => {
        setCartProductCount(cart_items.items?.length);
    }, [cart_items]);

    const openModal = () => {
        const dialog: any = document.getElementById("mobileOverlay");
        dialog && dialog.showModal();
    };

    const pathname = usePathname();
    useEffect(() => {
        markCurrentLink(pathname);
    }, [pathname]);

    const markCurrentLink = (currentUrl: string | null) => {
        const links: any = document.querySelectorAll(".link-to-check");

        for (var i = 0; i < links.length; i++) {
            links[i].classList.remove("current-link");
            const url = "http://localhost:3000" + currentUrl;

            if (url.includes(links[i].href)) {
                links[i].classList.add("current-link");
            }
        }
    };

    return (
        <>
            <header className="header">
                <div className="header__inner container">
                    <Link className="header__logo logo link-to-check" href="/">
                        {/* <img 
                    className="logo__img" 
                    src="/logo.svg"
                    alt="Amazing PC" 
                    width={60} 
                    height={60} 
                    loading="lazy"
                /> */}
                        <span className="logo__text uppercase-text">
                            Amazing PC
                        </span>
                    </Link>

                    <nav className="header__menu hidden-mobile">
                        <ul className="header__menu-list">
                            <li className="header__menu-item">
                                <Link
                                    className="header__menu-link link-to-check uppercase-text"
                                    href="/gaming-pc"
                                >
                                    Игровые ПК
                                </Link>
                            </li>
                            <li className="header__menu-item">
                                <Link
                                    className="header__menu-link link-to-check uppercase-text"
                                    href="/notebook"
                                >
                                    Ноутбуки
                                </Link>
                            </li>
                            <li className="header__menu-item">
                                <Link
                                    className="header__menu-link link-to-check uppercase-text"
                                    href="/workstation"
                                >
                                    Рабочие станции
                                </Link>
                            </li>
                            <li className="header__menu-item">
                                <Link
                                    className="header__menu-link link-to-check uppercase-text"
                                    href="/configurator"
                                >
                                    Конфигуратор
                                </Link>
                            </li>
                            <li className="header__menu-item">
                                <Link
                                    className="header__menu-link link-to-check uppercase-text"
                                    href="/assistance"
                                >
                                    Услуги
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <nav className="header__side-button-menu-list">
                        <button className="header__side-button-menu-btn">
                            <img
                                className="btn-icon"
                                src="/search-icon.svg"
                                alt="Search"
                                width={22}
                                height={22}
                                loading="lazy"
                            />
                        </button>
                        <button
                            className="header__side-button-menu-btn btn--count-mark"
                            data-custom="0"
                        >
                            <img
                                className="btn-icon"
                                src="/compare-icon-nav.svg"
                                alt="Compare"
                                width={22}
                                height={22}
                                loading="lazy"
                            />
                        </button>
                        <button
                            className={`header__side-button-menu-btn ${
                                cartProductCount > 0 && "btn--count-mark"
                            }`}
                            data-custom={cartProductCount}
                            onClick={() =>
                                setIsCartWindowOpen(!isCartWindowOpen)
                            }
                        >
                            <img
                                className="btn-icon"
                                src="/cart-icon.svg"
                                alt="Cart"
                                width={22}
                                height={22}
                                loading="lazy"
                            />
                        </button>

                        <CartWindow
                            isCartWindowOpen={isCartWindowOpen}
                            setIsCartWindowOpen={setIsCartWindowOpen}
                        />

                        <button
                            onClick={openModal}
                            className="button__burger-menu burger-button visible-mobile"
                        >
                            <span className="visually-hidden">
                                Open navigation menu
                            </span>
                        </button>
                    </nav>
                </div>
            </header>

            <dialog
                className="mobile-overlay visible-mobile"
                id="mobileOverlay"
            >
                <form
                    className="mobile-overlay__close-button-wrapper"
                    method="dialog"
                >
                    <button
                        type="submit"
                        className="mobile-overlay__close-button cross-button"
                    >
                        <span className="visually-hidden">
                            Close navigation menu
                        </span>
                    </button>
                </form>
                <div className="mobile-overlay__body">
                    <ul className="mobile-overlay__list">
                        <li className="mobile-overlay__item">
                            <Link
                                className="mobile-overlay__link uppercase-text"
                                href="/gaming-pc"
                            >
                                Игровые ПК
                            </Link>
                        </li>
                        <li className="mobile-overlay__item">
                            <Link
                                className="mobile-overlay__link uppercase-text"
                                href="/notebook"
                            >
                                Ноутбуки
                            </Link>
                        </li>
                        <li className="mobile-overlay__item">
                            <Link
                                className="mobile-overlay__link uppercase-text"
                                href="/workstation"
                            >
                                Рабочие станции
                            </Link>
                        </li>
                        <li className="mobile-overlay__item">
                            <Link
                                className="mobile-overlay__link uppercase-text"
                                href="/configurator"
                            >
                                Конфигуратор
                            </Link>
                        </li>
                        <li className="mobile-overlay__item">
                            <Link
                                className="mobile-overlay__link uppercase-text"
                                href="/assistance"
                            >
                                Услуги
                            </Link>
                        </li>
                    </ul>
                </div>
            </dialog>
        </>
    );
}
