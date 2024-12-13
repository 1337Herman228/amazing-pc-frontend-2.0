// @ts-nocheck

import CustomInput from "@/components/inputs/custom-input/CustomInput";
import { useEffect } from "react";
const FanForm = ({ register, unregister, errors, isEditForm, fanData }) => {
    useEffect(() => {
        return () => {
            unregister("fanSize");
            unregister("backlight");
            unregister("fanSpeed");
            unregister("airFlow");
            unregister("maxNoiseLevel");
        };
    }, [unregister]);

    return (
        <div className="fan-form">
            <div className="fan-form__input">
                <CustomInput
                    defaultValue={isEditForm ? fanData?.fanSize : ""}
                    labelText="Размер вентилятора (120x120мм)"
                    require={true}
                    name="fanSize"
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="fan-form__input">
                <CustomInput
                    defaultValue={isEditForm ? fanData?.backlight : ""}
                    labelText="Подсветка"
                    require={true}
                    name="backlight"
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="fan-form__input">
                <CustomInput
                    defaultValue={isEditForm ? fanData?.fanSpeed : ""}
                    labelText="Скорость вентилятора (об/мин)"
                    require={true}
                    name="fanSpeed"
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="fan-form__input">
                <CustomInput
                    defaultValue={isEditForm ? fanData?.airFlow : ""}
                    labelText="Воздушный поток (CFM)"
                    require={true}
                    name="airFlow"
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="fan-form__input">
                <CustomInput
                    defaultValue={isEditForm ? fanData?.maxNoiseLevel : ""}
                    labelText="Максимальный уровень шума (дБ)"
                    require={true}
                    name="maxNoiseLevel"
                    register={register}
                    errors={errors}
                />
            </div>
        </div>
    );
};

export default FanForm;
