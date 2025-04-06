"use client";

import { notification, UploadFile } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import AdminDashboard from "@/components/navbar/admin/admin-dashboard/AdminDashboard";
import CustomInput from "@/components/inputs/custom-input/CustomInput";
import useFetch from "@/lib/hooks/useFetch";
import {
    IAddPcModelGroup,
    IPcCategory,
    IPcModelGroup,
    IPcType,
} from "@/interfaces/types-v2";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import ControlledSelect from "@/components/select/ControlledSelect/ControlledSelect";
import ControlledImageUpload from "@/components/upload-image/ControlledImageUpload";
import Textarea from "@/components/textarea/Textarea";
import { createImgName, createImgPath, editImg } from "@/lib/functions";
import { useParams } from "next/navigation";

export interface IFormFields extends FieldValues {
    modelGroupImage: any;
    modelGroupName: string;
    modelGroupDescription: string;

    pcTypes: IPcType;
    pcCategories: IPcCategory;

    cpuDescription: string;
    gpuDescription: string;
    motherboardDescription: string;
    ramDescription: string;
    ssdDescription: string;
    psuDescription: string;

    headerImage: any;
    headerImageMobile: any;
    headerDescription: string;

    designImage: any;
    designTitle: string;
    designDescription: string;

    performanceTitle: string;
    performanceDescription: string;
    performanceImage: any;
}

