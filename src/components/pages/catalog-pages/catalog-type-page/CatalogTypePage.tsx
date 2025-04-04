"use client";

import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import { IPart, IType } from "@/interfaces/types-v2";
import useFetch from "@/lib/hooks/useFetch";
import { useParams } from "next/navigation";
import { MouseEvent, useEffect, useMemo, useState } from "react";
import "./CatalogTypePage.scss";
import Link from "next/link";
import { useAppSelector } from "@/lib/redux/store/store";
import { ICompareInitialState } from "@/lib/redux/store/slices/compareSlice";
import useAddCompareItem from "../../configurator/form-list-item/form-list-item-card/handleAddCompareItem";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/ui/accordion";
import { ConfigProvider, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const styleBody = () => {
    document.body.style.backgroundColor = "var(--tm-color-dark-black-2)";
};
const unstyleBody = () => {
    document.body.style.backgroundColor = "var(--background-main-color)";
};

interface IFilter {
    [key: string]: string[];
}

const CatalogTypePage = () => {
    const params = useParams();
    const typeValue = params?.type;

    const [type, setType] = useState<IType | null>(null);
    const [parts, setParts] = useState<IPart[] | null>(null);
    const [filteredParts, setFilteredParts] = useState<IPart[] | null>(
        parts || null
    );
    const [filter, setFilter] = useState<IFilter>({});
    const [isFiltering, setIsFiltering] = useState(false);

    useEffect(() => {
        if (Object.keys(filter).length > 0) {
            setIsFiltering(true);

            const newFilteredParts = parts?.filter((part) =>
                part.characteristics.find((characteristic) =>
                    filter?.[characteristic.label] &&
                    Array.isArray(characteristic.item)
                        ? characteristic.item.some((item) =>
                              filter?.[characteristic.label]?.includes(item)
                          )
                        : filter?.[characteristic.label]?.includes(
                              characteristic.item as string
                          )
                )
            );

            setFilteredParts(newFilteredParts || []);

            setIsFiltering(false);
        } else {
            setFilteredParts(parts);
        }
    }, [filter]);

    const compare = useAppSelector((state) => state.compare);

    const { getTypeByValue, getPartsByType } = useFetch();

    const fetchType = async () => {
        const data = await getTypeByValue(typeValue as string);
        setType(data);
    };

    const fetchParts = async (typeId: string) => {
        const data = await getPartsByType(typeId);
        setParts(data);
        setFilteredParts(data);
    };

    useEffect(() => {
        styleBody();

        return () => {
            unstyleBody();
        };
    }, []);

    useEffect(() => {
        if (typeValue) fetchType();
    }, [typeValue]);

    useEffect(() => {
        if (type) {
            fetchParts(type.id);
        }
    }, [type]);

    if (!type || !filteredParts || !parts) return <LoadingPage />;

    return (
        <section className="catalog-type container section">
            <div className="mt-7 flex flex-col place-items-center justify-center gap-3">
                <h1 className="!text-[42px] ">{type.label}</h1>
                <div className="text-md text-[#999999] text-center">
                    Выбирайте для своего компьютера только лучшее!
                    <br />
                    Широкий ассортимент высококачественных компонентов для
                    мощных игровых и рабочих систем.
                </div>
            </div>
            <div className="catalog-container mt-10">
                <div className="px-5 md:p-1">
                    <Filters
                        parts={parts}
                        setFilter={setFilter}
                        filter={filter}
                    />
                </div>
                <ul className="parts-catalog">
                    {!isFiltering ? (
                        filteredParts.map((part) => (
                            <PartCard
                                key={part.id}
                                compare={compare}
                                part={part}
                                type={type}
                            />
                        ))
                    ) : (
                        <div className="flex justify-center place-items-center">
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorPrimary: "#c0ff01",
                                    },
                                }}
                            >
                                <Spin
                                    indicator={
                                        <LoadingOutlined
                                            style={{
                                                fontSize: 50,
                                            }}
                                            spin
                                        />
                                    }
                                />
                            </ConfigProvider>
                        </div>
                    )}
                </ul>
            </div>
        </section>
    );
};

interface FiltersProps {
    parts: IPart[];
    setFilter: (filter: any) => void;
    filter: IFilter;
}

interface IFilterCharacteristic {
    name: string;
    items: {
        title: string;
        quantity: number;
    }[];
}

