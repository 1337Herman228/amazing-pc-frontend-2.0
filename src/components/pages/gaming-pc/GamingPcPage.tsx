"use client";

import { useEffect, useState } from "react";
import CatalogHeader from "../headers/catalog-header/CatalogHeader";
import PcCatalog from "@/components/products-catalog/pc-catalog/PcCatalog";
import useHttp from "@/lib/hooks/useHttp";
import { useSession } from "next-auth/react";
import { ExtendedSession } from "@/pages/api/auth/[...nextauth]";

const gaming_pc_header_info = {
    title: "Игровые компьютеры",
    description:
        "Подберите компьютер, который подойдет для любых игр! Либо самостоятельно соберите комплектацию ПК и проверьте комплектующие на совместимость с помощью конфигуратора.",
    link: "/gaming-pc/#choise-gaming-pc",
    link_text: "Подобрать компьютер",
    img: "/images/gaming-pc-header.webp",
};

const gaming_pc_categories = [
    {
        category_id: "0",
        category_name: "Оптимальные игровые компьютеры",
        category_description:
            "Современные игровые компьютеры с процессорами Intel Core и видеокартами NVIDIA GeForce RTX предлагают идеальное сочетание производительности и стоимости. Максимум эффективности.",
        category_link: "/gaming-pc/optimal",
    },
    {
        category_id: "1",
        category_name: "Мощные игровые компьютеры",
        category_description:
            "Мощные игровые компьютеры для максимальных настроек графики в играх, на базе процессоров Intel Core и видеокарт NVIDIA GeForce RTX. Отлично подходят для киберспортивных игроков и геймеров, ценящих плавность игрового процесса с высоким FPS на максимальных графических настройках. Выбор чемпионов.",
        category_link: "/gaming-pc/powerful",
    },
    {
        category_id: "2",
        category_name: "Кастомные компьютеры",
        category_description:
            "Эксклюзивная линейка компьютеров для тех, кто не ищет компромиссов в играх. Конфигурации на основе самых мощных процессоров Intel Core и видеокарт NVIDIA GeForce RTX обеспечивают высший уровень производительности, уникальные корпуса с RGB-подсветкой и системой водяного охлаждения. Персонализированные варианты для самых изысканных геймеров.",
        category_link: "/gaming-pc/custom",
    },
    {
        category_id: "3",
        category_name: "Мини игровые ПК",
        category_description:
            "Добро пожаловать в эпоху компактных игровых компьютеров нового поколения! Это воплощение мощи и стиля в одном устройстве. Оформленные в современном дизайне, они скрывает в себе потрясающую производительность, способную обеспечить вас плавным геймплеем на максимальных настройках графики.",
        category_link: "/gaming-pc/mini",
    },
];

