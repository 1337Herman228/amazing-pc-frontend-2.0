"use client";

import "./AddPartition.scss";
import { notification } from "antd";
import { useForm } from "react-hook-form";
import useFetch from "@/lib/hooks/useFetch";
import AdminDashboard from "@/components/navbar/admin/admin-dashboard/AdminDashboard";
import CustomInput from "@/components/inputs/custom-input/CustomInput";

export interface IPartitionFormFields {
    partitionName: string;
}

const AddPartition = () => {
    const [api, contextHolder] = notification.useNotification();
    const succesNotification = () => {
        api["success"]({
            message: "Успешно",
            description: "Новый раздел для комплектующих успешно добавлен.",
        });
    };
    const errorNotification = () => {
        api["error"]({
            message: "Ошибка",
            description: "Такой раздел комплектующих уже существует.",
        });
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IPartitionFormFields>();

    const { addPartition } = useFetch();

    const formSubmit = async (data: IPartitionFormFields) => {
        try {
            await addPartition({
                ...data,
                partitionId: 0,
            });

            succesNotification();
        } catch {
            errorNotification();
        }
    };

    return (
        <>
            {contextHolder}
            <AdminDashboard type="parts" />

            <div className="add-partition container pt-100">
                <div className="form-container horizontal_centered">
                    <form
                        onSubmit={handleSubmit((data) => formSubmit(data))}
                        className="add-partition__form"
                    >
                        <h1 className="add-partition__form-title">
                            Добавление нового раздела
                        </h1>
                        <CustomInput
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
        </>
    );
};

export default AddPartition;
