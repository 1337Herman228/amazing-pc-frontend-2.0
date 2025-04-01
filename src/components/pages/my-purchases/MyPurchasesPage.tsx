"use client";

import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import { IPurchase } from "@/interfaces/types-v2";
import useFetch from "@/lib/hooks/useFetch";
import { useEffect, useState } from "react";
import "./MyPurchasesPage.scss";
import { getPurchaseStatusLabel } from "@/lib/functions";
import DeleteModal from "@/components/modals/delete-modal/DeleteModal";
import ViewPurchaseModal from "./modal/ViewPurchaseModal";

const MyPurchasesPage = () => {
    const [purchases, setPurchases] = useState<IPurchase[]>();
    const { getPurchases } = useFetch();

    const fetchPurchases = async () => {
        const data = await getPurchases();
        setPurchases(data);
    };

    useEffect(() => {
        fetchPurchases();

        styleBody();

        return () => {
            unstyleBody();
        };
    }, []);

    const styleBody = () => {
        document.body.style.backgroundColor = "var(--tm-color-dark-black-2)";
    };
    const unstyleBody = () => {
        document.body.style.backgroundColor = "var(--background-main-color)";
    };

    if (!purchases) return <LoadingPage />;

    return (
        <section className="my-purchases container section">
            <h1 className="my-purchases__main-title">Ваши заказы</h1>
            {purchases.length === 0 ? (
                <div className="my-purchases-is-empty">
                    Вы еще не делали заказов
                </div>
            ) : (
                <table className="my-purchases__products-table xl:min-w-[1000px] md:min-w-[800px] min-w-[600px]">
                    <thead className="my-purchases__products-table-header ">
                        <tr className="table-row-header">
                            <th className="table-row-header__cell text-align-left">
                                Дата оформления
                            </th>
                            <th className="table-row-header__cell text-align-left">
                                Адрес доставки
                            </th>
                            <th className="table-row-header__cell text-align-left">
                                Заказ
                            </th>
                            <th className="table-row-header__cell text-align-left">
                                Статус
                            </th>
                            <th className="table-row-header__cell text-align-left">
                                Сумма
                            </th>
                            <th className="table-row-header__cell"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {purchases.map((purchase) => (
                            <TableItem
                                key={purchase.id}
                                purchase={purchase}
                                fetchPurchases={fetchPurchases}
                            />
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
};

interface TableItemProps {
    purchase: IPurchase;
    fetchPurchases: () => void;
}

const TableItem = ({ purchase, fetchPurchases }: TableItemProps) => {
    const { cancelPurchase } = useFetch();

    const [openViewItems, setOpenViewItems] = useState(false);

    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = async () => {
        await cancelPurchase(purchase.id);
        setOpen(false);
        fetchPurchases();
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <tr className="product-item-row ">
            <td className="product-item-row__cell">
                {new Date(purchase.date).toLocaleDateString("ru-RU", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                })}
            </td>
            <td className="product-item-row__cell">{purchase.destination}</td>
            <td className="product-item-row__cell">
                <button
                    onClick={() => setOpenViewItems(true)}
                    className="button-transparent-white !rounded-none p-2 !text-sm cursor-pointer"
                >
                    Просмотреть
                </button>
            </td>
            <td className="product-item-row__cell">
                {getPurchaseStatusLabel(purchase.status)}
            </td>
            <td className="product-item-row__cell">
                {purchase.itemList.reduce((acc, item) => {
                    return (acc += item.quantity * item.product.price);
                }, 0)}{" "}
                BYN
            </td>

            <td className="product-item-row__cell del-btn ">
                {purchase.status === "CREATED" && (
                    <>
                        <button onClick={showModal} className="btn-delete ">
                            <img
                                src="/red-x-icon.svg"
                                alt=""
                                width={20}
                                height={20}
                            />
                        </button>
                        <DeleteModal
                            open={open}
                            handleCancel={handleCancel}
                            handleOk={handleOk}
                            message="Отменить данный заказ?"
                        />
                    </>
                )}
            </td>

            <ViewPurchaseModal
                open={openViewItems}
                handleCancel={() => setOpenViewItems(false)}
                purchase={purchase}
            />
        </tr>
    );
};

export default MyPurchasesPage;
