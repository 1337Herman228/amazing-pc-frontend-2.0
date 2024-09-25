"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import "./SinglePcPage.scss";
import Link from "next/link";
import Tag from "@/components/tags/Tag";
import { Image } from "antd";
import { ISingleProductHeader, ISingleProductPc } from "@/interfaces/types";
import PcSecondNavbar from "@/components/navbar/user/pc-second-navbar/PcSecondNavbar";
import SinglePcHeader from "../../headers/single-product-header/single-pc-header/SinglePcHeader";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import SinglePcSlider from "@/components/slider/single-pc-slider/SinglePcSlider";
import SinglePcConfigCard from "@/components/cards/single-pc-config-card/SinglePcConfigCard";

const header_info = [
    {
        title: "ONE",
        description: "ONE – оптимальный старт в мир современного гейминга.",
        img: "/single-product/one/hyperpc-one-banner.jpg",
        img_mobile: "/single-product/one/hyperpc-one-mobile.jpg",
    },
    {
        title: "LUMEN CORE",
        description: "ONE – оптимальный старт в мир современного гейминга.",
        img: "/single-product/one/hyperpc-one-banner.jpg",
        img_mobile: "/single-product/one/hyperpc-one-mobile.jpg",
    },
    {
        title: "Play 17",
        description: "ONE – оптимальный старт в мир современного гейминга.",
        img: "/single-product/play-17/hyperpc-play-17-idn-intro.jpg",
        img_mobile:
            "/single-product/play-17/hyperpc-play-17-idn-intro-mobile.jpg",
    },
];

