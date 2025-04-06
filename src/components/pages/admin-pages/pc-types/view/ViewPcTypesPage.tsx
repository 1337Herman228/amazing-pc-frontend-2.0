"use client";

import React, { useEffect, useState } from "react";
import "./ViewPcTypesPage.scss";
import "@/components/modals/pc-spec-modal/PcSpecModal.scss";
import Link from "next/link";
import { notification } from "antd";
import AdminDashboard from "@/components/navbar/admin/admin-dashboard/AdminDashboard";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import DeleteModal from "@/components/modals/delete-modal/DeleteModal";
import useFetch from "@/lib/hooks/useFetch";
import { IPcType } from "@/interfaces/types-v2";

const ViewPcTypesPage = () => {
    const [api, contextHolder] = notification.useNotification();
    const succesDeleteNotification = () => {
        api["success"]({
            message: "Успешно",
            description: "Выбранный тип ПК успешно удален!",
        });
    };
    const errorDeleteNotification = () => {
        api["error"]({
            message: "Ошибка",
            description: "Не удалось удалить выбранный тип ПК!",
        });
    };

    const { getPcTypes, deletePcType } = useFetch();

    const [pcTypes, setPcTypes] = useState<IPcType[] | null>(null);

    const fetchData = async () => {
        try {
            const data = await getPcTypes();
            setPcTypes(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deletePcType(id);
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

    if (!pcTypes) return <LoadingPage />;

    return (
        <>
            {contextHolder}
            <AdminDashboard type="pc" />

            <div className="view-pc-types container pt-100">
                <table className="view-pc-types__table modal-table">
                    <thead>
                        <tr className="modal-table__header">
                            <th
                                className="modal-table__header-text"
                                colSpan={5}
                            >
                                Типы компьютеров
                            </th>
                        </tr>
                        <tr className="modal-table__row-names">
                            <th className="modal-table__row-names-cell">
                                Значение
                            </th>
                            <th
                                className="modal-table__row-names-cell"
                                colSpan={3}
                            >
                                Название
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pcTypes.map((item) => (
                            <Row
                                key={item.id}
                                type={item}
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
    type: IPcType;
    handleDelete: (id: string) => void;
}

const Row = ({ type, handleDelete }: RowProps) => {
    const [open, setOpen] = useState(false);

    const handleOk = () => {
        handleDelete(type.id);
        setOpen(false);
    };

    return (
        <tr className="modal-table__row">
            <td className="modal-table__row-info">{type.value}</td>
            <td className="modal-table__row-info">{type.label}</td>

            <td className="modal-table__row-info btn-30-td">
                <Link
                    href={`/admin/pc/types-edit/${type.id}`}
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
                message="Удалить данный тип ПК?"
            />
        </tr>
    );
};

export default ViewPcTypesPage;
