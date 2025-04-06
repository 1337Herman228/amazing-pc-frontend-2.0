"use client";

import { notification } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import AdminDashboard from "@/components/navbar/admin/admin-dashboard/AdminDashboard";
import CustomInput from "@/components/inputs/custom-input/CustomInput";
import useFetch from "@/lib/hooks/useFetch";
import { IAddPcModelGroup, IPcCategory, IPcType } from "@/interfaces/types-v2";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import ControlledSelect from "@/components/select/ControlledSelect/ControlledSelect";
import ControlledImageUpload from "@/components/upload-image/ControlledImageUpload";
import Textarea from "@/components/textarea/Textarea";
import { createImgName, createImgPath, saveImg } from "@/lib/functions";

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

const AddPcModelGroupsPage = () => {
    const { addPcModelGroups, getPcTypes, getPcCategories } = useFetch();

    const [api, contextHolder] = notification.useNotification();
    const succesNotification = () => {
        api["success"]({
            message: "Успешно",
            description: "Новая модельная группа ПК успешно добавлена!",
        });
    };
    const errorNotification = () => {
        api["error"]({
            message: "Ошибка",
            description: "Не удалось добавить модельную группу ПК!",
        });
    };
    const alreadyExistErrorNotification = () => {
        api["error"]({
            message: "Ошибка",
            description: "Модельная группа с таким именем уже существует!",
        });
    };

    const [pcTypes, setPcTypes] = useState<IPcType[] | null>(null);
    const [pcCategories, setPcCategories] = useState<IPcCategory[] | null>(
        null
    );

    const { register, unregister, handleSubmit, control, formState } =
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

            const dataToAdd: IAddPcModelGroup = {
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

            const response = await addPcModelGroups(dataToAdd);

            if (response === "CONFLICT") throw new Error("CONFLICT");

            await Promise.all([
                saveImg(modelGroupImageName, data.modelGroupImage),
                saveImg(headerImageName, data.headerImage),
                saveImg(headerImageMobileName, data.headerImageMobile),
                saveImg(designImageName, data.designImage),
                saveImg(performanceImageName, data.performanceImage),
            ]);

            succesNotification();
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

    useEffect(() => {
        firstRender();
    }, []);

    if (!pcTypes || !pcCategories) return <LoadingPage />;

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
                            Добавление модельной группы ПК
                        </h1>

                        <div className="mb-10">
                            <ControlledImageUpload
                                name="modelGroupImage"
                                control={control}
                                formState={formState}
                                label="Изображение модельной группы"
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
                            />
                            <ControlledImageUpload
                                name="headerImageMobile"
                                control={control}
                                formState={formState}
                                label="Изображение верхнего банера (мобильная версия)"
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
                            value="Добавить"
                        />
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddPcModelGroupsPage;
