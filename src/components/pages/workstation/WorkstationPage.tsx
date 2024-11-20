"use client";

import PcCatalog from "@/components/products-catalog/pc-catalog/PcCatalog";
import CatalogHeader from "../headers/catalog-header/CatalogHeader";
import useFetch from "@/lib/hooks/useFetch";
import { useEffect, useState } from "react";
import { IpcCatalog } from "@/interfaces/types";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";

const workstation_header_info = {
    title: "РАБОЧИЕ СТАНЦИИ",
    description:
        "Подберите компьютер, который подойдет для любого направления! Либо самостоятельно соберите комплектацию ПК и проверьте комплектующие на совместимость с помощью конфигуратора.",
    link: "/gaming-pc/#choise-notebook",
    link_text: "Подобрать компьютер",
    img: "/images/pro-page-banner.webp",
};

// const workstation_categories = [
//     {
//         category_id: "0",
//         category_name: "Оптимальные рабочие станции",
//         category_description:
//             "Современные рабочие компьютеры с процессорами Intel Core и видеокартами NVIDIA GeForce RTX предлагают идеальное сочетание производительности и стоимости для профессиональных задач. Они обеспечивают максимум эффективности для работы с графическими и многозадачными приложениями без лишних затрат.",
//         category_link: "/workstation/optimal",
//     },
//     {
//         category_id: "1",
//         category_name: "Мощные рабочие станции",
//         category_description:
//             "Эксклюзивная линейка рабочих компьютеров для профессионалов, которые не ищут компромиссов в производительности. Конфигурации на основе самых мощных процессоров Intel Core и видеокарт NVIDIA Quadro RTX обеспечивают высший уровень производительности для работы с самыми требовательными приложениями. Уникальные корпуса с эргономичным дизайном и системой водяного охлаждения. Персонализированные варианты для самых требовательных специалистов.",
//         category_link: "/workstation/powerful",
//     },
//     {
//         category_id: "2",
//         category_name: "Кастомные рабочие станции",
//         category_description:
//             "Эксклюзивная линейка компьютеров для тех, кто не ищет компромиссов в играх. Конфигурации на основе самых мощных процессоров Intel Core и видеокарт NVIDIA GeForce RTX обеспечивают высший уровень производительности, уникальные корпуса с RGB-подсветкой и системой водяного охлаждения. Персонализированные варианты для самых изысканных геймеров.",
//         category_link: "/workstation/custom",
//     },
// ];

// const workstations = [
//     {
//         _id: "0",
//         category_id: "0",
//         name: "G1 PRO",
//         description: "Для графических дизайнеров",
//         img: "/workstations/pro-g1.jpg",
//         min_price: "5100",
//         link_to_pc: "/g1-pro",
//         link_to_configurator: "/g1-pro/config",
//         gpu_description: "Графические карты GeForce RTX 4060 и 4060 Ti",
//         cpu_description: "Процессоры 6 и 10 ядерные Intel Core i5",
//         mb_description: "Материнские платы на чипсете Intel B760",
//         ram_description: "Оперативная память от 16 до 32 GB DDR4 3600MHz",
//         ssd_description: "Накопители SSD на 512 GB / 1 TB с интерфейсом М.2",
//         power_supply_description:
//             "Блок питания на 550W / 650W стандарта 80+ Bronze",
//         amount_of_configurations: "3", //проверка в другой таблице
//     },
//     {
//         _id: "1",
//         category_id: "0",
//         name: "G2 PRO",
//         description: "Для проектирования",
//         img: "/workstations/pro-g2.jpg",
//         min_price: "5700",
//         link_to_pc: "/g2-pro",
//         link_to_configurator: "/g2-pro/config",
//         gpu_description: "Графические карты GeForce RTX 4060 и 4060 Ti",
//         cpu_description: "Процессоры 6 и 10 ядерные Intel Core i5",
//         mb_description: "Материнские платы на чипсете Intel B760",
//         ram_description: "Оперативная память от 16 до 32 GB DDR4 3600MHz",
//         ssd_description: "Накопители SSD на 512 GB / 1 TB с интерфейсом М.2",
//         power_supply_description:
//             "Блок питания на 550W / 650W стандарта 80+ Bronze",
//         amount_of_configurations: "3", //проверка в другой таблице
//     },
//     {
//         _id: "2",
//         category_id: "0",
//         name: "G3 PRO",
//         description: "Для проектирования",
//         img: "/workstations/pro-g3.jpg",
//         min_price: "8700",
//         link_to_pc: "/g3-pro",
//         link_to_configurator: "/g3-pro/config",
//         gpu_description: "Графические карты GeForce RTX 4060 и 4060 Ti",
//         cpu_description: "Процессоры 6 и 10 ядерные Intel Core i5",
//         mb_description: "Материнские платы на чипсете Intel B760",
//         ram_description: "Оперативная память от 16 до 32 GB DDR4 3600MHz",
//         ssd_description: "Накопители SSD на 512 GB / 1 TB с интерфейсом М.2",
//         power_supply_description:
//             "Блок питания на 550W / 650W стандарта 80+ Bronze",
//         amount_of_configurations: "3", //проверка в другой таблице
//     },

