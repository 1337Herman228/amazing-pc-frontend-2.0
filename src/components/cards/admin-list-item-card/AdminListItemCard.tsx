"use client";

import React, { useState } from "react";
import "./AdminListItemCard.scss";
import { notification } from "antd";
import { Image } from "antd";
import Link from "next/link";
import { deleteImg } from "@/lib/functions";
import DeleteModal from "@/components/modals/delete-modal/DeleteModal";
import useFetch from "@/lib/hooks/useFetch";
import { IPart } from "@/interfaces/types-v2";
import PartInfoModal from "@/components/modals/info-modal/InfoModal";

interface AdminListItemCardProps {
    part: IPart;
    fetchParts: () => void;
}

const AdminListItemCard = ({ part, fetchParts }: AdminListItemCardProps) => {
    const { deletePart } = useFetch();

    const [api, contextHolder] = notification.useNotification();
    const succesDeleteNotification = () => {
        api["success"]({
            message: "Успешно",
            description: "Выбранная комплектующая успешно удалена.",
        });
    };
    const errorDeleteNotification = () => {
        api["error"]({
            message: "Ошибка",
            description: "Не удалось удалить выбранную комплектующую.",
        });
    };

    const [isModalOpen, setIsModalOpen] = useState([false, false]);

    const [partToDelete, setPartToDelete] = useState<IPart | null>(null);
    const [open, setOpen] = useState(false);
    const showModal = (partToDelete: IPart) => {
        setOpen(true);
        setPartToDelete(partToDelete);
    };
    const handleOk = () => {
        if (partToDelete) handleDeletePart(partToDelete);
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleDeletePart = async (part: IPart) => {
        try {
            await deletePart(part.id);
            deleteImg(part.name);
            succesDeleteNotification();
            setTimeout(() => {
                fetchParts();
            }, 1200);
        } catch (error) {
            errorDeleteNotification();
            console.error(error);
        }
    };

    const toggleModal = (idx: any, target: any) => {
        setIsModalOpen((p) => {
            p[idx] = target;
            return [...p];
        });
    };

    return (
        <li key={part.id} className="admin-list-item-card">
            {contextHolder}
            <Image
                className="admin-list-item-card__img"
                src={part.image}
                alt=""
                width={165}
                height={165}
            />
            <div className="card-content">
                <div className="card-content__header">
                    <h2 className="card-content__name">{part.name}</h2>
                    <div className="card-content__manage">
                        <button
                            onClick={() => toggleModal(1, true)}
                            className="card-content__manage-btn"
                        >
                            <img
                                className="light-img hover-img"
                                src="/info.svg"
                                alt="Подробнее"
                                width={30}
                                height={30}
                            />
                        </button>

                        <PartInfoModal
                            part={part}
                            isModalOpen={isModalOpen}
                            toggleModal={toggleModal}
                        />

                        <Link
                            href={`/admin/parts/edit/${part.id}`}
                            className="card-content__manage-btn"
                        >
                            <img
                                className="light-img hover-img"
                                src="/edit.svg"
                                alt="Редактировать"
                                width={30}
                                height={30}
                            />
                        </Link>

                        <button
                            onClick={() => showModal(part)}
                            className="card-content__manage-btn"
                        >
                            <img
                                className="hover-img"
                                src="/red-x-icon.svg"
                                alt="Удалить"
                                width={20}
                                height={20}
                            />
                        </button>
                    </div>
                </div>
                <div className="card-content__info">
                    <span className="card-content__label">Цена:</span>{" "}
                    {part.price} BYN
                </div>
                <div className="card-content__info">
                    <span className="card-content__label">Тип:</span>{" "}
                    {part.types.label}
                </div>
                <div className="card-content__info">
                    <span className="card-content__label">Категория:</span>{" "}
                    {part.categories.label}
                </div>
                <div className="card-content__info">
                    <span className="card-content__label">Раздел:</span>{" "}
                    {part.partitions.label}
                </div>
                {/* Сделать логику для кол-ва потом */}
                {/* <div className="card-content__info">
                    <span className="card-content__label">Осталось:</span>{" "}
                    {remainingQuantity} шт
                </div> */}
            </div>
            <DeleteModal
                open={open}
                handleOk={handleOk}
                handleCancel={handleCancel}
                message="Удалить данную комплектующую?"
            />
        </li>
    );
};

export default AdminListItemCard;