const Filters = ({ parts, setFilter, filter }: FiltersProps) => {
    const filterCharacteristics: IFilterCharacteristic[] = useMemo(() => {
        const characteristicsMap = new Map<string, Map<string, number>>();

        parts.forEach((part) => {
            part.characteristics.forEach((char) => {
                const { label, item } = char;
                const items = Array.isArray(item) ? item : [item];

                // Фильтрация недопустимых значений
                const validItems = items.filter(
                    (i) => i !== null && i !== undefined && i !== ""
                );

                if (validItems.length === 0) {
                    return; // Пропускаем, если нет допустимых значений
                }

                if (!characteristicsMap.has(label)) {
                    characteristicsMap.set(label, new Map<string, number>());
                }

                const itemMap = characteristicsMap.get(label)!;

                validItems.forEach((i) => {
                    itemMap.set(i, (itemMap.get(i) || 0) + 1);
                });
            });
        });

        return Array.from(characteristicsMap.entries()).map(
            ([name, itemsMap]) => ({
                name,
                items: Array.from(itemsMap.entries()).map(
                    ([title, quantity]) => ({
                        title,
                        quantity,
                    })
                ),
            })
        );
    }, [parts]);

    const toggleFilter = (
        filter: IFilter,
        characteristicName: string,
        item: string
    ) => {
        const newFilter = { ...filter };

        if (newFilter[characteristicName]) {
            const index = newFilter[characteristicName].indexOf(item);
            if (index > -1) {
                newFilter[characteristicName].splice(index, 1);
                if (newFilter[characteristicName].length === 0) {
                    delete newFilter[characteristicName];
                }
            } else {
                newFilter[characteristicName].push(item);
            }
        } else {
            newFilter[characteristicName] = [item];
        }

        return newFilter;
    };

    return (
        <div className="relative h-full">
            <div className="sticky top-[80px]">
                {filterCharacteristics.map((char) => (
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem
                            key={char.name}
                            value={char.name}
                            className="border-b-[#2a2a2a]"
                        >
                            <AccordionTrigger className="!text-lg cursor-pointer">
                                {char.name}
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-1">
                                {char.items.map((item) => (
                                    <div className="flex items-center">
                                        <input
                                            className="list-display__form-item-input"
                                            type="checkbox"
                                            id={char.name + "-" + item.title}
                                            onChange={() =>
                                                setFilter(
                                                    toggleFilter(
                                                        filter,
                                                        char.name,
                                                        item.title
                                                    )
                                                )
                                            }
                                            checked={filter?.[
                                                char.name
                                            ]?.includes(item.title)}
                                        />
                                        <label
                                            key={char.name + "-" + item.title}
                                            className="cursor-pointer"
                                            htmlFor={
                                                char.name + "-" + item.title
                                            }
                                        >
                                            {item.title}
                                        </label>
                                    </div>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))}
            </div>
        </div>
    );
};

interface PartCardProps {
    part: IPart;
    type: IType;
    compare: ICompareInitialState;
}

const PartCard = ({ part, type, compare }: PartCardProps) => {
    const { fetchCompareItemsCount, fetchCompareItems, handleAddCompareItem } =
        useAddCompareItem();

    const isPartCompared = useMemo(
        () => !!compare?.compareItems.find((p) => p.product.id === part.id),
        [compare, part]
    );

    const addCompareItem = async (
        e: MouseEvent<HTMLButtonElement>,
        productId: string
    ) => {
        e.stopPropagation();
        e.preventDefault();
        await handleAddCompareItem(productId);
        await fetchCompareItemsCount();
        await fetchCompareItems();
    };

    return (
        <li className="p-2 ">
            <Link href={`/catalog/${type.value}/${part.id}`} className="z-500">
                <div className="relative flex flex-col border-1 border-[#2a2a2a] rounded-sm hover:border-gray-500 transition-all ">
                    <div className="absolute right-2.5 top-2.5 z-999 border-1 border-[#2a2a2a] p-1.5 h-[32px] rounded-sm bg-[#101010bd] hover:border-gray-500 transition-all">
                        <button
                            className="flex gap-1 justify-center place-items-center cursor-pointer"
                            disabled={isPartCompared}
                            onClick={(e) => addCompareItem(e, part.id)}
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
                                className={`${!isPartCompared && "invert-75"}`}
                            />
                            <div className="text-sm font-light text-[#aaa8a8] hover:text-amber-50 transition-all">
                                {isPartCompared ? "В сравнении" : "Сравнить"}
                            </div>
                        </button>
                    </div>
                    <img
                        src={part.image}
                        alt={part.name}
                        width={200}
                        height={232}
                        className="w-full object-cover p-2 max-h-[250px]"
                    />
                    <div className="p-5 bg-[#181818]">
                        <div className="text-[20px] overflow-hidden text-ellipsis text-nowrap ">
                            {part.name}
                        </div>
                        <div className="text-[17px] font-light mt-1.5">
                            Цена: {part.price} BYN
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    );
};

export default CatalogTypePage;
