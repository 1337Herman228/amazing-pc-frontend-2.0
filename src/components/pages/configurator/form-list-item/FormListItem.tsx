// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import "./FormListItem.scss";
import { ICategory, IExtendedPart, IJoinPart, IType } from "@/interfaces/types";
import FormListItemCard from "./form-list-item-card/FormListItemCard";
import FormGridItemCard from "./form-list-item-card/FormGridItemCard";

interface FormListItemProps {
    type: IType;
    partition: string[];
    category: ICategory;
    items: IJoinPart[];
    multiselect?: boolean | null;
    default_checked?: boolean;
    max_quantity?: number;
    addItemToProduct: Function;
}

const FormListItem = ({
    // name,
    type,
    partition,
    items,
    addItemToProduct,
    multiselect = null,
    default_checked = true,
    max_quantity = 0,
}: FormListItemProps) => {
    const [displayAppearance, setDisplayAppearance] = useState<"list" | "grid">(
        "list"
    );
    const [filteredItems, setFilteredItems] = useState<typeof items>(items);
    const [selectedItem, setSelectedItem] = useState<
        IExtendedPart | IExtendedPart[] | null
    >(
        multiselect
            ? default_checked
                ? [items[0]]
                : []
            : default_checked
            ? items[0]
            : null
    );

    const alignGridItemWidth = () => {
        const items: NodeListOf<HTMLUListElement> =
            document.querySelectorAll("ul");
        items.forEach((item) => {
            const labels = item.querySelectorAll("label");
            labels.forEach((label) => {
                const footer = label?.parentElement
                    ?.nextElementSibling as HTMLElement;
                if (footer) {
                    const gridLabelWidth = label.offsetWidth; // Получаем ширину label
                    footer.style.width = `${gridLabelWidth}px`; // Устанавливаем ширину для footer
                }
            });
        });
    };

    useEffect(() => {
        alignGridItemWidth();
    }, [displayAppearance, filteredItems]);

    useEffect(() => {
        addItemToProduct(type.typeName, selectedItem);
    }, [selectedItem]);

    const filterItems = (e: any) => {
        const btn = e.target;
        const part_name = btn.id;

        part_name === "all"
            ? setFilteredItems(items)
            : setFilteredItems(
                  items.filter(
                      (item) => item.partitions.partitionName === part_name
                  )
              );

        const allBtns: NodeListOf<HTMLButtonElement> =
            btn.parentElement.querySelectorAll(
                ".item-body__dashboard-filter-button"
            );
        allBtns.forEach((btn) => btn.classList.remove("active"));
        btn.classList.add("active");
    };

    const OnRadioBtnImageClick = (e: any) => {
        const img = e.target;
        const input = img.nextElementSibling.querySelector("input");
        input.click();
    };

    const onCheckboxClick = (item: IJoinPart) => {
        if (selectedItem?.includes(item))
            setSelectedItem(selectedItem.filter((i) => i !== item));
        else setSelectedItem([...selectedItem, item]);
    };

    const onSelectQuantity = (e: any, item) => {
        const quantity = +e.target.value;
        selectedItem[selectedItem.indexOf(item)].quantity = quantity;
        setSelectedItem([...selectedItem]);
    };

    return (
        <>
            <li id={type.alternativeName} className="managed-component-item">
                <div className="managed-component-item__header">
                    <div className="managed-component-item__header-left">
                        <img
                            className="managed-component-item__header-left-icon"
                            src={type.typeImage}
                            width={40}
                            height={40}
                            alt=""
                            loading="lazy"
                        />
                        <span className="managed-component-item__header-left-title">
                            {type.alternativeName}
                        </span>
                    </div>
                </div>
                <div className="item-body">
                    <div className="item-body__dashboard">
                        <ul className="item-body__dashboard-filter">
                            <button
                                id="all"
                                onClick={(e) => filterItems(e)}
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
                                        onClick={(e) => filterItems(e)}
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
                                    multiselect
                                        ? selectedItem?.[
                                              selectedItem.length - 1
                                          ]?.image ||
                                          "/components/nothing-selected.jpg"
                                        : selectedItem?.image ||
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
                                <FormListItemCard
                                    selectedItem={selectedItem}
                                    onSelectQuantity={onSelectQuantity}
                                    onCheckboxClick={onCheckboxClick}
                                    setSelectedItem={setSelectedItem}
                                    multiselect={multiselect}
                                    default_checked={default_checked}
                                    max_quantity={max_quantity}
                                    item={item}
                                    key={index}
                                    type={type}
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
                            <FormGridItemCard
                                selectedItem={selectedItem}
                                onSelectQuantity={onSelectQuantity}
                                onCheckboxClick={onCheckboxClick}
                                setSelectedItem={setSelectedItem}
                                multiselect={multiselect}
                                default_checked={default_checked}
                                max_quantity={max_quantity}
                                item={item}
                                key={index}
                                type={type}
                                OnRadioBtnImageClick={OnRadioBtnImageClick}
                            />
                        ))}
                    </ul>
                </div>
            </li>
        </>
    );
};

export default FormListItem;
