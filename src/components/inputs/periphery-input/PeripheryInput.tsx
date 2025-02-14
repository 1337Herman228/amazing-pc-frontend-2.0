import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import CustomInput from "../custom-input/CustomInput";
import "./PeripheryInput.scss";
import {
    FieldErrors,
    FieldValues,
    UseFormRegister,
    UseFormUnregister,
} from "react-hook-form";
import { ICharacteristicItem, IOptionTemplate } from "@/interfaces/types-v2";

const startValue: ICharacteristicItem[] = [
    {
        value: uuidv4(),
        item: "",
        label: "",
    },
];

interface PeripheryInputProps {
    register: UseFormRegister<FieldValues>;
    unregister: UseFormUnregister<FieldValues>;
    defaultValue: ICharacteristicItem[] | null;
    errors: FieldErrors<FieldValues>;
}

const PeripheryInput = ({
    register,
    unregister,
    errors,
    defaultValue = null,
}: PeripheryInputProps) => {
    const [value, setValue] = useState<ICharacteristicItem[]>(
        defaultValue || startValue
    );

    const add = () => {
        setValue([
            ...value,
            {
                value: uuidv4(),
                item: "",
                label: "",
            },
        ]);
    };

    const remove = (val: string) => {
        setValue(value.filter((item) => item.value !== val));
        unregister("label;" + val);
        unregister("value;" + val);
    };

    return (
        <div className="periphery-input">
            {value.map((item) => (
                <div className="input-item">
                    <CustomInput
                        defaultValue={item.label}
                        labelText="Характеристика"
                        name={`label;${item.value}`}
                        minLength={0}
                        require={true}
                        register={register}
                        errors={errors}
                        unregister={unregister}
                    />
                    <CustomInput
                        defaultValue={
                            Array.isArray(item.item)
                                ? item.item.join(", ")
                                : item.item
                        }
                        labelText="Значение"
                        name={`value;${item.value}`}
                        minLength={0}
                        require={true}
                        register={register}
                        errors={errors}
                        unregister={unregister}
                    />
                    <CloseOutlined
                        className="input-item__remove"
                        onClick={() => remove(item.value)}
                    />
                </div>
            ))}
            <button
                onClick={add}
                type="button"
                className="input-item__add-btn main-color-submit-btn"
            >
                <PlusOutlined />
                <span className="input-item__add-btn-text">Добавить поле</span>
            </button>
        </div>
    );
};

export default PeripheryInput;
