// @ts-nocheck
import CustomInput from "@/components/inputs/custom-input/CustomInput";
import { useEffect } from "react";

const SsdForm = ({ register, unregister, errors, isEditForm, ssd }) => {
    useEffect(() => {
        return () => {
            unregister("formFactor");
            unregister("capacity");
            unregister("flashMemoryType");
            unregister("controllerType");
            unregister("writeVelocity");
            unregister("readVelocity");
            unregister("randomWriteSpeed");
            unregister("connectionType");
            unregister("mtbfTime");
            unregister("maxTemperature");
        };
    }, [unregister]);

    return (
        <div className="ssd-form">
            <div className="ssd-form__input">
                <CustomInput
                    defaultValue={isEditForm ? ssd?.formFactor : ""}
                    labelText="Форм-фактор"
                    require={true}
                    name="formFactor"
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="ssd-form__input">
                <CustomInput
                    defaultValue={isEditForm ? ssd?.capacity : ""}
                    labelText="Объем"
                    require={true}
                    name="capacity"
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="ssd-form__input">
                <CustomInput
                    defaultValue={isEditForm ? ssd?.flashMemoryType : ""}
                    labelText="Тип флеш-памяти"
                    require={true}
                    name="flashMemoryType"
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="ssd-form__input">
                <CustomInput
                    defaultValue={isEditForm ? ssd?.controllerType : ""}
                    labelText="Тип контроллера"
                    require={true}
                    name="controllerType"
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="ssd-form__input">
                <CustomInput
                    defaultValue={isEditForm ? ssd?.writeVelocity : ""}
                    onlyPositiveDigits={true}
                    labelText="Скорость записи (МБ/с)"
                    require={true}
                    name="writeVelocity"
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="ssd-form__input">
                <CustomInput
                    defaultValue={isEditForm ? ssd?.readVelocity : ""}
                    onlyPositiveDigits={true}
                    labelText="Скорость чтения (МБ/с)"
                    require={true}
                    name="readVelocity"
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="ssd-form__input">
                <CustomInput
                    defaultValue={isEditForm ? ssd?.randomWriteSpeed : ""}
                    onlyPositiveDigits={true}
                    labelText="Случайная скорость записи"
                    require={true}
                    name="randomWriteSpeed"
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="ssd-form__input">
                <CustomInput
                    defaultValue={isEditForm ? ssd?.connectionType : ""}
                    labelText="Тип подключения"
                    require={true}
                    name="connectionType"
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="ssd-form__input">
                <CustomInput
                    defaultValue={isEditForm ? ssd?.mtbfTime : ""}
                    labelText="MTBF (Среднее время работы до поломки, часы)"
                    require={false}
                    name="mtbfTime"
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="ssd-form__input">
                <CustomInput
                    defaultValue={isEditForm ? ssd?.maxTemperature : ""}
                    labelText="Максимальная температура (°C)"
                    require={false}
                    name="maxTemperature"
                    register={register}
                    errors={errors}
                />
            </div>
        </div>
    );
};

export default SsdForm;
