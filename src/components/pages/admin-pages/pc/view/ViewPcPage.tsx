"use client";

import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import DeleteModal from "@/components/modals/delete-modal/DeleteModal";
import AdminDashboard from "@/components/navbar/admin/admin-dashboard/AdminDashboard";
import { IPc } from "@/interfaces/types-v2";
import { deleteImg, mapPcToConfiguratorFieldValues } from "@/lib/functions";
import useFetch from "@/lib/hooks/useFetch";
import { notification } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./ViewPcPage.scss";
import "@/components/modals/pc-spec-modal/PcSpecModal.scss";
import PcSpecModal from "@/components/modals/pc-spec-modal/PcSpecModal";

const ViewPcPage = () => {
    const { getAllPc, deletePc } = useFetch();

    const [api, contextHolder] = notification.useNotification();
    const succesDeleteNotification = () => {
        api["success"]({
            message: "Успешно",
            description: "Выбранный компьютер успешно удален!",
        });
    };
    const errorDeleteNotification = () => {
        api["error"]({
            message: "Ошибка",
            description: "Не удалось удалить выбранный компьютер!",
        });
    };

    const [allPc, setAllPc] = useState<IPc[] | null>(null);

    const fetchData = async () => {
        try {
            const data = await getAllPc();
            setAllPc(data);
        } catch (error) {
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

    const handleDelete = async (pc: IPc) => {
        try {
            await deletePc(pc.id);
            await deleteImg(
                pc.image.replace("/uploads/", "").replace(".jpg", "")
            );
            succesDeleteNotification();
            fetchData();
        } catch (error) {
            errorDeleteNotification();
            console.error(error);
        }
    };

    if (!allPc) return <LoadingPage />;

    return (
        <>
            {contextHolder}
            <AdminDashboard type="pc" />

            <div className="view-sellable-pc container pt-100 mb-20">
                <table className="view-sellable-pc__table modal-table">
                    <thead>
                        <tr className="modal-table__header">
                            <th
                                className="modal-table__header-text"
                                colSpan={8}
                            >
                                Компьютеры
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
                                Семейство
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
                        {allPc.map((item) => (
                            <Row
                                key={item.id}
                                pc={item}
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
    pc: IPc;
    handleDelete: (pc: IPc) => void;
}

const Row = ({ pc, handleDelete }: RowProps) => {
    const [isModalOpen, setIsModalOpen] = useState([false, false]);
    const toggleModal = (idx: any, target: any) => {
        setIsModalOpen((p) => {
            p[idx] = target;
            return [...p];
        });
    };

    const [open, setOpen] = useState(false);

    const handleOk = () => {
        handleDelete(pc);
        setOpen(false);
    };

    return (
        <tr className="modal-table__row ">
            <td className="modal-table__row-info">
                <img
                    src={pc.image}
                    alt={pc.name}
                    width={220}
                    height={220}
                    className="object-cover"
                />
            </td>
            <td className="modal-table__row-info">
                <div className="flex place-items-center gap-2.5 flex-wrap">
                    <div className="leading-7 shrink-0 !text-2xl w-fit max-w-fit">
                        {pc.name}
                    </div>

                    <PcSpecModal
                        product={mapPcToConfiguratorFieldValues(pc as IPc)}
                        isModalOpen={isModalOpen}
                        toggleModal={toggleModal}
                    />

                    <button
                        onClick={() => toggleModal(1, true)}
                        className="card-content__manage-btn shrink-0"
                    >
                        <img
                            className="invert-95 hover:opacity-65 transition-all cursor-pointer"
                            src="/info.svg"
                            alt="Подробнее"
                            width={30}
                            height={30}
                        />
                    </button>
                </div>
            </td>
            <td className="modal-table__row-info !text-2xl">
                {pc.pcModelGroup.modelGroupName}
            </td>
            <td className="modal-table__row-info max-w-[400px] description">
                {pc.description}
            </td>
            <td className="modal-table__row-info">
                {pc?.pcType?.label || "-"}
            </td>
            <td className="modal-table__row-info max-w-[170px]">
                {pc?.pcCategories?.label || "-"}
            </td>

            <td className="modal-table__row-info btn-30-td">
                <Link
                    href={`/admin/pc/pc-edit/${pc.id}`}
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
                message="Удалить данный компьютер?"
            />
        </tr>
    );
};

export default ViewPcPage;
