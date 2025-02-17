"use client";

import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import AccountForm from "@/components/forms/accounts-forms/AccountForm";
import { IRole } from "@/interfaces/types-v2";
import { notification } from "antd";
import useFetch from "@/lib/hooks/useFetch";
import AdminDashboard from "@/components/navbar/admin/admin-dashboard/AdminDashboard";

export interface IUserFormFields extends FieldValues {
    role: IRole;
    login: string;
    password: string;
    surname: string;
    name: string;
    phone: string;
    email: string;
}

function Page() {
    const { addUser } = useFetch();

    const {
        register,
        unregister,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<IUserFormFields>();

    const [api, contextHolder] = notification.useNotification();
    const succesNotification = () => {
        api["success"]({
            message: "Успешно",
            description: "Учетная запись успешна добавлена.",
        });
    };
    const errorNotification = () => {
        api["error"]({
            message: "Ошибка",
            description: "Не удалось добавить учетную запись.",
        });
    };

    const onSubmit = async (data: IUserFormFields) => {
        try {
            await addUser({
                id: "",
                roleId: data.role.id,
                login: data.login,
                password: data.password,
                surname: data.surname,
                name: data.name,
                phone: data.phone,
                email: data.email,
            });

            succesNotification();
        } catch {
            errorNotification();
        }
    };

    return (
        <>
            <AdminDashboard type="accounts" />
            <form onSubmit={handleSubmit(onSubmit)}>
                {contextHolder}
                <div className="max-w-3xl pt-24 m-auto">
                    <AccountForm
                        register={register}
                        unregister={unregister}
                        control={control}
                        errors={errors}
                        title={
                            <div className="text-3xl pb-6">
                                Добавление учетной записи
                            </div>
                        }
                    />

                    <input
                        className="form__submit-btn main-color-submit-btn text-gray-800 w-full mt-4 mb-12"
                        type="submit"
                        value="Подтвердить"
                    />
                </div>
            </form>
        </>
    );
}

export default Page;
