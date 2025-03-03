"use client";

import { ICatalog } from "@/interfaces/types-v2";
import "./PcCatalogCard.scss";
import Link from "next/link";
import { declension } from "@/lib/functions";

const Img = ({ src }: { src: string }) => {
    return (
        <img
            className="component__img"
            src={src}
            width={20}
            height={20}
            alt=""
            loading="lazy"
        />
    );
};

interface PcCatalogCardProps {
    catalog: ICatalog;
    isNotebook: boolean;
}

const PcCatalogCard = ({ catalog, isNotebook }: PcCatalogCardProps) => {
    return (
        <div className="pc-card-container">
            <Link
                href={`/${catalog.pcModelGroup.pcTypes.value}/${catalog.pcModelGroup.modelGroupName}`}
            >
                <div className="pc-card">
                    <div className="pc-card__mark-div">
                        <span className="pc-card__mark mark">
                            {declension(catalog.configurationsCount)}
                        </span>
                    </div>
                    <img
                        className="pc-card__img"
                        src={catalog.pcModelGroup.modelGroupImage}
                        width={200}
                        height={300}
                        alt={catalog.pcModelGroup.modelGroupName}
                        loading="lazy"
                    />
                    <div className="pc-card__info">
                        <div className="pc-card__info-title-and-price">
                            <h3 className="pc-card__info-title">
                                {catalog.pcModelGroup.modelGroupName}
                            </h3>
                            <div className="pc-card__info-price">
                                От {catalog.minPrice} BYN
                            </div>
                        </div>
                        <span className="pc-card__info-description">
                            {catalog.pcModelGroup.modelGroupDescription}
                        </span>
                    </div>
                    <hr />
                    <ul className="pc-card__configuration-list">
                        <li className="component">
                            <Img src="/gaming-pc/components-svg/gpu.svg" />
                            <div className="component__name">
                                {catalog.pcModelGroup.gpuDescription}
                            </div>
                        </li>
                        <li className="component">
                            <Img src="/gaming-pc/components-svg/cpu.svg" />
                            <div className="component__name">
                                {catalog.pcModelGroup.cpuDescription}
                            </div>
                        </li>
                        <li
                            className={
                                isNotebook ? "display-none" : "component"
                            }
                        >
                            <Img src="/gaming-pc/components-svg/mb.svg" />
                            <div className="component__name">
                                {catalog.pcModelGroup.motherboardDescription}
                            </div>
                        </li>
                        <li className="component">
                            <Img src="/gaming-pc/components-svg/ram.svg" />
                            <div className="component__name">
                                {catalog.pcModelGroup.ramDescription}
                            </div>
                        </li>
                        <li className="component">
                            <Img src="/gaming-pc/components-svg/ssd.svg" />
                            <div className="component__name">
                                {catalog.pcModelGroup.ssdDescription}
                            </div>
                        </li>
                        <li
                            className={
                                isNotebook ? "display-none" : "component"
                            }
                        >
                            <Img src="/gaming-pc/components-svg/pow-sup.svg" />
                            <div className="component__name">
                                {catalog.pcModelGroup.psuDescription}
                            </div>
                        </li>
                    </ul>
                </div>
            </Link>
            <div className="card-buttons">
                <Link
                    className={
                        `card-buttons__link button-transparent-white ` +
                        (isNotebook
                            ? " card-buttons__link--more-info-notebook"
                            : "card-buttons__link--more-info")
                    }
                    href={`/${catalog.pcModelGroup.pcTypes.value}/${catalog.pcModelGroup.modelGroupName}`}
                >
                    {isNotebook ? "Подробнее" : "Подробнее о модели"}
                </Link>
                <Link
                    className={
                        `card-buttons__link card-buttons__link--configurator green-filled-link ` +
                        (isNotebook ? "display-none" : "")
                    }
                    href={`/configurator/${catalog.pc.id}`}
                >
                    <img
                        className="card-buttons__link__svg"
                        src="/setting-2.svg"
                        width={24}
                        height={24}
                        alt="configurator"
                        loading="lazy"
                    />

                    <span className="card-buttons__link__text">
                        Конфигуратор
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default PcCatalogCard;