const gaming_pc = [
    {
        _id: "0",
        category_id: "0",
        name: "One",
        description: "Начальный игровой компьютер",
        img: "/gaming-pc/one.jpg",
        min_price: "5000",
        link_to_pc: "/gaming-pc/one",
        link_to_configurator: "/one/config",
        gpu_description: "Графические карты GeForce RTX 4060 и 4060 Ti",
        cpu_description: "Процессоры 6 и 10 ядерные Intel Core i5",
        mb_description: "Материнские платы на чипсете Intel B760",
        ram_description: "Оперативная память от 16 до 32 GB DDR4 3600MHz",
        ssd_description: "Накопители SSD на 512 GB / 1 TB с интерфейсом М.2",
        power_supply_description:
            "Блок питания на 550W / 650W стандарта 80+ Bronze",
        amount_of_configurations: "3", //проверка в другой таблице
    },
    {
        _id: "1",
        category_id: "0",
        name: "Lumen Core",
        description: "Идеальная платформа для геймеров",
        img: "/gaming-pc/lumen-core.jpg",
        min_price: "5900",
        link_to_pc: "/gaming-pc/lumen-core",
        link_to_configurator: "/lumen-core/config",
        gpu_description: "Графические карты GeForce RTX 4060 и 4060 Ti",
        cpu_description: "Процессоры 6 и 10 ядерные Intel Core i5",
        mb_description: "Материнские платы на чипсете Intel B760",
        ram_description: "Оперативная память от 16 до 32 GB DDR4 3600MHz",
        ssd_description: "Накопители SSD на 512 GB / 1 TB с интерфейсом М.2",
        power_supply_description:
            "Блок питания на 550W / 650W стандарта 80+ Bronze",
        amount_of_configurations: "3", //проверка в другой таблице
    },
    {
        _id: "2",
        category_id: "0",
        name: "Fury",
        description: "Сбалансированный игровой компьютер",
        img: "/gaming-pc/fury.jpg",
        min_price: "6200",
        link_to_pc: "/gaming-pc/fury",
        link_to_configurator: "/fury/config",
        gpu_description: "Графические карты GeForce RTX 4060 и 4060 Ti",
        cpu_description: "Процессоры 6 и 10 ядерные Intel Core i5",
        mb_description: "Материнские платы на чипсете Intel B760",
        ram_description: "Оперативная память от 16 до 32 GB DDR4 3600MHz",
        ssd_description: "Накопители SSD на 512 GB / 1 TB с интерфейсом М.2",
        power_supply_description:
            "Блок питания на 550W / 650W стандарта 80+ Bronze",
        amount_of_configurations: "3", //проверка в другой таблице
    },
    {
        _id: "3",
        category_id: "0",
        name: "CHAMPION",
        description: "Продвинутый игровой компьютер",
        img: "/gaming-pc/champion.jpg",
        min_price: "6800",
        link_to_pc: "/gaming-pc/champion",
        link_to_configurator: "/champion/config",
        gpu_description: "Графические карты GeForce RTX 4060 и 4060 Ti",
        cpu_description: "Процессоры 6 и 10 ядерные Intel Core i5",
        mb_description: "Материнские платы на чипсете Intel B760",
        ram_description: "Оперативная память от 16 до 32 GB DDR4 3600MHz",
        ssd_description: "Накопители SSD на 512 GB / 1 TB с интерфейсом М.2",
        power_supply_description:
            "Блок питания на 550W / 650W стандарта 80+ Bronze",
        amount_of_configurations: "3", //проверка в другой таблице
    },

    {
        _id: "4",
        category_id: "1",
        name: "LUMEN 5",
        description: "Идеальный игровой компьютер",
        img: "/gaming-pc/lumen-core.jpg",
        min_price: "7500",
        link_to_pc: "/gaming-pc/lumen-5",
        link_to_configurator: "/lumen-5/config",
        gpu_description: "Графические карты GeForce RTX 4060 и 4060 Ti",
        cpu_description: "Процессоры 6 и 10 ядерные Intel Core i5",
        mb_description: "Материнские платы на чипсете Intel B760",
        ram_description: "Оперативная память от 16 до 32 GB DDR4 3600MHz",
        ssd_description: "Накопители SSD на 512 GB / 1 TB с интерфейсом М.2",
        power_supply_description:
            "Блок питания на 550W / 650W стандарта 80+ Bronze",
        amount_of_configurations: "3", //проверка в другой таблице
    },
    {
        _id: "5",
        category_id: "1",
        name: "LUMEN 7",
        description: "Стильный игровой компьютер",
        img: "/gaming-pc/lumen-silver.jpg",
        min_price: "8300",
        link_to_pc: "/gaming-pc/lumen-7",
        link_to_configurator: "/lumen-7/config",
        gpu_description: "Графические карты GeForce RTX 4060 и 4060 Ti",
        cpu_description: "Процессоры 6 и 10 ядерные Intel Core i5",
        mb_description: "Материнские платы на чипсете Intel B760",
        ram_description: "Оперативная память от 16 до 32 GB DDR4 3600MHz",
        ssd_description: "Накопители SSD на 512 GB / 1 TB с интерфейсом М.2",
        power_supply_description:
            "Блок питания на 550W / 650W стандарта 80+ Bronze",
        amount_of_configurations: "3", //проверка в другой таблице
    },
    {
        _id: "6",
        category_id: "1",
        name: "DYNAMIC",
        description: "Превосходство силы",
        img: "/gaming-pc/dynamic-black.jpg",
        min_price: "9600",
        link_to_pc: "/gaming-pc/dynamic",
        link_to_configurator: "/dynamic/config",
        gpu_description: "Графические карты GeForce RTX 4060 и 4060 Ti",
        cpu_description: "Процессоры 6 и 10 ядерные Intel Core i5",
        mb_description: "Материнские платы на чипсете Intel B760",
        ram_description: "Оперативная память от 16 до 32 GB DDR4 3600MHz",
        ssd_description: "Накопители SSD на 512 GB / 1 TB с интерфейсом М.2",
        power_supply_description:
            "Блок питания на 550W / 650W стандарта 80+ Bronze",
        amount_of_configurations: "3", //проверка в другой таблице
    },

    {
        _id: "7",
        category_id: "2",
        name: "DYNAMIC CONCEPT",
        description: "Мощь без компромиссов",
        img: "/gaming-pc/dynamic-concept-black.jpg",
        min_price: "10700",
        link_to_pc: "/gaming-pc/dynamic-concept",
        link_to_configurator: "/dynamic-concept/config",
        gpu_description: "Графические карты GeForce RTX 4060 и 4060 Ti",
        cpu_description: "Процессоры 6 и 10 ядерные Intel Core i5",
        mb_description: "Материнские платы на чипсете Intel B760",
        ram_description: "Оперативная память от 16 до 32 GB DDR4 3600MHz",
        ssd_description: "Накопители SSD на 512 GB / 1 TB с интерфейсом М.2",
        power_supply_description:
            "Блок питания на 550W / 650W стандарта 80+ Bronze",
        amount_of_configurations: "3", //проверка в другой таблице
    },
    {
        _id: "8",
        category_id: "2",
        name: "EVOLVE CONCEPT",
        description: "Где мастерство встречает совершенство",
        img: "/gaming-pc/evolve-concept.jpg",
        min_price: "11700",
        link_to_pc: "/gaming-pc/evolve-concept",
        link_to_configurator: "/evolve-concept/config",
        gpu_description: "Графические карты GeForce RTX 4060 и 4060 Ti",
        cpu_description: "Процессоры 6 и 10 ядерные Intel Core i5",
        mb_description: "Материнские платы на чипсете Intel B760",
        ram_description: "Оперативная память от 16 до 32 GB DDR4 3600MHz",
        ssd_description: "Накопители SSD на 512 GB / 1 TB с интерфейсом М.2",
        power_supply_description:
            "Блок питания на 550W / 650W стандарта 80+ Bronze",
        amount_of_configurations: "3", //проверка в другой таблице
    },
    {
        _id: "9",
        category_id: "2",
        name: "TITAN CONCEPT",
        description: "На границе инноваций и искусства",
        img: "/gaming-pc/titan-concept.jpg",
        min_price: "13700",
        link_to_pc: "/gaming-pc/titan-concept",
        link_to_configurator: "/titan-concept/config",
        gpu_description: "Графические карты GeForce RTX 4060 и 4060 Ti",
        cpu_description: "Процессоры 6 и 10 ядерные Intel Core i5",
        mb_description: "Материнские платы на чипсете Intel B760",
        ram_description: "Оперативная память от 16 до 32 GB DDR4 3600MHz",
        ssd_description: "Накопители SSD на 512 GB / 1 TB с интерфейсом М.2",
        power_supply_description:
            "Блок питания на 550W / 650W стандарта 80+ Bronze",
        amount_of_configurations: "3", //проверка в другой таблице
    },

    {
        _id: "10",
        category_id: "3",
        name: "ATOM",
        description: "Маленький размер, громадные возможности",
        img: "/gaming-pc/atom.jpg",
        min_price: "6300",
        link_to_pc: "/gaming-pc/atom",
        link_to_configurator: "/atom/config",
        gpu_description: "Графические карты GeForce RTX 4060 и 4060 Ti",
        cpu_description: "Процессоры 6 и 10 ядерные Intel Core i5",
        mb_description: "Материнские платы на чипсете Intel B760",
        ram_description: "Оперативная память от 16 до 32 GB DDR4 3600MHz",
        ssd_description: "Накопители SSD на 512 GB / 1 TB с интерфейсом М.2",
        power_supply_description:
            "Блок питания на 550W / 650W стандарта 80+ Bronze",
        amount_of_configurations: "3", //проверка в другой таблице
    },
    {
        _id: "11",
        category_id: "3",
        name: "THOR",
        description: "Мощь, которая удивляет",
        img: "/gaming-pc/thor.jpg",
        min_price: "7100",
        link_to_pc: "/gaming-pc/thor",
        link_to_configurator: "/thor/config",
        gpu_description: "Графические карты GeForce RTX 4060 и 4060 Ti",
        cpu_description: "Процессоры 6 и 10 ядерные Intel Core i5",
        mb_description: "Материнские платы на чипсете Intel B760",
        ram_description: "Оперативная память от 16 до 32 GB DDR4 3600MHz",
        ssd_description: "Накопители SSD на 512 GB / 1 TB с интерфейсом М.2",
        power_supply_description:
            "Блок питания на 550W / 650W стандарта 80+ Bronze",
        amount_of_configurations: "3", //проверка в другой таблице
    },
];

