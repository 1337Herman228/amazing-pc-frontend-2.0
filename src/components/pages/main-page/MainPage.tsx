"use client";

import { Carousel, ConfigProvider } from "antd";
import "./MainPage.scss";
import "../../../styles/style.scss";
import Link from "next/link";
import { useEffect } from "react";
import CardTemplate from "@/components/main-page-components/CardTemplate";
import PopularPcCard from "@/components/main-page-components/PopularPcCard";
import PopularSectionHead from "@/components/main-page-components/PopularSectionHead";
import ServicesSection from "@/components/main-page-components/ServicesSection";

const carousel_cards_info = [
    {
        title: "nvidia geforce rtx 40 super",
        description: "super-скорость. super-возможности",
        button_link: "none",
        img_desktop: "/slider-images/slider-1.jpg",
        img_mobile: "/slider-images/slider-1-mobile.jpg",
    },
    {
        title: "Upgrade center",
        description: "Прокачай свой компьютер",
        button_link: "/upgrade-center",
        img_desktop: "/slider-images/slider-2.0.png",
        img_mobile: "/slider-images/slider-2-mobile.jpg",
    },
];

const popular_pc_info = [
    {
        name: "One",
        description: "Начальный игровой компьютер",
        min_price: "5000",
        img: "/popular-models/hp-popular-pc-one.webp",
        mark: "bestseller",
        link: "/one",
    },
    {
        name: "Leader",
        description: "Мощный игровой компьютер",
        min_price: "8000",
        img: "/popular-models/hp-popular-pc-one.webp",
        mark: "new",
        link: "/leader",
    },
    {
        name: "Lumen 5",
        description: "Идеальный игровой компьютер",
        min_price: "9000",
        img: "/popular-models/hp-popular-pc-one.webp",
        mark: "bestseller",
        link: "/lumen5",
    },
    {
        name: "Lumen 7",
        description: "Стильный игровой коммпьютер",
        min_price: "10000",
        img: "/popular-models/hp-popular-pc-one.webp",
        mark: "none",
        link: "/lumen7",
    },
    {
        name: "Lumen 8",
        description: "Стильный игровой коммпьютер",
        min_price: "10000",
        img: "/popular-models/hp-popular-pc-one.webp",
        mark: "none",
        link: "/lumen7",
    },
    {
        name: "Lumen 9",
        description: "Стильный игровой коммпьютер",
        min_price: "10000",
        img: "/popular-models/hp-popular-pc-one.webp",
        mark: "none",
        link: "/lumen7",
    },
    {
        name: "Lumen 10",
        description: "Стильный игровой коммпьютер",
        min_price: "10000",
        img: "/popular-models/hp-popular-pc-one.webp",
        mark: "none",
        link: "/lumen7",
    },
    {
        name: "Lumen 11",
        description: "Стильный игровой коммпьютер",
        min_price: "10000",
        img: "/popular-models/hp-popular-pc-one.webp",
        mark: "none",
        link: "/lumen7",
    },
];

