// @ts-nocheck

import "./PartForms.scss";
import { useEffect, useState } from "react";
import AloneSelect from "../../select/antd-alone-select/AloneSelect";
import CustomInput from "@/components/inputs/custom-input/CustomInput";

const CpuAirCoolingForm = ({
    register,
    unregister,
    errors,
    isEditForm,
    cpuAirCooling,
}) => {
    useEffect(() => {
        return () => {
            unregister("fansQuantity");
            unregister("fanSize");
            unregister("tdp");
            unregister("backlight");
            unregister("height");
            unregister("fanSpeed");
            unregister("airFlow");
            unregister("maxNoiseLevel");
            unregister("connector");
            unregister("sockets");
        };
    }, []);

    return (
        <div className="cpu-air-cooling-form">
            <div className="cpu-air-cooling-form__input">
                <CustomInput
                    defaultValue={isEditForm ? cpuAirCooling?.fansQuantity : ""}
                    onlyPositiveDigits={true}
                    labelText="Количество вентиляторов"
                    require={true}
                    name="fansQuantity"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="cpu-air-cooling-form__input">
                <CustomInput
                    defaultValue={isEditForm ? cpuAirCooling?.fanSize : ""}
                    labelText="Размер вентилятора"
                    require={true}
                    name="fanSize"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="cpu-air-cooling-form__input">
                <CustomInput
                    defaultValue={isEditForm ? cpuAirCooling?.tdp : ""}
                    onlyPositiveDigits={true}
                    labelText="Тепловыделение (Вт)"
                    require={true}
                    name="tdp"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="cpu-air-cooling-form__input">
                <CustomInput
                    defaultValue={isEditForm ? cpuAirCooling?.backlight : ""}
                    labelText="Подсветка"
                    require={true}
                    name="backlight"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="cpu-air-cooling-form__input">
                <CustomInput
                    defaultValue={isEditForm ? cpuAirCooling?.height : ""}
                    onlyPositiveDigits={true}
                    labelText="Высота (мм)"
                    require={true}
                    name="height"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="cpu-air-cooling-form__input">
                <CustomInput
                    defaultValue={isEditForm ? cpuAirCooling?.fanSpeed : ""}
                    labelText="Скорость вентилятора"
                    require={true}
                    name="fanSpeed"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="cpu-air-cooling-form__input">
                <CustomInput
                    defaultValue={isEditForm ? cpuAirCooling?.airFlow : ""}
                    onlyPositiveDigits={true}
                    labelText="Воздушный поток (м³/ч)"
                    require={true}
                    name="airFlow"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="cpu-air-cooling-form__input">
                <CustomInput
                    defaultValue={
                        isEditForm ? cpuAirCooling?.maxNoiseLevel : ""
                    }
                    labelText="Максимальный уровень шума (дБ)"
                    require={true}
                    name="maxNoiseLevel"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="cpu-air-cooling-form__input">
                <CustomInput
                    defaultValue={isEditForm ? cpuAirCooling?.connector : ""}
                    labelText="Тип подключения"
                    require={true}
                    name="connector"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="cpu-air-cooling-form__input">
                <CustomInput
                    defaultValue={
                        isEditForm
                            ? JSON.parse(cpuAirCooling?.sockets).join(", ")
                            : ""
                    }
                    labelText="Поддерживаемые сокеты"
                    require={true}
                    name="sockets"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>
        </div>
    );
};

