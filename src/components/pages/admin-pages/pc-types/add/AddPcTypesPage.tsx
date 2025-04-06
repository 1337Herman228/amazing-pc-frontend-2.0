"use client";

import { notification } from "antd";
import { useForm } from "react-hook-form";
import AdminDashboard from "@/components/navbar/admin/admin-dashboard/AdminDashboard";
import CustomInput from "@/components/inputs/custom-input/CustomInput";
import useFetch from "@/lib/hooks/useFetch";
import { IAddPcType } from "@/interfaces/types-v2";

export interface IFormFields {
    value: string;
    label: string;
}

const AddPcTypesPage = () => {
    const { addPcType } = useFetch();

    const [api, contextHolder] = notification.useNotification();
    const succesNotification = () => {
        api["success"]({
            message: "Успешно",
            description: "Новый тип ПК успешно добавлен!",
        });
    };
    const errorNotification = () => {
        api["error"]({
            message: "Ошибка",
            description: "Не удалось добавить тип ПК!",
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
            const dataToAdd: IAddPcType = {
                value: data.value,
                label: data.label,
            };
            await addPcType(dataToAdd);
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
                            Добавление нового типа ПК
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

export default AddPcTypesPage;
