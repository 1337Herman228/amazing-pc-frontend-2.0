"use client";

import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import { IPart, IPurchaseItem } from "@/interfaces/types-v2";
import useFetch from "@/lib/hooks/useFetch";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import "./CatalogIdPage.scss";
import ConfigBuyBtn from "@/components/buttons/configurator-buy-btn/ConfigBuyBtn";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store/store";
import { setCartState } from "@/lib/redux/store/slices/cartSlice";
import useAddCompareItem from "../../configurator/form-list-item/form-list-item-card/handleAddCompareItem";

const CatalogIdPage = () => {
    const params = useParams();
    const id = params?.id;

    const [part, setPart] = useState<IPart | null>(null);

    const { getPartById } = useFetch();

    const fetchPart = async (id: string) => {
        const data = await getPartById(id);
        setPart(data);
    };

    useEffect(() => {
        if (id) fetchPart(id as string);
    }, [id]);

    const cart = useAppSelector((state) => state.cart);
    const { addProductToCard, getUserCartItems } = useFetch();
    const dispatch = useAppDispatch();

    const handleAddPcToCard = async () => {
        const productId = id as string;
        await addProductToCard(productId);
        const data: IPurchaseItem[] = await getUserCartItems();
        dispatch(setCartState(data));
    };

    const compare = useAppSelector((state) => state.compare);
    const isPartCompared = useMemo(
        () => !!compare?.compareItems.find((p) => p.product.id === part?.id),
        [compare, part]
    );

    const { fetchCompareItemsCount, fetchCompareItems, handleAddCompareItem } =
        useAddCompareItem();

    const addCompareItem = async (productId: string) => {
        await handleAddCompareItem(productId);
        await fetchCompareItemsCount();
        await fetchCompareItems();
    };

    if (!part) return <LoadingPage />;

    return (
        <>
            <div className=" bg-[#111111] ">
                <div className="container section header-grid-container pt-10 h-auto ">
                    <div className=" ">
                        <img
                            src={part.image}
                            alt={part.name}
                            className="object-contain w-full h-full max-h-[600px]"
                            width={400}
                            height={400}
                        />
                    </div>
                    <div className="">
                        <div className="text-[40px] leading-[1.2]">
                            {part.name}
                        </div>
                        <div className="text-[16px] leading-[1.2] my-5 break-words">
                            {part.description}
                        </div>
                        <div className="text-[21px] leading-[1.2] py-5 border-y-1 border-y-[#2a2a2a]">
                            Цена: {part.price} BYN
                        </div>
                        <div className="my-5 flex gap-5 flex-wrap">
                            <ConfigBuyBtn
                                styles={{ maxWidth: "305px" }}
                                onClick={handleAddPcToCard}
                                isPressed={
                                    !!cart.items?.find(
                                        (el) => el.product.id === id
                                    )
                                }
                            />
                            <button
                                className="flex gap-1 justify-center place-items-center cursor-pointer border-1 border-[#2a2a2a]  hover:border-gray-500 transition-all rounded-md px-3 py-2"
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
                                    className={`${
                                        !isPartCompared && "invert-75"
                                    }`}
                                />
                                <div className="text-sm font-light text-[#aaa8a8] hover:text-amber-50 transition-all">
                                    {isPartCompared
                                        ? "В сравнении"
                                        : "Сравнить"}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <section className="catalog-id container section">
                <div className="text-4xl mt-15 mb-10 flex justify-center place-items-center text-center leading-12">
                    Характеристики <br /> {part.name}
                </div>
                <div className="flex justify-center">
                    <table className="modal-table max-w-[1000px]">
                        <thead>
                            <tr className="modal-table__header">
                                <th
                                    className="modal-table__header-text"
                                    colSpan={2}
                                ></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="modal-table__row">
                                <td className="modal-table__row-info">
                                    Категория
                                </td>
                                <td className="modal-table__row-price">
                                    {part.categories.label}
                                </td>
                            </tr>
                            <tr className="modal-table__row">
                                <td className="modal-table__row-info">Тип</td>
                                <td className="modal-table__row-price">
                                    {part.types.label}
                                </td>
                            </tr>
                            {part.characteristics.map(
                                ({ label, value, item }) => (
                                    <tr
                                        key={value}
                                        className="modal-table__row"
                                    >
                                        <td className="modal-table__row-info">
                                            {label}
                                        </td>
                                        <td className="modal-table__row-price">
                                            {Array.isArray(item)
                                                ? item.join(", ")
                                                : item || "-"}
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                        <thead>
                            <tr className="modal-table__header ">
                                <th
                                    className="modal-table__header-text !p-1"
                                    colSpan={2}
                                ></th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </section>
        </>
    );
};

export default CatalogIdPage;
