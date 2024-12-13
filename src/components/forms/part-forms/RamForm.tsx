// @ts-nocheck

import CustomInput from "@/components/inputs/custom-input/CustomInput";
import "./PartForms.scss";
import { useEffect } from "react";

const RamForm = ({ register, unregister, errors, isEditForm, ram }) => {
    useEffect(() => {
        return () => {
            unregister("type");
            unregister("frequency");
            unregister("capacity");
        };
    }, []);

    return (
        <div className="ram-form">
            <div className="ram-form__input">
                <CustomInput
                    defaultValue={isEditForm ? ram?.type : ""}
                    labelText="Тип (DDR)"
                    require={true}
                    name="type"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="ram-form__input">
                <CustomInput
                    defaultValue={isEditForm ? ram?.frequency : ""}
                    onlyPositiveDigits={true}
                    labelText="Частота (МГц)"
                    require={true}
                    name="frequency"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="ram-form__input">
                <CustomInput
                    defaultValue={isEditForm ? ram?.capacity : ""}
                    onlyPositiveDigits={true}
                    labelText="Объем (ГБ)"
                    require={true}
                    name="capacity"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>
        </div>
    );
};

export default RamForm;
