import { Control, Controller, FormState } from "react-hook-form";
import ImageUploadV2 from "./ImageUploadV2";

interface ControlledImageUploadProps {
    control: Control<any>;
    formState: FormState<any>;
    name: string;
    defaultImgUrl?: string;
    label: string;
}

const ControlledImageUpload = ({
    control,
    formState,
    name,
    defaultImgUrl,
    label,
}: ControlledImageUploadProps) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
                <div>
                    <div className="text-[#999] font-normal text-[16px] mb-1">
                        {label}
                    </div>

                    <ImageUploadV2
                        img={value}
                        setImg={onChange}
                        defaultImgUrl={
                            defaultImgUrl ? defaultImgUrl : undefined
                        }
                        isFormSubmitted={formState.isSubmitted}
                    />
                    <p
                        style={{
                            paddingBlock: 5,
                            fontSize: "14px",
                            color: "var(--red-error-color)",
                            fontWeight: 300,
                        }}
                    >
                        {formState.isSubmitted
                            ? value
                                ? null
                                : "Загрузите изображение"
                            : null}
                    </p>
                </div>
            )}
        />
    );
};

export default ControlledImageUpload;
