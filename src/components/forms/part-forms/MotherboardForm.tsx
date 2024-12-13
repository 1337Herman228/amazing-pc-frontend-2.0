// @ts-nocheck

import CustomInput from "@/components/inputs/custom-input/CustomInput";
import "./PartForms.scss";
import { useEffect } from "react";

const MotherboardForm = ({
    register,
    unregister,
    errors,
    isEditForm,
    motherboard,
}) => {
    useEffect(() => {
        return () => {
            unregister("socket");
            unregister("formFactor");
            unregister("chipset");
            unregister("ramType");
            unregister("ramSlots");
            unregister("maxRamCapacity");
            unregister("sataQuantity");
            unregister("m2Quantity");
            unregister("pcie16Quantity");
        };
    }, []);

    return (
        <div className="motherboard-form">
            <div className="motherboard-form__input">
                <CustomInput
                    defaultValue={isEditForm ? motherboard?.socket : ""}
                    labelText="Сокет"
                    name="socket"
                    require={true}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="motherboard-form__input">
                <CustomInput
                    defaultValue={isEditForm ? motherboard?.formFactor : ""}
                    labelText="Форм-фактор"
                    name="formFactor"
                    require={true}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="motherboard-form__input">
                <CustomInput
                    defaultValue={isEditForm ? motherboard?.chipset : ""}
                    labelText="Чипсет"
                    name="chipset"
                    require={true}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="motherboard-form__input">
                <CustomInput
                    defaultValue={isEditForm ? motherboard?.ramType : ""}
                    labelText="Тип памяти"
                    name="ramType"
                    require={true}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="motherboard-form__input">
                <CustomInput
                    defaultValue={isEditForm ? motherboard?.ramSlots : ""}
                    onlyPositiveDigits={true}
                    labelText="Количество слотов для оперативной памяти"
                    name="ramSlots"
                    require={true}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="motherboard-form__input">
                <CustomInput
                    defaultValue={isEditForm ? motherboard?.maxRamCapacity : ""}
                    onlyPositiveDigits={true}
                    labelText="Максимальный объём памяти (ГБ)"
                    name="maxRamCapacity"
                    require={true}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="motherboard-form__input">
                <CustomInput
                    defaultValue={isEditForm ? motherboard?.sataQuantity : ""}
                    onlyPositiveDigits={true}
                    labelText="Количество SATA разъемов"
                    name="sataQuantity"
                    require={true}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="motherboard-form__input">
                <CustomInput
                    defaultValue={isEditForm ? motherboard?.m2Quantity : ""}
                    onlyPositiveDigits={true}
                    labelText="Количество M.2 разъемов"
                    name="m2Quantity"
                    require={true}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="motherboard-form__input">
                <CustomInput
                    defaultValue={isEditForm ? motherboard?.pcie16Quantity : ""}
                    onlyPositiveDigits={true}
                    labelText="Количество PCIe 16x слотов"
                    name="pcie16Quantity"
                    require={true}
                    register={register}
                    errors={errors}
                />
            </div>
        </div>
    );
};

export default MotherboardForm;
