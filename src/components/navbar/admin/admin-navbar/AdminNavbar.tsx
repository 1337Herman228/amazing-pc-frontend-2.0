"use client";

import Link from "next/link";
import "../../user/user-navbar/UserNavbar.scss";
import "./AdminNavbar.scss";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AdminNavbar() {
    const openModal = () => {
        const dialog = document.getElementById(
            "mobileOverlay"
        ) as HTMLDialogElement;
        dialog?.showModal();
    };

    const pathname = usePathname();
    useEffect(() => {
        if (pathname) markCurrentLink(pathname);
    }, [pathname]);

    const markCurrentLink = (currentUrl: string) => {
        const links = document.querySelectorAll(".link-to-check");

        for (var i = 0; i < links.length; i++) {
            links[i].classList.remove("current-link");

            if (
                links[i]
                    .getAttribute("href")
                    ?.includes(
                        "/" +
                            currentUrl.split("/")[1] +
                            "/" +
                            currentUrl.split("/")[2]
                    )
            ) {
                links[i].classList.add("current-link");
            }
        }
    };

    return (
        <>
            <header className="admin-navbar-header">
                <div className="header__inner container">
                    <Link
                        className="header__logo logo link-to-check"
                        href="/admin"
                    >
                        <span className="logo__text uppercase-text">
                            Main Page
                        </span>
                    </Link>

                    <nav className="header__menu hidden-mobile">
                        <ul className="header__menu-list">
                            <li className="header__menu-item">
                                <Link
                                    className="header__menu-link link-to-check uppercase-text"
                                    href="/admin/parts/view"
                                >
                                    Комплектующие
                                </Link>
                            </li>
                            <li className="header__menu-item">
                                <Link
                                    className="header__menu-link link-to-check uppercase-text"
                                    href="/admin/pc"
                                >
                                    ПК
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <nav className="header__side-button-menu-list">
                        <Link
                            className="header__menu-link uppercase-text"
                            href="/sign-in"
                        >
                            Выйти
                        </Link>
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
                        {/* <li className="mobile-overlay__item">
                    <Link className="mobile-overlay__link uppercase-text" href="/gaming-pc">Игровые ПК</Link>
                </li>
                <li className="mobile-overlay__item">
                    <Link className="mobile-overlay__link uppercase-text" href="/notebook">Ноутбуки</Link>
                </li>
                <li className="mobile-overlay__item">
                    <Link className="mobile-overlay__link uppercase-text" href="/workstation">Рабочие станции</Link>
                </li>
                <li className="mobile-overlay__item">
                    <Link className="mobile-overlay__link uppercase-text" href="/configurator">Конфигуратор</Link>
                </li>
                <li className="mobile-overlay__item">
                    <Link className="mobile-overlay__link uppercase-text" href="/assistance">Услуги</Link>
                </li> */}
                    </ul>
                </div>
            </dialog>
        </>
    );
}
