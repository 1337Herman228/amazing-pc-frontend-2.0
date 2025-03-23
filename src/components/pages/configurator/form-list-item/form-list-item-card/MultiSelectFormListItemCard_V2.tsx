import InfoModal from "@/components/modals/info-modal/InfoModal";
import {
    ConfiguratorFieldValues,
    IPart,
    IPartWithQuantity,
    IType,
} from "@/interfaces/types-v2";
import { useAppSelector } from "@/lib/redux/store/store";
import { useMemo, useState } from "react";
import { Control, Controller } from "react-hook-form";
import useAddCompareItem from "./handleAddCompareItem";

interface MultiSelectFormListItemCardProps {
    selectedParts: IPartWithQuantity[] | undefined;
    part: IPart;
    default_checked?: boolean;
    max_quantity?: number;
    type: IType;
    control: Control<ConfiguratorFieldValues>;
}

const MultiSelectFormListItemCardV2 = ({
    type,
    part,
    default_checked,
    selectedParts,
    control,
    max_quantity = 5,
}: MultiSelectFormListItemCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState([false, false]);

    const compare = useAppSelector((state) => state.compare);
    const { fetchCompareItemsCount, fetchCompareItems, handleAddCompareItem } =
        useAddCompareItem();

    const isPartCompared = useMemo(
        () => !!compare?.compareItems.find((p) => p.product.id === part.id),
        [compare, part]
    );

    const addCompareItem = async (productId: string) => {
        await handleAddCompareItem(productId);
        await fetchCompareItemsCount();
        await fetchCompareItems();
    };

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
        <li className="list-display__form-item">
            <div className="list-display__form-item-info">
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
                <button
                    className={`list-display__form-item-compare-btn btn-icon ${
                        isPartCompared && "selected"
                    }`}
                    disabled={isPartCompared}
                    onClick={() => addCompareItem(part.id)}
                >
                    <img
                        src={
                            isPartCompared
                                ? "/compare-icon-2-accent.svg"
                                : "/compare-icon-2.svg"
                        }
                        width={20}
                        height={20}
                        alt=""
                        loading="lazy"
                    />
                </button>
            </div>
            <div className={`list-display__form-item-price `}>
                {part.price} BYN
            </div>
        </li>
    );
};

export default MultiSelectFormListItemCardV2;