const gaming_pc_configurations = [
    {
        _id: "0",
        configuration_id: "0",
        configuration_name: "One Start",
        configuration_description:
            "Игровая платформа, построенная на базе процессора Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер] и видеокарты Palit GeForce RTX 4060 Dual [8GB, 3072 CUDA].",
        configuration_price: "5000",
        link_to_configurator: "/one-start/config",
        img: "/gaming-pc/1.png", //взять в другой таблице
        gpu: "Palit GeForce RTX 4060 Dual [8GB, 3072 CUDA]",
        cpu: "Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер]",
        mb: "MSI PRO B760M-A [DDR4, Wi-Fi]",
        cpu_fan: "DeepCool AG400 BK ARGB",
        ram: "16GB Kingston FURY Beast RGB [DDR4, 3600MHz, 2x8GB]",
        ssd: "500GB ADATA LEGEND 800 [3500MB/s, Gen4]",
        pow_sup: "550W DeepCool PK550D [80+ Bronze]",
        case: "DeepCool CC360 ARGB",
        os: "Microsoft Windows 11 Home OEM",
    },
    {
        _id: "0",
        configuration_id: "1",
        configuration_name: "One Max",
        configuration_description:
            "Геймерская система с процессором Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер] и видеокартой Palit GeForce RTX 4060 Dual [8GB, 3072 CUDA].",
        configuration_price: "5900",
        link_to_configurator: "/one-max/config",
        img: "/gaming-pc/1.png", //взять в другой таблице
        gpu: "Palit GeForce RTX 4060 Dual [8GB, 3072 CUDA]",
        cpu: "Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер]",
        mb: "MSI PRO B760M-A [DDR5, Wi-Fi]",
        cpu_fan: "DeepCool AG400 BK ARGB",
        ram: "32GB TEAMGROUP T-Force Delta RGB Black [DDR5, 5600MHz, 2x16GB]",
        ssd: "1TB ADATA LEGEND 800 [3500MB/s, Gen4]",
        pow_sup: "550W DeepCool PK550D [80+ Bronze]",
        case: "DeepCool CC360 ARGB",
        os: "Microsoft Windows 11 Home OEM",
    },
    {
        _id: "0",
        configuration_id: "2",
        configuration_name: "One Ultra",
        configuration_description:
            "Платформа для гейминга в Full HD разрешении, созданная на базе центрального процессора Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер] и видеокарты Palit GeForce RTX 4060 Ti Dual [8GB, 4352 CUDA].",
        configuration_price: "6800",
        link_to_configurator: "/one-ultra/config",
        img: "/gaming-pc/1.png", //взять в другой таблице
        gpu: "Palit GeForce RTX 4060 Ti Dual [8GB, 4352 CUDA]",
        cpu: "Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер]",
        mb: "MSI PRO B760M-A [DDR5, Wi-Fi]",
        cpu_fan: "DeepCool AG400 BK ARGB",
        ram: "32GB TEAMGROUP T-Force Delta RGB Black [DDR5, 5600MHz, 2x16GB]",
        ssd: "1TB ADATA LEGEND 800 [3500MB/s, Gen4]",
        pow_sup: "650W DeepCool PK550D [80+ Bronze]",
        case: "DeepCool CC360 ARGB",
        os: "Microsoft Windows 11 Home OEM",
    },
];

const GamingPcPage = () => {
    const { data: session } = useSession();
    const sessionData: ExtendedSession | null = session;
    const token = sessionData?.user?.authenticationResponse?.token;

    const { requestJson } = useHttp();

    const [pcCategories, setPcCategories] = useState([]);

    useEffect(() => {
        fetchPcCategories();
    }, []);

    const fetchPcCategories = async () => {
        if (token) {
            const categories = await requestJson(
                token,
                "http://localhost:8080/user/pc-categories"
            );
            setPcCategories(categories);
        }
    };

    console.log("pcCategories", pcCategories);

    return (
        <>
            <CatalogHeader header_info={gaming_pc_header_info} />
            <PcCatalog
                categories={gaming_pc_categories}
                products_list={gaming_pc}
            />
        </>
    );
};
export default GamingPcPage;
