import Link from "next/link";
import "./SinglePcConfigCard.scss";
import { Rate } from "antd";
import "../../../styles/style.scss";
import { useEffect, useMemo, useState } from "react";
import ButtonToCart from "@/components/buttons/btn-to-cart/ButtonToCart";

const SinglePcConfigCard = ({ pc }: any) => {
    const {
        img,
        name,
        price,
        description,
        link_to_configurator,
        gpu,
        cpu,
        mb,
        cpu_fan,
        ram,
        ssd,
        pow_sup,
        _case,
        os,
        display,
        isNotebook,
    } = pc;

    const Img = ({ src }: { src: string }) => {
        return (
            <img
                className="components-list__item-img"
                src={src}
                width={20}
                height={20}
                alt=""
                loading="lazy"
            />
        );
    };

    const [maxHeight, setMaxHeight] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const elementsP = document.querySelectorAll(
                ".configuration-card__description"
            );
            const _maxHeightP = Math.max(
                ...Array.from(elementsP).map(
                    (el) => el.querySelector("p")!.offsetHeight
                )
            );
            setMaxHeight(_maxHeightP + 5);
        };

        window.addEventListener("resize", handleResize);

        // Вызываем функцию handleResize при монтировании компонента
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        // <Link>
        <div className="configuration-card">
            <img
                className="configuration-card__img"
                src={img}
                alt=""
                loading="lazy"
            />
            <div className="configuration-card__header">
                <h3 className="configuration-card__title">{name}</h3>
                <div className="configuration-card__rate">
                    <Rate
                        className="configuration-card__rate-value"
                        disabled
                        defaultValue={5}
                    />
                    <span className="configuration-card__rate-count">
                        (12 отзывов)
                    </span>
                </div>
                <div className="configuration-card__buy">
                    <span className="configuration-card__buy-price">
                        Цена {price} BYN
                    </span>
                    <span className="configuration-card__buy-btn">
                        <ButtonToCart product={pc} />
                    </span>
                </div>
                <hr />
                <div
                    className="configuration-card__description"
                    style={{ minHeight: `${maxHeight}px` }}
                >
                    <p>{description}</p>
                </div>
                <div className="configuration-card__links">
                    <Link
                        href={link_to_configurator}
                        className="configuration-card__links-config transparent-link-with-border"
                    >
                        <img
                            className="configuration-card__links-config-svg"
                            src="/setting-2.svg"
                            width={24}
                            height={24}
                            alt="configurator"
                            loading="lazy"
                        />
                        <span className="configuration-card__links-config-text">
                            Конфигуратор
                        </span>
                    </Link>
                    <Link
                        href="#"
                        className="configuration-card__links-more transparent-link-with-border"
                    >
                        Подробнее
                    </Link>
                </div>
                <hr />
            </div>
            <ul className="components-list">
                <li className="components-list__item">
                    <Img src="/gaming-pc/components-svg/gpu.svg" />
                    <div className="components-list__item-info">
                        <span className="components-list__item-info-title">
                            Видеокарта:
                        </span>
                        <span className="components-list__item-info-name">
                            {gpu.name}
                        </span>
                    </div>
                </li>
                <li className="components-list__item">
                    <Img src="/gaming-pc/components-svg/cpu.svg" />
                    <div className="components-list__item-info">
                        <span className="components-list__item-info-title">
                            Процессор:
                        </span>
                        <span className="components-list__item-info-name">
                            {cpu.name}
                        </span>
                    </div>
                </li>
                <li
                    className={
                        isNotebook ? "components-list__item" : "display-none"
                    }
                >
                    <Img src="/gaming-pc/components-svg/display.svg" />
                    <div className="components-list__item-info">
                        <span className="components-list__item-info-title">
                            Дисплей:
                        </span>
                        <span className="components-list__item-info-name">
                            {display?.name}
                        </span>
                    </div>
                </li>
                <li
                    className={
                        isNotebook ? "display-none" : "components-list__item"
                    }
                >
                    <Img src="/gaming-pc/components-svg/mb.svg" />
                    <div className="components-list__item-info">
                        <span className="components-list__item-info-title">
                            Материнская плата:
                        </span>
                        <span className="components-list__item-info-name">
                            {mb.name}
                        </span>
                    </div>
                </li>
                <li
                    className={
                        isNotebook ? "display-none" : "components-list__item"
                    }
                >
                    <Img src="/gaming-pc/components-svg/cpu-fan.svg" />
                    <div className="components-list__item-info">
                        <span className="components-list__item-info-title">
                            Охлаждение:
                        </span>
                        <span className="components-list__item-info-name">
                            {cpu_fan.name}
                        </span>
                    </div>
                </li>
                <li className="components-list__item">
                    <Img src="/gaming-pc/components-svg/ram.svg" />
                    <div className="components-list__item-info">
                        <span className="components-list__item-info-title">
                            Оперативная память:
                        </span>
                        <span className="components-list__item-info-name">
                            {ram.name}
                        </span>
                    </div>
                </li>
                <li className="components-list__item">
                    <Img src="/gaming-pc/components-svg/ssd.svg" />
                    <div className="components-list__item-info">
                        <span className="components-list__item-info-title">
                            SSD накопитель:
                        </span>
                        <span className="components-list__item-info-name">
                            {ssd.name}
                        </span>
                    </div>
                </li>
                <li
                    className={
                        isNotebook ? "display-none" : "components-list__item"
                    }
                >
                    <Img src="/gaming-pc/components-svg/pow-sup.svg" />
                    <div className="components-list__item-info">
                        <span className="components-list__item-info-title">
                            Блок питания:
                        </span>
                        <span className="components-list__item-info-name">
                            {pow_sup.name}
                        </span>
                    </div>
                </li>
                <li
                    className={
                        isNotebook ? "display-none" : "components-list__item"
                    }
                >
                    <Img src="/gaming-pc/components-svg/case.svg" />
                    <div className="components-list__item-info">
                        <span className="components-list__item-info-title">
                            Корпус:
                        </span>
                        <span className="components-list__item-info-name">
                            {_case.name}
                        </span>
                    </div>
                </li>
                <li className="components-list__item">
                    <Img src="/gaming-pc/components-svg/os.svg" />
                    <div className="components-list__item-info">
                        <span className="components-list__item-info-title">
                            Операционная система:
                        </span>
                        <span className="components-list__item-info-name">
                            {os}
                        </span>
                    </div>
                </li>
            </ul>
        </div>
        // </Link>
    );
};

export default SinglePcConfigCard;
