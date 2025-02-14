"use client";

import { ConfigProvider, Select } from "antd";
import "./AloneSelect.scss";
import { IOptionTemplate } from "@/interfaces/types-v2";
import { useCallback } from "react";

interface AloneSelectProps<T> {
    options: T[];
    name: string;
    setStateField: (value: T) => void;
    value: T;
    isError?: boolean;
    defaultValue?: T;
}

const AloneSelect = <T extends IOptionTemplate>({
    options,
    name,
    setStateField,
    isError,
    defaultValue,
    value,
}: AloneSelectProps<T>) => {
    const onChange = useCallback(
        (value: T, option: T | T[]) => {
            setStateField(Array.isArray(option) ? option[0] : option);
        },
        [setStateField]
    );

    return (
        <ConfigProvider
            theme={{
                components: {
                    Select: {
                        optionActiveBg: "var(--main-color-select)", // Цвет поля при наведении
                        optionSelectedBg: "var(--main-color)", // Цвет активного поля
                        selectorBg: "var(--tm-color-dark-black-2)", // Цвет окна выбора
                        colorBgElevated: "var(--tm-color-dark-black-2)", // Цвет выпадающего списка
                        colorText: "white", // Цвет текста
                        colorPrimary: "var(--main-color)", // Основной цвет
                        colorPrimaryHover: "var(--main-color)", // Основной цвет при наведении
                        colorSplit: "var(--main-color)",
                        colorTextPlaceholder: "white", // Цвет текста при поиске
                        colorTextQuaternary: "white", // Цвет иконки поиска
                        optionSelectedColor: "black", // Цвет текста выбранного поля
                        borderRadiusLG: 2,
                        colorBorder: `${
                            isError ? "var(--red-error-color)" : "gray"
                        }`,
                    },
                },
            }}
        >
            {" "}
            <div className="select-container" id={name}>
                <div className="label">
                    <p>{name}</p>
                </div>
                <Select
                    value={value}
                    labelRender={(label) => label.label}
                    className="select"
                    onChange={onChange}
                    showSearch
                    notFoundContent={
                        <p style={{ color: "white", paddingBlock: "10px" }}>
                            Ничего не найдено
                        </p>
                    }
                    defaultValue={defaultValue}
                    popupMatchSelectWidth={false}
                    size="large"
                    filterOption={(input, option) =>
                        String(option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }
                    options={options}
                    getPopupContainer={() =>
                        document.querySelector(`.select-container#${name}`) ||
                        document.body
                    }
                />
            </div>
        </ConfigProvider>
    );
};

export default AloneSelect;
