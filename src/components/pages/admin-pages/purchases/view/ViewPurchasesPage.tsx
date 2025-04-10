"use client";

import { useEffect, useState } from "react";
import "./ViewPurchasesPage.scss";
import Link from "next/link";
import { notification } from "antd";
import AdminDashboard from "@/components/navbar/admin/admin-dashboard/AdminDashboard";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import DeleteModal from "@/components/modals/delete-modal/DeleteModal";
import useFetch from "@/lib/hooks/useFetch";
import { IPurchase } from "@/interfaces/types-v2";
import { getPurchaseStatusLabel } from "@/lib/functions";
import ViewPurchaseModal from "@/components/pages/my-purchases/modal/ViewPurchaseModal";

const ViewPurchasesPage = () => {
    const [api, contextHolder] = notification.useNotification();
    const succesDeleteNotification = () => {
        api["success"]({
            message: "Успешно",
            description: "Выбранный заказ успешно удален!",
        });
    };
    const errorDeleteNotification = () => {
        api["error"]({
            message: "Ошибка",
            description: "Не удалось удалить выбранный заказ!",
        });
    };

    const { getAllPurchases, deletePurchase } = useFetch();

    const [purchases, serPurchases] = useState<IPurchase[] | null>(null);

    const fetchData = async () => {
        try {
            const data = await getAllPurchases();
            serPurchases(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deletePurchase(id);
            succesDeleteNotification();
            fetchData();
        } catch (error) {
            errorDeleteNotification();
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!purchases) return <LoadingPage />;

    return (
        <>
            {contextHolder}
            <AdminDashboard type="purchases" />

            <div className="view-purchases container pt-100">
                <table className="view-purchases__table modal-table ">
                    <thead>
                        <tr className="modal-table__header">
                            <th
                                className="modal-table__header-text"
                                colSpan={8}
                            >
                                Заказы
                            </th>
                        </tr>
                        <tr className="modal-table__row-names">
                            <th className="modal-table__row-names-cell">
                                Покупатель
                            </th>
                            <th className="modal-table__row-names-cell">
                                Дата заказа
                            </th>
                            <th className="modal-table__row-names-cell">
                                Адрес
                            </th>
                            <th className="modal-table__row-names-cell">
                                Список товаров
                            </th>
                            <th className="modal-table__row-names-cell">
                                Статус
                            </th>
                            <th className="modal-table__row-names-cell"></th>
                            <th className="modal-table__row-names-cell"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchases.map((item) => (
                            <Row
                                key={item.id}
                                purchase={item}
                                handleDelete={handleDelete}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

interface RowProps {
    purchase: IPurchase;
    handleDelete: (id: string) => void;
}

const Row = ({ purchase, handleDelete }: RowProps) => {
    const [open, setOpen] = useState(false);
    const [openViewItems, setOpenViewItems] = useState(false);

    const handleOk = () => {
        handleDelete(purchase.id);
        setOpen(false);
    };

    return (
        <tr className="modal-table__row">
            <td className="modal-table__row-info">
                <div className="flex flex-col gap-1">
                    <div>
                        {purchase.user.name} {purchase.user.surname}
                    </div>
                    <div>{purchase.user.login}</div>
                    <div>{purchase.user.email}</div>
                    <div>{purchase.user.phone}</div>
                </div>
            </td>
            <td className="product-item-row__cell px-[10px]">
                {new Date(purchase.date).toLocaleDateString("ru-RU", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                })}
            </td>
            <td className="modal-table__row-info">{purchase.destination}</td>
            <td className="modal-table__row-info">
                <button
                    onClick={() => setOpenViewItems(true)}
                    className="button-transparent-white !rounded-none p-2 !text-sm cursor-pointer"
                >
                    Просмотреть
                </button>
            </td>
            <td className="product-item-row__cell px-[10px]">
                {getPurchaseStatusLabel(purchase.status)}
            </td>

            <td className="modal-table__row-info btn-30-td">
                <Link
                    href={`/admin/purchases/purchases-edit/${purchase.id}`}
                    className="manage-btn"
                >
                    <img
                        className="light-img hover-img"
                        src="/edit.svg"
                        alt="Редактировать"
                        width={30}
                        height={30}
                    />
                </Link>
            </td>
            <td className="modal-table__row-info btn-30-td">
                <button onClick={() => setOpen(true)} className="manage-btn">
                    <img
                        className="hover-img"
                        src="/red-x-icon.svg"
                        alt="Удалить"
                        width={20}
                        height={20}
                    />
                </button>
            </td>
            <DeleteModal
                open={open}
                handleOk={handleOk}
                handleCancel={() => setOpen(false)}
                message="Удалить данный заказ?"
            />
            <ViewPurchaseModal
                open={openViewItems}
                handleCancel={() => setOpenViewItems(false)}
                purchase={purchase}
            />
        </tr>
    );
};

export default ViewPurchasesPage;
