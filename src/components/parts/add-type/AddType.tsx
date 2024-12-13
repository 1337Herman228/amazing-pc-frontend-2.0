"use client";

import { useState } from "react";
import "./AddType.scss";
import { notification } from "antd";
import { useForm } from "react-hook-form";
import { saveSvgIcon } from "@/lib/functions";
import AdminDashboard from "@/components/navbar/admin/admin-dashboard/AdminDashboard";
import ImageUpload from "@/components/upload-image/ImageUpload";
import CustomInput from "@/components/inputs/custom-input/CustomInput";
import useFetch from "@/lib/hooks/useFetch";
import { IType } from "@/interfaces/types";

export interface ITypeFormFields {
    typeName: string;
    alternativeName: string;
}

const AddType = () => {
    const { addType } = useFetch();

    const [api, contextHolder] = notification.useNotification();
    const succesNotification = () => {
        api["success"]({
            message: "Успешно",
            description: "Новый тип комплектующей успешно добавлен.",
        });
    };
    const errorNotification = () => {
        api["error"]({
            message: "Ошибка",
            description: "Такой тип комплектующей уже существует.",
        });
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ITypeFormFields>();

    const [img, setImg] = useState(null);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const formSubmit = async (data: ITypeFormFields) => {
        try {
            if (img) {
                const typeToAdd: IType = {
                    ...data,
                    typeId: 0,
                    typeImage: "/svg-icons/" + data.typeName + ".svg",
                };
                await addType(typeToAdd);
                succesNotification();
                saveSvgIcon(data.typeName, img);
            } else {
                errorNotification();
            }
        } catch {
            errorNotification();
        }
    };

    return (
        <>
            {contextHolder}
            <AdminDashboard type="parts" />

            <div className="add-type container pt-100">
                <div className="form-container horizontal_centered">
                    <form
                        onSubmit={handleSubmit((data) => formSubmit(data))}
                        className="add-type__form"
                    >
                        <h1 className="add-type__form-title">
                            Добавление нового типа
                        </h1>

                        <div className="form__general-img">
                            <div className="img-label">Иконка (svg):</div>

                            <ImageUpload
                                accept=".svg"
                                img={img}
                                isFormSubmitted={isFormSubmitted}
                                setImg={setImg}
                            />

                            <p className="error-message">
                                {isFormSubmitted
                                    ? img
                                        ? null
                                        : "Загрузите иконку"
                                    : null}
                            </p>
                        </div>

                        <CustomInput
                            labelText='Название типа (например "cpu")'
                            name="typeName"
                            minLength={3}
                            require={true}
                            register={register}
                            errors={errors}
                        />

                        <CustomInput
                            labelText='Альтернативное название типа (например "Процессор")'
                            name="alternativeName"
                            minLength={3}
                            require={true}
                            register={register}
                            errors={errors}
                        />

                        <input
                            onClick={() => setIsFormSubmitted(true)}
                            className="add-type__form-submit-btn main-color-submit-btn"
                            type="submit"
                            value="Подтвердить"
                        />
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddType;
