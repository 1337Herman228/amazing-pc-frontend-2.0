import InfoModal from "@/components/modals/info-modal/InfoModal";
import { ConfiguratorFieldValues, IPart, IType } from "@/interfaces/types-v2";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store/store";
import { useMemo, useState } from "react";
import { Control, Controller } from "react-hook-form";
import useAddCompareItem from "./handleAddCompareItem";

interface FormGridItemCardProps {
    selectedPart: IPart | undefined;
    part: IPart;
    multiselect?: boolean | null;
    default_checked?: boolean;
    max_quantity?: number;
    type: IType;
    control: Control<ConfiguratorFieldValues>;
}

const FormGridItemCard = ({
    type,
    part,
    default_checked,
    selectedPart,
    control,
}: FormGridItemCardProps) => {
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

    const OnRadioBtnImageClick = (e: any) => {
        const img = e.target;
        const input = img.nextElementSibling.querySelector("input");
        input.click();
    };

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
            </div>
        </li>
    );
};

export default FormGridItemCard;
