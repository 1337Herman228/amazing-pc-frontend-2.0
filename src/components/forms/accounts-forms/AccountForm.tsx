"use client";

import CustomInput from "@/components/inputs/custom-input/CustomInput";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import ControlledSelect from "@/components/select/ControlledSelect/ControlledSelect";
import { IFormProps, IRole, IUser } from "@/interfaces/types-v2";
import { makeOptionsList } from "@/lib/functions";
import useFetch from "@/lib/hooks/useFetch";
import { useEffect, useState } from "react";
import { Control } from "react-hook-form";

interface AccountFormProps extends IFormProps {
    control: Control<any>;
    user?: IUser | undefined;
    title?: React.ReactNode;
}

const AccountForm = ({
    user,
    errors,
    register,
    unregister,
    control,
    title,
}: AccountFormProps) => {
    const { getRoles } = useFetch();

    const [rolesOptions, setRolesOptions] = useState<IRole[] | null>(null);

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        const data = await getRoles();
        setRolesOptions(makeOptionsList(data));
    };

    const isLoading = !rolesOptions;

    return isLoading ? (
        <LoadingPage />
    ) : (
        <div className="account-form">
            {title}
            <div className="form-wrapper">
                <div className="form__general">
                    <ControlledSelect
                        placeholder="Выберите роль"
                        label="Роль"
                        name="role"
                        control={control}
                        options={rolesOptions}
                        errors={errors}
                        style={{ height: 45 }}
                    />

                    <CustomInput
                        labelText="Логин"
                        name="login"
                        minLength={3}
                        require={true}
                        register={register}
                        errors={errors}
                        unregister={unregister}
                    />

                    <CustomInput
                        labelText="Пароль"
                        name="password"
                        minLength={0}
                        require={true}
                        register={register}
                        errors={errors}
                        unregister={unregister}
                        type="password"
                    />

                    <CustomInput
                        labelText="Фамилия"
                        name="surname"
                        minLength={0}
                        require={true}
                        register={register}
                        errors={errors}
                        unregister={unregister}
                    />

                    <CustomInput
                        labelText="Имя"
                        name="name"
                        minLength={0}
                        require={true}
                        register={register}
                        errors={errors}
                        unregister={unregister}
                    />

                    <CustomInput
                        labelText="Телефон"
                        name="phone"
                        minLength={0}
                        require={true}
                        register={register}
                        errors={errors}
                        unregister={unregister}
                        isPhone={true}
                        type="phone"
                    />

                    <CustomInput
                        labelText="Email"
                        name="email"
                        minLength={0}
                        require={true}
                        register={register}
                        errors={errors}
                        unregister={unregister}
                        type="email"
                    />
                </div>
            </div>
        </div>
    );
};

export default AccountForm;
