"use client";

import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import AdminDashboard from "@/components/navbar/admin/admin-dashboard/AdminDashboard";
import ControlledSelect from "@/components/select/ControlledSelect/ControlledSelect";
import Textarea from "@/components/textarea/Textarea";
import { IOptionTemplate, IPurchase, IUser } from "@/interfaces/types-v2";
import { PURCHASE_STATUS_OPTIONS } from "@/lib/constants";
import { getPurchaseStatusLabel } from "@/lib/functions";
import useFetch from "@/lib/hooks/useFetch";
import { notification } from "antd";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

export interface IFormFields extends FieldValues {
    user: IOptionTemplate;
    status: IOptionTemplate;
    address: string;
}

const EditPurchasesPage = () => {
    const params = useParams();
    const id = params?.id;

    const { getAccounts, getPurchaseById, editPurchases } = useFetch();

    const [api, contextHolder] = notification.useNotification();
    const succesNotification = () => {
        api["success"]({
            message: "Успешно",
            description: "Заказ успешно изменен!",
        });
    };
    const errorNotification = () => {
        api["error"]({
            message: "Ошибка",
            description: "Не удалось изменить заказ!",
        });
    };

    const [users, setUsers] = useState<IOptionTemplate[] | null>(null);
    const [purchase, setPurchase] = useState<IPurchase[] | null>(null);

    const { reset, register, unregister, handleSubmit, control, formState } =
        useForm<IFormFields>();

    const { errors } = formState;

    const firstRender = async () => {
        const accounts: IUser[] = await getAccounts();
        setUsers(
            accounts.map((user) => ({
                id: user.id,
                label: `${user.name} ${user.surname} ${user.login} ${user.email}`,
                value: user.id,
            }))
        );
    };

    const putDefaultValues = (purchase: IPurchase) => {
        reset({
            user: {
                id: purchase.user.id,
                label: `${purchase.user.name} ${purchase.user.surname} ${purchase.user.login} ${purchase.user.email}`,
                value: purchase.user.id,
            },
            status: {
                id: purchase.status,
                label: getPurchaseStatusLabel(purchase.status),
                value: purchase.status,
            },
            address: purchase.destination,
        });
    };

    const fetchPurchase = async () => {
        if (id && users) {
            const data = await getPurchaseById(id as string);
            setPurchase(data);
            putDefaultValues(data);
        }
    };

    useEffect(() => {
        firstRender();
    }, []);

    useEffect(() => {
        fetchPurchase();
    }, [id, users]);

    const formSubmit = async (data: IFormFields) => {
        try {
            await editPurchases({
                id: id as string,
                userId: data.user.id,
                status: data.status.id,
                destination: data.address,
            });
            succesNotification();
            fetchPurchase();
        } catch (error) {
            errorNotification();
        }
    };

    if (!users || !purchase) return <LoadingPage />;

    return (
        <>
            {contextHolder}
            <AdminDashboard type="purchases" />

            <div className="container !my-[200px] ">
                <div className="form-container horizontal_centered">
                    <form
                        onSubmit={handleSubmit((data) => formSubmit(data))}
                        className="add-type__form "
                    >
                        <h1 className="!text-[30px] !mb-8 uppercase">
                            Редактирование заказа
                        </h1>

                        <ControlledSelect
                            placeholder="Выберите покупателя"
                            label="Покупатель"
                            name="user"
                            control={control}
                            options={users}
                            errors={errors}
                            style={{ height: 45 }}
                        />

                        <ControlledSelect
                            placeholder="Выберите статус"
                            label="Статус"
                            name="status"
                            control={control}
                            options={PURCHASE_STATUS_OPTIONS}
                            errors={errors}
                            style={{ height: 45 }}
                        />

                        <Textarea
                            labelText="Адрес доставки"
                            name="address"
                            minLength={5}
                            require={true}
                            register={register}
                            errors={errors}
                            rows={3}
                        />

                        <input
                            className="add-type__form-submit-btn main-color-submit-btn text-black !px-6 mt-3 w-full"
                            type="submit"
                            value="Изменить"
                        />
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditPurchasesPage;
