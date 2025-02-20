"use client";

import PcCatalog from "@/components/products-catalog/pc-catalog/PcCatalog";
import CatalogHeader from "../headers/catalog-header/CatalogHeader";
import useFetch from "@/lib/hooks/useFetch";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import { IPcCategory, IPcModelGroup } from "@/interfaces/types-v2";

const notebook_header_info = {
    title: "ИГРОВЫЕ НОУТБУКИ",
    description:
        "Мощные модели игровых ноутбуков, оснащенные передовыми технологиями NVIDIA GeForce RTX 40 и высокоэффективными процессорами Intel Core 13-го поколения. Отличный выбор для тех, кому важно сочетание мобильности и производительности в одном устройстве. Испытайте свое превосходство в играх прямо сейчас!",
    link: "/gaming-pc/#choise-notebook",
    link_text: "Подобрать ноутбук",
    img: "/images/notebook-page-banner.png",
};

const NotebookPage = () => {
    const { getNotebooksCatalog, getNotEmptyPcCategories } = useFetch();

    const [pcModelGroups, setPcModelGroups] = useState<IPcModelGroup[] | null>(
        null
    );
    const [pcCategories, setPcCategories] = useState<IPcCategory[] | null>(
        null
    );

    useEffect(() => {
        Promise.all([fetchNotebooks(), fetchPcCategories()]);
    }, []);

    const fetchNotebooks = async () => {
        const data = await getNotebooksCatalog();
        setPcModelGroups(data);
    };

    const fetchPcCategories = async () => {
        const data = await getNotEmptyPcCategories();
        setPcCategories(data);
    };

    if (!pcModelGroups || !pcCategories) return <LoadingPage />;

    return (
        <>
            <CatalogHeader header_info={notebook_header_info} />
            <PcCatalog
                categories={pcCategories}
                pcModelGroupList={pcModelGroups}
                isNotebook
            />
        </>
    );
};
export default NotebookPage;
