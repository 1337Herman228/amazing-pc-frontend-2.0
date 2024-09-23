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
import "../authForms.scss";

interface SignUpFormProps {
    handleSubmit: (
        onValid: SubmitHandler<FieldValues>,
        onInvalid?: SubmitErrorHandler<FieldValues> | undefined
    ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
    unregister: UseFormUnregister<FieldValues>;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
    formSubmit: (data: FieldValues) => void;
}

const SignUpForm = ({
    formSubmit,
    handleSubmit,
    register,
    unregister,
    errors,
}: SignUpFormProps) => {
    useEffect(() => {
        return () => {
            unregister("login");
            unregister("password");
            unregister("name");
            unregister("surname");
            unregister("email");
            unregister("phone");
        };
    }, []);

    return (
        <section className="auth-section centered-container">
            <div className="form-container">
                <aside className="image-container">
                    <img
                        className="image-container__img"
                        src="/backgrounds/hyperpc-cyber.jpg"
                        alt=""
                        width={600}
                        height={600}
                    />
                </aside>

                <aside className="form-aside ">
                    <div className="navigation">
                        <Link href="/sign-in" className="navigation__link">
                            Авторизация
                        </Link>
                        <Link
                            href="/sign-up"
                            className="navigation__link active"
                        >
                            Регистрация
                        </Link>
                    </div>
                    <form
                        onSubmit={handleSubmit((data) => formSubmit(data))}
                        className="auth-form"
                    >
                        <CustomInput
                            labelText="Логин"
                            name="login"
                            minLength={3}
                            onlyLettersAndDigits={true}
                            register={register}
                            require
                            errors={errors}
                        />
                        <CustomInput
                            labelText="Пароль"
                            name="password"
                            type="password"
                            minLength={8}
                            onlyLettersAndDigits={true}
                            register={register}
                            require
                            errors={errors}
                        />
                        <CustomInput
                            labelText="Имя"
                            name="name"
                            minLength={2}
                            onlyLettersAndDigits={true}
                            register={register}
                            require
                            errors={errors}
                        />
                        <CustomInput
                            labelText="Фамилия"
                            name="surname"
                            minLength={2}
                            onlyLettersAndDigits={true}
                            register={register}
                            require
                            errors={errors}
                        />
                        <CustomInput
                            labelText="Email"
                            name="email"
                            type="email"
                            minLength={2}
                            onlyLettersAndDigits={false}
                            register={register}
                            require
                            errors={errors}
                        />
                        <CustomInput
                            labelText="Телефон"
                            name="phone"
                            isPhone={true}
                            register={register}
                            require
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
        </section>
    );
};

export default SignUpForm;
