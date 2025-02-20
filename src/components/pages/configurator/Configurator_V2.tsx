"use client";

import { useEffect, useState } from "react";
import "./Configurator.scss";
import useFetch from "@/lib/hooks/useFetch";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import NavTree from "./nav-tree/NavTree";
import Summation from "./summation/Summation";
import { CATEGORIES, TYPES } from "@/lib/constants";
import {
    IConfiguratorComponents,
    IPart,
    IPartWithQuantity,
} from "@/interfaces/types-v2";
import { useForm } from "react-hook-form";
import FormListItemV2 from "./form-list-item/FormListItem_V2";
import MultiSelectFormListItemV2 from "./form-list-item/MultiSelectFormListItemV2";

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
        case TYPES.CASE: {
            default_checked = false;
            break;
        }
        case TYPES.FAN: {
            default_checked = false;
            multiselect = true;
            max_quantity = 20;
            break;
        }
        case TYPES.SSD: {
            default_checked = false;
            multiselect = true;
            max_quantity = 5;
            break;
        }
    }

    if (category === CATEGORIES.PERIPHERY) {
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

export interface ConfiguratorFieldValues {
    gpu: IPart;
    cpu: IPart;
    motherboard: IPart;
    cpu_fan: IPart;
    ram: IPart;
    psu: IPart;
    cases: IPart;
    ssd: IPartWithQuantity[];
    fan: IPartWithQuantity[];
    [key: string]: IPartWithQuantity[] | IPart;
}

const Configurator = () => {
    const { getConfiguratorParts, isLoading } = useFetch();

    const [componentsList, setComponentsList] =
        useState<IConfiguratorComponents>();

    const { register, unregister, watch, reset, control } =
        useForm<ConfiguratorFieldValues>();

    const products = watch();

    console.log("products", products);

    // const getPcFromProduct = (product: IProduct) => {
    //     const pc: IValidatePc = {
    //         gpu: product.gpu,
    //         cpu: product.cpu,
    //         motherboard: product.motherboard,
    //         cpu_fan: product.cpu_fan,
    //         ram: product.ram,
    //         psu: product.psu,
    //         cases: product.cases ?? null,
    //         ssd: product.ssd,
    //         fan: product.fan,
    //     };

    //     return pc;
    // };

    // const checkSocket = (pc: IValidatePc) =>
    //     pc?.cpu?.socket != pc?.motherboard?.socket
    //         ? "Процессор и материнская плата физически несовместимы"
    //         : "";

    // const checkOnError = (pc: IValidatePc) => {
    //     return checkSocket(pc);
    // };

    // const validatePcAssembly = (pc: IValidatePc) => {
    //     let error = checkOnError(pc);
    //     if (error) console.log(error);
    // };

    // const addPartToPc = (
    //     name: keyof IAssemblyPC,
    //     part: any // IPart | IPartWithQuantity
    // ) => {
    //     let pc = { ...assemblyPC };
    //     pc[name] = part;
    //     setAssemblyPC(pc);
    //     // validatePcAssembly(getPcFromProduct(product));
    // };

    useEffect(() => {
        firstRender();
    }, []);

    const fetchConfiguratorParts = async () => {
        const data: IConfiguratorComponents = await getConfiguratorParts();
        setComponentsList(data);
        return data;
    };

    const resetForm = () => reset();
    const setDefaultsParts = (data: IConfiguratorComponents) => {
        reset({
            gpu: data?.components.find((el) => el.type.value === TYPES.GPU)
                ?.items[0] as IPart,
            cpu: data?.components.find((el) => el.type.value === TYPES.CPU)
                ?.items[0] as IPart,
            motherboard: data?.components.find(
                (el) => el.type.value === TYPES.MOTHERBOARD
            )?.items[0] as IPart,
            cpu_fan: data?.components.find(
                (el) => el.type.value === TYPES.CPU_FAN
            )?.items[0] as IPart,
            ram: data?.components.find((el) => el.type.value === TYPES.RAM)
                ?.items[0] as IPart,
            psu: data?.components.find((el) => el.type.value === TYPES.PSU)
                ?.items[0] as IPart,
        });
    };

    const firstRender = async () => {
        const data = await fetchConfiguratorParts();
        setDefaultsParts(data);
    };

    const makeNavTreeInfoArray = () => {
        const categories: string[] = [];
        let uniqueCategories: string[] = [];
        let allItems: NavTreeItem[] = [];

        if (componentsList) {
            componentsList.components.forEach((el) => {
                categories.push(el.category.label);
            });
            uniqueCategories = categories.filter(
                (item, index) => categories.indexOf(item) === index
            ); // удаляем дубликаты

            componentsList.components.forEach((el) => {
                allItems.push({
                    category: el.category.label,
                    name: el.type.label,
                    icon: el.type.image as string,
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
                    {componentsList.components.map((item, i) => {
                        const { multiselect, default_checked, max_quantity } =
                            selectSettings(
                                item.type.value,
                                item.category.value
                            );

                        if (multiselect)
                            return (
                                <MultiSelectFormListItemV2
                                    default_checked={default_checked}
                                    max_quantity={max_quantity}
                                    products={products}
                                    key={i}
                                    type={item.type}
                                    category={item.category}
                                    partition={item.partition}
                                    parts={item.items}
                                    control={control}
                                />
                            );

                        return (
                            <FormListItemV2
                                {...selectSettings(
                                    item.type.value,
                                    item.category.value
                                )}
                                default_checked={default_checked}
                                products={products}
                                key={i}
                                type={item.type}
                                category={item.category}
                                partition={item.partition}
                                parts={item.items}
                                control={control}
                            />
                        );
                    })}
                </ul>

                <aside className="summation sticky-block">
                    <Summation products={products} reset={resetForm} />
                </aside>
            </section>
        </>
    );
};

export default Configurator;
