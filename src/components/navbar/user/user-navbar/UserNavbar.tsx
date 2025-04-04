"use client";

import Link from "next/link";
import "./UserNavbar.scss";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CartWindow from "@/components/modals/cart-window/CartWindow";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store/store";
import useFetch from "@/lib/hooks/useFetch";
import { IPurchaseItem } from "@/interfaces/types-v2";
import { setCartState } from "@/lib/redux/store/slices/cartSlice";
import { useRouter } from "next/navigation";
import { setCompareState } from "@/lib/redux/store/slices/compareSlice";
import useAddCompareItem from "@/components/pages/configurator/form-list-item/form-list-item-card/handleAddCompareItem";

export default function UserNavbar() {
    const [isCartWindowOpen, setIsCartWindowOpen] = useState(false);

    const { getUserCartItems } = useFetch();

    const cart = useAppSelector((state) => state.cart);
    const compare = useAppSelector((state) => state.compare);
    const dispatch = useAppDispatch();

    const { fetchCompareItemsCount, fetchCompareItems } = useAddCompareItem();

    useEffect(() => {
        fetchCartItems();
        fetchCompareItemsCount();
        fetchCompareItems();
    }, []);

    const fetchCartItems = async () => {
        const data: IPurchaseItem[] = await getUserCartItems();
        dispatch(setCartState(data));
    };

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

    const router = useRouter();

    return (
        <>
            <header className="header">
                <div className="header__inner container">
                    <Link className="header__logo logo link-to-check" href="/">
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
                                    href="/catalog"
                                >
                                    Комплектующие
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <nav className="header__side-button-menu-list">
                        {/* <button className="header__side-button-menu-btn">
                            <img
                                className="btn-icon"
                                src="/search-icon.svg"
                                alt="Search"
                                width={26}
                                height={26}
                                loading="lazy"
                            />
                        </button> */}
                        <button
                            className={`header__side-button-menu-btn text-gray-800 text- ${
                                compare?.compareItems &&
                                compare.compareItemsQuantity > 0 &&
                                "btn--count-mark"
                            }`}
                            data-custom={compare?.compareItemsQuantity}
                            onClick={() => router.push("/compare")}
                        >
                            <img
                                className="btn-icon"
                                src="/compare-icon-nav.svg"
                                alt="Compare"
                                width={26}
                                height={26}
                                loading="lazy"
                            />
                        </button>
                        <button
                            className={`header__side-button-menu-btn text-gray-800 text- ${
                                cart?.items &&
                                cart.items.length > 0 &&
                                "btn--count-mark"
                            }`}
                            data-custom={cart?.items?.length}
                            onClick={() =>
                                setIsCartWindowOpen(!isCartWindowOpen)
                            }
                        >
                            <img
                                className="btn-icon"
                                src="/cart-icon.svg"
                                alt="Cart"
                                width={24}
                                height={24}
                                loading="lazy"
                            />
                        </button>

                        <CartWindow
                            isCartWindowOpen={isCartWindowOpen}
                            setIsCartWindowOpen={setIsCartWindowOpen}
                            cartItems={cart.items}
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
                    </ul>
                </div>
            </dialog>
        </>
    );
}
