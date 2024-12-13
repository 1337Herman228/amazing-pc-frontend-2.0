"use client";

import { ConfigProvider, Select } from "antd";
import React from "react";
import "./AloneSelect.scss";

const AloneSelect = ({
    options,
    name,
    setStateField,
    isError,
    defaultValue = "",
}: {
    options: any[];
    name: string;
    setStateField: Function;
    isError?: boolean;
    defaultValue?: string;
}) => {
    const handleChange = (value: string) => {
        setStateField(value);
    };

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
            <div className="select-container">
                <div className="label">
                    <p>{name}</p>
                </div>
                <Select
                    className="select"
                    onChange={handleChange}
                    showSearch
                    notFoundContent={
                        <p style={{ color: "white", paddingBlock: "10px" }}>
                            Ничего не найдено
                        </p>
                    }
                    defaultValue={defaultValue}
                    popupMatchSelectWidth={false}
                    size="large"
                    placeholder="Выбор"
                    filterOption={(input, option) =>
                        String(option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }
                    options={options}
                />
            </div>
        </ConfigProvider>
    );
};

export default AloneSelect;
