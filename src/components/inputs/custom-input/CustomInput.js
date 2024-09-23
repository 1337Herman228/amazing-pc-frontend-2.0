"use client";

import { useState } from "react";
import "./CustomInput.scss";
import InputMask from "react-input-mask";

const CustomInput = ({
    isPhone = false,
    name,
    type = "text",
    labelText,
    minLength = 3,
    onlyLettersAndDigits = false,
    onlyPositiveDigits = false,
    require = false,
    register,
    errors,
    defaultValue = "",
}) => {
    const [isShow, setIsShow] = useState(type === "password" ? false : null);

    const requiredMessage = "Введите " + labelText.toLowerCase();
    const minLengthMessage =
        "Минимум " +
        minLength +
        (minLength % 10 == 1
            ? " символ"
            : minLength % 10 == 2 || minLength % 10 == 3 || minLength % 10 == 4
            ? " символа"
            : " символов");

    const lettersAndDigitsPattern = {
        value: /^[a-zA-Zа-яА-Я0-9]+$/,
        message: "Только буквы и цифры",
    };

    const onlyPositiveDigitsPattern = {
        value: /^[0-9.]+$/,
        message: "Только положительные цифры",
    };

    const ShowPasswordButton = () => {
        return (
            <button
                className="form-field__label-password-show-btn"
                onClick={() => setIsShow(!isShow)}
            >
                {isShow ? (
                    <img
                        className="cart-list__item-img"
                        src="/Eye-slash.svg"
                        alt=""
                        width={25}
                        height={25}
                    />
                ) : (
                    <img
                        className="cart-list__item-img"
                        src="/Eye.svg"
                        alt=""
                        width={25}
                        height={25}
                    />
                )}
            </button>
        );
    };

    return (
        <div className="form-field">
            <label className="form-field__label" htmlFor={name}>
                <span
                    className={`form-field__label-text ${require && "require"}`}
                >
                    {labelText}
                </span>
            </label>
            <div
                className={`input-wrapper ${
                    type === "password"
                        ? "no-mark"
                        : errors[name]?.message
                        ? "error"
                        : ""
                }`}
            >
                {isPhone == false && (
                    <>
                        <input
                            defaultValue={defaultValue}
                            className={`form-field__input ${
                                errors[name]?.message ? "error" : ""
                            }`}
                            type={type === "password" && isShow ? "text" : type}
                            id={name}
                            name={name}
                            {...register(name, {
                                pattern: onlyLettersAndDigits
                                    ? lettersAndDigitsPattern
                                    : onlyPositiveDigits
                                    ? onlyPositiveDigitsPattern
                                    : undefined,
                                required: requiredMessage,
                                minLength: {
                                    value: minLength,
                                    message: minLengthMessage,
                                },
                            })}
                        />
                        {type === "password" && <ShowPasswordButton />}
                    </>
                )}
                {isPhone && (
                    <InputMask
                        className={`form-field__input ${
                            errors[name]?.message ? "error" : ""
                        }`}
                        id={name}
                        mask="+ 999 (99) 999-99-99"
                        maskChar="X"
                        {...register(name, {
                            pattern: {
                                value: /^[^X]*$/,
                                message: "Введите телефон",
                            },
                            required: requiredMessage,
                            minLength: {
                                value: 12,
                                message: minLengthMessage,
                            },
                        })}
                    />
                )}
            </div>
            <p className="form-field__error">{errors[name]?.message}</p>
        </div>
    );
};

export default CustomInput;
