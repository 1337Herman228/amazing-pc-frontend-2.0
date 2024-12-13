"use client";

import { useEffect, useState } from "react";
import "./AddPart.scss";
import { useForm } from "react-hook-form";
import { notification } from "antd";
import {
    makePartEntityObject,
    saveImg,
    switchAdditionalForm,
} from "@/lib/functions";
import useFetch from "@/lib/hooks/useFetch";
import AdminDashboard from "@/components/navbar/admin/admin-dashboard/AdminDashboard";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import AloneSelect from "@/components/select/antd-alone-select/AloneSelect";
import ImageUpload from "@/components/upload-image/ImageUpload";
import CustomInput from "@/components/inputs/custom-input/CustomInput";
import Textarea from "@/components/textarea/Textarea";
import { IOption, IPartition, IType } from "@/interfaces/types";

const categories: IOption[] = [
    {
        value: "Комплектующие",
        label: "Комплектующие",
    },
    {
        value: "Периферия",
        label: "Периферия",
    },
];

const makeOptionsListFromTypes = (types: IType[]) => {
    const newArr: IOption[] = [];

    types.forEach((element) => {
        newArr.push({
            value: element.alternativeName,
            label: element.alternativeName,
        });
    });

    return newArr;
};

const makeOptionsListFromPartitions = (partitions: IPartition[]) => {
    const newArr: IOption[] = [];

    partitions.forEach((element) => {
        newArr.push({
            value: element.partitionName,
            label: element.partitionName,
        });
    });

    return newArr;
};

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

    const { getTypes, getPartitions, addPart, isLoading } = useFetch();
    const {
        register,
        unregister,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [img, setImg] = useState(null);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const [typesOptions, setTypesOptions] = useState<IOption[]>([]);
    const [partitionsOptions, setPartitionsOptions] = useState<IOption[]>([]);

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedPartition, setSelectedPartition] = useState("");

    const formSubmit = async (data: any) => {
        try {
            if (img && selectedPartition) {
                const object = makePartEntityObject({
                    data,
                    selectedCategory,
                    selectedType,
                    selectedPartition,
                });

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
    }, []);

    const fetchTypes = async () => {
        try {
            const data = await getTypes();
            setTypesOptions(makeOptionsListFromTypes(data));
        } catch (error) {
            console.error(error);
        }
    };
    const fetchPartitions = async () => {
        try {
            const data = await getPartitions();
            setPartitionsOptions(makeOptionsListFromPartitions(data));
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
                            setStateField={setSelectedCategory}
                            name="Категория"
                            options={categories}
                        />
                        <AloneSelect
                            setStateField={setSelectedType}
                            name="Тип"
                            options={typesOptions}
                        />
                    </aside>
                    <aside className="main-form">
                        {!selectedCategory ? (
                            <h1 className="main-form__title">
                                Выберите категорию
                            </h1>
                        ) : !selectedType ? (
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
                                                />
                                            </div>

                                            <div className="form__general-price">
                                                <CustomInput
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

                                            <div className="form__general-quantity-left">
                                                <CustomInput
                                                    defaultValue={"0"}
                                                    type="number"
                                                    onlyPositiveDigits={true}
                                                    labelText="Оставшееся количество"
                                                    name="remainingQuantity"
                                                    minLength={0}
                                                    register={register}
                                                    errors={errors}
                                                />
                                            </div>

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
                                            {switchAdditionalForm({
                                                selectedCategory,
                                                isFormSubmitted,
                                                selectedType,
                                                register,
                                                unregister,
                                                errors,
                                            })}
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
