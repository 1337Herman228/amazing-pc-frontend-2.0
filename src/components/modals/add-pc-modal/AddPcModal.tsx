"use client";

import { ConfigProvider, Modal, notification, Spin } from "antd";
import "../../inputs/custom-input/CustomInput.scss";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    ConfiguratorFieldValues,
    IAddPCDto,
    IConfiguration,
    IOptionTemplate,
    IPcCategory,
    IPcType,
} from "@/interfaces/types-v2";
import ControlledImageUpload from "@/components/upload-image/ControlledImageUpload";
import CustomInput from "@/components/inputs/custom-input/CustomInput";
import ControlledSelect from "@/components/select/ControlledSelect/ControlledSelect";
import useFetch from "@/lib/hooks/useFetch";
import { LoadingOutlined } from "@ant-design/icons";
import "./AddPcModal.scss";
import {
    createImgName,
    createImgPath,
    editImg,
    saveImg,
} from "@/lib/functions";
import Textarea from "@/components/textarea/Textarea";

const bg_color = "#111";
const modalStyles = {
    mask: {
        backdropFilter: "blur(3px)",
    },
    content: {
        color: "white",
        backgroundColor: bg_color,
        borderRadius: "5px",
    },
};

interface IAddPcFormFields {
    image: any;
    name: string;
    pcTypes: IPcType;
    pcCategories: IPcCategory;
    pcModelGroup: IOptionTemplate;
    description: string;
}

interface AddPcModalProps {
    open: boolean;
    handleCancel: () => void;
    products: ConfiguratorFieldValues;
    config?: IConfiguration;
}