const products = [
    {
        _id: "0",
        name: "One",
        category: "pc",
        design: {
            title: "МОЩНОСТЬ И НАДЕЖНОСТЬ",
            description:
                "Компьютер ONE выполнен без излишеств. Каждый компонент, начиная от корпуса и заканчивая системой охлаждения, создан, чтобы обеспечить максимальную производительность, надежность и долговечность. Идеальное сочетание цены и качества делает компьютеры серии ONE самыми оптимальными игровыми системами HYPERPC. То, что нужно начинающим геймерам.",
            min_price: "5000",
            img: "/single-product/one/hyperpc-one-block-design.jpg",
        },
        preview: {
            main_img: "/single-product/one/hyperpc-one-block-gallery.jpg",
            title: "ГАРМОНИЯ СТИЛЯ",
            description:
                "ONE - это компьютер с элегантным черным корпусом, дополненным яркими A-RGB вентиляторами и изящными прямыми линиями, идеально вписывающимися в любой интерьер. Высококачественная сталь обеспечивает прочную фиксацию комплектующих, а стильная сетчатая передняя панель и прозрачное смотровое окно подчеркивают эксклюзивность и уникальность дизайна.",
            slider_images: [
                "/single-product/one/hyperpc-one-block-design.jpg",
                "/single-product/one/hyperpc-one-1.jpg",
                "/single-product/one/hyperpc-one-block-design.jpg",
                "/single-product/one/hyperpc-one-1.jpg",
                "/single-product/one/hyperpc-one-block-design.jpg",
                "/single-product/one/hyperpc-one-1.jpg",
            ],
        },
        performance: {
            img: "/single-product/one/hyperpc-one-block-performance.jpg",
            img_2: "/single-product/one/hyperpc-one-block-memory.jpg",
            title: "ПЕРЕДОВАЯ МОЩНОСТЬ",
            description:
                "Компьютеры ONE построены на базе передовых компьютерных комплектующих: процессоров Intel Core 12-го и 14-го поколения, а также видеокарт NVIDIA с поддержкой последних графических технологий, таких как трассировка лучей, генерация кадров и сглаживание DLSS. Эти комплектующие гарантируют высокую производительность не только в играх, но и в сложных профессиональных программах. Неважно, чем вы будете заниматься, графическим дизайном, архитектурным проектированием или 3D моделированием. Компьютеры ONE станут надежной платформой для решения ваших творческих задач.",
        },
        configurations: [
            {
                _id: "4",
                // configuration_id:'2',
                configuration_name: "One Ultra",
                configuration_description:
                    "Платформа для гейминга в Full HD разрешении, созданная на базе центрального процессора Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер] и видеокарты Palit GeForce RTX 4060 Ti Dual [8GB, 4352 CUDA].",
                configuration_price: "6800",
                link_to_configurator: "/one-ultra/config",
                img: "/gaming-pc/one.jpg", //взять в другой таблице
                gpu: {
                    id: 11,
                    partition: "RTX 4060",
                    name: "Palit GeForce RTX 4060 Ti Dual [8GB, 4352 CUDA]",
                    price: "3000",
                    img: "/components/gpu/palit-rtx-4060-ti-dual.png",
                },
                cpu: {
                    id: 11,
                    partition: "Intel Core 12th",
                    name: "Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер]",
                    price: "1500",
                    img: "/components/cpu/intel-core-i5-12th.jpg",
                },
                motherboard: {
                    id: 11,
                    partition: "Intel B760",
                    name: "MSI PRO B760M-A [DDR4, Wi-Fi]",
                    price: "400",
                    img: "/components/mb/msi-pro-b760m-awifi-314x177.jpg",
                },
                cpu_fan: {
                    id: 11,
                    partition: "Asus",
                    name: "ASUS ROG RYUO III 360 White",
                    price: "450",
                    img: "/components/cpu-fan/asus-rog-ryuo-iii-360-argb-white-314x177.jpg",
                },
                ram: {
                    id: 11,
                    partition: "16 ГБ",
                    name: "16GB Kingston FURY Beast RGB [DDR4, 3600MHz, 2x8GB]",
                    price: "220",
                    img: "/components/ram/kingston-fury-beast-ddr4-rgb-2x-314x177.jpg",
                },
                ssd: {
                    id: 11,
                    partition: "500 ГБ",
                    name: "500GB ADATA LEGEND 800 [3500MB/s, Gen4]",
                    price: "300",
                    img: "/components/ssd/adata-legend-800-314x177.jpg",
                },
                power_supply: {
                    id: 11,
                    partition: "От 500W",
                    name: "550W DeepCool PK550D [80+ Bronze]",
                    price: "160",
                    img: "/components/pow-sup/deepcool-pk550d-314x177.jpg",
                },
                case: {
                    id: 11,
                    partition: "Asus",
                    name: "ASUS TUF GAMING GT502 White",
                    price: "500",
                    img: "/components/case/asus-tuf-gt520-white-314x177.jpg",
                },
            },
            {
                _id: "4",
                // configuration_id:'2',
                configuration_name: "One Ultra",
                configuration_description:
                    "Платформа для гейминга в Full HD разрешении, созданная на базе центрального процессора Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер] и видеокарты Palit GeForce RTX 4060 Ti Dual [8GB, 4352 CUDA].",
                configuration_price: "6800",
                link_to_configurator: "/one-ultra/config",
                img: "/gaming-pc/one.jpg", //взять в другой таблице
                gpu: {
                    id: 11,
                    partition: "RTX 4060",
                    name: "Palit GeForce RTX 4060 Ti Dual [8GB, 4352 CUDA]",
                    price: "3000",
                    img: "/components/gpu/palit-rtx-4060-ti-dual.png",
                },
                cpu: {
                    id: 11,
                    partition: "Intel Core 12th",
                    name: "Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер]",
                    price: "1500",
                    img: "/components/cpu/intel-core-i5-12th.jpg",
                },
                motherboard: {
                    id: 11,
                    partition: "Intel B760",
                    name: "MSI PRO B760M-A [DDR4, Wi-Fi]",
                    price: "400",
                    img: "/components/mb/msi-pro-b760m-awifi-314x177.jpg",
                },
                cpu_fan: {
                    id: 11,
                    partition: "Asus",
                    name: "ASUS ROG RYUO III 360 White",
                    price: "450",
                    img: "/components/cpu-fan/asus-rog-ryuo-iii-360-argb-white-314x177.jpg",
                },
                ram: {
                    id: 11,
                    partition: "16 ГБ",
                    name: "16GB Kingston FURY Beast RGB [DDR4, 3600MHz, 2x8GB]",
                    price: "220",
                    img: "/components/ram/kingston-fury-beast-ddr4-rgb-2x-314x177.jpg",
                },
                ssd: {
                    id: 11,
                    partition: "500 ГБ",
                    name: "500GB ADATA LEGEND 800 [3500MB/s, Gen4]",
                    price: "300",
                    img: "/components/ssd/adata-legend-800-314x177.jpg",
                },
                power_supply: {
                    id: 11,
                    partition: "От 500W",
                    name: "550W DeepCool PK550D [80+ Bronze]",
                    price: "160",
                    img: "/components/pow-sup/deepcool-pk550d-314x177.jpg",
                },
                case: {
                    id: 11,
                    partition: "Asus",
                    name: "ASUS TUF GAMING GT502 White",
                    price: "500",
                    img: "/components/case/asus-tuf-gt520-white-314x177.jpg",
                },
            },
        ],
    },
];

const os = "Microsoft Windows 11 Home OEM";

