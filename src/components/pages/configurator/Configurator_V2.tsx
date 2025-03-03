"use client";

import { useEffect, useState } from "react";
import "./Configurator.scss";
import useFetch from "@/lib/hooks/useFetch";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import NavTree from "./nav-tree/NavTree";
import Summation from "./summation/Summation";
import { CATEGORIES, TYPES } from "@/lib/constants";
import {
    ConfiguratorFieldValues,
    ICategory,
    IConfiguration,
    IConfiguratorComponents,
    IPart,
    IPartWithQuantity,
    IPc,
    IPurchaseItem,
    IPurchaseItemDto,
    NavTreeItem,
    NewPcConfigurationDto,
} from "@/interfaces/types-v2";
import { useForm } from "react-hook-form";
import FormListItemV2 from "./form-list-item/FormListItem_V2";
import MultiSelectFormListItemV2 from "./form-list-item/MultiSelectFormListItemV2";
import { useAppSelector } from "@/lib/redux/store/store";
import { notification } from "antd";
import { useParams } from "next/navigation";
import { PART_CATEGORIES } from "@/constants";

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

const makeDefaultConfiguration = (data: IConfiguratorComponents) => {
    return {
        id: "",
        name: "",
        configuration: {
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
            cases: undefined,
            ssd: [],
            fan: [],
        },
    } as IConfiguration;
};

const makeDefaultExistingConfiguration = (config: IPc) => {
    return {
        id: config.id,
        name: config.name,
        configuration: {
            gpu: config.gpu,
            cpu: config.cpu,
            motherboard: config.motherboard,
            cpu_fan: config.cpuFan,
            ram: config.ram,
            psu: config.psu,
            ssd: config.ssd ?? [],
            fan: config.fans ?? [],
            cases: config.pcCase,
        },
    } as IConfiguration;
};

const makeNavTreeInfoArray = (componentsList?: IConfiguratorComponents) => {
    let allItems: NavTreeItem[] = [];

    componentsList &&
        componentsList.components.forEach((el) => {
            allItems.push({
                id: el.type.id,
                category: el.category.label,
                label: el.type.label,
                value: el.type.value,
                icon: el.type.image as string,
            });
        });
    return { allItems };
};

const getPartsPurchaseItemsFromConfiguration = (
    configuration: ConfiguratorFieldValues
) => {
    const parts: IPurchaseItemDto[] = [];

    console.log(
        "configuration",
        Object.keys(configuration).filter((k) => configuration?.[k])
    );

    //TODO: Ошибка в консоли
    // Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'value')
    // at eval (Configurator_V2.tsx:159:51)
    // at Array.forEach (<anonymous>)
    // at getPartsPurchaseItemsFromConfiguration (Configurator_V2.tsx:142:10)
    // at addToCart (Configurator_V2.tsx:226:21)
    // at handleSaveConfiguration (Configurator_V2.tsx:270:17)

    Object.keys(configuration)
        .filter((k) => configuration?.[k])
        .forEach((key) => {
            if (
                Array.isArray(configuration[key]) &&
                configuration[key].length > 0 &&
                configuration[key][0].part.categories.value !==
                    PART_CATEGORIES.COMPONENTS
            ) {
                configuration[key].forEach((part) => {
                    parts.push({
                        productId: part.part.id,
                        quantity: part.quantity,
                    });
                });
            } else {
                if (
                    configuration[key] &&
                    // @ts-ignore
                    configuration[key].categories.value !==
                        PART_CATEGORIES.COMPONENTS
                )
                    parts.push({
                        // @ts-ignore
                        productId: configuration[key]?.id as string,
                        quantity: 1,
                    });
            }
        });

    console.log("parts", parts);

    return parts;
};

