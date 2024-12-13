// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import "../add-part/AddPart.scss";
import { useForm } from "react-hook-form";
import { PlusOutlined } from "@ant-design/icons";
import { ConfigProvider, Image, Upload, notification } from "antd";
import { usePathname } from "next/navigation";
import ImageUpload from "@/components/upload-image/ImageUpload";
import {
    deleteImg,
    makePartEntityObject,
    saveImg,
    switchAdditionalForm,
    transformPart,
} from "@/lib/functions";
import useHttp from "@/lib/hooks/useHttp";
import AdminDashboard from "@/components/navbar/admin/admin-dashboard/AdminDashboard";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import CustomInput from "@/components/inputs/custom-input/CustomInput";
import AloneSelect from "@/components/select/antd-alone-select/AloneSelect";
import Textarea from "@/components/textarea/Textarea";
import useFetch from "@/lib/hooks/useFetch";

const EditPart = () => {
    const { getPartitions, getPartById, editPart } = useFetch();

    const [api, contextHolder] = notification.useNotification();
    const succesNotification = () => {
        api["success"]({
            message: "Успешно",
            description: "Данная комплектующая успешна изменена.",
        });
    };
    const errorNotification = () => {
        api["error"]({
            message: "Ошибка",
            description: "Не удалось изменить данную комплектующую.",
        });
    };

    const {
        register,
        unregister,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [img, setImg] = useState(null);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const [partitions, setPartitions] = useState([]);
    const [part, setPart] = useState(null);

    const [selectedPartition, setSelectedPartition] = useState("");

    const formSubmit = async (data) => {
        try {
            if (img && selectedPartition) {
                const object = makePartEntityObject({
                    data,
                    isEditForm: true,
                    part,
                    selectedCategory: part?.categories?.categoryName,
                    selectedType: part?.types?.alternativeName,
                    selectedPartition,
                });

                await editPart(object);

                await deleteImg(part?.name);
                saveImg(data?.name, img);

                succesNotification();
            } else {
                errorNotification();
            }
        } catch {
            errorNotification();
        }
    };

    useEffect(() => {
        fetchPartitions();
        fetchPart();
    }, []);

    const fetchPartitions = async () => {
        try {
            const data = await getPartitions();
            setPartitions(makeOptionsListFromPartitions(data));
        } catch (error) {
            console.error(error);
        }
    };

    const partId = usePathname().split("/").pop();
    const fetchPart = async () => {
        try {
            const data = await getPartById(partId);
            setPart(transformPart(data));
            setSelectedPartition(data?.partitions?.partitionName);
            setImg(data?.image);
        } catch (error) {
            console.error(error);
        }
    };

    const makeOptionsListFromPartitions = (partitions) => {
        const newArr = [];

        partitions.forEach((element) => {
            newArr.push({
                value: element.partitionName,
                label: element.partitionName,
            });
        });

        return newArr;
    };

    return (
        <>
            {contextHolder}

            <AdminDashboard type="parts" />
            {!part ? (
                <LoadingPage />
            ) : (
                <div className="add-part container pt-100">
                    <div className="main-form">
                        <h1 className="main-form__title">
                            Редактирование комплектующей
                        </h1>

                        <div className="form-wrapper">
                            <form
                                onSubmit={handleSubmit((data) =>
                                    formSubmit(data)
                                )}
                                className="form"
                            >
                                <div className="form__general">
                                    <div className="form__general-img">
                                        <div className="form__general-img-label">
                                            Изображение:
                                        </div>

                                        <ImageUpload
                                            defaultImg={[
                                                {
                                                    uid: "1",
                                                    name: part?.name,
                                                    status: "done",
                                                    url: part?.image,
                                                },
                                            ]}
                                            img={img}
                                            isFormSubmitted={isFormSubmitted}
                                            setImg={setImg}
                                        />

                                        <p className="error-message">
                                            {isFormSubmitted
                                                ? img
                                                    ? null
                                                    : "Загрузите изображение"
                                                : null}
                                        </p>
                                    </div>

                                    <div className="form__general-part-name">
                                        <CustomInput
                                            defaultValue={part?.name}
                                            labelText="Название"
                                            name="name"
                                            minLength={3}
                                            require={true}
                                            register={register}
                                            errors={errors}
                                        />
                                    </div>

                                    <div className="form__general-price">
                                        <CustomInput
                                            defaultValue={part?.price}
                                            onlyPositiveDigits={true}
                                            labelText="Цена (BYN)"
                                            name="price"
                                            minLength={0}
                                            require={true}
                                            register={register}
                                            errors={errors}
                                        />
                                    </div>

                                    <div className="form__general-select-partition">
                                        <AloneSelect
                                            defaultValue={
                                                part?.partitions?.partitionName
                                            }
                                            setStateField={setSelectedPartition}
                                            name="Раздел"
                                            options={partitions}
                                            isError={
                                                isFormSubmitted
                                                    ? selectedPartition
                                                        ? null
                                                        : true
                                                    : null
                                            }
                                        />
                                        <p className="error-message">
                                            {isFormSubmitted
                                                ? selectedPartition
                                                    ? null
                                                    : "Выберите раздел"
                                                : null}
                                        </p>
                                    </div>

                                    <div className="form__general-description">
                                        <Textarea
                                            defaultValue={part?.description}
                                            labelText="Описание"
                                            name="description"
                                            minLength={20}
                                            require={true}
                                            register={register}
                                            errors={errors}
                                            rows={8}
                                        />
                                    </div>

                                    <div className="form__general-quantity-left">
                                        <CustomInput
                                            defaultValue={
                                                part?.remainingQuantity
                                            }
                                            onlyPositiveDigits={true}
                                            labelText="Оставшееся количество"
                                            name="remainingQuantity"
                                            minLength={0}
                                            register={register}
                                            errors={errors}
                                        />
                                    </div>

                                    <input
                                        onClick={() => setIsFormSubmitted(true)}
                                        className="form__submit-btn main-color-submit-btn"
                                        type="submit"
                                        value="Подтвердить"
                                    />
                                </div>

                                <div className="form__additional">
                                    {switchAdditionalForm({
                                        selectedCategory:
                                            part?.categories?.categoryName,
                                        selectedType:
                                            part?.types?.alternativeName,
                                        register,
                                        unregister,
                                        errors,
                                        part,
                                        isEditForm: true,
                                    })}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditPart;
