import "./PartForms.scss";
import CustomInput from "@/components/inputs/custom-input/CustomInput";
import { ICharacteristicItem, IPart } from "@/interfaces/types-v2";
import {
    FieldErrors,
    FieldValues,
    UseFormRegister,
    UseFormUnregister,
} from "react-hook-form";
import { PART_CATEGORIES, PART_COMPONENTS_TYPES } from "@/constants";
import {
    CASE_FIELDS,
    CPU_FAN_FIELDS,
    CPU_FIELDS,
    FANS_FIELDS,
    GPU_FIELDS,
    MOTHERBOARD_FIELDS,
    PSU_FIELDS,
    RAM_FIELDS,
    SSD_FIELDS,
} from "./form-fields";
import PeripheryForm from "./PeripheryForm";

interface PartFormProps {
    categoryValue: string;
    typeValue: string;
    register: UseFormRegister<FieldValues>;
    unregister: UseFormUnregister<FieldValues>;
    errors: FieldErrors<FieldValues>;
    part: IPart | null;
}

const PartForm = ({
    categoryValue,
    typeValue,
    register,
    unregister,
    errors,
    part = null,
}: PartFormProps) => {
    const findPartCharacteristic = (
        characteristics: ICharacteristicItem[],
        searchingValue: string
    ) => {
        return characteristics.find(
            (characteristic) => characteristic.value === searchingValue
        );
    };

    const getCharacteristicText = (item: string | string[] | undefined) => {
        return Array.isArray(item) ? item.join(", ") : item;
    };

    const getDefaultInputValue = (part: IPart, searchingValue: string) => {
        return getCharacteristicText(
            findPartCharacteristic(part.characteristics, searchingValue)?.item
        );
    };

    const getPartTypedCharacteristicsArray = (
        part: IPart | null,
        typeValue: string
    ) => {
        if (part) return part.characteristics;
        else {
            switch (typeValue) {
                case PART_COMPONENTS_TYPES.CPU:
                    return CPU_FIELDS;
                case PART_COMPONENTS_TYPES.GPU:
                    return GPU_FIELDS;
                case PART_COMPONENTS_TYPES.RAM:
                    return RAM_FIELDS;
                case PART_COMPONENTS_TYPES.MOTHERBOARD:
                    return MOTHERBOARD_FIELDS;
                case PART_COMPONENTS_TYPES.CPU_FAN:
                    return CPU_FAN_FIELDS;
                case PART_COMPONENTS_TYPES.SSD:
                    return SSD_FIELDS;
                case PART_COMPONENTS_TYPES.PSU:
                    return PSU_FIELDS;
                case PART_COMPONENTS_TYPES.CASES:
                    return CASE_FIELDS;
                case PART_COMPONENTS_TYPES.FAN:
                    return FANS_FIELDS;
                default:
                    return [];
            }
        }
    };

    return (
        <>
            {categoryValue === PART_CATEGORIES.COMPONENTS && (
                <>
                    <div className="parts-form">
                        {getPartTypedCharacteristicsArray(part, typeValue).map(
                            (item) => (
                                <CustomInput
                                    key={item.value}
                                    defaultValue={
                                        (part &&
                                            getDefaultInputValue(
                                                part,
                                                item.value
                                            )) ||
                                        ""
                                    }
                                    placeholder={
                                        Array.isArray(item.item)
                                            ? item.item.join(", ")
                                            : item.item
                                    }
                                    labelText={item.label}
                                    require={true}
                                    name={`${item.value};${item.label}`}
                                    minLength={0}
                                    register={register}
                                    errors={errors}
                                    unregister={unregister}
                                />
                            )
                        )}
                    </div>
                </>
            )}

            {categoryValue === PART_CATEGORIES.PERIPHERY && (
                <PeripheryForm
                    part={part}
                    register={register}
                    unregister={unregister}
                    errors={errors}
                />
            )}
        </>
    );
};

export default PartForm;
