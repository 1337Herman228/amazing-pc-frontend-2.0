"use client";

import { notification } from "antd";
import { useForm } from "react-hook-form";
import AdminDashboard from "@/components/navbar/admin/admin-dashboard/AdminDashboard";
import CustomInput from "@/components/inputs/custom-input/CustomInput";
import useFetch from "@/lib/hooks/useFetch";
import { IPcCategory, IPcType } from "@/interfaces/types-v2";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";

export interface IFormFields {
    value: string;
    label: string;
}

const EditPcTypesPage = () => {
    const params = useParams();
    const id = params?.id;

    const { editPcType, getPcTypeById } = useFetch();
    const [pcType, setPcType] = useState<IPcCategory | null>(null);

    const fetchData = async () => {
        const data = await getPcTypeById(id as string);
        setPcType(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [api, contextHolder] = notification.useNotification();
    const succesNotification = () => {
        api["success"]({
            message: "Успешно",
            description: "Новый тип ПК успешно изменен!",
        });
    };
    const errorNotification = () => {
        api["error"]({
            message: "Ошибка",
            description: "Не удалось изменить тип ПК!",
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
            const dataToAdd: IPcType = {
                id: id as string,
                value: data.value,
                label: data.label,
            };
            await editPcType(dataToAdd);
            succesNotification();
        } catch {
            errorNotification();
        }
    };

    if (!pcType) return <LoadingPage />;

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
                            Редактирование типа ПК
                        </h1>

                        <CustomInput
                            labelText="Название типа"
                            name="value"
                            minLength={3}
                            require={true}
                            register={register}
                            errors={errors}
                            unregister={unregister}
                            placeholder="gaming-pc"
                            defaultValue={pcType.value}
                        />

                        <CustomInput
                            labelText="Отображаемое название типа"
                            name="label"
                            minLength={3}
                            require={true}
                            register={register}
                            errors={errors}
                            unregister={unregister}
                            placeholder="Игровой ПК"
                            defaultValue={pcType.label}
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

export default EditPcTypesPage;
