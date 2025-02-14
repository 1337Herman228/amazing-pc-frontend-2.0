"use client";

import { useEffect, useState } from "react";
import "./AddPart.scss";
import { FieldValues, useForm } from "react-hook-form";
import { notification } from "antd";
import {
    makeOptionsList,
    makePartCollectionRecord,
    saveImg,
} from "@/lib/functions";
import useFetch from "@/lib/hooks/useFetch";
import AdminDashboard from "@/components/navbar/admin/admin-dashboard/AdminDashboard";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import AloneSelect from "@/components/select/antd-alone-select/AloneSelect";
import ImageUpload from "@/components/upload-image/ImageUpload";
import CustomInput from "@/components/inputs/custom-input/CustomInput";
import Textarea from "@/components/textarea/Textarea";
import { ICategory, IPartition, IType } from "@/interfaces/types-v2";
import PartForm from "@/components/forms/part-forms/PartForm";
import { NOT_SELECTED_OPTION } from "@/constants";

const AddPart = () => {
    const [api, contextHolder] = notification.useNotification();
    const succesNotification = () => {
        api["success"]({
            message: "Успешно",
            description: "Новая комплектующая успешна добавлена.",
        });
    };
    const errorNotification = () => {
        api["error"]({
            message: "Ошибка",
            description: "Не удалось добавить новую комплектующую.",
        });
    };

    const { getTypes, getCategories, getPartitions, addPart, isLoading } =
        useFetch();
    const {
        register,
        unregister,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [img, setImg] = useState(null);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const [typesOptions, setTypesOptions] = useState<IType[]>([]);
    const [partitionsOptions, setPartitionsOptions] = useState<IPartition[]>(
        []
    );
    const [categoriesOptions, setCategoriesOptions] = useState<ICategory[]>([]);

    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
        null
    );
    const [selectedType, setSelectedType] = useState<IType | null>(null);
    const [selectedPartition, setSelectedPartition] =
        useState<IPartition | null>(null);

    const formSubmit = async (data: FieldValues) => {
        try {
            if (
                img &&
                selectedPartition?.value &&
                selectedType &&
                selectedCategory
            ) {
                const object = makePartCollectionRecord(
                    undefined,
                    data,
                    selectedCategory,
                    selectedType,
                    selectedPartition
                );

                await addPart(object);
                await saveImg(data.name, img);

                succesNotification();
            } else {
                errorNotification();
            }
        } catch {
            errorNotification();
        }
    };

    useEffect(() => {
        fetchTypes();
        fetchPartitions();
        fetchCategories();
    }, []);

    const fetchTypes = async () => {
        try {
            const data: IType[] = await getTypes();
            setTypesOptions(makeOptionsList(data, [NOT_SELECTED_OPTION]));
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategoriesOptions(makeOptionsList(data, [NOT_SELECTED_OPTION]));
        } catch (error) {
            console.error(error);
        }
    };

    const fetchPartitions = async () => {
        try {
            const data = await getPartitions();
            setPartitionsOptions(makeOptionsList(data, [NOT_SELECTED_OPTION]));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {contextHolder}

            <AdminDashboard type="parts" />
            {isLoading ? (
                <LoadingPage />
            ) : (
                <div className="add-part container pt-100">
                    <aside className="manage-form">
                        <AloneSelect
                            value={selectedCategory || categoriesOptions[0]}
                            setStateField={setSelectedCategory}
                            name="Категория"
                            options={categoriesOptions}
                        />

                        <AloneSelect
                            value={selectedType || typesOptions[0]}
                            setStateField={setSelectedType}
                            name="Тип"
                            options={typesOptions}
                        />
                    </aside>
                    <aside className="main-form">
                        {!selectedCategory?.value ? (
                            <h1 className="main-form__title">
                                Выберите категорию
                            </h1>
                        ) : !selectedType?.value ? (
                            <h1 className="main-form__title">Выберите тип</h1>
                        ) : (
                            <>
                                <h1 className="main-form__title">
                                    Добавление комплектующей
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
                                                    img={img}
                                                    isFormSubmitted={
                                                        isFormSubmitted
                                                    }
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
                                                    onlyPositiveDigits={true}
                                                    labelText="Цена"
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
                                                    value={
                                                        selectedPartition ||
                                                        partitionsOptions[0]
                                                    }
                                                    setStateField={
                                                        setSelectedPartition
                                                    }
                                                    name="Раздел"
                                                    options={partitionsOptions}
                                                    isError={
                                                        isFormSubmitted
                                                            ? selectedPartition
                                                                ? undefined
                                                                : true
                                                            : undefined
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
                                                    defaultValue={"0"}
                                                    type="number"
                                                    onlyPositiveDigits={true}
                                                    labelText="Оставшееся количество"
                                                    name="remainingQuantity"
                                                    minLength={0}
                                                    register={register}
                                                    errors={errors}
                                                    unregister={unregister}
                                                />
                                            </div> */}

                                            <input
                                                onClick={() =>
                                                    setIsFormSubmitted(true)
                                                }
                                                className="form__submit-btn main-color-submit-btn"
                                                type="submit"
                                                value="Подтвердить"
                                            />
                                        </div>

                                        <div className="form__additional">
                                            <PartForm
                                                categoryValue={
                                                    selectedCategory.value
                                                }
                                                typeValue={selectedType.value}
                                                register={register}
                                                unregister={unregister}
                                                errors={errors}
                                                part={null}
                                            />
                                        </div>
                                    </form>
                                </div>
                            </>
                        )}
                    </aside>
                </div>
            )}
        </>
    );
};

export default AddPart;