const EditPcModelGroupsPage = () => {
    const params = useParams();
    const id = params?.id;

    const {
        editPcModelGroup,
        getPcModelGroupById,
        getPcTypes,
        getPcCategories,
    } = useFetch();

    const [api, contextHolder] = notification.useNotification();
    const succesNotification = () => {
        api["success"]({
            message: "Успешно",
            description: "Модельная группа ПК успешно изменена!",
        });
    };
    const errorNotification = () => {
        api["error"]({
            message: "Ошибка",
            description: "Не удалось изменить модельную группу ПК!",
        });
    };
    const alreadyExistErrorNotification = () => {
        api["error"]({
            message: "Ошибка",
            description: "Модельная группа с таким именем уже существует!",
        });
    };

    const [pcModelGroup, setPcModelGroup] = useState<IPcModelGroup | null>(
        null
    );
    const [pcTypes, setPcTypes] = useState<IPcType[] | null>(null);
    const [pcCategories, setPcCategories] = useState<IPcCategory[] | null>(
        null
    );

    const { reset, register, unregister, handleSubmit, control, formState } =
        useForm<IFormFields>();

    const { errors } = formState;

    const formSubmit = async (data: IFormFields) => {
        try {
            const modelGroupImageName = createImgName(
                data.modelGroupName,
                "modelGroupImage"
            );

            const headerImageName = createImgName(
                data.modelGroupName,
                "headerImage"
            );

            const headerImageMobileName = createImgName(
                data.modelGroupName,
                "headerImageMobile"
            );

            const designImageName = createImgName(
                data.modelGroupName,
                "designImage"
            );

            const performanceImageName = createImgName(
                data.modelGroupName,
                "performanceImage"
            );

            const dataToEdit: IAddPcModelGroup = {
                id: pcModelGroup?.id,
                modelGroupImage: createImgPath(modelGroupImageName),
                modelGroupName: data.modelGroupName,
                modelGroupDescription: data.modelGroupDescription,
                pcTypeId: data.pcTypes.id,
                pcCategoryId: data.pcCategories.id,
                cpuDescription: data.cpuDescription,
                gpuDescription: data.gpuDescription,
                motherboardDescription: data.motherboardDescription,
                ramDescription: data.ramDescription,
                ssdDescription: data.ssdDescription,
                psuDescription: data.psuDescription,
                headerImage: createImgPath(headerImageName),
                headerImageMobile: createImgPath(headerImageMobileName),
                headerDescription: data.headerDescription,
                designImage: createImgPath(designImageName),
                designTitle: data.designTitle,
                designDescription: data.designDescription,
                performanceTitle: data.performanceTitle,
                performanceDescription: data.performanceDescription,
                performanceImage: createImgPath(performanceImageName),
            };
            const response = await editPcModelGroup(dataToEdit);

            if (response === "CONFLICT") throw new Error("CONFLICT");

            await Promise.all([
                editImg(
                    pcModelGroup!.modelGroupImage
                        .replace("/uploads/", "")
                        .replace(".jpg", ""),
                    modelGroupImageName,
                    data.modelGroupImage
                ),
                editImg(
                    pcModelGroup!.headerImage
                        .replace("/uploads/", "")
                        .replace(".jpg", ""),
                    headerImageName,
                    data.headerImage
                ),
                editImg(
                    pcModelGroup!.headerImageMobile
                        .replace("/uploads/", "")
                        .replace(".jpg", ""),
                    headerImageMobileName,
                    data.headerImageMobile
                ),
                editImg(
                    pcModelGroup!.designImage
                        .replace("/uploads/", "")
                        .replace(".jpg", ""),
                    designImageName,
                    data.designImage
                ),
                editImg(
                    pcModelGroup!.performanceImage
                        .replace("/uploads/", "")
                        .replace(".jpg", ""),
                    performanceImageName,
                    data.performanceImage
                ),
            ]);
            succesNotification();
            fetchPcModelGroup();
        } catch (error) {
            if (error instanceof Error && error.message === "CONFLICT")
                alreadyExistErrorNotification();
            else errorNotification();
        }
    };

    const firstRender = async () => {
        const types = await getPcTypes();
        const categories = await getPcCategories();
        setPcTypes(types);
        setPcCategories(categories);
    };

    const fetchPcModelGroup = async () => {
        if (id && pcTypes && pcCategories) {
            const data = await getPcModelGroupById(id as string);
            setPcModelGroup(data);
            putDefaultValues(data);
        }
    };

    const putDefaultValues = (pcModelGroup: IPcModelGroup) => {
        reset({
            modelGroupName: pcModelGroup.modelGroupName,
            modelGroupImage: {
                uid: "1",
                name: "1",
                status: "done",
                url: pcModelGroup.modelGroupImage,
            },
            modelGroupDescription: pcModelGroup.modelGroupDescription,
            pcTypes: pcTypes?.find(
                (type) => type.id === pcModelGroup.pcTypes.id
            ),
            pcCategories: pcCategories?.find(
                (category) => category.id === pcModelGroup.pcCategories.id
            ),
            cpuDescription: pcModelGroup.cpuDescription,
            gpuDescription: pcModelGroup.gpuDescription,
            motherboardDescription: pcModelGroup.motherboardDescription,
            ramDescription: pcModelGroup.ramDescription,
            ssdDescription: pcModelGroup.ssdDescription,
            psuDescription: pcModelGroup.psuDescription,
            headerImage: {
                uid: "2",
                name: "3",
                status: "done",
                url: pcModelGroup.headerImage,
            },
            headerImageMobile: {
                uid: "3",
                name: "3",
                status: "done",
                url: pcModelGroup.headerImageMobile,
            },
            headerDescription: pcModelGroup.headerDescription,
            designImage: {
                uid: "4",
                name: "4",
                status: "done",
                url: pcModelGroup.designImage,
            },
            designTitle: pcModelGroup.designTitle,
            designDescription: pcModelGroup.designDescription,
            performanceImage: {
                uid: "5",
                name: "5",
                status: "done",
                url: pcModelGroup.performanceImage,
            },
            performanceTitle: pcModelGroup.performanceTitle,
            performanceDescription: pcModelGroup.performanceDescription,
        });
    };

    useEffect(() => {
        firstRender();
    }, []);

    useEffect(() => {
        fetchPcModelGroup();
    }, [id, pcTypes, pcCategories]);

    if (!pcTypes || !pcCategories || !pcModelGroup) return <LoadingPage />;

    return (
        <>
            {contextHolder}
            <AdminDashboard type="pc" />

            <div className="container !my-[200px] ">
                <div className="form-container horizontal_centered">
                    <form
                        onSubmit={handleSubmit((data) => formSubmit(data))}
                        className="add-type__form "
                    >
                        <h1 className="!text-[30px] !mb-8 uppercase">
                            Редактирование модельной группы ПК
                        </h1>

                        <div className="mb-10">
                            <ControlledImageUpload
                                name="modelGroupImage"
                                control={control}
                                formState={formState}
                                label="Изображение модельной группы"
                                defaultImgUrl={pcModelGroup.modelGroupImage}
                            />
                            <CustomInput
                                labelText="Название модельной группы"
                                name="modelGroupName"
                                minLength={3}
                                require={true}
                                register={register}
                                errors={errors}
                                unregister={unregister}
                                placeholder="Lumen Core"
                            />

                            <Textarea
                                labelText="Описание модельной группы"
                                name="modelGroupDescription"
                                minLength={20}
                                require={true}
                                register={register}
                                errors={errors}
                                rows={6}
                            />
                        </div>

                        <div className="mb-10">
                            <ControlledSelect
                                placeholder="Выберите тип ПК"
                                label="Тип ПК"
                                name="pcTypes"
                                control={control}
                                options={pcTypes}
                                errors={errors}
                                style={{ height: 45 }}
                            />

                            <ControlledSelect
                                placeholder="Выберите категорию ПК"
                                label="Категория ПК"
                                name="pcCategories"
                                control={control}
                                options={pcCategories}
                                errors={errors}
                                style={{ height: 45 }}
                            />
                        </div>

                        <div className="mb-10">
                            <Textarea
                                labelText="Описание процессоров"
                                name="cpuDescription"
                                minLength={15}
                                require={true}
                                register={register}
                                errors={errors}
                                rows={2}
                            />
                            <Textarea
                                labelText="Описание видеокарт"
                                name="gpuDescription"
                                minLength={15}
                                require={true}
                                register={register}
                                errors={errors}
                                rows={2}
                            />
                            <Textarea
                                labelText="Описание материнских плат"
                                name="motherboardDescription"
                                minLength={15}
                                require={true}
                                register={register}
                                errors={errors}
                                rows={2}
                            />
                            <Textarea
                                labelText="Описание оперативной памяти"
                                name="ramDescription"
                                minLength={15}
                                require={true}
                                register={register}
                                errors={errors}
                                rows={2}
                            />
                            <Textarea
                                labelText="Описание твердотельных накопителей"
                                name="ssdDescription"
                                minLength={15}
                                require={true}
                                register={register}
                                errors={errors}
                                rows={2}
                            />
                            <Textarea
                                labelText="Описание блоков питания"
                                name="psuDescription"
                                minLength={15}
                                require={true}
                                register={register}
                                errors={errors}
                                rows={2}
                            />
                        </div>

                        <div className="mb-10">
                            <ControlledImageUpload
                                name="headerImage"
                                control={control}
                                formState={formState}
                                label="Изображение верхнего банера"
                                defaultImgUrl={pcModelGroup.headerImage}
                            />
                            <ControlledImageUpload
                                name="headerImageMobile"
                                control={control}
                                formState={formState}
                                label="Изображение верхнего банера (мобильная версия)"
                                defaultImgUrl={pcModelGroup.headerImage}
                            />

                            <Textarea
                                labelText="Описание верхнего банера"
                                name="headerDescription"
                                minLength={20}
                                require={true}
                                register={register}
                                errors={errors}
                                rows={4}
                            />
                        </div>

                        <div className="mb-10">
                            <ControlledImageUpload
                                name="designImage"
                                control={control}
                                formState={formState}
                                label='Изображение блока "Дизайн"'
                                defaultImgUrl={pcModelGroup.designImage}
                            />
                            <CustomInput
                                labelText='Заголовок блока "Дизайн"'
                                name="designTitle"
                                minLength={3}
                                require={true}
                                register={register}
                                errors={errors}
                                unregister={unregister}
                                placeholder="Современный дизайн"
                            />

                            <Textarea
                                labelText='Описание блока "Дизайн"'
                                name="designDescription"
                                minLength={20}
                                require={true}
                                register={register}
                                errors={errors}
                                rows={6}
                            />
                        </div>

                        <div className="mb-10">
                            <ControlledImageUpload
                                name="performanceImage"
                                control={control}
                                formState={formState}
                                label='Изображение блока "Производительность"'
                                defaultImgUrl={pcModelGroup.performanceImage}
                            />

                            <CustomInput
                                labelText='Заголовок блока "Производительность"'
                                name="performanceTitle"
                                minLength={3}
                                require={true}
                                register={register}
                                errors={errors}
                                unregister={unregister}
                                placeholder="Мощность"
                            />

                            <Textarea
                                labelText='Описание блока "Производительность"'
                                name="performanceDescription"
                                minLength={20}
                                require={true}
                                register={register}
                                errors={errors}
                                rows={6}
                            />
                        </div>

                        <input
                            className="add-type__form-submit-btn main-color-submit-btn text-black !px-6 mt-3 w-full"
                            type="submit"
                            value="Изменить"
                        />
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditPcModelGroupsPage;
