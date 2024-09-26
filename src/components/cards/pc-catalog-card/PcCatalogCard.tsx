"use client";

import { IpcModelGroupList } from "@/interfaces/types";
import "./PcCatalogCard.scss";
import Link from "next/link";

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
    pcModelGroup: IpcModelGroupList;
    isNotebook: boolean;
}

const PcCatalogCard = ({ pcModelGroup, isNotebook }: PcCatalogCardProps) => {
    function declension(number: number): string {
        const word = "Комплектация";
        if (number % 10 === 1 && number % 100 !== 11) {
            return number + " " + word.replace(/я$/, "я");
        } else if (
            number % 10 >= 2 &&
            number % 10 <= 4 &&
            (number % 100 < 10 || number % 100 >= 20)
        ) {
            return number + " " + word.replace(/я$/, "и");
        } else {
            return number + " " + word + "й";
        }
    }

    return (
        <div className="pc-card-container">
            <Link
                href={`/${pcModelGroup.pcModelGroup.pcTypes.type}/${pcModelGroup.pcModelGroup.modelGroupName}`}
            >
                <div className="pc-card">
                    <div className="pc-card__mark-div">
                        <span className="pc-card__mark mark">
                            {declension(pcModelGroup.configurationsCount)}
                        </span>
                    </div>
                    <img
                        className="pc-card__img"
                        src={pcModelGroup.image}
                        width={200}
                        height={300}
                        alt={pcModelGroup.pcModelGroup.modelGroupName}
                        loading="lazy"
                    />
                    <div className="pc-card__info">
                        <div className="pc-card__info-title-and-price">
                            <h3 className="pc-card__info-title">
                                {pcModelGroup.pcModelGroup.modelGroupName}
                            </h3>
                            <div className="pc-card__info-price">
                                От {pcModelGroup.minPrice} BYN
                            </div>
                        </div>
                        <span className="pc-card__info-description">
                            {pcModelGroup.pcModelGroup.modelGroupDescription}
                        </span>
                    </div>
                    <hr />
                    <ul className="pc-card__configuration-list">
                        <li className="component">
                            <Img src="/gaming-pc/components-svg/gpu.svg" />
                            <div className="component__name">
                                {pcModelGroup.pcModelGroup.gpuDescription}
                            </div>
                        </li>
                        <li className="component">
                            <Img src="/gaming-pc/components-svg/cpu.svg" />
                            <div className="component__name">
                                {pcModelGroup.pcModelGroup.cpuDescription}
                            </div>
                        </li>
                        <li
                            className={
                                isNotebook ? "display-none" : "component"
                            }
                        >
                            <Img src="/gaming-pc/components-svg/mb.svg" />
                            <div className="component__name">
                                {
                                    pcModelGroup.pcModelGroup
                                        .motherboardDescription
                                }
                            </div>
                        </li>
                        <li className="component">
                            <Img src="/gaming-pc/components-svg/ram.svg" />
                            <div className="component__name">
                                {pcModelGroup.pcModelGroup.ramDescription}
                            </div>
                        </li>
                        <li className="component">
                            <Img src="/gaming-pc/components-svg/ssd.svg" />
                            <div className="component__name">
                                {pcModelGroup.pcModelGroup.ssdDescription}
                            </div>
                        </li>
                        <li
                            className={
                                isNotebook ? "display-none" : "component"
                            }
                        >
                            <Img src="/gaming-pc/components-svg/pow-sup.svg" />
                            <div className="component__name">
                                {pcModelGroup.pcModelGroup.psuDescription}
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
                    href={`/${pcModelGroup.pcModelGroup.pcTypes.type}/${pcModelGroup.pcModelGroup.modelGroupName}`}
                >
                    {isNotebook ? "Подробнее" : "Подробнее о модели"}
                </Link>
                <Link
                    className={
                        `card-buttons__link card-buttons__link--configurator green-filled-link ` +
                        (isNotebook ? "display-none" : "")
                    }
                    href={`/configurator/${pcModelGroup.pcModelGroup.modelGroupName}`}
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
