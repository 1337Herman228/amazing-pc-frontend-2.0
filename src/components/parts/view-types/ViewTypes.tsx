"use client";

import React, { useEffect, useState } from "react";
import "./ViewTypes.scss";
import "@/components/modals/pc-spec-modal/PcSpecModal.scss";
import Link from "next/link";
import { notification } from "antd";
import { deleteSvgIcon } from "@/lib/functions";
import AdminDashboard from "@/components/navbar/admin/admin-dashboard/AdminDashboard";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import DeleteModal from "@/components/modals/delete-modal/DeleteModal";
import useFetch from "@/lib/hooks/useFetch";
import { IType } from "@/interfaces/types";

const ViewTypes = () => {
    const [api, contextHolder] = notification.useNotification();
    const succesDeleteNotification = () => {
        api["success"]({
            message: "Успешно",
            description: "Выбранный тип комплектующей успешно удален.",
        });
    };
    const errorDeleteNotification = () => {
        api["error"]({
            message: "Ошибка",
            description: "Не удалось удалить выбранный тип комплектующей.",
        });
    };

    const { getTypes, deleteType, isLoading } = useFetch();

    const [types, setTypes] = useState<IType[]>([]);
    const [typeToDelete, setTypeToDelete] = useState<IType | null>(null);

    const [open, setOpen] = useState(false);
    const showModal = (typeToDelete: IType) => {
        setOpen(true);
        setTypeToDelete(typeToDelete);
    };

    const handleOk = () => {
        if (!typeToDelete) return;
        handleDeleteType(typeToDelete);
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetchTypes();
    }, []);

    const fetchTypes = async () => {
        try {
            const data = await getTypes();
            setTypes(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteType = async (type: IType) => {
        try {
            await deleteType(type.typeId);
            deleteSvgIcon(type?.typeName);
            succesDeleteNotification();
            fetchTypes();
        } catch (error) {
            errorDeleteNotification();
            console.error(error);
        }
    };

    return (
        <>
            {contextHolder}
            <AdminDashboard type="parts" />
            {isLoading ? (
                <LoadingPage />
            ) : (
                <div className="view-types container pt-100">
                    <table className="view-types__table modal-table">
                        <thead>
                            <tr className="modal-table__header">
                                <th
                                    className="modal-table__header-text"
                                    colSpan={5}
                                >
                                    Типы комплектующих
                                </th>
                            </tr>
                            <tr className="modal-table__row-names">
                                <th className="modal-table__row-names-cell">
                                    typeImage
                                </th>
                                <th className="modal-table__row-names-cell">
                                    typeName
                                </th>
                                <th
                                    className="modal-table__row-names-cell"
                                    colSpan={3}
                                >
                                    alternativeTypeName
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {types.map((type) => (
                                <>
                                    <tr
                                        key={type.typeId}
                                        className="modal-table__row"
                                    >
                                        <td className="modal-table__row-info">
                                            <img
                                                className="type-svg-icon"
                                                src={type.typeImage}
                                                width={30}
                                                height={30}
                                                alt=""
                                                loading="lazy"
                                            />
                                        </td>
                                        <td className="modal-table__row-info">
                                            {type.typeName}
                                        </td>
                                        <td className="modal-table__row-info">
                                            {type.alternativeName}
                                        </td>

                                        <td className="modal-table__row-info btn-30-td">
                                            <Link
                                                href={`/admin/parts/types-edit/${type.typeId}`}
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
                                            <button
                                                onClick={() => showModal(type)}
                                                className="manage-btn"
                                            >
                                                <img
                                                    className="hover-img"
                                                    src="/red-x-icon.svg"
                                                    alt="Удалить"
                                                    width={20}
                                                    height={20}
                                                />
                                            </button>
                                        </td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                    <DeleteModal
                        open={open}
                        handleOk={handleOk}
                        handleCancel={handleCancel}
                        message="Удалить данный тип комплектующих?"
                    />
                </div>
            )}
        </>
    );
};

export default ViewTypes;
