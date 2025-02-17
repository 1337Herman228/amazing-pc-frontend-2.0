"use client";

import { useEffect, useState } from "react";
import "../add-part/AddPart.scss";
import { FieldValues, useForm } from "react-hook-form";
import { notification } from "antd";
import ImageUpload from "@/components/upload-image/ImageUpload";
import {
    deleteImg,
    makeOptionsList,
    makePartCollectionRecord,
    saveImg,
} from "@/lib/functions";
import AdminDashboard from "@/components/navbar/admin/admin-dashboard/AdminDashboard";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import CustomInput from "@/components/inputs/custom-input/CustomInput";
import AloneSelect from "@/components/select/antd-alone-select/AloneSelect";
import Textarea from "@/components/textarea/Textarea";
import useFetch from "@/lib/hooks/useFetch";
import { useParams } from "next/navigation";
import { IOptionTemplate, IPart, IPartition } from "@/interfaces/types-v2";
import PartForm from "@/components/forms/part-forms/PartForm";
import { GENERAL_CHOICE_OPTION } from "@/constants";

export interface IPartFormFields {
    name: number;
    description: number;
}

const EditPart = () => {
    const params = useParams();
    const partId = params?.id;

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

    const [img, setImg] = useState<string | null>(null);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const [partitions, setPartitions] = useState<IOptionTemplate[]>([]);
    const [part, setPart] = useState<IPart | null>(null);

    const [selectedPartition, setSelectedPartition] =
        useState<IPartition | null>(null);

    const formSubmit = async (data: FieldValues) => {
        try {
            if (img && selectedPartition && part) {
                const object = makePartCollectionRecord(
                    part,
                    data,
                    part?.categories,
                    part?.types,
                    selectedPartition
                );
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
            setPartitions(makeOptionsList(data, [GENERAL_CHOICE_OPTION]));
        } catch (error) {
            console.error(error);
        }
    };

    const fetchPart = async () => {
        try {
            if (partId) {
                const data: IPart = await getPartById(partId as string);
                setPart(data);
                setSelectedPartition(data?.partitions);
                setImg(data?.image);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const isLoading = !partId || !partitions || !part;

    return (
        <>
            {contextHolder}

            <AdminDashboard type="parts" />
            {isLoading ? (
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
                                            unregister={unregister}
                                        />
                                    </div>

                                    <div className="form__general-price">
                                        <CustomInput
                                            defaultValue={String(part?.price)}
                                            onlyPositiveDigits={true}
                                            labelText="Цена (BYN)"
                                            name="price"
                                            minLength={0}
                                            require={true}
                                            register={register}
                                            errors={errors}
                                            unregister={unregister}
                                        />
                                    </div>

                                    <div className="form__general-select-partition">
                                        <AloneSelect
                                            defaultValue={part?.partitions}
                                            value={
                                                selectedPartition ||
                                                partitions[0]
                                            }
                                            setStateField={setSelectedPartition}
                                            name="Раздел"
                                            options={partitions}
                                            isError={
                                                isFormSubmitted
                                                    ? !!selectedPartition
                                                        ? false
                                                        : true
                                                    : false
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

                                    {/* <div className="form__general-quantity-left">
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
                                    </div> */}

                                    <input
                                        onClick={() => setIsFormSubmitted(true)}
                                        className="form__submit-btn main-color-submit-btn text-gray-800"
                                        type="submit"
                                        value="Подтвердить"
                                    />
                                </div>

                                <PartForm
                                    categoryValue={part.categories.value}
                                    typeValue={part.types.value}
                                    register={register}
                                    unregister={unregister}
                                    errors={errors}
                                    part={part}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditPart;
