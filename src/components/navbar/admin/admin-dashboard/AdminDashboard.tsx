// @ts-nocheck
"use client";

import Link from "next/link";
import "./AdminDashboard.scss";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const data = {
    parts: [
        {
            id: 1,
            title: "Просмотр комплектующих",
            link: "/admin/parts/view",
        },
        {
            id: 2,
            title: "Добавить комплектующую",
            link: "/admin/parts/add",
        },
        {
            id: 3,
            title: "Просмотр типов",
            link: "/admin/parts/types-view",
        },
        {
            id: 4,
            title: "Добавить тип",
            link: "/admin/parts/types-add",
        },
        {
            id: 5,
            title: "Просмотр разделов",
            link: "/admin/parts/partition-view",
        },
        {
            id: 6,
            title: "Добавить раздел",
            link: "/admin/parts/partition-add",
        },
    ],
    accounts: [
        {
            id: 1,
            title: "Просмотр уч.записей",
            link: "/admin/accounts/view",
        },
        {
            id: 2,
            title: "Добавить уч.запись",
            link: "/admin/accounts/add",
        },
    ],
    pc: [
        {
            id: 1,
            title: "Модельные группы ПК",
            link: "/admin/pc/model-groups-view",
        },
        {
            id: 2,
            title: "Добавить модельные группы ПК",
            link: "/admin/pc/model-groups-add",
        },
        {
            id: 3,
            title: "Категории ПК",
            link: "/admin/pc/categories-view",
        },
        {
            id: 4,
            title: "Добавить категорию ПК",
            link: "/admin/pc/categories-add",
        },
        {
            id: 5,
            title: "Типы ПК",
            link: "/admin/pc/types-view",
        },
        {
            id: 6,
            title: "Добавить тип ПК",
            link: "/admin/pc/types-add",
        },
    ],
};

const AdminDashboard = ({ type }) => {
    const pathname = usePathname();
    useEffect(() => {
        markCurrentLink(pathname);
    }, [pathname]);

    const markCurrentLink = (currentUrl) => {
        const links = document.querySelectorAll(".dashboard-link-to-check");

        for (var i = 0; i < links.length; i++) {
            links[i].classList.remove("current-link");

            if (
                links[i]
                    .getAttribute("href")
                    .includes(
                        "/" +
                            currentUrl.split("/")[1] +
                            "/" +
                            currentUrl.split("/")[2] +
                            "/" +
                            currentUrl.split("/")[3]
                    )
            ) {
                links[i].classList.add("current-link");
            }
        }
    };

    const links = data[type];

    return (
        <header className="admin-dashboard-header">
            <div className="admin-dashboard container">
                <ul className="dashboard-list">
                    {links.map((link) => (
                        <Link
                            className="dashboard-list__link dashboard-link-to-check"
                            href={link.link}
                            key={link.id}
                        >
                            {link.title}
                        </Link>
                    ))}
                </ul>
            </div>
        </header>
    );
};

export default AdminDashboard;
