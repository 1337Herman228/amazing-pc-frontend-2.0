import Link from "next/link";
import "./PcSecondNavbar.scss";
import { useEffect, useState } from "react";

const PcSecondNavbar = ({ productName }: { productName: string }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", dynamicSecondNavLinks);
        dynamicSecondNavLinks();

        return () => {
            window.removeEventListener("scroll", dynamicSecondNavLinks);
        };
    }, []);

    const dynamicSecondNavLinks = () => {
        var navbarLinks = document.querySelectorAll(".nav-list__item");
        var mobileNavbarLinks = document.querySelectorAll(
            ".second-mobile-navbar__item"
        );

        var blocks = [
            document.getElementById("start"),
            document.getElementById("design"),
            document.getElementById("performance"),
            document.getElementById("kits-and-prices"),
        ];

        var scrollPosition = window.scrollY || window.pageYOffset;

        for (var i = 0; i < blocks.length; i++) {
            var blockTop = blocks[i]!.offsetTop - 85; // blocks[i]?.offsetTop - 85

            var blockBottom = blockTop + blocks[i]!.offsetHeight - 10;

            if (scrollPosition >= blockTop && scrollPosition <= blockBottom) {
                navbarLinks[i]?.classList.add("active");
                mobileNavbarLinks[i]?.classList.add("active");
            } else {
                navbarLinks[i]?.classList.remove("active");
                mobileNavbarLinks[i]?.classList.remove("active");
            }
        }
    };

    return (
        <header className="second-header">
            <nav className="second-navbar container">
                <Link href="#start" className="second-navbar__title">
                    {productName}
                </Link>
                <ul className="nav-list hidden-mobile">
                    <Link href="#start" className="nav-list__item">
                        Представление
                    </Link>

                    <Link href="#preview" className="nav-list__item">
                        Обзор
                    </Link>
                    <Link href="#performance" className="nav-list__item">
                        Производительность
                    </Link>
                    <Link href="#kits-and-prices" className="nav-list__item">
                        Комплектация и цены
                    </Link>
                </ul>
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={
                        isMenuOpen
                            ? `second-navbar__button visible-mobile second-navbar__button--pressed`
                            : `second-navbar__button visible-mobile `
                    }
                >
                    <img
                        className="second-navbar__button-img"
                        src="/arrow-down.svg"
                    />
                </button>
            </nav>
            <ul
                className={
                    isMenuOpen
                        ? `second-mobile-navbar visible-mobile second-mobile-navbar--open`
                        : `second-mobile-navbar visible-mobile second-mobile-navbar--close`
                }
            >
                <Link href="#start" className="second-mobile-navbar__item">
                    Представление
                </Link>
                <Link href="#design" className="second-mobile-navbar__item">
                    Дизайн
                </Link>
                <Link href="#preview" className="second-mobile-navbar__item">
                    Обзор
                </Link>
                <Link
                    href="#performance"
                    className="second-mobile-navbar__item"
                >
                    Производительность
                </Link>
                <Link
                    href="#kits-and-prices"
                    className="second-mobile-navbar__item"
                >
                    Комплектация и цены
                </Link>
            </ul>
        </header>
    );
};
export default PcSecondNavbar;
