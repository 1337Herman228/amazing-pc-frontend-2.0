// @ts-nocheck
import InfoModal from "@/components/modals/info-modal/InfoModal";
import { IExtendedPart, IType } from "@/interfaces/types";
import { makePartInfoObject } from "@/lib/functions";
import { useState } from "react";

const getType = (typename: string, item: any) => {
    let type = typename;

    if (typename === "cpu_fan") {
        type = "cpuLiquidCooling";
        if (!item.width) {
            type = "cpuAirCooling";
        }
    }
    if (item.characteristics) {
        type = "periphery";
    }

    return [type, item];
};

interface FormListItemCardProps {
    item: any;
    multiselect?: boolean | null;
    default_checked?: boolean;
    max_quantity?: number;
    type: IType;
    onCheckboxClick: Function;
    setSelectedItem: Function;
    onSelectQuantity: Function;
    selectedItem: IExtendedPart | IExtendedPart[] | null;
}

const FormListItemCard = ({
    onSelectQuantity,
    onCheckboxClick,
    setSelectedItem,
    type,
    item,
    multiselect,
    default_checked,
    max_quantity,
    selectedItem,
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
                <input
                    className="list-display__form-item-input"
                    type={multiselect ? "checkbox" : "radio"}
                    name={type.alternativeName}
                    id={type.alternativeName + "-" + item.partId}
                    onChange={
                        multiselect
                            ? () => onCheckboxClick(item)
                            : () => setSelectedItem(item)
                    }
                    checked={
                        multiselect
                            ? selectedItem.includes(item)
                            : selectedItem?.partId === item.partId
                    }
                />
                <label
                    className="list-display__form-item-label"
                    htmlFor={type.alternativeName + "-" + item.partId}
                >
                    {multiselect && max_quantity ? (
                        <>
                            <select
                                onChange={(e) => onSelectQuantity(e, item)}
                                className={`list-display__form-item-select ${
                                    selectedItem.includes(item) ||
                                    "visually-hidden"
                                }`}
                                value={
                                    selectedItem.includes(item)
                                        ? selectedItem[
                                              selectedItem.indexOf(item)
                                          ].quantity
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
                        </>
                    ) : null}
                    {item.name}
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
                    data={makePartInfoObject(
                        getType(item.types.typeName, item)
                    )}
                    name={item.name}
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
                {!default_checked &&
                !multiselect &&
                selectedItem?.partId === item.partId ? (
                    <button
                        onClick={() => setSelectedItem(null)}
                        className="list-display__form-item-x-btn"
                    >
                        <img src="/red-x-icon.svg" />
                    </button>
                ) : null}
            </div>
            <div
                className={`list-display__form-item-price ${
                    multiselect
                        ? selectedItem.includes(item)
                            ? "hidden"
                            : ""
                        : selectedItem?.partId === item.partId
                        ? "hidden"
                        : ""
                }`}
            >
                {multiselect
                    ? "+" + item.price
                    : selectedItem?.price
                    ? item.price - selectedItem?.price < 0
                        ? item.price - selectedItem?.price
                        : `+${item.price - selectedItem?.price}`
                    : "+" + item.price}{" "}
                BYN
            </div>
        </li>
    );
};

export default FormListItemCard;
