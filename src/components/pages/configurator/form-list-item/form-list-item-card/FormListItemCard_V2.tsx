import InfoModal from "@/components/modals/info-modal/InfoModal";
import { IPart, IType } from "@/interfaces/types-v2";
import { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { ConfiguratorFieldValues } from "../../Configurator_V2";

interface FormListItemCardProps {
    selectedPart: IPart | undefined;
    part: IPart;
    multiselect?: boolean | null;
    default_checked?: boolean;
    max_quantity?: number;
    type: IType;
    control: Control<ConfiguratorFieldValues>;
}

const FormListItemCardV2 = ({
    type,
    part,
    default_checked,
    selectedPart,
    control,
}: FormListItemCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState([false, false]);

    const toggleModal = (idx: any, target: any) => {
        setIsModalOpen((p) => {
            p[idx] = target;
            return [...p];
        });
    };

    return (
        <li className="list-display__form-item">
            <div className="list-display__form-item-info">
                <Controller
                    name={type.value}
                    control={control}
                    render={({ field }) => (
                        <input
                            className="list-display__form-item-input"
                            type="radio"
                            id={type.value + "-" + part.id}
                            onChange={() => field.onChange(part)}
                            checked={selectedPart?.id === part.id}
                        />
                    )}
                />

                <label
                    className="list-display__form-item-label"
                    htmlFor={type.value + "-" + part.id}
                >
                    {part.name}
                </label>
                <button
                    onClick={() => toggleModal(1, true)}
                    className="list-display__form-item-i-btn btn-icon"
                >
                    <img
                        src="/info-icon.svg"
                        width={20}
                        height={20}
                        alt=""
                        loading="lazy"
                    />
                </button>
                <InfoModal
                    part={part}
                    isModalOpen={isModalOpen}
                    toggleModal={toggleModal}
                />
                <button className="list-display__form-item-compare-btn btn-icon">
                    <img
                        src="/compare-icon-2.svg"
                        width={20}
                        height={20}
                        alt=""
                        loading="lazy"
                    />
                </button>
                {!default_checked && selectedPart?.id === part.id ? (
                    <Controller
                        name={type.value}
                        control={control}
                        render={({ field }) => (
                            <button
                                onClick={() => field.onChange(undefined)}
                                className="list-display__form-item-x-btn"
                            >
                                <img src="/red-x-icon.svg" />
                            </button>
                        )}
                    />
                ) : null}
            </div>
            <div className={`list-display__form-item-price `}>
                {part.price} BYN
            </div>
        </li>
    );
};

export default FormListItemCardV2;
