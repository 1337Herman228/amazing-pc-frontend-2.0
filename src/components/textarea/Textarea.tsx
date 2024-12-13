// @ts-nocheck

const Textarea = ({
    name,
    labelText,
    require = false,
    register,
    errors,
    minLength,
    rows = 3,
    defaultValue = "",
}) => {
    const requiredMessage = "Введите " + labelText.toLowerCase();
    const minLengthMessage =
        "Минимум " +
        minLength +
        (minLength % 10 == 1
            ? " символ"
            : minLength % 10 == 2 || minLength % 10 == 3 || minLength % 10 == 4
            ? " символа"
            : " символов");

    return (
        <>
            <div className="form-field">
                <label className="form-field__label" htmlFor={name}>
                    <span
                        className={`form-field__label-text ${
                            require && "require"
                        }`}
                    >
                        {labelText}
                    </span>
                </label>
                <textarea
                    defaultValue={defaultValue}
                    rows={rows}
                    name=""
                    style={{ resize: "vertical" }}
                    className={`form-field__input  ${
                        errors[name]?.message ? "error" : ""
                    }`}
                    id={name}
                    {...register(name, {
                        required: requiredMessage,
                        minLength: {
                            value: minLength,
                            message: minLengthMessage,
                        },
                    })}
                ></textarea>
                <p className="form-field__error">{errors[name]?.message}</p>
            </div>
        </>
    );
};

export default Textarea;
