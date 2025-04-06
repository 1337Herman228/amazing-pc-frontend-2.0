"use client";

import React, { useEffect, useState } from "react";
import "./ViewPcCategoriesPage.scss";
import "@/components/modals/pc-spec-modal/PcSpecModal.scss";
import Link from "next/link";
import { notification } from "antd";
import AdminDashboard from "@/components/navbar/admin/admin-dashboard/AdminDashboard";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import DeleteModal from "@/components/modals/delete-modal/DeleteModal";
import useFetch from "@/lib/hooks/useFetch";
import { IPcCategory, IType } from "@/interfaces/types-v2";

const ViewPcCategoriesPage = () => {
    const [api, contextHolder] = notification.useNotification();
    const succesDeleteNotification = () => {
        api["success"]({
            message: "Успешно",
            description: "Выбранная категория ПК успешно удалена!",
        });
    };
    const errorDeleteNotification = () => {
        api["error"]({
            message: "Ошибка",
            description: "Не удалось удалить выбранную категорию ПК!",
        });
    };

    const { getPcCategories, deletePcCategory } = useFetch();

    const [pcCategories, setPcCategories] = useState<IPcCategory[] | null>(
        null
    );

    const fetchData = async () => {
        try {
            const data = await getPcCategories();
            setPcCategories(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deletePcCategory(id);
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

    if (!pcCategories) return <LoadingPage />;

    return (
        <>
            {contextHolder}
            <AdminDashboard type="pc" />

            <div className="view-pc-categories container pt-100">
                <table className="view-pc-categories__table modal-table">
                    <thead>
                        <tr className="modal-table__header">
                            <th
                                className="modal-table__header-text"
                                colSpan={5}
                            >
                                Категории компьютеров
                            </th>
                        </tr>
                        <tr className="modal-table__row-names">
                            <th className="modal-table__row-names-cell">
                                Значение
                            </th>
                            <th className="modal-table__row-names-cell">
                                Название
                            </th>
                            <th
                                className="modal-table__row-names-cell"
                                colSpan={2}
                            >
                                Описание
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pcCategories.map((item) => (
                            <Row
                                key={item.id}
                                category={item}
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
    category: IPcCategory;
    handleDelete: (id: string) => void;
}

const Row = ({ category, handleDelete }: RowProps) => {
    const [open, setOpen] = useState(false);

    const handleOk = () => {
        handleDelete(category.id);
        setOpen(false);
    };

    return (
        <tr className="modal-table__row">
            <td className="modal-table__row-info">{category.value}</td>
            <td className="modal-table__row-info">{category.label}</td>
            <td className="modal-table__row-info">{category.description}</td>

            <td className="modal-table__row-info btn-30-td">
                <Link
                    href={`/admin/pc/categories-edit/${category.id}`}
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
                message="Удалить данную категорию ПК?"
            />
        </tr>
    );
};

export default ViewPcCategoriesPage;