//     {
//         _id: "3",
//         category_id: "1",
//         name: "G5 PRO",
//         description: "Для проектирования",
//         img: "/workstations/pro-g5.jpg",
//         min_price: "9700",
//         link_to_pc: "/g5-pro",
//         link_to_configurator: "/g5-pro/config",
//         gpu_description: "Графические карты GeForce RTX 4060 и 4060 Ti",
//         cpu_description: "Процессоры 6 и 10 ядерные Intel Core i5",
//         mb_description: "Материнские платы на чипсете Intel B760",
//         ram_description: "Оперативная память от 16 до 32 GB DDR4 3600MHz",
//         ssd_description: "Накопители SSD на 512 GB / 1 TB с интерфейсом М.2",
//         power_supply_description:
//             "Блок питания на 550W / 650W стандарта 80+ Bronze",
//         amount_of_configurations: "3", //проверка в другой таблице
//     },
//     {
//         _id: "4",
//         category_id: "1",
//         name: "G6 PRO",
//         description: "Для проектирования",
//         img: "/workstations/pro-g6.jpg",
//         min_price: "10700",
//         link_to_pc: "/g6-pro",
//         link_to_configurator: "/g6-pro/config",
//         gpu_description: "Графические карты GeForce RTX 4060 и 4060 Ti",
//         cpu_description: "Процессоры 6 и 10 ядерные Intel Core i5",
//         mb_description: "Материнские платы на чипсете Intel B760",
//         ram_description: "Оперативная память от 16 до 32 GB DDR4 3600MHz",
//         ssd_description: "Накопители SSD на 512 GB / 1 TB с интерфейсом М.2",
//         power_supply_description:
//             "Блок питания на 550W / 650W стандарта 80+ Bronze",
//         amount_of_configurations: "3", //проверка в другой таблице
//     },
//     {
//         _id: "5",
//         category_id: "1",
//         name: "G7 PRO",
//         description: "Для проектирования",
//         img: "/workstations/pro-g7.jpg",
//         min_price: "11700",
//         link_to_pc: "/g7-pro",
//         link_to_configurator: "/g7-pro/config",
//         gpu_description: "Графические карты GeForce RTX 4060 и 4060 Ti",
//         cpu_description: "Процессоры 6 и 10 ядерные Intel Core i5",
//         mb_description: "Материнские платы на чипсете Intel B760",
//         ram_description: "Оперативная память от 16 до 32 GB DDR4 3600MHz",
//         ssd_description: "Накопители SSD на 512 GB / 1 TB с интерфейсом М.2",
//         power_supply_description:
//             "Блок питания на 550W / 650W стандарта 80+ Bronze",
//         amount_of_configurations: "3", //проверка в другой таблице
//     },

//     {
//         _id: "6",
//         category_id: "2",
//         name: "G6 PRO HYDRO",
//         description: "Для проектирования",
//         img: "/workstations/pro-g6-hydro.jpg",
//         min_price: "20700",
//         link_to_pc: "/pro-g6-hydro",
//         link_to_configurator: "/pro-g6-hydro/config",
//         gpu_description: "Графические карты GeForce RTX 4060 и 4060 Ti",
//         cpu_description: "Процессоры 6 и 10 ядерные Intel Core i5",
//         mb_description: "Материнские платы на чипсете Intel B760",
//         ram_description: "Оперативная память от 16 до 32 GB DDR4 3600MHz",
//         ssd_description: "Накопители SSD на 512 GB / 1 TB с интерфейсом М.2",
//         power_supply_description:
//             "Блок питания на 550W / 650W стандарта 80+ Bronze",
//         amount_of_configurations: "3", //проверка в другой таблице
//     },
//     {
//         _id: "7",
//         category_id: "2",
//         name: "G7 PRO HYDRO",
//         description: "Для проектирования",
//         img: "/workstations/pro-g7.jpg",
//         min_price: "20700",
//         link_to_pc: "/pro-g7-hydro",
//         link_to_configurator: "/pro-g7-hydro/config",
//         gpu_description: "Графические карты GeForce RTX 4060 и 4060 Ti",
//         cpu_description: "Процессоры 6 и 10 ядерные Intel Core i5",
//         mb_description: "Материнские платы на чипсете Intel B760",
//         ram_description: "Оперативная память от 16 до 32 GB DDR4 3600MHz",
//         ssd_description: "Накопители SSD на 512 GB / 1 TB с интерфейсом М.2",
//         power_supply_description:
//             "Блок питания на 550W / 650W стандарта 80+ Bronze",
//         amount_of_configurations: "3", //проверка в другой таблице
//     },
//     {
//         _id: "8",
//         category_id: "2",
//         name: "G8 PRO HYDRO",
//         description: "Для проектирования",
//         img: "/workstations/pro-g8-hydro.jpg",
//         min_price: "20700",
//         link_to_pc: "/pro-g8-hydro",
//         link_to_configurator: "/pro-g8-hydro/config",
//         gpu_description: "Графические карты GeForce RTX 4060 и 4060 Ti",
//         cpu_description: "Процессоры 6 и 10 ядерные Intel Core i5",
//         mb_description: "Материнские платы на чипсете Intel B760",
//         ram_description: "Оперативная память от 16 до 32 GB DDR4 3600MHz",
//         ssd_description: "Накопители SSD на 512 GB / 1 TB с интерфейсом М.2",
//         power_supply_description:
//             "Блок питания на 550W / 650W стандарта 80+ Bronze",
//         amount_of_configurations: "3", //проверка в другой таблице
//     },
// ];

const WorkstationPage = () => {
    const { getWorkstationsCatalog, isLoading } = useFetch();

    const [pcData, setPcData] = useState<IpcCatalog | null>(null);

    useEffect(() => {
        fetchWorkstation();
    }, []);

    const fetchWorkstation = async () => {
        const pcData = await getWorkstationsCatalog();
        setPcData(pcData);
    };

    console.log("pcData", pcData);

    if (isLoading || !pcData) return <LoadingPage />;

    return (
        <>
            <CatalogHeader header_info={workstation_header_info} />
            <PcCatalog
                categories={pcData.pcCategories}
                pcModelGroupList={pcData.pcModelGroupList}
            />
        </>
    );
};
export default WorkstationPage;
