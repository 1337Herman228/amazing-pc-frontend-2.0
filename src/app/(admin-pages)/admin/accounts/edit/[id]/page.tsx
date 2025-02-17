"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AccountForm from "@/components/forms/accounts-forms/AccountForm";
import { IUser } from "@/interfaces/types-v2";
import { notification } from "antd";
import useFetch from "@/lib/hooks/useFetch";
import AdminDashboard from "@/components/navbar/admin/admin-dashboard/AdminDashboard";
import { useParams } from "next/navigation";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import { IUserFormFields } from "../../add/page";

function Page() {
    const params = useParams();
    const id = params?.id;

    const [user, setUser] = useState<IUser | null>(null);

    const { getUserById, editUser } = useFetch();

    useEffect(() => {
        if (id) fetchUser();
    }, [id]);

    const fetchUser = async () => {
        const user = await getUserById(id as string);
        setUser(user);
        reset({
            role: user?.roles,
            login: user?.login,
            password: "",
            surname: user.surname,
            name: user.name,
            phone: user.phone,
            email: user.email,
        });
    };

    const {
        register,
        unregister,
        handleSubmit,
        reset,
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
            await editUser({
                id: user?.id as string,
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

    const isLoading = !user;

    return (
        <>
            <AdminDashboard type="accounts" />
            {isLoading ? (
                <LoadingPage />
            ) : (
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
                                    Редактирование учетной записи
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
            )}
        </>
    );
}

export default Page;
