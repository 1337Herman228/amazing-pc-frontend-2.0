"use client";

import { useEffect, useState } from "react";
import "./FormListItem.scss";
import { ICategory, IPart, IType } from "@/interfaces/types-v2";
import FormListItemCardV2 from "./form-list-item-card/FormListItemCard_V2";
import FormGridItemCardV2 from "./form-list-item-card/FormGridItemCard_V2";
import { ConfiguratorFieldValues } from "../Configurator_V2";
import { Control } from "react-hook-form";
import { alignGridItemWidth, filterItems } from "../common";

interface FormListItemV2Props {
    type: IType;
    partition: string[];
    category: ICategory;
    parts: IPart[];
    default_checked?: boolean;
    products: ConfiguratorFieldValues;
    control: Control<ConfiguratorFieldValues>;
}

const FormListItemV2 = ({
    type,
    partition,
    parts,
    products,
    control,
    default_checked = true,
}: FormListItemV2Props) => {
    const typeName = parts[0].types.value;
    const selectedPart = products?.[typeName] as IPart;

    const [displayAppearance, setDisplayAppearance] = useState<"list" | "grid">(
        "list"
    );
    const [filteredItems, setFilteredItems] = useState<typeof parts>(parts);

    useEffect(() => {
        alignGridItemWidth();
    }, [displayAppearance, filteredItems]);

    return (
        <>
            <li id={type.value} className="managed-component-item">
                <div className="managed-component-item__header">
                    <div className="managed-component-item__header-left">
                        <img
                            className="managed-component-item__header-left-icon"
                            src={type.image}
                            width={40}
                            height={40}
                            alt=""
                            loading="lazy"
                        />
                        <span className="managed-component-item__header-left-title">
                            {type.label}
                        </span>
                    </div>
                </div>
                <div className="item-body">
                    <div className="item-body__dashboard">
                        <ul className="item-body__dashboard-filter">
                            <button
                                id="all"
                                onClick={(e) =>
                                    filterItems(e, parts, setFilteredItems)
                                }
                                className="item-body__dashboard-filter-button active"
                            >
                                Все
                            </button>
                            {partition.map(
                                (partitionName: string, index: number) => (
                                    <button
                                        id={partitionName}
                                        key={index}
                                        className="item-body__dashboard-filter-button"
                                        onClick={(e) =>
                                            filterItems(
                                                e,
                                                parts,
                                                setFilteredItems
                                            )
                                        }
                                    >
                                        {partitionName}
                                    </button>
                                )
                            )}
                        </ul>
                        <div className="item-body__dashboard-view">
                            <button
                                className={`item-body__dashboard-view-button btn-icon ${
                                    displayAppearance === "list" ? "active" : ""
                                }`}
                                onClick={() => setDisplayAppearance("list")}
                            >
                                <img
                                    src="/list-display-icon.svg"
                                    width={32}
                                    height={32}
                                    alt=""
                                    loading="lazy"
                                />
                            </button>
                            <button
                                className={`item-body__dashboard-view-button btn-icon ${
                                    displayAppearance === "grid" ? "active" : ""
                                }`}
                                onClick={() => setDisplayAppearance("grid")}
                            >
                                <img
                                    src="/grid-display-icon.svg"
                                    width={32}
                                    height={32}
                                    alt=""
                                    loading="lazy"
                                />
                            </button>
                        </div>
                    </div>
                    <div
                        className={`list-display + ${
                            displayAppearance === "list" ? "" : "display-none"
                        }`}
                    >
                        <div className="image-container">
                            <img
                                className="image-container__img"
                                src={
                                    selectedPart?.image ||
                                    "/components/nothing-selected.jpg"
                                }
                                width={314}
                                height={176}
                                alt=""
                                loading="lazy"
                            />
                        </div>
                        <ul className="list-display__form">
                            {filteredItems.map((item, index: number) => (
                                <FormListItemCardV2
                                    default_checked={default_checked}
                                    selectedPart={selectedPart}
                                    part={item}
                                    key={index}
                                    type={type}
                                    control={control}
                                />
                            ))}
                        </ul>
                    </div>
                    <ul
                        className={`grid-display ${
                            displayAppearance === "grid" ? "" : "display-none"
                        }`}
                    >
                        {filteredItems.map((item, index: number) => (
                            <FormGridItemCardV2
                                default_checked={default_checked}
                                selectedPart={selectedPart}
                                part={item}
                                key={index}
                                type={type}
                                control={control}
                            />
                        ))}
                    </ul>
                </div>
            </li>
        </>
    );
};

export default FormListItemV2;
