"use client";

import { ConfigProvider, Select } from "antd";
import "../antd-alone-select/AloneSelect.scss";
import { IOptionTemplate } from "@/interfaces/types-v2";
import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";

interface ControlledSelectProps<T> {
    options: T[];
    label: string;
    name: string;
    errors: FieldErrors<FieldValues>;
    defaultValue?: T;
    control: Control<FieldValues>;
    placeholder?: string;
    style: React.CSSProperties;
}

const ControlledSelect = <T extends IOptionTemplate>({
    options,
    label,
    name,
    errors,
    defaultValue,
    control,
    style,
    placeholder = "",
}: ControlledSelectProps<T>) => {
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
                            errors?.[name]?.message
                                ? "var(--red-error-color) !important"
                                : "gray"
                        }`,
                    },
                },
            }}
        >
            {" "}
            <div className="select-container" id={name}>
                <div className="label">
                    <p>{label}</p>
                </div>

                <Controller
                    name={name}
                    control={control}
                    rules={{
                        shouldUnregister: true,
                        required: "Обязательное поле",
                    }}
                    defaultValue={defaultValue}
                    render={({ field }) => (
                        <Select
                            style={style}
                            {...field}
                            value={field.value}
                            defaultValue={defaultValue}
                            labelRender={(label) => label.label}
                            className="select"
                            onChange={(value, option) => {
                                field.onChange(option);
                            }}
                            showSearch
                            notFoundContent={
                                <p
                                    style={{
                                        color: "white",
                                        paddingBlock: "10px",
                                    }}
                                >
                                    Ничего не найдено
                                </p>
                            }
                            popupMatchSelectWidth={false}
                            size="large"
                            filterOption={(input, option) =>
                                String(option?.label ?? "")
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                            options={options}
                            getPopupContainer={() =>
                                document.querySelector(
                                    `.select-container#${name}`
                                ) || document.body
                            }
                            placeholder={placeholder}
                        />
                    )}
                />
                <p className="form-field__error">
                    {errors?.[name]?.message as string}
                </p>
            </div>
        </ConfigProvider>
    );
};

export default ControlledSelect;
