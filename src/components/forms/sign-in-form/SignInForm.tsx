"use client";

import "../authForms.scss";
import CustomInput from "@/components/inputs/custom-input/CustomInput";
import Link from "next/link";
import React, { useEffect } from "react";
import {
    FieldErrors,
    FieldValues,
    SubmitErrorHandler,
    SubmitHandler,
    UseFormRegister,
    UseFormUnregister,
} from "react-hook-form";

interface SignInFormProps {
    authHandleSubmit: (data: any) => Promise<void>;
    handleSubmit: (
        onValid: SubmitHandler<FieldValues>,
        onInvalid?: SubmitErrorHandler<FieldValues> | undefined
    ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
    unregister: UseFormUnregister<FieldValues>;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
}

const SignInForm = ({
    handleSubmit,
    authHandleSubmit,
    register,
    unregister,
    errors,
}: SignInFormProps) => {
    useEffect(() => {
        return () => {
            unregister("login");
            unregister("password");
        };
    }, []);

    return (
        <div className="form-container">
            <aside className="image-container">
                <img
                    className="image-container__img"
                    src="/backgrounds/phanteks-nv7-white.jpg"
                    alt=""
                    width={600}
                    height={600}
                />
            </aside>

            <aside className="form-aside">
                <div className="navigation">
                    <Link href="/sign-in" className="navigation__link active">
                        Авторизация
                    </Link>
                    <Link href="/sign-up" className="navigation__link">
                        Регистрация
                    </Link>
                </div>
                <form
                    onSubmit={handleSubmit((data: FieldValues) =>
                        authHandleSubmit(data)
                    )}
                    className="auth-form"
                >
                    <CustomInput
                        labelText="Логин"
                        name="login"
                        minLength={3}
                        onlyLettersAndDigits={true}
                        onlyPositiveDigits={false}
                        require={true}
                        register={register}
                        errors={errors}
                    />
                    <CustomInput
                        labelText="Пароль"
                        name="password"
                        type="password"
                        minLength={8}
                        onlyLettersAndDigits={true}
                        onlyPositiveDigits={false}
                        require={true}
                        register={register}
                        errors={errors}
                    />
                    <input
                        className="auth-form__submit-btn"
                        type="submit"
                        value="Подтвердить"
                    />
                </form>
            </aside>
        </div>
    );
};

export default SignInForm;
