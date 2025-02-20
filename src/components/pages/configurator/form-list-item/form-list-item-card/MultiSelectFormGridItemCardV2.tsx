import InfoModal from "@/components/modals/info-modal/InfoModal";
import { IPart, IPartWithQuantity, IType } from "@/interfaces/types-v2";
import { useMemo, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { ConfiguratorFieldValues } from "../../Configurator_V2";

interface MultiSelectFormListItemCardProps {
    selectedParts: IPartWithQuantity[] | undefined;
    part: IPart;
    default_checked?: boolean;
    max_quantity?: number;
    type: IType;
    control: Control<ConfiguratorFieldValues>;
    OnRadioBtnImageClick: Function;
}

const MultiSelectFormGridItemCardV2 = ({
    type,
    part,
    selectedParts,
    control,
    max_quantity = 5,
    OnRadioBtnImageClick,
}: MultiSelectFormListItemCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState([false, false]);

    const toggleModal = (idx: any, target: any) => {
        setIsModalOpen((p) => {
            p[idx] = target;
            return [...p];
        });
    };

    const isSelected = useMemo(
        () => selectedParts?.some((p) => p.part.id === part.id),
        [selectedParts]
    );

    return (
        <li className="grid-display__form-item">
            <img
                className="grid-display__form-item-img"
                src={part.image}
                width={314}
                height={176}
                alt=""
                loading="lazy"
                onClick={(e) => OnRadioBtnImageClick(e)}
            />
            <div className="grid-display__form-item-body">
                <Controller
                    name={type.value}
                    control={control}
                    render={({ field }) => {
                        const arr = (field.value as IPartWithQuantity[]) || [];

                        // Проверяем, выбран ли чекбокс
                        const isSelected = arr.some(
                            (item) => item.part.id === part.id
                        );

                        const handleChange = () => {
                            if (!isSelected) {
                                // Добавляем объект в массив, если чекбокс выбран
                                arr.push({
                                    quantity: 1,
                                    part: part,
                                });
                            } else {
                                // Удаляем объект из массива, если чекбокс снят
                                const index = arr.findIndex(
                                    (item) => item.part.id === part.id
                                );
                                if (index !== -1) {
                                    arr.splice(index, 1);
                                }
                            }
                            // Обновляем значение поля
                            field.onChange(arr);
                        };

                        return (
                            <input
                                className="list-display__form-item-input"
                                type="checkbox"
                                id={type.value + "-" + part.id}
                                onChange={handleChange}
                                checked={isSelected}
                            />
                        );
                    }}
                />
                <label
                    className="list-display__form-item-label "
                    htmlFor={type.value + "-" + part.id}
                >
                    <Controller
                        name={type.value}
                        control={control}
                        render={({ field }) => {
                            const arr =
                                (field.value as IPartWithQuantity[]) || [];
                            return (
                                <select
                                    onChange={(e) => {
                                        const quantity = Number(e.target.value);
                                        const index = arr.findIndex(
                                            (item) => item.part.id === part.id
                                        );
                                        if (index !== -1) {
                                            // Обновляем количество, если объект уже существует
                                            arr[index].quantity = quantity;
                                        } else if (isSelected) {
                                            // Если объект не существует, добавляем его с новым количеством
                                            arr.push({
                                                quantity: quantity,
                                                part: part,
                                            });
                                        }
                                        field.onChange(arr);
                                    }}
                                    className={`list-display__form-item-select ${
                                        isSelected || "visually-hidden"
                                    }`}
                                    value={
                                        isSelected && selectedParts
                                            ? selectedParts.find(
                                                  (item) =>
                                                      item.part.id === part.id
                                              )?.quantity
                                            : 1
                                    }
                                >
                                    {Array.from(
                                        {
                                            length: max_quantity,
                                        },
                                        (_, i) => i + 1
                                    ).map((i, index) => (
                                        <option key={index} value={i}>
                                            {i}
                                        </option>
                                    ))}
                                </select>
                            );
                        }}
                    />

                    {part.name}
                </label>
            </div>
            <div className="grid-display__form-item-footer">
                <div className={`list-display__form-item-price `}>
                    {part.price} BYN
                </div>
                <div className="grid-display__form-item-footer-btns">
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
                </div>
            </div>
        </li>
    );
};

export default MultiSelectFormGridItemCardV2;
