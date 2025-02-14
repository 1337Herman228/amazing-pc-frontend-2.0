"use client";

import { useEffect, useState } from "react";
import "../add-type/AddType.scss";
import { notification } from "antd";
import { useForm } from "react-hook-form";
import { useParams, usePathname } from "next/navigation";
import { deleteSvgIcon, saveSvgIcon } from "@/lib/functions";
import AdminDashboard from "@/components/navbar/admin/admin-dashboard/AdminDashboard";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import ImageUpload from "@/components/upload-image/ImageUpload";
import CustomInput from "@/components/inputs/custom-input/CustomInput";
import useFetch from "@/lib/hooks/useFetch";
import { IType } from "@/interfaces/types-v2";
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
        unregister,
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
                    id: type?.id as string,
                    value: data.value,
                    label: data.label,
                    image: "/svg-icons/" + data.value + ".svg",
                });

                await editSvg(img, data?.value, type?.value ?? "");

                succesEditNotification();
            } else {
                errorEditNotification();
            }
        } catch {
            errorEditNotification();
        }
    };

    const params = useParams();
    const id = params?.id;

    const fetchEditType = async () => {
        try {
            const editType = await getTypeById(id as string);
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
                                            name: type?.value,
                                            status: "done",
                                            url: type?.image,
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
                                defaultValue={type?.value}
                                labelText="Название типа"
                                name="value"
                                minLength={3}
                                require={true}
                                register={register}
                                errors={errors}
                                unregister={unregister}
                                placeholder="cpu"
                            />
                            <CustomInput
                                defaultValue={type?.label}
                                labelText="Видимое название типа"
                                name="label"
                                minLength={3}
                                require={true}
                                register={register}
                                errors={errors}
                                unregister={unregister}
                                placeholder="Процессор"
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