const SinglePcPage = ({ product_name }: { product_name: string }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [headerInfo, setHeaderInfo] = useState<ISingleProductHeader | null>(
        null
    );
    const [productInfo, setProductInfo] = useState<ISingleProductPc | null>(
        null
    );

    useEffect(() => {
        findInfo();
    }, []);

    const findInfo = () => {
        const header = header_info.find(
            (item) =>
                item.title.replace(" ", "-").toLocaleLowerCase() ===
                product_name
        );
        const product = products.find(
            (item) =>
                item.name.replace(" ", "-").toLocaleLowerCase() === product_name
        );

        if (header) setHeaderInfo(header);
        if (product) setProductInfo(product);
        setIsLoading(false);
    };

    const pathname = usePathname();

    const SliderImageItem = ({ img }: { img: string }) => {
        return (
            <Image.PreviewGroup items={productInfo?.preview.slider_images}>
                <div>
                    <Image
                        className="slider-image-item"
                        width={310}
                        src={img}
                    />
                </div>
            </Image.PreviewGroup>
        );
    };

    if (isLoading || !productInfo || !headerInfo) return <LoadingPage />; //временно (подкрутить загрузку)

    return (
        <>
            <PcSecondNavbar productName={productInfo.name} />
            <SinglePcHeader header_info={headerInfo} />
            <section id="design" className="design container section">
                <img
                    className="design__img"
                    src={productInfo?.design.img}
                    alt={productInfo?.name + " design"}
                    loading="lazy"
                />
                <div className="design__body">
                    <h2 className="design__body-title">
                        {productInfo?.design.title}
                    </h2>
                    <div className="design__body-info">
                        <div className="design__body-info__description">
                            <p>{productInfo?.design.description}</p>
                        </div>

                        <div className="design__body-info-footer">
                            <div className="design__body-info__price">
                                Базовая комплектация от{" "}
                                {productInfo?.design.min_price} BYN
                            </div>
                            <Link
                                className="design__body-info__link green-circle-bordered-link"
                                href={pathname + "#buy"}
                            >
                                Комплектация и цены
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section id="preview" className="preview container section">
                <img
                    className="preview__img"
                    src={productInfo?.preview.main_img}
                    alt="Preview"
                    loading="lazy"
                />
                <div className="preview-body ">
                    <div className="preview-body-info">
                        <span className="preview-body-info__mark mark-gray-green">
                            Дизайн
                        </span>
                        <h2 className="preview-body-info__title">
                            {productInfo?.preview.title}
                        </h2>
                        <div className="preview-body-info__description">
                            <p>{productInfo?.preview.description}</p>
                        </div>
                    </div>
                    <SinglePcSlider
                        items={productInfo?.preview.slider_images.map(
                            (link, i) => (
                                <SliderImageItem key={i} img={link} />
                            )
                        )}
                    />
                </div>
            </section>

            <section id="performance" className="performance container section">
                <div className="power">
                    <img
                        className="power__img"
                        src={productInfo?.performance.img}
                        alt="Performance"
                        loading="lazy"
                    />
                    <div className="power-body">
                        <div className="power-body-info">
                            <span className="power-body-info__mark mark-gray-green">
                                Производительность
                            </span>
                            <h2 className="power-body-info__title">
                                {productInfo?.performance.title}
                            </h2>
                            <div className="power-body-info__description">
                                <p>{productInfo?.performance.description}</p>
                            </div>
                        </div>
                        <div className="power-body-tags">
                            <div className="power-body-tags__container">
                                <Tag
                                    className="power-body-tags__tag"
                                    title="Видеокарта быстрее"
                                    prefix="до"
                                    main_value="6X"
                                    postfix="раз"
                                />
                                <Tag
                                    className="power-body-tags__tag"
                                    title="Частота процессора"
                                    prefix="до"
                                    main_value="4,4"
                                    postfix="ГГц"
                                />
                                <Tag
                                    className="power-body-tags__tag"
                                    title="Объем памяти"
                                    prefix="до"
                                    main_value="32"
                                    postfix="ГБ"
                                />
                                <Tag
                                    className="power-body-tags__tag"
                                    title="Чтение SSD"
                                    prefix="до"
                                    main_value="4"
                                    postfix="ГБ/С"
                                />
                            </div>
                            <div></div>
                        </div>
                    </div>
                </div>

                <div className="components-section">
                    <img
                        className="components-section__img"
                        src="/single-product/graphics-card.jpg"
                        alt="Graphics card"
                        loading="lazy"
                    />
                    <div className="components-section-body">
                        <span className="components-section-body__mark mark-gray-green">
                            Видеокарта
                        </span>
                        <h2 className="components-section-body__title">
                            ИЗОБРЕТАЯ ГРАФИКУ ЗАНОВО
                        </h2>
                        <div className="components-section-body__description">
                            <p>
                                NVIDIA® GeForce® RTX предлагает непревзойденный
                                игровой опыт на ПК. Созданные на новой
                                архитектуре NVIDIA Ada Lovelace GPU и
                                революционной платформе RTX, видеокарты RTX
                                совмещают в себе технологии трассировки лучей в
                                реальном времени, искусственный интеллект и
                                программируемые шейдеры.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="components-section components-section--reversed">
                    <img
                        className="components-section__img"
                        src="/single-product/processor.jpg"
                        alt="Graphics card"
                        loading="lazy"
                    />
                    <div className="components-section-body">
                        <span className="components-section-body__mark mark-gray-green">
                            Процессор
                        </span>
                        <h2 className="components-section-body__title">
                            БОЛЬШЕ ЯДЕР, БОЛЬШЕ ВЫЧИСЛИТЕЛЬНОЙ МОЩИ
                        </h2>
                        <div className="components-section-body__description">
                            <p>
                                Компьютеры ONE с 12-м поколением процессоров
                                Intel® Core™ для настольных ПК обеспечивают
                                высокую производительность для обычных и
                                профессиональных геймеров. До 6 ядер и 12
                                потоков, тактовая частота до 4,4 ГГц, 18 МБ
                                кэш-памяти — процессоры Intel® Core™ 12-го
                                поколения для настольных ПК созданы для игр и
                                работы.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="ram-and-storage">
                    <div className="ram-and-storage-body">
                        <img
                            className="ram-and-storage-body__img"
                            src={productInfo?.performance.img_2}
                            alt="Ram and Storage"
                            loading="lazy"
                        />
                        <div className="ram-and-storage-body-info">
                            <span className="ram-and-storage-body-info__mark mark-gray-green">
                                Память и накопители
                            </span>
                            <h2 className="ram-and-storage-body-info__title">
                                ВЫСОКАЯ СКОРОСТЬ
                                <br /> ОБРАБОТКИ ДАННЫХ
                            </h2>
                            <div className="ram-and-storage-body-info__description">
                                <p>
                                    Компьютеры ONE с 12-м поколением процессоров
                                    Intel® Core™ для настольных ПК обеспечивают
                                    высокую производительность для обычных и
                                    профессиональных геймеров. До 6 ядер и 12
                                    потоков, тактовая частота до 4,4 ГГц, 18 МБ
                                    кэш-памяти — процессоры Intel® Core™ 12-го
                                    поколения для настольных ПК созданы для игр
                                    и работы.
                                </p>
                                <p>
                                    Новейшие SSD накопители формата M.2 —
                                    идеально подойдут для интенсивных нагрузок и
                                    надежно сохранят любые данные, а повышенная
                                    пропускная способность поможет решить самые
                                    сложные задачи в кратчайший срок.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="ram-and-storage-footer">
                        <Tag
                            className="ram-and-storage-footer__tag"
                            title="Объем памяти"
                            prefix="до"
                            main_value="32"
                            postfix="ГБ"
                        />
                        <Tag
                            className="ram-and-storage-footer__tag"
                            title="Чтение SSD"
                            prefix="до"
                            main_value="4"
                            postfix="ГБ/С"
                        />
                        <Tag
                            className="ram-and-storage-footer__tag"
                            title="Частота памяти"
                            prefix="до"
                            main_value="3600"
                            postfix="МГц"
                        />
                        <Tag
                            className="ram-and-storage-footer__tag"
                            title="Объем накопителя"
                            prefix="до"
                            main_value="12"
                            postfix="ТБ"
                        />
                    </div>
                </div>
            </section>

            <section
                id="kits-and-prices"
                className="kits-and-prices-bg-container container-fluid"
            >
                <div className="kits-and-prices container section">
                    <div className="kits-and-prices__header">
                        <span className="kits-and-prices__header-mark mark-gray-green">
                            Комплектации и цены
                        </span>
                        <h2 className="kits-and-prices__header-title">
                            Вариации {productInfo?.name}
                        </h2>
                    </div>
                    <div className="kits-and-prices-body">
                        {productInfo?.configurations.map(
                            (kit: any, index: number) => {
                                return (
                                    <SinglePcConfigCard
                                        pc={{
                                            isNotebook:
                                                productInfo.category ===
                                                "notebook",
                                            key: index,
                                            img: kit.img,
                                            name: kit.configuration_name,
                                            price: kit.configuration_price,
                                            description:
                                                kit.configuration_description,
                                            link_to_configurator:
                                                kit.link_to_configurator,
                                            gpu: kit.gpu,
                                            cpu: kit.cpu,
                                            mb: kit.motherboard,
                                            cpu_fan: kit.cpu_fan,
                                            ram: kit.ram,
                                            ssd: kit.ssd,
                                            pow_sup: kit.power_supply,
                                            _case: kit.case,
                                            os: os,
                                            display: kit.display,
                                        }}
                                    />
                                );
                            }
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};
export default SinglePcPage;
