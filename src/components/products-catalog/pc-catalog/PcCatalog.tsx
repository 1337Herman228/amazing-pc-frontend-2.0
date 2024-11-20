"use client";

import { IpcCategories, IpcModelGroupList } from "@/interfaces/types";
import "./PcCatalog.scss";
import PcCatalogCard from "@/components/cards/pc-catalog-card/PcCatalogCard";

interface PcCatalogProps {
    categories: IpcCategories[];
    pcModelGroupList: IpcModelGroupList[];
    is_notebook?: boolean;
}

const PcCatalog = ({
    categories,
    pcModelGroupList,
    is_notebook = false,
}: PcCatalogProps) => {
    // console.log("categories", categories);
    // console.log("products_list", pcModelGroupList);

    return (
        <section className="_catalog">
            {categories.map((category) => {
                return (
                    <div
                        key={category.pcCategoryId}
                        className="_catalog-body container section"
                    >
                        <div
                            className={
                                category.pcCategoryName != "Нет категории"
                                    ? "_catalog-body__header"
                                    : "display-none"
                            }
                        >
                            <div className="header-top">
                                <h2 className="header-top__title">
                                    <div>{category.pcCategoryName}</div>
                                </h2>
                                <div>
                                    <img
                                        className="header-top__arrow"
                                        src="/arrow-top-right.svg"
                                        width={40}
                                        height={40}
                                        alt=""
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                            <div className="header-bottom">
                                <p>{category.pcCategoryDescription}</p>
                            </div>
                        </div>
                        <main className="_catalog-body__main">
                            {pcModelGroupList
                                .filter(
                                    (item) =>
                                        item.pcModelGroup.pcCategories
                                            .pcCategoryId ===
                                        category.pcCategoryId
                                )
                                .map((item) => (
                                    <PcCatalogCard
                                        key={item.pcModelGroup.pcModelGroupId}
                                        pcModelGroup={item}
                                        isNotebook={is_notebook}
                                    />
                                ))}
                        </main>
                    </div>
                );
            })}
        </section>
    );
};

export default PcCatalog;
