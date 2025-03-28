"use client";

import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import {
    CompareItemsDto,
    ICharacteristicItem,
    ICompareType,
    IConfiguratorProductsDto,
    IPart,
    IPartWithQuantity,
    IPc,
    IPurchaseItem,
    TCompareViewType,
} from "@/interfaces/types-v2";
import useFetch from "@/lib/hooks/useFetch";
import { useEffect, useState } from "react";
import "./ComparePage.scss";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store/store";
import { setCompareState } from "@/lib/redux/store/slices/compareSlice";
import ConfigBuyBtn from "@/components/buttons/configurator-buy-btn/ConfigBuyBtn";
import { setCartState } from "@/lib/redux/store/slices/cartSlice";

const styleBody = () => {
    document.body.style.backgroundColor = "var(--tm-color-dark-black-2)";
};
const unstyleBody = () => {
    document.body.style.backgroundColor = "var(--background-main-color)";
};

const ComparePage = () => {
    const {
        getCompareItems,
        deleteCompareItem,
        deleteAllCompareItems,
        addProductToCard,
        getUserCartItems,
    } = useFetch();

    const dispatch = useAppDispatch();
    const cart = useAppSelector((state) => state.cart);

    const [compareItems, setComponentsList] = useState<CompareItemsDto | null>(
        null
    );

    const [selectedType, setSelectedType] = useState<ICompareType | null>(null);
    const [viewType, setViewType] = useState<TCompareViewType>("different");

    const addToCart = async (productId: string) => {
        await addProductToCard(productId);
        const data: IPurchaseItem[] = await getUserCartItems();
        dispatch(setCartState(data));
    };

    const selectType = (type: ICompareType) => {
        setSelectedType(type);
    };

    const fetchCompareItems = async () => {
        const data: CompareItemsDto = await getCompareItems();
        setComponentsList(data?.items?.length ? data : ({} as CompareItemsDto));
        if (
            !compareItems?.items.find((i) => {
                if ("types" in i.product) {
                    return i.product.types.id === selectedType?.id;
                }
                if ("pcType" in i.product) {
                    return i.product.pcType.id === selectedType?.id;
                }
            })
        ) {
            setSelectedType(data.types[0]);
        }
        return data;
    };

    useEffect(() => {
        fetchCompareItems();
        styleBody();

        return () => {
            unstyleBody();
        };
    }, []);

    const deleteFromCompare = async (id: string) => {
        await deleteCompareItem(id);
        dispatch(setCompareState((compareItems?.items.length as number) - 1));
        await fetchCompareItems();
    };

    const deleteAllFromCompare = async () => {
        await deleteAllCompareItems();
        dispatch(setCompareState(0));
        setComponentsList({} as CompareItemsDto);
    };

    if (!compareItems) return <LoadingPage />;

    return (
        <section className="compare-page container section">
            <div className="heading">
                <h1 className="heading__title">Сравнение товаров</h1>

                {compareItems?.items && (
                    <div className="heading__btns">
                        <button className="clear-btn">
                            <div
                                className="clear-btn__body"
                                onClick={() => deleteAllFromCompare()}
                            >
                                <img
                                    className="clear-btn__icon"
                                    src="/garbage-can.svg"
                                    alt="Очистить все"
                                    width={20}
                                    height={20}
                                />
                                <span>Очистить все</span>
                            </div>
                        </button>
                    </div>
                )}
            </div>
            {compareItems?.items ? (
                <>
                    <div className="compare-container">
                        <div className="dashboard">
                            <ul className="dashboard-filter">
                                {compareItems.types.map((type) => (
                                    <button
                                        id={type.id}
                                        key={type.id}
                                        className={`dashboard-filter__button ${
                                            selectedType?.id === type.id &&
                                            "active"
                                        }`}
                                        onClick={() => selectType(type)}
                                    >
                                        {type.label}
                                    </button>
                                ))}
                            </ul>
                        </div>
                        <div className="dashboard-view-btns">
                            <button
                                onClick={() => setViewType("all")}
                                className={`${viewType === "all" && "active"}`}
                            >
                                ПОКАЗАТЬ ВСЕ
                            </button>
                            <button
                                onClick={() => setViewType("different")}
                                className={`${
                                    viewType === "different" && "active"
                                }`}
                            >
                                ТОЛЬКО РАЗЛИЧАЮЩИЕСЯ
                            </button>
                        </div>
                        <div className="compare-body">
                            {compareItems.items
                                .filter(({ product }) => {
                                    if ("types" in product) {
                                        return (
                                            product.types.id ===
                                            selectedType?.id
                                        );
                                    }
                                    if ("pcType" in product) {
                                        return (
                                            product.pcType.id ===
                                            selectedType?.id
                                        );
                                    }
                                })
                                .map(({ product, id }) => (
                                    <div key={id} className="compare-item">
                                        <img
                                            className="compare-item__image"
                                            src={product.image}
                                            alt={product.name}
                                            width={450}
                                            height={450}
                                        />
                                        <div className="compare-item__naming">
                                            <span className="type">
                                                {selectedType?.label}
                                            </span>
                                            <div className="manage">
                                                <span className="manage__name">
                                                    {product.name}
                                                </span>
                                                <button
                                                    className="delete-item-btn"
                                                    onClick={() =>
                                                        deleteFromCompare(id)
                                                    }
                                                >
                                                    <img
                                                        className="delete-item-btn__icon"
                                                        src="/red-x-icon.svg"
                                                        alt="Очистить все"
                                                        width={16}
                                                        height={16}
                                                    />
                                                </button>
                                            </div>
                                            <span className="price">
                                                Цена: {product.price} BYN
                                            </span>
                                        </div>
                                        <div className="to-cart">
                                            <ConfigBuyBtn
                                                styles={{
                                                    width: "305px",
                                                    borderRadius: "20px",
                                                }}
                                                onClick={() =>
                                                    addToCart(product.id)
                                                }
                                                isPressed={
                                                    !!cart.items?.find(
                                                        (el) =>
                                                            el.product.id ===
                                                            product?.id
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="characteristics">
                                            {"types" in product && (
                                                <PartCharacteristics
                                                    viewType={viewType}
                                                    characteristics={
                                                        product.characteristics
                                                    }
                                                    compareParts={
                                                        compareItems.items
                                                            .map(
                                                                ({
                                                                    product,
                                                                }) => {
                                                                    const part =
                                                                        product as IPart;
                                                                    if (
                                                                        part
                                                                            ?.types
                                                                            ?.id ===
                                                                        selectedType?.id
                                                                    ) {
                                                                        return part;
                                                                    }
                                                                }
                                                            )
                                                            .filter(
                                                                Boolean
                                                            ) as IPart[]
                                                    }
                                                />
                                            )}
                                            {"pcType" in product && (
                                                <PcCharacteristics
                                                    viewType={viewType}
                                                    pc={product}
                                                    comparePcs={
                                                        compareItems.items
                                                            .map(
                                                                ({
                                                                    product,
                                                                }) => {
                                                                    const pc =
                                                                        product as IPc;
                                                                    if (
                                                                        pc
                                                                            ?.pcType
                                                                            ?.id ===
                                                                        selectedType?.id
                                                                    ) {
                                                                        return pc;
                                                                    }
                                                                }
                                                            )
                                                            .filter(
                                                                Boolean
                                                            ) as IPc[]
                                                    }
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </>
            ) : (
                <div className="is-empty">Список сравнения пуст</div>
            )}
        </section>
    );
};

const compareCharacteristic = (
    parts: IPart[],
    characteristic: ICharacteristicItem
) => {
    let isEqual = true;
    let chars = [];
    for (let part of parts) {
        chars.push(
            part.characteristics.find((c) => c.value === characteristic.value)
        );
    }
    if (new Set(chars.map((c) => c?.item)).size === 1) isEqual = false;
    return isEqual;
};

interface PartCharacteristicsProps {
    viewType: TCompareViewType;
    characteristics: ICharacteristicItem[];
    compareParts: IPart[];
}

const PartCharacteristics = ({
    viewType,
    characteristics,
    compareParts,
}: PartCharacteristicsProps) => {
    return (
        <ul className="characteristics">
            {characteristics.map(
                (characteristic) =>
                    (compareCharacteristic(compareParts, characteristic) ||
                        viewType === "all" ||
                        compareParts.length === 1) && (
                        <li
                            key={characteristic.value}
                            className="characteristics__item"
                        >
                            <span className="label">
                                {characteristic.label}
                            </span>
                            <span className="value">
                                {Array.isArray(characteristic.item)
                                    ? characteristic.item.join(", ")
                                    : characteristic?.item || "-"}
                            </span>
                        </li>
                    )
            )}
        </ul>
    );
};

interface PcCharacteristicsProps {
    viewType: TCompareViewType;
    pc: IPc;
    comparePcs: IPc[];
}

interface IPcPart {
    label: string;
    value: keyof IPc;
}

const PcParts: IPcPart[] = [
    {
        label: "Видеокарта",
        value: "gpu",
    },
    {
        label: "Процессор",
        value: "cpu",
    },
    {
        label: "Материнская плата",
        value: "motherboard",
    },
    {
        label: "Охлаждение",
        value: "cpuFan",
    },
    {
        label: "Оперативная память",
        value: "ram",
    },
    {
        label: "SSD накопитель",
        value: "ssd",
    },
    {
        label: "Блок питания",
        value: "psu",
    },
    {
        label: "Корпус",
        value: "pcCase",
    },
    {
        label: "Вентиляторы",
        value: "fans",
    },
];

const comparePcCharacteristic = (pcs: IPc[], pcPart: IPcPart) => {
    let isEqual = true;
    let chars: IPart[] = [];
    for (let pc of pcs) {
        chars.push(pc[pcPart.value] as IPart);
    }
    if (new Set(chars.map((c) => c?.name)).size === 1) isEqual = false;
    console.log(chars, isEqual);
    return isEqual;
};

const PcCharacteristics = ({
    viewType,
    pc,
    comparePcs,
}: PcCharacteristicsProps) => {
    // console.log(pc, comparePcs);

    return (
        <ul className="characteristics">
            {PcParts.map(
                (pcPart) =>
                    (comparePcCharacteristic(comparePcs, pcPart) ||
                        viewType === "all" ||
                        comparePcs.length === 1) && (
                        <li
                            key={pcPart.value}
                            className="characteristics__item"
                        >
                            <span className="label">{pcPart.label}</span>
                            <span className="value">
                                {Array.isArray(pc[pcPart.value])
                                    ? // @ts-ignore
                                      pc?.[pcPart.value]?.map(
                                          // @ts-ignore
                                          ({ part, quantity }) => (
                                              <span>
                                                  {part.name} ({quantity} шт.)
                                                  <br />
                                              </span>
                                          )
                                      )
                                    : // @ts-ignore
                                      pc[pcPart.value]?.name || "-"}
                            </span>
                        </li>
                    )
            )}
        </ul>
    );
};

export default ComparePage;
