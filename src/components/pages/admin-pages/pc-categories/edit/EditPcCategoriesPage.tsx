"use client";

import { notification } from "antd";
import { useForm } from "react-hook-form";
import AdminDashboard from "@/components/navbar/admin/admin-dashboard/AdminDashboard";
import CustomInput from "@/components/inputs/custom-input/CustomInput";
import useFetch from "@/lib/hooks/useFetch";
import { IPcCategory } from "@/interfaces/types-v2";
import Textarea from "@/components/textarea/Textarea";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";

export interface IFormFields {
    value: string;
    label: string;
    description: string;
}

const EditPcCategoriesPage = () => {
    const params = useParams();
    const id = params?.id;

    const { editPcCategory, getPcCategoryById } = useFetch();
    const [pcCategory, setPcCategory] = useState<IPcCategory | null>(null);

    const fetchData = async () => {
        const data = await getPcCategoryById(id as string);
        setPcCategory(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [api, contextHolder] = notification.useNotification();
    const succesNotification = () => {
        api["success"]({
            message: "Успешно",
            description: "Новая категория ПК успешно изменена!",
        });
    };
    const errorNotification = () => {
        api["error"]({
            message: "Ошибка",
            description: "Не удалось изменить категорию ПК!",
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
            const dataToAdd: IPcCategory = {
                id: id as string,
                value: data.value,
                label: data.label,
                description: data.description,
            };
            await editPcCategory(dataToAdd);
            succesNotification();
        } catch {
            errorNotification();
        }
    };

    if (!pcCategory) return <LoadingPage />;

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
                            Редактирование категории ПК
                        </h1>

                        <CustomInput
                            labelText="Название категории"
                            name="value"
                            minLength={3}
                            require={true}
                            register={register}
                            errors={errors}
                            unregister={unregister}
                            placeholder="gaming-pc"
                            defaultValue={pcCategory.value}
                        />

                        <CustomInput
                            labelText="Отображаемое название категории"
                            name="label"
                            minLength={3}
                            require={true}
                            register={register}
                            errors={errors}
                            unregister={unregister}
                            placeholder="Игровой ПК"
                            defaultValue={pcCategory.label}
                        />

                        <Textarea
                            labelText="Описание"
                            name="description"
                            minLength={20}
                            require={true}
                            register={register}
                            errors={errors}
                            rows={8}
                            defaultValue={pcCategory.description}
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

export default EditPcCategoriesPage;
