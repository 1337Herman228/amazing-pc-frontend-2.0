"use client";

import { useEffect, useState } from "react";
import "../add-type/AddType.scss";
import { notification } from "antd";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { deleteSvgIcon, saveSvgIcon } from "@/lib/functions";
import AdminDashboard from "@/components/navbar/admin/admin-dashboard/AdminDashboard";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import ImageUpload from "@/components/upload-image/ImageUpload";
import CustomInput from "@/components/inputs/custom-input/CustomInput";
import useFetch from "@/lib/hooks/useFetch";
import { IType } from "@/interfaces/types";
import { ITypeFormFields } from "../add-type/AddType";

const EditType = () => {
    const [api, contextHolder] = notification.useNotification();
    const succesEditNotification = () => {
        api["success"]({
            message: "Успешно",
            description: "Изменения типа комплектующей успешно сохранены.",
        });
    };
    const errorEditNotification = () => {
        api["error"]({
            message: "Ошибка",
            description: "Не удается применить изменения",
        });
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ITypeFormFields>();

    const { getTypeById, editType } = useFetch();

    const [type, setType] = useState<IType>();
    const [img, setImg] = useState<boolean | null>(true);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const formSubmit = async (data: ITypeFormFields) => {
        try {
            if (img) {
                await editType({
                    typeId: type?.typeId as number,
                    typeImage: "/svg-icons/" + data?.typeName + ".svg",
                    ...data,
                });

                await editSvg(img, data?.typeName, type?.typeName ?? "");

                succesEditNotification();
            } else {
                errorEditNotification();
            }
        } catch {
            errorEditNotification();
        }
    };

    const id = usePathname()?.split("/").pop();
    const fetchEditType = async () => {
        try {
            const editType = await getTypeById(id ?? "");
            setType(editType);
        } catch {}
    };

    useEffect(() => {
        fetchEditType();
    }, []);

    const editSvg = async (svg: any, svgName: string, oldSvgName: string) => {
        if (svg) {
            if (svg !== true) {
                await deleteSvgIcon(oldSvgName);
                await saveSvgIcon(svgName, svg);
            }
        }
    };

    return (
        <>
            {contextHolder}
            <AdminDashboard type="parts" />
            {!type ? (
                <LoadingPage />
            ) : (
                <div className="add-type container pt-100">
                    <div className="form-container horizontal_centered">
                        <form
                            onSubmit={handleSubmit((data) => formSubmit(data))}
                            className="add-type__form"
                        >
                            <h1 className="add-type__form-title">
                                Редактирование типа комплектующей
                            </h1>

                            <div className="form__general-img">
                                <div className="img-label">Иконка (svg):</div>

                                <ImageUpload
                                    defaultImg={[
                                        {
                                            uid: "1",
                                            name: type?.typeName,
                                            status: "done",
                                            url: type?.typeImage,
                                        },
                                    ]}
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
                                defaultValue={type?.typeName}
                                labelText='Название типа (например "cpu")'
                                name="typeName"
                                minLength={3}
                                require={true}
                                register={register}
                                errors={errors}
                            />
                            <CustomInput
                                defaultValue={type?.alternativeName}
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
            )}
        </>
    );
};

export default EditType;
