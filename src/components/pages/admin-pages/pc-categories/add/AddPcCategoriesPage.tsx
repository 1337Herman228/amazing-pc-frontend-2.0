"use client";

import { notification } from "antd";
import { useForm } from "react-hook-form";
import AdminDashboard from "@/components/navbar/admin/admin-dashboard/AdminDashboard";
import CustomInput from "@/components/inputs/custom-input/CustomInput";
import useFetch from "@/lib/hooks/useFetch";
import { IAddPcCategory } from "@/interfaces/types-v2";
import Textarea from "@/components/textarea/Textarea";

export interface IFormFields {
    value: string;
    label: string;
    description: string;
}

const AddPcCategoriesPage = () => {
    const { addPcCategory } = useFetch();

    const [api, contextHolder] = notification.useNotification();
    const succesNotification = () => {
        api["success"]({
            message: "Успешно",
            description: "Новая категория ПК успешно добавлена!",
        });
    };
    const errorNotification = () => {
        api["error"]({
            message: "Ошибка",
            description: "Не удалось добавить категорию ПК!",
        });
    };

    const {
        register,
        unregister,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormFields>();

    const formSubmit = async (data: IFormFields) => {
        try {
            const dataToAdd: IAddPcCategory = {
                value: data.value,
                label: data.label,
                description: data.description,
            };
            await addPcCategory(dataToAdd);
            succesNotification();
        } catch {
            errorNotification();
        }
    };

    return (
        <>
            {contextHolder}
            <AdminDashboard type="pc" />

            <div className="container !mt-[200px]">
                <div className="form-container horizontal_centered">
                    <form
                        onSubmit={handleSubmit((data) => formSubmit(data))}
                        className="add-type__form "
                    >
                        <h1 className="!text-[30px] !mb-4 uppercase">
                            Добавление новой категории ПК
                        </h1>

                        <CustomInput
                            labelText="Название категории"
                            name="value"
                            minLength={3}
                            require={true}
                            register={register}
                            errors={errors}
                            unregister={unregister}
                            placeholder="optimal-gaming-pc"
                        />

                        <CustomInput
                            labelText="Отображаемое название категории"
                            name="label"
                            minLength={3}
                            require={true}
                            register={register}
                            errors={errors}
                            unregister={unregister}
                            placeholder="Оптимальные игровые компьютеры"
                        />

                        <Textarea
                            labelText="Описание"
                            name="description"
                            minLength={20}
                            require={true}
                            register={register}
                            errors={errors}
                            rows={8}
                        />

                        <input
                            className="add-type__form-submit-btn main-color-submit-btn text-black !px-6 mt-3 w-full"
                            type="submit"
                            value="Подтвердить"
                        />
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddPcCategoriesPage;
