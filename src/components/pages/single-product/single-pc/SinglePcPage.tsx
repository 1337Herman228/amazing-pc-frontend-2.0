"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import "./SinglePcPage.scss";
import Link from "next/link";
import Tag from "@/components/tags/Tag";
import { IPc } from "@/interfaces/types";
import PcSecondNavbar from "@/components/navbar/user/pc-second-navbar/PcSecondNavbar";
import SinglePcHeader from "../../headers/single-product-header/single-pc-header/SinglePcHeader";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import SinglePcConfigCard from "@/components/cards/single-pc-config-card/SinglePcConfigCard";
import useFetch from "@/lib/hooks/useFetch";

const os = "Microsoft Windows 11 Home OEM";

interface SinglePcPageProps {
    pcModelGroupName: string;
}

const SinglePcPage = ({ pcModelGroupName }: SinglePcPageProps) => {
    const { getPcByModelGroupName, isLoading } = useFetch();

    const [pc, setPc] = useState<IPc[]>([]);

    useEffect(() => {
        fetchPc();
    }, []);

    const fetchPc = async () => {
        const pc = await getPcByModelGroupName(pcModelGroupName);
        setPc(pc);
    };

    const pathname = usePathname();

    if (isLoading || pc.length === 0) return <LoadingPage />; //временно (подкрутить загрузку)

    return (
        <>
            <PcSecondNavbar productName={pc[0].pcModelGroup.modelGroupName} />
            <SinglePcHeader
                modelGroupName={pc[0].pcModelGroup.modelGroupName}
                header_info={pc[0].pcModelGroup.pcHeader}
            />

            <section id="design" className="design container section">
                <img
                    className="design__img"
                    src={pc[0]?.pcModelGroup?.pcDesign?.image}
                    alt={pc[0]?.pcModelGroup?.modelGroupName + " design"}
                    loading="lazy"
                />
                <div className="design__body">
                    <h2 className="design__body-title">
                        {pc[0].pcModelGroup?.pcDesign?.title}
                    </h2>
                    <div className="design__body-info">
                        <div className="design__body-info__description">
                            <p>{pc[0].pcModelGroup?.pcDesign?.description}</p>
                        </div>

                        <div className="design__body-info-footer">
                            <div className="design__body-info__price">
                                Базовая комплектация от {pc[0].totalPrice} BYN
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

            <section id="performance" className="performance container section">
                <div className="power">
                    <img
                        className="power__img"
                        src={pc[0].pcModelGroup?.pcPerformance?.image}
                        alt="Performance"
                        loading="lazy"
                    />
                    <div className="power-body">
                        <div className="power-body-info">
                            <span className="power-body-info__mark mark-gray-green">
                                Производительность
                            </span>
                            <h2 className="power-body-info__title">
                                {pc[0]?.pcModelGroup?.pcPerformance?.title}
                            </h2>
                            <div className="power-body-info__description">
                                <p>
                                    {
                                        pc[0]?.pcModelGroup?.pcPerformance
                                            ?.description
                                    }
                                </p>
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

                {/* <div className="ram-and-storage">
                    <div className="ram-and-storage-body">
                        <img
                            className="ram-and-storage-body__img"
                            src={pc[0]?.pcModelGroup?.pcPerformances?.image2}
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
                </div> */}
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
                            Вариации {pc[0].pcModelGroup.modelGroupName}
                        </h2>
                    </div>
                    <div className="kits-and-prices-body">
                        {pc.map((kit, index: number) => {
                            return (
                                <SinglePcConfigCard
                                    key={kit.pcId}
                                    pc={{
                                        isNotebook:
                                            kit.pcType.type === "notebook",
                                        img: kit.image,
                                        name: kit.name,
                                        price: kit.totalPrice,
                                        description: kit.description,
                                        link_to_configurator: `/configurator/${kit.name}`,
                                        gpu: kit.gpu,
                                        cpu: kit.cpu,
                                        mb: kit.motherboard,
                                        cpu_fan: kit.cpuFan,
                                        ram: kit.ram,
                                        ssdList: kit.ssdList,
                                        pow_sup: kit.psu,
                                        _case: kit.pcCase,
                                        os: os,
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
};
export default SinglePcPage;
