// @ts-nocheck
import CustomInput from "@/components/inputs/custom-input/CustomInput";
import "./PartForms.scss";
import { useEffect } from "react";

const GpuForm = ({ register, unregister, errors, isEditForm, gpu }) => {
    useEffect(() => {
        return () => {
            unregister("baseFrequency");
            unregister("boostFrequency");
            unregister("vramCapacity");
            unregister("vramType");
            unregister("busWidth");

            unregister("hdmi");
            unregister("displayPort");
            unregister("cuda");
            unregister("powerConnector");
            unregister("minPowerUnit");

            unregister("fans");
            unregister("extensionSlots");
            unregister("length");
            unregister("width");
            unregister("height");
        };
    }, []);

    return (
        <div className="gpu-form">
            <div className="gpu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? gpu?.baseFrequency : ""}
                    onlyPositiveDigits={true}
                    labelText="Базовая частота (МГц)"
                    require={true}
                    name="baseFrequency"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="gpu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? gpu?.boostFrequency : ""}
                    onlyPositiveDigits={true}
                    labelText="Турбо частота (МГц)"
                    require={true}
                    name="boostFrequency"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="gpu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? gpu?.vramCapacity : ""}
                    onlyPositiveDigits={true}
                    labelText="Объём видеопамяти (ГБ)"
                    require={true}
                    name="vramCapacity"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="gpu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? gpu?.vramType : ""}
                    labelText="Тип видеопамяти"
                    require={true}
                    name="vramType"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="gpu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? gpu?.busWidth : ""}
                    onlyPositiveDigits={true}
                    labelText="Ширина шины (бит)"
                    require={true}
                    name="busWidth"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="gpu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? gpu?.hdmi : ""}
                    onlyPositiveDigits={true}
                    labelText="Количество HDMI"
                    require={true}
                    name="hdmi"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="gpu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? gpu?.displayPort : ""}
                    onlyPositiveDigits={true}
                    labelText="Количество DisplayPort"
                    require={true}
                    name="displayPort"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="gpu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? gpu?.cuda : ""}
                    onlyPositiveDigits={true}
                    labelText="Количество CUDA ядер"
                    require={true}
                    name="cuda"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="gpu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? gpu?.powerConnector : ""}
                    labelText="Разъём питания"
                    require={true}
                    name="powerConnector"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="gpu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? gpu?.minPowerUnit : ""}
                    onlyPositiveDigits={true}
                    labelText="Минимальный блок питания (Вт)"
                    require={true}
                    name="minPowerUnit"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="gpu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? gpu?.fans : ""}
                    onlyPositiveDigits={true}
                    labelText="Количество вентиляторов"
                    require={true}
                    name="fans"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="gpu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? gpu?.extensionSlots : ""}
                    labelText="Количество слотов расширения"
                    require={true}
                    name="extensionSlots"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="gpu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? gpu?.length : ""}
                    onlyPositiveDigits={true}
                    labelText="Длина (мм)"
                    require={true}
                    name="length"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="gpu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? gpu?.width : ""}
                    onlyPositiveDigits={true}
                    labelText="Ширина (мм)"
                    require={true}
                    name="width"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="gpu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? gpu?.height : ""}
                    onlyPositiveDigits={true}
                    labelText="Высота (мм)"
                    require={true}
                    name="height"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>
        </div>
    );
};

export default GpuForm;