const CpuLiquidCoolingForm = ({
    register,
    unregister,
    errors,
    isEditForm,
    cpuLiquidCooling,
}) => {
    useEffect(() => {
        return () => {
            unregister("fansQuantity");
            unregister("fanSize");
            unregister("tdp");
            unregister("backlight");
            unregister("length");
            unregister("width");
            unregister("height");
            unregister("fanSpeed");
            unregister("airFlow");
            unregister("maxNoiseLevel");
            unregister("connector");
            unregister("sockets");
        };
    }, []);

    return (
        <div className="cpu-liquid-cooling-form">
            <div className="cpu-liquid-cooling-form__input">
                <CustomInput
                    defaultValue={
                        isEditForm ? cpuLiquidCooling?.fansQuantity : ""
                    }
                    onlyPositiveDigits={true}
                    labelText="Количество вентиляторов"
                    require={true}
                    name="fansQuantity"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="cpu-liquid-cooling-form__input">
                <CustomInput
                    defaultValue={isEditForm ? cpuLiquidCooling?.fanSize : ""}
                    labelText="Размер вентилятора"
                    require={true}
                    name="fanSize"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="cpu-liquid-cooling-form__input">
                <CustomInput
                    defaultValue={isEditForm ? cpuLiquidCooling?.tdp : ""}
                    onlyPositiveDigits={true}
                    labelText="Тепловыделение (Вт)"
                    require={true}
                    name="tdp"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="cpu-liquid-cooling-form__input">
                <CustomInput
                    defaultValue={isEditForm ? cpuLiquidCooling?.backlight : ""}
                    labelText="Подсветка"
                    require={true}
                    name="backlight"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="cpu-liquid-cooling-form__input">
                <CustomInput
                    defaultValue={isEditForm ? cpuLiquidCooling?.length : ""}
                    onlyPositiveDigits={true}
                    labelText="Длина (мм)"
                    require={true}
                    name="length"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="cpu-liquid-cooling-form__input">
                <CustomInput
                    defaultValue={isEditForm ? cpuLiquidCooling?.width : ""}
                    onlyPositiveDigits={true}
                    labelText="Ширина (мм)"
                    require={true}
                    name="width"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="cpu-liquid-cooling-form__input">
                <CustomInput
                    defaultValue={isEditForm ? cpuLiquidCooling?.height : ""}
                    onlyPositiveDigits={true}
                    labelText="Высота (мм)"
                    require={true}
                    name="height"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="cpu-liquid-cooling-form__input">
                <CustomInput
                    defaultValue={isEditForm ? cpuLiquidCooling?.fanSpeed : ""}
                    labelText="Скорость вентилятора"
                    require={true}
                    name="fanSpeed"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="cpu-liquid-cooling-form__input">
                <CustomInput
                    defaultValue={isEditForm ? cpuLiquidCooling?.airFlow : ""}
                    onlyPositiveDigits={true}
                    labelText="Воздушный поток (м³/ч)"
                    require={true}
                    name="airFlow"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="cpu-liquid-cooling-form__input">
                <CustomInput
                    defaultValue={
                        isEditForm ? cpuLiquidCooling?.maxNoiseLevel : ""
                    }
                    labelText="Максимальный уровень шума (дБ)"
                    require={true}
                    name="maxNoiseLevel"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="cpu-liquid-cooling-form__input">
                <CustomInput
                    defaultValue={isEditForm ? cpuLiquidCooling?.connector : ""}
                    labelText="Тип подключения"
                    require={true}
                    name="connector"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="cpu-liquid-cooling-form__input">
                <CustomInput
                    defaultValue={
                        isEditForm
                            ? JSON.parse(cpuLiquidCooling?.sockets).join(", ")
                            : ""
                    }
                    labelText="Поддерживаемые сокеты"
                    require={true}
                    name="sockets"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>
        </div>
    );
};

const cpuFanTypes = [
    {
        value: "Воздушное",
        label: "Воздушное",
    },
    {
        value: "Жидкостное",
        label: "Жидкостное",
    },
];

const CpuFanForm = ({
    register,
    unregister,
    errors,
    isEditForm,
    isFormSubmitted,
    cpuAirCooling,
    cpuLiquidCooling,
}) => {
    const defaultCpuFanType =
        cpuAirCooling != null
            ? "Воздушное"
            : cpuLiquidCooling != null
            ? "Жидкостное"
            : "";

    const [cpuFanType, setCpuFanType] = useState(defaultCpuFanType);

    useEffect(() => {
        const hiddenInput = document.querySelector("#hiddenInput");
        hiddenInput.value = cpuFanType;
        hiddenInput.focus();
    }, [cpuFanType]);

    return (
        <div className="cpu-fan-form">
            <input
                id="hiddenInput"
                className="visually-hidden"
                {...register("cpuFanType")}
            />
            {!isEditForm && (
                <AloneSelect
                    defaultValue={cpuFanType}
                    setStateField={setCpuFanType}
                    name="Тип охлаждения"
                    options={cpuFanTypes}
                    isError={
                        isFormSubmitted ? (cpuFanType ? null : true) : null
                    }
                />
            )}

            <p className="error-message">
                {isFormSubmitted
                    ? cpuFanType
                        ? null
                        : "Выберите тип охлаждения"
                    : null}
            </p>
            {cpuFanType === "Воздушное" && (
                <CpuAirCoolingForm
                    isEditForm={isEditForm}
                    register={register}
                    unregister={unregister}
                    errors={errors}
                    isFormSubmitted={isFormSubmitted}
                    cpuAirCooling={cpuAirCooling}
                />
            )}
            {cpuFanType === "Жидкостное" && (
                <CpuLiquidCoolingForm
                    isEditForm={isEditForm}
                    register={register}
                    unregister={unregister}
                    errors={errors}
                    isFormSubmitted={isFormSubmitted}
                    cpuLiquidCooling={cpuLiquidCooling}
                />
            )}
        </div>
    );
};

export default CpuFanForm;
