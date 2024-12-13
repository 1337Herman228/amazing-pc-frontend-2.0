import Link from "next/link";
import "./NavTree.scss";
import { useEffect } from "react";
import { NavTreeItem } from "../Configurator";

interface NavTreeProps {
    uniqueCategories: string[];
    allItems: NavTreeItem[];
}

const NavTree = ({ uniqueCategories, allItems }: NavTreeProps) => {
    useEffect(() => {
        window.addEventListener("scroll", dynamicSecondNavLinks);
        dynamicSecondNavLinks();

        return () => {
            window.removeEventListener("scroll", dynamicSecondNavLinks);
        };
    }, []);

    const dynamicSecondNavLinks = () => {
        var navbarLinks = document.querySelectorAll(
            ".tree-list__nav-list-item"
        );
        // var mobileNavbarLinks = document.querySelectorAll(".second-mobile-navbar__item");

        var blocks = document.querySelectorAll(
            ".managed-component-item"
        ) as any;

        var scrollPosition = window.scrollY || window.pageYOffset;

        for (var i = 0; i < blocks.length; i++) {
            var blockTop = blocks[i].offsetTop - 150;
            var blockBottom = blockTop + blocks[i].offsetHeight;

            if (scrollPosition >= blockTop && scrollPosition <= blockBottom) {
                navbarLinks[i].classList.add("active");
                // mobileNavbarLinks[i].classList.add("active");
            } else {
                navbarLinks[i].classList.remove("active");
                // mobileNavbarLinks[i].classList.remove("active");
            }
        }
    };

    const onCategoryClick = (e: any) => {
        const btn = e.target;
        const navList = btn.nextElementSibling;

        navList.style.paddingBlock = "10px";

        btn.classList.toggle("active");
        navList.classList.toggle("open");

        // navList.classList.contains('open') ? navList.style.paddingBlock='10px' : null;
        setTimeout(() => {
            navList.classList.contains("open")
                ? null
                : (navList.style.paddingBlock = "0px");
        }, 250);
    };

    return (
        <>
            <ul className="tree-list">
                {uniqueCategories.map((item) => (
                    <li key={item} className="tree-list__item">
                        <button
                            onClick={(e) => onCategoryClick(e)}
                            className="tree-list__item-open-btn active"
                        >
                            {item}
                        </button>
                        <ul className="tree-list__nav-list open">
                            {allItems
                                .filter((el) => el.category === item)
                                .map((item, index) => (
                                    <>
                                        <div
                                            key={item.name}
                                            className=" tree-list__nav-list-decoration-border"
                                        />
                                        <Link
                                            key={index}
                                            href={`#${item.name}`}
                                            className="tree-list__nav-list-item"
                                        >
                                            <img
                                                className="tree-list__nav-list-item-icon"
                                                src={item.icon}
                                                width={20}
                                                height={20}
                                                alt=""
                                                loading="lazy"
                                            />
                                            <span className="tree-list__nav-list-item-name">
                                                {item.name}
                                            </span>
                                        </Link>
                                    </>
                                ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default NavTree;
