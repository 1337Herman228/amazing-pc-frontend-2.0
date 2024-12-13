// @ts-nocheck

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import CustomInput from "../custom-input/CustomInput";
import "./PeripheryInput.scss";

const startValue = [
    {
        id: uuidv4(),
        key: "",
        value: "",
    },
];

const PeripheryInput = ({
    register,
    unregister,
    errors,
    defaultValue = null,
}) => {
    const [value, setValue] = useState(defaultValue || startValue);

    const add = () => {
        setValue([...value, { id: uuidv4(), key: "", value: "" }]);
    };

    const remove = (id) => {
        const filteredValue = value.filter((item) => item.id !== id);
        setValue(filteredValue);
        unregister("key/" + id);
        unregister("value/" + id);
    };

    return (
        <div className="periphery-input">
            {value.map((item) => (
                <div className="input-item">
                    <CustomInput
                        defaultValue={item.key}
                        labelText="Характеристика"
                        name={`key/${item.id}`}
                        minLength={0}
                        require={true}
                        register={register}
                        errors={errors}
                    />
                    <CustomInput
                        defaultValue={item.value}
                        labelText="Значение"
                        name={`value/${item.id}`}
                        minLength={0}
                        require={true}
                        register={register}
                        errors={errors}
                    />
                    <CloseOutlined
                        className="input-item__remove"
                        onClick={() => remove(item.id)}
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
