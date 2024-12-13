// @ts-nocheck
import CustomInput from "@/components/inputs/custom-input/CustomInput";
import { useEffect } from "react";

const PsuForm = ({ register, unregister, errors, isEditForm, psu }) => {
    useEffect(() => {
        return () => {
            unregister("power");
            unregister("formFactor");
            unregister("pfc");
            unregister("coolingSystem");
            unregister("mbConnector");
            unregister("cpu4Plus4Quantity");
            unregister("gpu6Plus2Quantity");
            unregister("sataQuantity");
            unregister("certificate");
            unregister("modular");
        };
    }, [unregister]);

    return (
        <div className="psu-form">
            <div className="psu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? psu?.power : ""}
                    onlyPositiveDigits={true}
                    labelText="Мощность (Вт)"
                    require={true}
                    name="power"
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="psu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? psu?.formFactor : ""}
                    labelText="Форм-фактор"
                    require={true}
                    name="formFactor"
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="psu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? psu?.pfc : ""}
                    labelText="PFC"
                    require={true}
                    name="pfc"
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="psu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? psu?.coolingSystem : ""}
                    labelText="Система охлаждения"
                    require={true}
                    name="coolingSystem"
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="psu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? psu?.mbConnector : ""}
                    labelText="MB Connector"
                    require={true}
                    name="mbConnector"
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="psu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? psu?.cpu4Plus4Quantity : ""}
                    onlyPositiveDigits={true}
                    labelText="Количество 4+4 CPU"
                    require={true}
                    name="cpu4Plus4Quantity"
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="psu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? psu?.gpu6Plus2Quantity : ""}
                    onlyPositiveDigits={true}
                    labelText="Количество 6+2 GPU"
                    require={true}
                    name="gpu6Plus2Quantity"
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="psu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? psu?.sataQuantity : ""}
                    onlyPositiveDigits={true}
                    labelText="Количество SATA"
                    require={true}
                    name="sataQuantity"
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="psu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? psu?.certificate : ""}
                    labelText="Сертификат"
                    require={true}
                    name="certificate"
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="psu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? psu?.modular : ""}
                    labelText="Модульный"
                    require={true}
                    name="modular"
                    register={register}
                    errors={errors}
                />
            </div>
        </div>
    );
};

export default PsuForm;
