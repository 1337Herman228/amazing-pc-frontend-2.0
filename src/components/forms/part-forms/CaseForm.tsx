// @ts-nocheck

import CustomInput from "@/components/inputs/custom-input/CustomInput";
import { useEffect } from "react";

const CaseForm = ({ register, unregister, errors, isEditForm, caseData }) => {
    useEffect(() => {
        return () => {
            unregister("maxCpuCoolerHeight");
            unregister("maxGpuLength");
            unregister("maxLiquidCoolingLength");
            unregister("hddSlotsQuantity");
            unregister("ssdSlotsQuantity");
            unregister("extensionSlotsQuantity");
            unregister("length");
            unregister("width");
            unregister("height");
            unregister("weight");
            unregister("possibleFormFactors");
        };
    }, [unregister]);

    return (
        <div className="case-form">
            <div className="case-form__input">
                <CustomInput
                    defaultValue={
                        isEditForm ? caseData?.maxCpuCoolerHeight : ""
                    }
                    onlyPositiveDigits={true}
                    labelText="Максимальная высота кулера CPU (мм)"
                    require={true}
                    name="maxCpuCoolerHeight"
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="case-form__input">
                <CustomInput
                    defaultValue={isEditForm ? caseData?.maxGpuLength : ""}
                    onlyPositiveDigits={true}
                    labelText="Максимальная длина GPU (мм)"
                    require={true}
                    name="maxGpuLength"
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="case-form__input">
                <CustomInput
                    defaultValue={
                        isEditForm ? caseData?.maxLiquidCoolingLength : ""
                    }
                    onlyPositiveDigits={true}
                    labelText="Максимальная длина СЖО (мм)"
                    require={true}
                    name="maxLiquidCoolingLength"
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="case-form__input">
                <CustomInput
                    defaultValue={isEditForm ? caseData?.hddSlotsQuantity : ""}
                    onlyPositiveDigits={true}
                    labelText="Количество слотов для HDD"
                    require={true}
                    name="hddSlotsQuantity"
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="case-form__input">
                <CustomInput
                    defaultValue={isEditForm ? caseData?.ssdSlotsQuantity : ""}
                    onlyPositiveDigits={true}
                    labelText="Количество слотов для SSD"
                    require={true}
                    name="ssdSlotsQuantity"
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="case-form__input">
                <CustomInput
                    defaultValue={
                        isEditForm ? caseData?.extensionSlotsQuantity : ""
                    }
                    onlyPositiveDigits={true}
                    labelText="Количество слотов расширения"
                    require={true}
                    name="extensionSlotsQuantity"
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="case-form__input">
                <CustomInput
                    defaultValue={isEditForm ? caseData?.length : ""}
                    onlyPositiveDigits={true}
                    labelText="Длина (мм)"
                    require={true}
                    name="length"
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="case-form__input">
                <CustomInput
                    defaultValue={isEditForm ? caseData?.width : ""}
                    onlyPositiveDigits={true}
                    labelText="Ширина (мм)"
                    require={true}
                    name="width"
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="case-form__input">
                <CustomInput
                    defaultValue={isEditForm ? caseData?.height : ""}
                    onlyPositiveDigits={true}
                    labelText="Высота (мм)"
                    require={true}
                    name="height"
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="case-form__input">
                <CustomInput
                    defaultValue={isEditForm ? caseData?.weight : ""}
                    onlyPositiveDigits={true}
                    labelText="Вес (кг)"
                    require={true}
                    name="weight"
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="case-form__input">
                <CustomInput
                    defaultValue={
                        isEditForm
                            ? JSON.parse(caseData?.possibleFormFactors).join(
                                  ", "
                              )
                            : ""
                    }
                    labelText="Поддерживаемые форм-факторы"
                    require={true}
                    name="possibleFormFactors"
                    register={register}
                    errors={errors}
                />
            </div>
        </div>
    );
};

export default CaseForm;
