"use client";

import { useEffect, useState } from "react";
import CatalogHeader from "../headers/catalog-header/CatalogHeader";
import PcCatalog from "@/components/products-catalog/pc-catalog/PcCatalog";
import { IpcCatalog } from "@/interfaces/types";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import useFetch from "@/lib/hooks/useFetch";
import { IPcCategory, IPcModelGroup } from "@/interfaces/types-v2";

const gaming_pc_header_info = {
    title: "Игровые компьютеры",
    description:
        "Подберите компьютер, который подойдет для любых игр! Либо самостоятельно соберите комплектацию ПК и проверьте комплектующие на совместимость с помощью конфигуратора.",
    link: "/gaming-pc/#choise-gaming-pc",
    link_text: "Подобрать компьютер",
    img: "/images/gaming-pc-header.webp",
};

const GamingPcPage = () => {
    const { getGamingPcCatalog, getNotEmptyPcCategories } = useFetch();

    const [pcModelGroups, setPcModelGroups] = useState<IPcModelGroup[] | null>(
        null
    );
    const [pcCategories, setPcCategories] = useState<IPcCategory[] | null>(
        null
    );

    useEffect(() => {
        Promise.all([fetchPcCategories(), fetchGamingPc()]);
    }, []);

    const fetchGamingPc = async () => {
        const data = await getGamingPcCatalog();
        setPcModelGroups(data);
    };
    const fetchPcCategories = async () => {
        const data = await getNotEmptyPcCategories();
        setPcCategories(data);
    };

    if (!pcModelGroups || !pcCategories) return <LoadingPage />;

    return (
        <>
            <CatalogHeader header_info={gaming_pc_header_info} />
            <PcCatalog
                categories={pcCategories}
                pcModelGroupList={pcModelGroups}
            />
        </>
    );
};
export default GamingPcPage;
