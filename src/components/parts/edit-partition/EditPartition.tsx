"use client";

import { useEffect, useState } from "react";
import "../add-partition/AddPartition.scss";
import { notification } from "antd";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import AdminDashboard from "@/components/navbar/admin/admin-dashboard/AdminDashboard";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import CustomInput from "@/components/inputs/custom-input/CustomInput";
import useFetch from "@/lib/hooks/useFetch";
import { IPartitionFormFields } from "../add-partition/AddPartition";
import { IPartition } from "@/interfaces/types";

const EditPartition = () => {
    const [api, contextHolder] = notification.useNotification();
    const succesEditNotification = () => {
        api["success"]({
            message: "Успешно",
            description:
                "Изменения для раздела комплектующей успешно сохранены.",
        });
    };
    const errorEditNotification = () => {
        api["error"]({
            message: "Ошибка",
            description: "Не удается применить изменения",
        });
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IPartitionFormFields>();

    const { getPartitionById, editPartition, isLoading } = useFetch();

    const [partition, setPartition] = useState<IPartition>();

    const formSubmit = async (data: IPartitionFormFields) => {
        try {
            await editPartition({
                partitionId: partition?.partitionId || 0,
                ...data,
            });
            succesEditNotification();
        } catch {
            errorEditNotification();
        }
    };

    const id = usePathname()?.split("/").pop();
    const fetchEditPartition = async () => {
        if (!id) return;
        const editPartition = await getPartitionById(id);
        setPartition(editPartition);
    };

    useEffect(() => {
        fetchEditPartition();
    }, []);

    return (
        <>
            {contextHolder}
            <AdminDashboard type="parts" />
            {isLoading && partition ? (
                <LoadingPage />
            ) : (
                <div className="add-partition container pt-100">
                    <div className="form-container horizontal_centered">
                        <form
                            onSubmit={handleSubmit((data) => formSubmit(data))}
                            className="add-partition__form"
                        >
                            <h1 className="add-partition__form-title">
                                Редактирование раздела
                            </h1>
                            <CustomInput
                                defaultValue={partition?.partitionName}
                                labelText='Название раздела (например "RTX 4060")'
                                name="partitionName"
                                minLength={3}
                                require={true}
                                register={register}
                                errors={errors}
                            />
                            <input
                                className="add-partition__form-submit-btn main-color-submit-btn"
                                type="submit"
                                value="Подтвердить"
                            />
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditPartition;