const Configurator = () => {
    const {
        getConfiguratorParts,
        getCategories,
        saveConfiguration,
        getConfigurationById,
    } = useFetch();

    const { user } = useAppSelector((state) => state.session);
    const [categories, setCategories] = useState<ICategory[] | null>(null);

    const [componentsList, setComponentsList] =
        useState<IConfiguratorComponents>();

    const [defaultConfiguration, setDefaultConfiguration] =
        useState<IConfiguration>();

    const { watch, reset, control } = useForm<ConfiguratorFieldValues>();

    const products = watch();

    const [api, contextHolder] = notification.useNotification();
    const Notification = (
        type: "success" | "error",
        message: string,
        description: string
    ) => {
        api[type]({
            message: message,
            description: description,
        });
    };

    const params = useParams();
    const id = params?.id;

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

    const addToCart = async () => {
        console.log(getPartsPurchaseItemsFromConfiguration(products));
    };

    console.log(products);

    const handleSaveConfiguration = async (
        configurationName: string,
        needAddToCart?: boolean
    ) => {
        try {
            const ssdList = (products?.ssd as IPartWithQuantity[]) ?? [];
            const fansList = (products?.fan as IPartWithQuantity[]) ?? [];

            const configuration: NewPcConfigurationDto = {
                name: configurationName || "Без названия",
                gpuId: products.gpu?.id as string,
                cpuId: products.cpu?.id as string,
                motherboardId: products.motherboard?.id as string,
                cpuFanId: products.cpu_fan?.id as string,
                ramId: products.ram?.id as string,
                psuId: products.psu?.id as string,
                pcCaseId: products.cases?.id ?? null,
                ssd: ssdList.map((el) => ({
                    partId: el.part.id,
                    quantity: el.quantity,
                })),
                fans: fansList.map((el) => ({
                    partId: el.part.id,
                    quantity: el.quantity,
                })),
                userId: user?.userId as string,
            };

            const configID = await saveConfiguration(configuration);
            console.log("configID", configID);

            Notification(
                "success",
                "Успешно",
                "Конфигурация успешно сохранена"
            );

            if (needAddToCart) {
                alert("Конфигурация успешно добавлена в корзину");
                addToCart();
            }
        } catch (error) {
            Notification(
                "error",
                "Ошибка",
                "Не удалось сохранить конфигурацию"
            );
        }
    };

    useEffect(() => {
        firstRender();
    }, []);

    const fetchConfiguratorParts = async () => {
        const data: IConfiguratorComponents = await getConfiguratorParts();
        setComponentsList(data);
        return data;
    };

    const resetForm = () => reset(defaultConfiguration?.configuration);

    const fetchExistingConfiguration = async (
        id: string,
        data: IConfiguratorComponents
    ) => {
        try {
            const config: IPc = await getConfigurationById(id);
            const defaultConfig = makeDefaultExistingConfiguration(config);
            return defaultConfig;
        } catch (error) {
            const defaultConfig = makeDefaultConfiguration(data);
            return defaultConfig;
        }
    };

    const firstRender = async () => {
        const data = await fetchConfiguratorParts();
        const categories = await getCategories();
        setCategories(categories);

        // if exist, we have configuration to edit
        if (id) {
            const defaultConfiguration = await fetchExistingConfiguration(
                id as string,
                data
            );
            setDefaultConfiguration(defaultConfiguration);
            reset(defaultConfiguration?.configuration);
        } else {
            const defaultConfiguration = makeDefaultConfiguration(data);
            setDefaultConfiguration(defaultConfiguration);
            reset(defaultConfiguration.configuration);
        }
    };

    const { allItems } = makeNavTreeInfoArray(componentsList);

    if (!componentsList || !categories) return <LoadingPage />;

    return (
        <>
            {contextHolder}
            <section className="configurator container section-decreased">
                <aside className="aside-components-tree hidden-tablet sticky-block">
                    <NavTree categories={categories} allItems={allItems} />
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
                    <Summation
                        products={products}
                        reset={resetForm}
                        saveConfiguration={handleSaveConfiguration}
                        config={defaultConfiguration}
                    />
                </aside>
            </section>
        </>
    );
};

export default Configurator;
