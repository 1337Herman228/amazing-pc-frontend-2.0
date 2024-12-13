"use client";

import { useEffect, useMemo, useState } from "react";
import "./Configurator.scss";
import useFetch from "@/lib/hooks/useFetch";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import {
    IConfiguratorComponents,
    IJoinPart,
    IProduct,
    IValidatePc,
} from "@/interfaces/types";
import NavTree from "./nav-tree/NavTree";
import FormListItem from "./form-list-item/FormListItem";
import Summation from "./summation/Summation";

// default_checked - checked по умолчанию (по дефолту стоит в true, даже если поля в объекте нет)
// когда это значение стоит в false и элемент радиокнопка, то при выборе появляется красный крестик, нажатие на который уюирает выбор кнопки

// multiselect:'true' - чекбоксы, если поля нет, либо false - то радиокнопки

// max_quantity:5 - количество в select'e чекбокса

// category - отвечает за название раздела, в который будет помещен товар в навигационном дереве

const selectSettings = (typeName: string, category: string) => {
    let multiselect: boolean | null = null;
    let default_checked = true;
    let max_quantity = 0;

    switch (typeName) {
        case "cases": {
            default_checked = false;
            break;
        }
        case "fan": {
            default_checked = false;
            multiselect = true;
            max_quantity = 20;
            break;
        }
        case "ssd": {
            default_checked = false;
            multiselect = true;
            max_quantity = 5;
            break;
        }
    }

    if (category === "Периферия") {
        default_checked = false;
        multiselect = true;
        max_quantity = 5;
    }

    return { multiselect, default_checked, max_quantity };
};

export interface NavTreeItem {
    category: string;
    name: string;
    icon: string;
}

const Configurator = () => {
    const { getConfiguratorParts, isLoading } = useFetch();

    const [componentsList, setComponentsList] =
        useState<IConfiguratorComponents>();
    // @ts-ignore
    const [product, setProduct] = useState<IProduct>({});

    console.log("product", product);

    const getPcFromProduct = (product: IProduct) => {
        const pc: IValidatePc = {
            gpu: product.gpu,
            cpu: product.cpu,
            motherboard: product.motherboard,
            cpu_fan: product.cpu_fan,
            ram: product.ram,
            psu: product.psu,
            cases: product.cases ?? null,
            ssd: product.ssd,
            fan: product.fan,
        };

        return pc;
    };

    const checkSocket = (pc: IValidatePc) =>
        pc?.cpu?.socket != pc?.motherboard?.socket
            ? "Процессор и материнская плата физически несовместимы"
            : "";

    const checkOnError = (pc: IValidatePc) => {
        return checkSocket(pc);
    };

    const validatePcAssembly = (pc: IValidatePc) => {
        let error = checkOnError(pc);
        if (error) console.log(error);
    };

    const addItemToProduct = (name: string, item: IJoinPart) => {
        product[`${name}`] = item;
        setProduct({ ...product });
        validatePcAssembly(getPcFromProduct(product));
    };

    useEffect(() => {
        fetchConfiguratorParts();
    }, []);

    const fetchConfiguratorParts = async () => {
        const data: IConfiguratorComponents = await getConfiguratorParts();
        setComponentsList(data);
    };

    const makeNavTreeInfoArray = () => {
        const categories: string[] = [];
        let uniqueCategories: string[] = [];
        let allItems: NavTreeItem[] = [];

        if (componentsList) {
            componentsList.components.forEach((el) => {
                categories.push(el.category.categoryName);
            });
            uniqueCategories = categories.filter(
                (item, index) => categories.indexOf(item) === index
            ); // удаляем дубликаты

            componentsList.components.forEach((el) => {
                allItems.push({
                    category: el.category.categoryName,
                    name: el.type.alternativeName,
                    icon: el.type.typeImage,
                });
            });
        }
        return { uniqueCategories, allItems };
    };
    const { uniqueCategories, allItems } = makeNavTreeInfoArray();

    if (isLoading || !componentsList) return <LoadingPage />;

    return (
        <>
            <section className="configurator container section-decreased">
                <aside className="aside-components-tree hidden-tablet sticky-block">
                    <NavTree
                        uniqueCategories={uniqueCategories}
                        allItems={allItems}
                    />
                </aside>

                <ul className="components-list">
                    {componentsList.components.map((item, i) => (
                        <FormListItem
                            addItemToProduct={addItemToProduct}
                            {...selectSettings(
                                item.type.typeName,
                                item.category.categoryName
                            )}
                            key={i}
                            type={item.type}
                            category={item.category}
                            partition={item.partition}
                            items={item.items}
                        />
                    ))}
                </ul>

                <aside className="summation sticky-block">
                    <Summation product={product} />
                </aside>
            </section>
        </>
    );
};

export default Configurator;
