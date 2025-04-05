"use client";

import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import { IUserInfo } from "@/interfaces/types-v2";
import useFetch from "@/lib/hooks/useFetch";
import { useEffect, useState } from "react";
import "./ProfilePage.scss";
import CustomInput from "@/components/inputs/custom-input/CustomInput";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/lib/redux/store/store";
import { notification } from "antd";

const ProfilePage = () => {
    const { getUserInfo } = useFetch();

    const [profileView, setProfileView] = useState<"info" | "password">("info");
    const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);

    const fetchUserInfo = async () => {
        const data = await getUserInfo();
        setUserInfo(data);
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    if (!userInfo) return <LoadingPage />;

    return (
        <section className="profile container section">
            <div className="mt-7 mb-7 flex flex-col place-items-center justify-center gap-3">
                <h1 className="!text-[42px] ">Профиль</h1>
                <div className="text-md text-[#999999] text-center">
                    Здесь вы можете управлять своими личными данными
                    <br />
                    Держите информацию актуальной и вовремя обновляйте свой
                    профиль
                </div>
            </div>

            <div className="dashboard !mb-8 px-4 md:px-0">
                <ul className="dashboard-filter">
                    <button
                        id="info"
                        className={`dashboard-filter__button ${
                            profileView === "info" && "active"
                        }`}
                        onClick={() => setProfileView("info")}
                    >
                        Общие данные
                    </button>
                    <button
                        id="password"
                        className={`dashboard-filter__button ${
                            profileView === "password" && "active"
                        }`}
                        onClick={() => setProfileView("password")}
                    >
                        Сменить пароль
                    </button>
                </ul>
            </div>

            {profileView === "info" && (
                <UserInfoForm
                    userInfo={userInfo}
                    fetchUserInfo={fetchUserInfo}
                />
            )}
            {profileView === "password" && <UserChangePsswordForm />}
        </section>
    );
};

interface IUserChangePasswordFormFields {
    oldPassword: string;
    newPassword: string;
    repeatNewPassword: string;
}

const UserChangePsswordForm = ({}) => {
    const [api, contextHolder] = notification.useNotification();
    const succesNotification = () => {
        api["success"]({
            message: "Успешно",
            description: "Пароль успешно изменен!",
        });
    };
    const errorRepeatPasswordNotification = () => {
        api["warning"]({
            message: "Внимание",
            description: "Новые пароли не совпадают!",
        });
    };
    const errorNotification = () => {
        api["error"]({
            message: "Ошибка",
            description: "Не удалось изменить пароль!",
        });
    };

    const user = useAppSelector((state) => state.session.user);
    const { changePassword } = useFetch();

    const {
        register,
        unregister,
        handleSubmit,
        formState: { errors },
    } = useForm<IUserChangePasswordFormFields>();

    const onSubmit = async (data: IUserChangePasswordFormFields) => {
        if (data.repeatNewPassword !== data.newPassword)
            return errorRepeatPasswordNotification();
        try {
            const response = await changePassword({
                userId: user?.userId as string,
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
            });
            if (response === "INTERNAL_SERVER_ERROR") throw new Error();
            succesNotification();
        } catch {
            errorNotification();
        }
    };

    return (
        <form
            onSubmit={handleSubmit((data) => onSubmit(data))}
            className="p-4 md:p-0 md:max-w-[1000px] mx-auto"
        >
            {contextHolder}
            <CustomInput
                labelText="Старый пароль"
                name="oldPassword"
                type="password"
                minLength={8}
                onlyLettersAndDigits={true}
                register={register}
                require
                errors={errors}
                unregister={unregister}
            />

            <CustomInput
                labelText="Новый пароль"
                name="newPassword"
                type="password"
                minLength={8}
                onlyLettersAndDigits={true}
                register={register}
                require
                errors={errors}
                unregister={unregister}
            />

            <CustomInput
                labelText="Повторите новый пароль"
                name="repeatNewPassword"
                type="password"
                minLength={8}
                onlyLettersAndDigits={true}
                register={register}
                require
                errors={errors}
                unregister={unregister}
            />

            <input
                className="main-color-submit-btn !px-8 text-gray-800 mt-3"
                type="submit"
                value="Подтвердить"
            />
        </form>
    );
};

interface IUserFormFields {
    login: string;
    name: string;
    surname: string;
    phone: string;
    email: string;
}

interface UserInfoFormProps {
    userInfo: IUserInfo;
    fetchUserInfo: () => void;
}

const UserInfoForm = ({ userInfo, fetchUserInfo }: UserInfoFormProps) => {
    const [api, contextHolder] = notification.useNotification();
    const succesNotification = () => {
        api["success"]({
            message: "Успешно",
            description: "Ваши данные успешно обновлены!",
        });
    };
    const errorNotification = () => {
        api["error"]({
            message: "Ошибка",
            description: "Не удалось обновить данные!",
        });
    };

    const { editUserInfo } = useFetch();
    const user = useAppSelector((state) => state.session.user);

    const {
        register,
        unregister,
        handleSubmit,
        formState: { errors },
    } = useForm<IUserFormFields>();

    const onSubmit = async (data: IUserFormFields) => {
        try {
            await editUserInfo({
                id: user?.userId as string,
                login: data.login,
                surname: data.surname,
                name: data.name,
                phone: data.phone,
                email: data.email,
            });
            fetchUserInfo();
            succesNotification();
        } catch {
            errorNotification();
        }
    };

    return (
        <form
            onSubmit={handleSubmit((data) => onSubmit(data))}
            className="p-4 md:p-0 md:max-w-[1000px] mx-auto"
        >
            {contextHolder}
            <CustomInput
                labelText="Логин"
                name="login"
                minLength={3}
                defaultValue={userInfo.login}
                onlyLettersAndDigits={true}
                register={register}
                require
                errors={errors}
                unregister={unregister}
            />
            <CustomInput
                labelText="Имя"
                name="name"
                minLength={2}
                onlyLettersAndDigits={true}
                defaultValue={userInfo.name}
                register={register}
                require
                errors={errors}
                unregister={unregister}
            />
            <CustomInput
                labelText="Фамилия"
                name="surname"
                minLength={2}
                onlyLettersAndDigits={true}
                defaultValue={userInfo.surname}
                register={register}
                require
                errors={errors}
                unregister={unregister}
            />
            <CustomInput
                labelText="Email"
                name="email"
                type="email"
                minLength={2}
                defaultValue={userInfo.email}
                onlyLettersAndDigits={false}
                register={register}
                require
                errors={errors}
                unregister={unregister}
            />
            <CustomInput
                labelText="Телефон"
                name="phone"
                isPhone={true}
                register={register}
                defaultValue={userInfo.phone}
                require
                errors={errors}
                unregister={unregister}
            />

            <input
                className="main-color-submit-btn !px-8 text-gray-800 mt-3"
                type="submit"
                value="Подтвердить"
            />
        </form>
    );
};

export default ProfilePage;