const AddPcModal = ({
    config,
    open,
    handleCancel,
    products,
}: AddPcModalProps) => {
    const [api, contextHolder] = notification.useNotification();
    const succesNotification = () => {
        api["success"]({
            message: "Успешно",
            description: `Конфигурация успешно ${
                !!config?.id ? "измена!" : "добавлена!"
            }!`,
        });
    };
    const errorNotification = () => {
        api["error"]({
            message: "Ошибка",
            description: `Не удалось ${
                !!config?.id ? "изменить" : "добавить"
            } конфигурацию!`,
        });
    };
    const alreadyExistErrorNotification = () => {
        api["error"]({
            message: "Ошибка",
            description: "Модельная группа с таким именем уже существует!",
        });
    };

    const {
        getPcModelGroupsReduced,
        editPc,
        addPc,
        getPcTypes,
        getPcCategories,
    } = useFetch();

    const [pcTypes, setPcTypes] = useState<IPcType[] | null>(null);
    const [pcModelGroups, setPcModelGroups] = useState<
        IOptionTemplate[] | null
    >(null);
    const [pcCategories, setPcCategories] = useState<IPcCategory[] | null>(
        null
    );

    const { reset, register, unregister, handleSubmit, control, formState } =
        useForm<IAddPcFormFields>();

    const { errors } = formState;

    const resetForm = () =>
        reset({
            image: {
                uid: "1",
                name: "1",
                status: "done",
                url: config?.image,
            },
            name: config?.name,
            pcTypes: config?.pcTypes,
            pcCategories: config?.pcCategories,
            pcModelGroup: {
                id: config?.pcModelGroup?.id,
                value: config?.pcModelGroup?.modelGroupName,
                label: config?.pcModelGroup?.modelGroupName,
            },
            description: config?.description,
        });

    const firstRender = async () => {
        const types = await getPcTypes();
        const categories = await getPcCategories();
        const pcModelGroups = await getPcModelGroupsReduced();
        setPcTypes(types);
        setPcCategories(categories);
        setPcModelGroups(pcModelGroups);
    };

    useEffect(() => {
        firstRender();
    }, []);

    useEffect(() => {
        if (open && !!config?.id) resetForm();
    }, [open]);

    const formSubmit = async (data: IAddPcFormFields) => {
        try {
            const pcImageName = createImgName(data.name, "pcName");

            const dataToAdd: IAddPCDto = {
                id: config?.id,
                image: createImgPath(pcImageName),
                pcTypeId: data.pcTypes.id,
                pcCategoryId: data.pcCategories.id,
                pcModelGroupId: data.pcModelGroup.id,
                description: data.description,
                name: data.name,
                cpuId: products.cpu.id,
                gpuId: products.gpu.id,
                motherboardId: products.motherboard.id,
                cpuFanId: products.cpu_fan.id,
                ramId: products.ram.id,
                psuId: products.psu.id,
                pcCaseId: products?.cases?.id || null,
                ssd: products.ssd.map((el) => ({
                    quantity: el.quantity,
                    partId: el.part.id,
                })),
                fans: products.fan.map((el) => ({
                    quantity: el.quantity,
                    partId: el.part.id,
                })),
            };

            let response;
            if (!!config?.id) response = await editPc(dataToAdd);
            else response = await addPc(dataToAdd);

            if (response === "CONFLICT") throw new Error("CONFLICT");

            if (response === "INTERNAL_SERVER_ERROR")
                throw new Error("INTERNAL_SERVER_ERROR");

            if (!!config?.id)
                await editImg(
                    config!.image!.replace("/uploads/", "").replace(".jpg", ""),
                    pcImageName,
                    data.image
                );
            else await saveImg(pcImageName, data.image);

            succesNotification();
        } catch (error) {
            if (error instanceof Error && error.message === "CONFLICT")
                alreadyExistErrorNotification();
            else if (
                error instanceof Error &&
                error.message === "INTERNAL_SERVER_ERROR"
            )
                errorNotification();
        }
    };

    if (!pcTypes || !pcCategories || !pcModelGroups)
        return (
            <div className="spinner-container w-full h-full flex justify-center place-items-center">
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: "#c0ff01",
                        },
                    }}
                >
                    <Spin
                        indicator={
                            <LoadingOutlined
                                style={{
                                    fontSize: 50,
                                }}
                                spin
                            />
                        }
                    />
                </ConfigProvider>
            </div>
        );

    return (
        <ConfigProvider
            modal={{
                styles: modalStyles,
            }}
        >
            <Modal
                onCancel={handleCancel}
                centered
                open={open}
                width={550}
                footer={null}
                className="add-pc-modal-form"
            >
                {contextHolder}
                <form
                    onSubmit={handleSubmit((data) => formSubmit(data))}
                    className="add-type__form overflow-auto"
                >
                    <div className="pb-2.5 flex flex-col gap-2.5">
                        <div className="text-xl pb-3">
                            Добавление компьютера
                        </div>

                        <ControlledImageUpload
                            name="image"
                            control={control}
                            formState={formState}
                            label="Изображение модельной группы"
                            defaultImgUrl={config?.image}
                        />

                        <CustomInput
                            labelText="Название компьютера"
                            name="name"
                            minLength={3}
                            require={true}
                            register={register}
                            errors={errors}
                            unregister={unregister}
                            placeholder="Lumen Core Max"
                            defaultValue={config?.name}
                        />

                        <ControlledSelect
                            placeholder="Выберите тип"
                            label="Тип ПК"
                            name="pcTypes"
                            control={control}
                            options={pcTypes}
                            errors={errors}
                            style={{ height: 45 }}
                        />

                        <ControlledSelect
                            placeholder="Выберите категорию"
                            label="Категория ПК"
                            name="pcCategories"
                            control={control}
                            options={pcCategories}
                            errors={errors}
                            style={{ height: 45 }}
                        />

                        <ControlledSelect
                            placeholder="Выберите семейство ПК"
                            label="Модельная группа ПК"
                            name="pcModelGroup"
                            control={control}
                            options={pcModelGroups}
                            errors={errors}
                            style={{ height: 45 }}
                        />

                        <Textarea
                            labelText="Описание"
                            name="description"
                            minLength={20}
                            require={true}
                            register={register}
                            errors={errors}
                            rows={5}
                        />

                        <input
                            className="add-type__form-submit-btn main-color-submit-btn text-black !px-6 mt-3 w-full"
                            type="submit"
                            value="Подтвердить"
                        />
                    </div>
                </form>
            </Modal>
        </ConfigProvider>
    );
};

export default AddPcModal;