export default function MainPage() {
    useEffect(() => {
        openFirstDialog();
    }, []);

    const openFirstDialog = () => {
        const firstDialogElement = document.querySelector(
            ".services__list__item__accordeon"
        );
        firstDialogElement?.setAttribute("open", "true");
    };

    return (
        <>
            <h1 className="visually-hidden">Amazing PC Main page</h1>

            <div className="carousel-container">
                <ConfigProvider
                    theme={{
                        components: {
                            Carousel: {
                                arrowSize: 30,
                                arrowOffset: 20,
                            },
                        },
                    }}
                >
                    <Carousel
                        speed={800}
                        autoplay
                        autoplaySpeed={5000}
                        arrows
                        infinite={true}
                    >
                        {carousel_cards_info.map((card_info, i) =>
                            CardTemplate(card_info, i)
                        )}
                    </Carousel>
                </ConfigProvider>
            </div>

            <main className="container">
                <section className="categories section">
                    <h2 className="visually-hidden">Categories</h2>
                    <Link
                        className="categories__gaming-pc gray-card"
                        href="/gaming-pc"
                    >
                        <img
                            width="500px"
                            className="categories__gaming-pc-img"
                            alt="Gaming PC"
                            src="/categories-images/lumen-7-block.webp"
                            loading="lazy"
                        />
                        <div className="categories__gaming-pc-body">
                            <svg
                                className="categories__gaming-pc-arrow"
                                width="40"
                                height="40"
                                viewBox="0 0 89 87"
                                fill="#c0ff01"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M11.751 2.95073C11.751 4.44573 12.9737 5.65906 14.4802 5.65906H78.8503L1.63129 82.2832C0.566914 83.3449 0.566914 85.0566 1.63129 86.1182C2.70112 87.1745 4.42596 87.1745 5.49579 86.1182L82.7094 9.48865V73.3674C82.7094 74.8624 83.932 76.0757 85.4385 76.0757C86.945 76.0757 88.1683 74.8624 88.1683 73.3674V2.95615C88.2005 1.49365 86.9068 0.209897 85.4331 0.241793H14.4802C12.9737 0.241793 11.751 1.45573 11.751 2.95073Z"
                                    fill="black"
                                />
                            </svg>

                            <div className="categories__gaming-pc-text">
                                <span className="min-price-span-green">
                                    От 5 000 BYN
                                </span>
                                <h3 className="categories__gaming-pc-title">
                                    Игровые компьютеры
                                </h3>
                                <div className="categories__gaming-pc-description">
                                    <p>Самые лучшие игровые компьютеры!</p>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/computers"
                        className="categories__pc-in-stock gray-card"
                    >
                        <img
                            width="400px"
                            height="300px"
                            className="categories__pc-in-stock-img"
                            alt="PC in stock"
                            src="/categories-images/pc-in-stock.webp"
                            loading="lazy"
                        />
                        <div className="categories__pc-in-stock-body">
                            <span className="min-price-span-green categories__pc-in-stock-span">
                                От 5 000 BYN
                            </span>
                            <h3 className="categories__pc-in-stock-title">
                                ПК в наличии
                            </h3>
                            <div className="categories__pc-in-stock-description">
                                <p>Начните играть уже сегодня!</p>
                            </div>
                            <button className="categories__pc-in-stock-btn button-transparent-white">
                                Смотреть все модели
                            </button>
                        </div>
                    </Link>

                    <Link
                        href="/workstation"
                        className="categories__work-station gray-card"
                    >
                        <img
                            width="500px"
                            className="categories__work-station-img"
                            alt="Workstation"
                            src="/categories-images/workstation.webp"
                            loading="lazy"
                        />
                        <div className="categories__work-station-body">
                            <span className="min-price-span-green categories__work-station-span">
                                От 5 500 BYN
                            </span>
                            <h3 className="categories__work-station-title">
                                Рабочие станции
                            </h3>
                            <div className="categories__work-station-description">
                                <p>Профессиональные решения</p>
                            </div>
                            <button className="categories__work-station-btn button-transparent-white">
                                Смотреть все модели
                            </button>
                        </div>
                    </Link>

                    <Link
                        href="/notebook"
                        className="categories__gaming-laptop gray-card"
                    >
                        <img
                            width="500px"
                            className="categories__gaming-laptop-img"
                            alt="Gaming laptop"
                            src="/categories-images/notebook.webp"
                            loading="lazy"
                        />
                        <div className="categories__gaming-laptop-body">
                            <span className="min-price-span-green categories__gaming-laptop-span">
                                От 6 400 BYN
                            </span>
                            <h3 className="categories__gaming-laptop-title">
                                Игровые ноутбуки
                            </h3>
                            <div className="categories__gaming-laptop-description">
                                <p>Возьми игру с собой</p>
                            </div>
                            <button className="categories__gaming-laptop-btn button-transparent-white">
                                Смотреть все модели
                            </button>
                        </div>
                    </Link>

                    <Link
                        href="/gaming-pc/custom"
                        className="categories__custom-pc gray-card"
                    >
                        <img
                            width="500px"
                            className="categories__custom-pc-img"
                            alt="Custom PC"
                            src="/categories-images/concept.webp"
                            loading="lazy"
                        />
                        <div className="categories__custom-pc-body">
                            <span className="min-price-span-green categories__custom-pc-span">
                                От 12 000 BYN
                            </span>
                            <h3 className="categories__custom-pc-title">
                                Концепт компьютеры
                            </h3>
                            <div className="categories__custom-pc-description">
                                <p>Экслюзивные компьютеры</p>
                            </div>

                            <button className="categories__custom-pc-btn button-transparent-white">
                                Смотреть все модели
                            </button>
                        </div>
                    </Link>
                </section>

                <section className="popular section">
                    <PopularSectionHead />
                    <div className="popular-container">
                        {popular_pc_info.map((pc) => (
                            <PopularPcCard
                                key={pc.name}
                                name={pc.name}
                                description={pc.description}
                                min_price={pc.min_price}
                                img={pc.img}
                                mark={pc.mark}
                                link={pc.link}
                            />
                        ))}
                    </div>
                    <div className="visible-mobile view-all-mobile-container">
                        <Link
                            href="/gaming-pc"
                            className="view-all-mobile green-circle-bordered-link visible-mobile"
                        >
                            Смотреть все модели
                        </Link>
                    </div>
                </section>

                <section className="catalog section">
                    <div className="catalog-about">
                        <h2 className="catalog-about__title">Каталог</h2>
                        <div className="catalog-about__description">
                            <p>
                                В этом разделе вы можете увидеть какие
                                комплектующие и элементы моддинга мы используем
                                для апгрейда ПК. Или приобрести аксессуары для
                                более комфортной работы или геймплея!
                            </p>
                        </div>
                    </div>
                    <div className="catalog-navigation">
                        <ul className="catalog-navigation__list">
                            <li className="catalog-navigation__list-item">
                                <Link
                                    className="catalog-navigation__list-item-link"
                                    href="/catalog/accessories"
                                >
                                    Аксессуары
                                </Link>
                            </li>
                            <li className="catalog-navigation__list-item">
                                <Link
                                    className="catalog-navigation__list-item-link"
                                    href="/catalog/hardware"
                                >
                                    Комплектующие
                                </Link>
                            </li>
                            <li className="catalog-navigation__list-item">
                                <Link
                                    className="catalog-navigation__list-item-link"
                                    href="/catalog/modding"
                                >
                                    Моддинг
                                </Link>
                            </li>
                        </ul>
                    </div>
                </section>

                <section className="services-section section">
                    <h2 className="services-section__header">УСЛУГИ</h2>
                    <ServicesSection />
                </section>
            </main>
        </>
    );
}
