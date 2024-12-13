// @ts-nocheck

import { v4 as uuidv4 } from "uuid";
import PeripheryInput from "@/components/inputs/periphery-input/PeripheryInput";

const PeripheryForm = ({
    register,
    unregister,
    errors,
    isEditForm,
    periphery,
}) => {
    const defaultValue = (characteristicsString) => {
        const characteristic = JSON.parse(characteristicsString);
        const defaultValue = [];

        for (const key in characteristic) {
            defaultValue.push({
                id: uuidv4(),
                key: key,
                value: characteristic[key],
            });
        }
        return defaultValue;
    };

    return (
        <div>
            <PeripheryInput
                register={register}
                errors={errors}
                defaultValue={
                    isEditForm ? defaultValue(periphery?.characteristics) : ""
                }
                periphery={periphery}
                unregister={unregister}
            />
        </div>
    );
};

export default PeripheryForm;
