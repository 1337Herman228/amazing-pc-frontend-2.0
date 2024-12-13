// @ts-nocheck

"use client";

import { useEffect, useState } from "react";
import "./ViewParts.scss";
import { transformParts } from "@/lib/functions";
import AdminDashboard from "@/components/navbar/admin/admin-dashboard/AdminDashboard";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import AdminSearchInput from "@/components/inputs/admin-search-input/AdminSearchInput";
import AloneSelect from "@/components/select/antd-alone-select/AloneSelect";
import PriceSlider from "@/components/slider/price-slider/PriceSlider";
import useFetch from "@/lib/hooks/useFetch";
import AdminListItemCard from "@/components/cards/admin-list-item-card/AdminListItemCard";

const ViewParts = () => {
    const { getParts, isLoading } = useFetch();

    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [partition, setPartition] = useState("");
    const [name, setName] = useState("");
    const [minMax, setMinMax] = useState([]);
    const [remainingQuantity, setRemainingQuantity] = useState([]);

    const [isReset, setIsReset] = useState(false);

    const [parts, setParts] = useState([]);
    const [filteredParts, setFilteredParts] = useState([]);

    useEffect(() => {
        fetchParts();
    }, []);

    const fetchParts = async () => {
        const data = await getParts();
        setParts(transformParts(data));
    };

    const getUniqueTypes = () => {
        const types = [];
        parts.forEach((part) => {
            types.push(part.types.alternativeName);
        });
        const typesSet = new Set(types);
        return [...typesSet];
    };
    const getUniqueCategories = () => {
        const categories = [];
        parts.forEach((part) => {
            categories.push(part.categories.categoryName);
        });
        const categoriesSet = new Set(categories);
        return [...categoriesSet];
    };
    const getUniquePartitions = () => {
        const partitions = [];
        parts.forEach((part) => {
            partitions.push(part.partitions.partitionName);
        });
        const partitionsSet = new Set(partitions);
        return [...partitionsSet];
    };
    const getPriceRange = () => {
        const prices = [];
        parts.forEach((part) => {
            prices.push(part.price);
        });
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        return [min, max];
    };
    const getRemainingQuantityRange = () => {
        const remQuantity = [];
        parts.forEach((part) => {
            remQuantity.push(Number(part.remainingQuantity));
        });
        const min = Math.min(...remQuantity);
        const max = Math.max(...remQuantity);
        return [min, max];
    };

    const makeOptionsList = (array) => {
        const newArr = [{ value: "", label: "Все" }];

        array.forEach((element) => {
            newArr.push({ value: element, label: element });
        });

        return newArr;
    };

    const filter = () => {
        var filteredData = parts;

        if (type)
            filteredData = filteredData.filter(
                (part) => part.types.alternativeName === type
            );
        if (category)
            filteredData = filteredData.filter(
                (part) => part.categories.categoryName === category
            );
        if (partition)
            filteredData = filteredData.filter(
                (part) => part.partitions.partitionName === partition
            );
        if (name)
            filteredData = filteredData.filter((part) =>
                part.name.toLowerCase().includes(name.toLowerCase())
            );
        if (minMax.length != 0)
            filteredData = filteredData.filter(
                (part) => part.price >= minMax[0] && part.price <= minMax[1]
            );
        if (remainingQuantity.length != 0)
            filteredData = filteredData.filter(
                (part) =>
                    part.remainingQuantity >= remainingQuantity[0] &&
                    part.remainingQuantity <= remainingQuantity[1]
            );

        setFilteredParts(filteredData);
    };

    const resetFilters = () => {
        setType("");
        setCategory("");
        setPartition("");
        setName("");
        setMinMax([]);
        setRemainingQuantity([]);

        setIsReset(true);
        setTimeout(() => {
            setIsReset(false);
        }, 0);
    };

    useEffect(() => {
        filter();
    }, [type, category, partition, name, minMax, remainingQuantity, parts]);

    return (
        <>
            <AdminDashboard type="parts" />
            {isLoading ? (
                <LoadingPage />
            ) : (
                <div className="parts-container container pt-100">
                    <aside className="filters-sticky-block-wrapper">
                        <div className="filters">
                            {isReset ? null : ( //Тупорылый ресет селектов ЫЫЫЫЫЫЫ
                                <>
                                    <AdminSearchInput
                                        name="Название"
                                        setStateField={setName}
                                    />
                                    <AloneSelect
                                        setStateField={setType}
                                        name="Тип"
                                        options={makeOptionsList(
                                            getUniqueTypes()
                                        )}
                                    />
                                    <AloneSelect
                                        setStateField={setCategory}
                                        name="Категория"
                                        options={makeOptionsList(
                                            getUniqueCategories()
                                        )}
                                    />
                                    <AloneSelect
                                        setStateField={setPartition}
                                        name="Раздел"
                                        options={makeOptionsList(
                                            getUniquePartitions()
                                        )}
                                    />
                                    <PriceSlider
                                        name="Цена, BYN"
                                        minMax={getPriceRange()}
                                        setMinMax={setMinMax}
                                    />
                                    <PriceSlider
                                        name="Оставшееся кол-во, шт"
                                        minMax={getRemainingQuantityRange()}
                                        setMinMax={setRemainingQuantity}
                                    />
                                </>
                            )}
                            <button
                                className="filters__reset-btn"
                                onClick={resetFilters}
                            >
                                Сбросить
                            </button>
                        </div>
                    </aside>

                    <aside className="parts">
                        <ul className="parts__list">
                            {filteredParts.length === 0 ? (
                                <p>Ничего не найдено</p>
                            ) : null}
                            {filteredParts.map((part) => (
                                <AdminListItemCard
                                    part={part}
                                    key={part.id}
                                    id={part.id}
                                    name={part.name}
                                    price={part.price}
                                    img={part?.image}
                                    type={part.types.alternativeName}
                                    category={part.categories.categoryName}
                                    partition={part.partitions.partitionName}
                                    remainingQuantity={part.remainingQuantity}
                                    fetchParts={fetchParts}
                                />
                            ))}
                        </ul>
                    </aside>
                </div>
            )}
        </>
    );
};

export default ViewParts;
