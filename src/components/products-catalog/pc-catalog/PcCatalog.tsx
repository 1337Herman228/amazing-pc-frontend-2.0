"use client";

import { ICatalog, IPcCategory } from "@/interfaces/types-v2";
import "./PcCatalog.scss";
import PcCatalogCard from "@/components/cards/pc-catalog-card/PcCatalogCard";

interface PcCatalogProps {
    categories: IPcCategory[];
    catalogs: ICatalog[];
    isNotebook?: boolean;
}

const PcCatalog = ({
    categories,
    catalogs,
    isNotebook = false,
}: PcCatalogProps) => {
    return (
        <section className="_catalog">
            {categories.map((category) => {
                if (
                    catalogs.find(
                        (item) =>
                            item.pcModelGroup.pcCategories.id === category.id
                    )
                )
                    return (
                        <div
                            key={category.id}
                            className="_catalog-body container section"
                        >
                            <div
                                className={
                                    category.value !== "none"
                                        ? "_catalog-body__header"
                                        : "display-none"
                                }
                            >
                                <div className="header-top">
                                    <h2 className="header-top__title">
                                        <div>{category.label}</div>
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
                                    <p>{category.description}</p>
                                </div>
                            </div>
                            <main className="_catalog-body__main">
                                {catalogs
                                    .filter(
                                        (item) =>
                                            item.pcModelGroup.pcCategories
                                                .id === category.id
                                    )
                                    .map((item) => (
                                        <PcCatalogCard
                                            key={item.pcModelGroup.id}
                                            catalog={item}
                                            isNotebook={isNotebook}
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
