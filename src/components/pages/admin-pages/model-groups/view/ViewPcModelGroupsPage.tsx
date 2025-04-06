"use client";

import React, { useEffect, useState } from "react";
import "./ViewPcModelGroupsPage.scss";
import "@/components/modals/pc-spec-modal/PcSpecModal.scss";
import Link from "next/link";
import { notification } from "antd";
import AdminDashboard from "@/components/navbar/admin/admin-dashboard/AdminDashboard";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import DeleteModal from "@/components/modals/delete-modal/DeleteModal";
import { IPcModelGroup } from "@/interfaces/types-v2";
import useFetch from "@/lib/hooks/useFetch";
import { deleteImg } from "@/lib/functions";

const ViewPcModelGroupsPage = () => {
    const [api, contextHolder] = notification.useNotification();
    const succesDeleteNotification = () => {
        api["success"]({
            message: "Успешно",
            description: "Выбранная модельная группа ПК успешно удалена!",
        });
    };
    const errorDeleteNotification = () => {
        api["error"]({
            message: "Ошибка",
            description: "Не удалось удалить выбранную модельную группу ПК!",
        });
    };

    const { getPcModelGroups, deletePcModelGroup } = useFetch();

    const [pcModelGroups, setPcModelGroups] = useState<IPcModelGroup[] | null>(
        null
    );

    const fetchData = async () => {
        try {
            const data = await getPcModelGroups();
            setPcModelGroups(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (pcModelGroup: IPcModelGroup) => {
        try {
            await deletePcModelGroup(pcModelGroup.id);

            await Promise.all([
                deleteImg(
                    pcModelGroup.modelGroupImage
                        .replace("/uploads/", "")
                        .replace(".jpg", "")
                ),
                deleteImg(
                    pcModelGroup.designImage
                        .replace("/uploads/", "")
                        .replace(".jpg", "")
                ),
                deleteImg(
                    pcModelGroup.headerImage
                        .replace("/uploads/", "")
                        .replace(".jpg", "")
                ),
                deleteImg(
                    pcModelGroup.headerImageMobile
                        .replace("/uploads/", "")
                        .replace(".jpg", "")
                ),
                deleteImg(
                    pcModelGroup.performanceImage
                        .replace("/uploads/", "")
                        .replace(".jpg", "")
                ),
            ]);

            succesDeleteNotification();
            fetchData();
        } catch (error) {
            errorDeleteNotification();
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
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

    if (!pcModelGroups) return <LoadingPage />;

    return (
        <>
            {contextHolder}
            <AdminDashboard type="pc" />

            <div className="view-pc-model-groups container pt-100 mb-20">
                <table className="view-pc-model-groups__table modal-table">
                    <thead>
                        <tr className="modal-table__header">
                            <th
                                className="modal-table__header-text"
                                colSpan={7}
                            >
                                Модельные группы компьютеров
                            </th>
                        </tr>
                        <tr className="modal-table__row-names">
                            <th className="modal-table__row-names-cell">
                                Изображение
                            </th>
                            <th className="modal-table__row-names-cell">
                                Название
                            </th>
                            <th className="modal-table__row-names-cell">
                                Описание
                            </th>
                            <th className="modal-table__row-names-cell">Тип</th>
                            <th
                                className="modal-table__row-names-cell"
                                colSpan={3}
                            >
                                Категория
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pcModelGroups.map((item) => (
                            <Row
                                key={item.id}
                                modelGroup={item}
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
    modelGroup: IPcModelGroup;
    handleDelete: (pcModelGroup: IPcModelGroup) => void;
}

const Row = ({ modelGroup, handleDelete }: RowProps) => {
    const [open, setOpen] = useState(false);

    const handleOk = () => {
        handleDelete(modelGroup);
        setOpen(false);
    };

    return (
        <tr className="modal-table__row ">
            <td className="modal-table__row-info">
                <img
                    src={modelGroup.modelGroupImage}
                    alt={modelGroup.modelGroupName}
                    width={220}
                    height={220}
                    className="object-cover"
                />
            </td>
            <td className="modal-table__row-info !text-xl">
                {modelGroup.modelGroupName}
            </td>
            <td className="modal-table__row-info">
                {modelGroup.modelGroupDescription}
            </td>
            <td className="modal-table__row-info">
                {modelGroup.pcTypes.label}
            </td>
            <td className="modal-table__row-info">
                {modelGroup.pcCategories.label}
            </td>

            <td className="modal-table__row-info btn-30-td">
                <Link
                    href={`/admin/pc/model-groups-edit/${modelGroup.id}`}
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
                message="Удалить данную модельную группу ПК?"
            />
        </tr>
    );
};

export default ViewPcModelGroupsPage;
