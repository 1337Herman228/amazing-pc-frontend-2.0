import PcCatalog from "@/components/products-catalog/pc-catalog/PcCatalog";
import CatalogHeader from "../headers/catalog-header/CatalogHeader";

const notebook_header_info = {
    title: "ИГРОВЫЕ НОУТБУКИ",
    description:
        "Мощные модели игровых ноутбуков, оснащенные передовыми технологиями NVIDIA GeForce RTX 40 и высокоэффективными процессорами Intel Core 13-го поколения. Отличный выбор для тех, кому важно сочетание мобильности и производительности в одном устройстве. Испытайте свое превосходство в играх прямо сейчас!",
    link: "/gaming-pc/#choise-notebook",
    link_text: "Подобрать ноутбук",
    img: "/images/notebook-page-banner.png",
};

const notebook_categories = [
    {
        category_id: "0",
        category_name: "none",
        category_description: "none",
        category_link: "none",
    },
];

const notebooks = [
    {
        _id: "0",
        category_id: "0",
        name: "play 17",
        description: "Игровые ноутбки HYPERPC",
        img: "/notebooks/hyperpc-play.jpg",
        min_price: "8800",
        link_to_pc: "/notebook/play-17",
        link_to_configurator: "/one/config",
        gpu_description: "Графические карты GeForce RTX 4060 и 4060 Ti",
        cpu_description: "Процессоры 6 и 10 ядерные Intel Core i5",
        ram_description: "Оперативная память от 16 до 32 GB DDR4 3600MHz",
        ssd_description: "Накопители SSD на 512 GB / 1 TB с интерфейсом М.2",
        amount_of_configurations: "15", //проверка в другой таблице
    },
    {
        _id: "1",
        category_id: "0",
        name: "ASUS",
        description: "Игровые ноутбки HYPERPC",
        img: "/notebooks/asus-rog-strix.jpg",
        min_price: "7700",
        link_to_pc: "/one",
        link_to_configurator: "/one/config",
        gpu_description: "Графические карты GeForce RTX 4060 и 4060 Ti",
        cpu_description: "Процессоры 6 и 10 ядерные Intel Core i5",
        ram_description: "Оперативная память от 16 до 32 GB DDR4 3600MHz",
        ssd_description: "Накопители SSD на 512 GB / 1 TB с интерфейсом М.2",
        amount_of_configurations: "9", //проверка в другой таблице
    },
    {
        _id: "2",
        category_id: "0",
        name: "MSI",
        description: "Игровые ноутбки HYPERPC",
        img: "/notebooks/msi-raider.jpg",
        min_price: "7400",
        link_to_pc: "/one",
        link_to_configurator: "/one/config",
        gpu_description: "Графические карты GeForce RTX 4060 и 4060 Ti",
        cpu_description: "Процессоры 6 и 10 ядерные Intel Core i5",
        ram_description: "Оперативная память от 16 до 32 GB DDR4 3600MHz",
        ssd_description: "Накопители SSD на 512 GB / 1 TB с интерфейсом М.2",
        amount_of_configurations: "7", //проверка в другой таблице
    },
];

const NotebookPage = () => {
    return (
        <>
            <CatalogHeader header_info={notebook_header_info} />
            <PcCatalog
                categories={notebook_categories}
                products_list={notebooks}
                is_notebook={true}
            />
        </>
    );
};
export default NotebookPage;
