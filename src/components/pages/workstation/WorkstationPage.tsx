"use client";

import PcCatalog from "@/components/products-catalog/pc-catalog/PcCatalog";
import CatalogHeader from "../headers/catalog-header/CatalogHeader";
import useFetch from "@/lib/hooks/useFetch";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import { IPcCategory, IPcModelGroup } from "@/interfaces/types-v2";

const workstation_header_info = {
    title: "РАБОЧИЕ СТАНЦИИ",
    description:
        "Подберите компьютер, который подойдет для любого направления! Либо самостоятельно соберите комплектацию ПК и проверьте комплектующие на совместимость с помощью конфигуратора.",
    link: "/gaming-pc/#choise-notebook",
    link_text: "Подобрать компьютер",
    img: "/images/pro-page-banner.webp",
};

const WorkstationPage = () => {
    const { getWorkstationsCatalog, getNotEmptyPcCategories } = useFetch();

    const [pcModelGroups, setPcModelGroups] = useState<IPcModelGroup[] | null>(
        null
    );
    const [pcCategories, setPcCategories] = useState<IPcCategory[] | null>(
        null
    );

    useEffect(() => {
        Promise.all([fetchWorkstation(), fetchPcCategories()]);
    }, []);

    const fetchWorkstation = async () => {
        const data = await getWorkstationsCatalog();
        setPcModelGroups(data);
    };

    const fetchPcCategories = async () => {
        const data = await getNotEmptyPcCategories();
        setPcCategories(data);
    };

    if (!pcModelGroups || !pcCategories) return <LoadingPage />;

    return (
        <>
            <CatalogHeader header_info={workstation_header_info} />
            <PcCatalog
                categories={pcCategories}
                pcModelGroupList={pcModelGroups}
            />
        </>
    );
};
export default WorkstationPage;
