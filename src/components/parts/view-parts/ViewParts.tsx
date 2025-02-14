"use client";

import { useEffect, useMemo, useState } from "react";
import "./ViewParts.scss";
import AdminDashboard from "@/components/navbar/admin/admin-dashboard/AdminDashboard";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import AdminSearchInput from "@/components/inputs/admin-search-input/AdminSearchInput";
import AloneSelect from "@/components/select/antd-alone-select/AloneSelect";
import PriceSlider from "@/components/slider/price-slider/PriceSlider";
import useFetch from "@/lib/hooks/useFetch";
import AdminListItemCard from "@/components/cards/admin-list-item-card/AdminListItemCard";
import { ICategory, IPart, IPartition, IType } from "@/interfaces/types-v2";
import { makeOptionsList } from "@/lib/functions";

const ViewParts = () => {
    const { getParts, getTypes, getCategories, getPartitions } = useFetch();

    const [typesOptions, setTypesOptions] = useState<IType[] | null>(null);
    const [partitionsOptions, setPartitionsOptions] = useState<
        IPartition[] | null
    >(null);
    const [categoriesOptions, setCategoriesOptions] = useState<
        ICategory[] | null
    >(null);

    const [type, setType] = useState<IType | null>(null);
    const [category, setCategory] = useState<ICategory | null>(null);
    const [partition, setPartition] = useState<IPartition | null>(null);
    const [name, setName] = useState("");
    const [minMax, setMinMax] = useState<number[]>([]);
    // const [remainingQuantity, setRemainingQuantity] = useState([]);

    const [parts, setParts] = useState<IPart[] | null>(null);
    const [filteredParts, setFilteredParts] = useState<IPart[] | null>(null);

    useEffect(() => {
        fetchInfo();
    }, []);

    const fetchInfo = async () => {
        await Promise.all([
            fetchParts(),
            fetchTypes(),
            fetchCategories(),
            fetchPartitions(),
        ]);
    };

    const fetchParts = async () => {
        const data = await getParts();
        setParts(data);
    };

    const fetchTypes = async () => {
        const data = await getTypes();
        setTypesOptions(makeOptionsList(data));
    };

    const fetchCategories = async () => {
        const data = await getCategories();
        setCategoriesOptions(makeOptionsList(data));
    };

    const fetchPartitions = async () => {
        const data = await getPartitions();
        setPartitionsOptions(makeOptionsList(data));
    };

    const priceRange = useMemo(() => {
        const prices: number[] = [];
        if (parts)
            parts.forEach((part) => {
                prices.push(part.price);
            });
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        // setMinMax([min, max]);
        return [min, max];
    }, [parts]);

    useEffect(() => {
        if (priceRange) setMinMax(priceRange);
    }, [priceRange]);

    // const getRemainingQuantityRange = () => {
    //     const remQuantity = [];
    //     parts.forEach((part) => {
    //         remQuantity.push(Number(part.remainingQuantity));
    //     });
    //     const min = Math.min(...remQuantity);
    //     const max = Math.max(...remQuantity);
    //     return [min, max];
    // };

    const filter = () => {
        var filteredData = parts;

        if (type)
            filteredData =
                filteredData?.filter(
                    (part) => part.types.value === type.value
                ) || null;
        if (category)
            filteredData =
                filteredData?.filter(
                    (part) => part.categories.value === category.value
                ) || null;
        if (partition)
            filteredData =
                filteredData?.filter(
                    (part) => part.partitions.value === partition.value
                ) || null;
        if (name)
            filteredData =
                filteredData?.filter((part) =>
                    part.name.toLowerCase().includes(name.toLowerCase())
                ) || null;
        if (minMax.length != 0) {
            filteredData =
                filteredData?.filter(
                    (part) => part.price >= minMax[0] && part.price <= minMax[1]
                ) || null;
        }

        // if (remainingQuantity.length != 0)
        //     filteredData = filteredData.filter(
        //         (part) =>
        //             part.remainingQuantity >= remainingQuantity[0] &&
        //             part.remainingQuantity <= remainingQuantity[1]
        //     );

        setFilteredParts(filteredData);
    };

    const resetFilters = () => {
        setName("");
        setType(null);
        setCategory(null);
        setPartition(null);
        setMinMax(priceRange);
        // setRemainingQuantity([]);
    };

    useEffect(() => {
        filter();
    }, [type, category, partition, name, minMax, parts]);

    const isLoading =
        !typesOptions ||
        !partitionsOptions ||
        !categoriesOptions ||
        !parts ||
        !minMax ||
        !priceRange;

    return (
        <>
            <AdminDashboard type="parts" />
            {isLoading ? (
                <LoadingPage />
            ) : (
                <div className="parts-container container pt-100">
                    <aside className="filters-sticky-block-wrapper">
                        <div className="filters">
                            <AdminSearchInput
                                name="Название"
                                setStateField={setName}
                            />
                            <AloneSelect
                                value={type || typesOptions[0]}
                                setStateField={setType}
                                name="Тип"
                                options={typesOptions}
                            />
                            <AloneSelect
                                value={category || categoriesOptions[0]}
                                setStateField={setCategory}
                                name="Категория"
                                options={categoriesOptions}
                            />
                            <AloneSelect
                                value={partition || partitionsOptions[0]}
                                setStateField={setPartition}
                                name="Раздел"
                                options={partitionsOptions}
                            />
                            <PriceSlider
                                name="Цена, BYN"
                                minMax={priceRange}
                                onChange={setMinMax}
                                value={minMax}
                            />
                            {/* <PriceSlider
                                        name="Оставшееся кол-во, шт"
                                        minMax={getRemainingQuantityRange()}
                                        setMinMax={setRemainingQuantity}
                                    /> */}

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
                            {filteredParts?.length === 0 ? (
                                <p>Ничего не найдено</p>
                            ) : null}
                            {filteredParts?.map((part) => (
                                <AdminListItemCard
                                    key={part.id}
                                    part={part}
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
