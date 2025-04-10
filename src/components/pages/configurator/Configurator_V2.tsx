"use client";

import { useEffect, useRef, useState } from "react";
import "./Configurator.scss";
import useFetch from "@/lib/hooks/useFetch";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import NavTree from "./nav-tree/NavTree";
import Summation from "./summation/Summation";
import {
    ConfiguratorFieldValues,
    ICategory,
    IConfiguration,
    IConfiguratorComponents,
    IConfiguratorProductsDto,
    IPart,
    IPartWithQuantity,
    IPc,
    IPurchaseItem,
    IPurchaseItemDto,
    NavTreeItem,
    PcConfigurationDto,
    PartIdWithQuantity,
    PcIdWithQuantity,
    INotification,
} from "@/interfaces/types-v2";
import { useForm } from "react-hook-form";
import FormListItemV2 from "./form-list-item/FormListItem_V2";
import MultiSelectFormListItemV2 from "./form-list-item/MultiSelectFormListItemV2";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store/store";
import { notification } from "antd";
import { useParams } from "next/navigation";
import { PART_COMPONENTS_TYPES } from "@/constants";
import { setCartState } from "@/lib/redux/store/slices/cartSlice";
import {
    getPartsPurchaseItemsFromConfiguration,
    makeDefaultConfiguration,
    makeDefaultExistingConfiguration,
    makeNavTreeInfoArray,
    selectSettings,
} from "@/lib/functions";
import { setHasErrors } from "@/lib/redux/store/slices/configuratorSlice";

// default_checked - checked по умолчанию (по дефолту стоит в true, даже если поля в объекте нет)
// когда это значение стоит в false и элемент радиокнопка, то при выборе появляется красный крестик, нажатие на который уюирает выбор кнопки
// multiselect:'true' - чекбоксы, если поля нет, либо false - то радиокнопки
// max_quantity:5 - количество в select'e чекбокса
// category - отвечает за название раздела, в который будет помещен товар в навигационном дереве

interface ICheck {
    dominant: keyof ConfiguratorFieldValues;
    omnissive: string;
    reason: string;
    characteristicToCheck: string;
    checkRule: "equal" | "include" | "lt" | "gt";
    toCheck?: string[];
}

function getDifferences(
    prev: Record<string, ICheck>,
    curr: Record<string, ICheck>
) {
    const differences = {
        inPrevNotInCurr: {} as Record<string, ICheck>,
        inCurrNotInPrev: {} as Record<string, ICheck>,
    };

    // Находим ключи, которые есть в prev, но отсутствуют в curr
    for (const key in prev) {
        if (!curr.hasOwnProperty(key)) {
            differences.inPrevNotInCurr[key] = prev[key];
        }
    }

    // Находим ключи, которые есть в curr, но отсутствуют в prev
    for (const key in curr) {
        if (!prev.hasOwnProperty(key)) {
            differences.inCurrNotInPrev[key] = curr[key];
        }
    }

    return differences;
}

interface ConfiguratorProps {
    isManageRole?: boolean;
}

const Configurator = ({ isManageRole }: ConfiguratorProps) => {
    const {
        getConfiguratorParts,
        getCategories,
        saveConfiguration,
        getConfigurationById,
        configuratorProductsToCart,
        getUserCartItems,
        editConfiguration,
    } = useFetch();

    const dispatch = useAppDispatch();

    const { user } = useAppSelector((state) => state.session);
    const [categories, setCategories] = useState<ICategory[] | null>(null);

    const [componentsList, setComponentsList] =
        useState<IConfiguratorComponents>();

    const [defaultConfiguration, setDefaultConfiguration] =
        useState<IConfiguration>();

    const { watch, reset, control } = useForm<ConfiguratorFieldValues>();

    const products = watch();

    const [api, contextHolder] = notification.useNotification({
        stack: false,
    });
    const Notification = ({
        type,
        message,
        description,
        duration,
        key,
        placement,
        closeIcon,
    }: INotification) => {
        api[type]({
            key,
            message,
            description,
            duration,
            placement: placement || "topRight",
            closeIcon,
        });
    };

    const params = useParams();
    const id = params?.id;

    const prevErrors = useRef<any>({});
    const errors = useRef<any>({});

    const checkList: Record<string, ICheck> = {
        socket_cpu_mb: {
            dominant: PART_COMPONENTS_TYPES.CPU,
            omnissive: PART_COMPONENTS_TYPES.MOTHERBOARD,
            reason: "Процессор и материнская плата физически несовместимы",
            characteristicToCheck: "socket",
            checkRule: "equal",
            toCheck: [],
        },
        socket_mb_fan: {
            dominant: PART_COMPONENTS_TYPES.MOTHERBOARD,
            omnissive: PART_COMPONENTS_TYPES.CPU_FAN,
            reason: "Охлаждение процессора не поддерживает выбранную материнскую плату",
            characteristicToCheck: "socket",
            checkRule: "include",
            toCheck: [],
        },
        ram_type_mb_cpu: {
            dominant: PART_COMPONENTS_TYPES.MOTHERBOARD,
            omnissive: PART_COMPONENTS_TYPES.CPU,
            reason: "Несовместимость типов памяти материнской платы и процессора",
            characteristicToCheck: "ram_type",
            checkRule: "include",
            toCheck: [],
        },
        extensions_slots_gpu_case: {
            dominant: PART_COMPONENTS_TYPES.GPU,
            omnissive: PART_COMPONENTS_TYPES.CASES,
            reason: "В корпусе недостаточно слотов расширения для вмещения видекарты",
            characteristicToCheck: "extension_slots",
            checkRule: "gt",
            toCheck: [],
        },
    };

    const findCharacteristic = (part: IPart, value: string) => {
        const characteristic = part.characteristics.find(
            (c) => c.value === value
        );
        return characteristic;
    };

    // const findCorrectPart = (
    //     type: string,
    //     searchedPart: IPart,
    //     characteristicName: string
    // ) => {
    //     const partsArray = componentsList?.components.find(
    //         (component) => component.type.value === type
    //     );
    //     return partsArray?.items.find(
    //         (part) =>
    //             findCharacteristic(part, characteristicName)?.item ===
    //             findCharacteristic(searchedPart, characteristicName)?.item
    //     );
    // };

    // const validateSocket = (products: ConfiguratorFieldValues) => {
    //     const correctMB = findCorrectPart(
    //         PART_COMPONENTS_TYPES.MOTHERBOARD,
    //         products.cpu,
    //         "socket"
    //     );
    //     const newProducts = products;
    //     newProducts.motherboard = correctMB as IPart;
    //     reset(newProducts);
    // };

    const equalCheck = (
        key: string,
        { dominant, omnissive, characteristicToCheck, reason }: ICheck
    ) => {
        try {
            const isEq =
                String(
                    findCharacteristic(
                        products[dominant] as IPart,
                        characteristicToCheck
                    )?.item
                ) ===
                String(
                    findCharacteristic(
                        products[omnissive] as IPart,
                        characteristicToCheck
                    )?.item
                );

            if (!isEq) {
                errors.current = {
                    ...errors.current,
                    [key]: reason,
                };
            }
        } catch {}
    };

    const includeCheck = (
        key: string,
        {
            dominant,
            omnissive, // will include array with dominant
            characteristicToCheck,
            reason,
        }: ICheck
    ) => {
        try {
            const arr = findCharacteristic(
                products[omnissive] as IPart,
                characteristicToCheck
            )?.item as string[];

            const searchChar = findCharacteristic(
                products[dominant] as IPart,
                characteristicToCheck
            )?.item;

            arr?.find((value) => value === searchChar)
                ? null
                : (errors.current = {
                      ...errors.current,
                      [key]: reason,
                  });
        } catch {}
    };

    const numberCheck = (
        method: "lt" | "gt",
        key: string,
        { dominant, omnissive, characteristicToCheck, reason }: ICheck
    ) => {
        try {
            const num1 = Number(
                String(
                    findCharacteristic(
                        products[dominant] as IPart,
                        characteristicToCheck
                    )?.item
                ).match(/-?\d+(\.\d+)?/g)?.[0]
            );

            const num2 = Number(
                String(
                    findCharacteristic(
                        products[omnissive] as IPart,
                        characteristicToCheck
                    )?.item
                ).match(/-?\d+(\.\d+)?/g)?.[0]
            );

            if (method == "lt") {
                if (num1 && num2 && num1 < num2)
                    errors.current = {
                        ...errors.current,
                        [key]: reason,
                    };
            }
            if (method == "gt") {
                if (num1 && num2 && num1 > num2)
                    errors.current = {
                        ...errors.current,
                        [key]: reason,
                    };
            }
        } catch {}
    };

    const validate = () => {
        for (const key in checkList) {
            const {
                dominant,
                omnissive,
                characteristicToCheck,
                reason,
                checkRule,
            } = checkList[key];
            switch (checkRule) {
                case "equal":
                    equalCheck(key, {
                        dominant,
                        omnissive,
                        characteristicToCheck,
                        reason,
                    } as ICheck);
                    break;
                case "include":
                    includeCheck(key, {
                        dominant,
                        omnissive,
                        characteristicToCheck,
                        reason,
                    } as ICheck);
                    break;
                case "lt":
                    numberCheck("lt", key, {
                        dominant,
                        omnissive,
                        characteristicToCheck,
                        reason,
                    } as ICheck);
                    break;
                case "gt":
                    numberCheck("gt", key, {
                        dominant,
                        omnissive,
                        characteristicToCheck,
                        reason,
                    } as ICheck);
                    break;
            }
        }
    };

    const showAssemblyErrors = () => {
        const diff = getDifferences(prevErrors.current, errors.current);

        for (let key in diff.inPrevNotInCurr) {
            api.destroy(key);
        }

        for (let key in diff.inCurrNotInPrev) {
            Notification({
                type: "warning",
                message: "Ошибка конфигурации",
                description: errors.current[key],
                duration: 9999,
                key: key,
                placement: "bottomLeft",
                closeIcon: false,
            });
        }

        prevErrors.current = errors.current;
        if (JSON.stringify(errors.current) === "{}")
            dispatch(setHasErrors(false));
        else dispatch(setHasErrors(true));
        errors.current = {};
    };

    useEffect(() => {
        if (defaultConfiguration) {
            validate();
            showAssemblyErrors();
        }
    }, [products]);

    const addToCart = async (dto: IConfiguratorProductsDto) => {
        await configuratorProductsToCart(dto);
        const data: IPurchaseItem[] = await getUserCartItems();
        dispatch(setCartState(data));
    };

    const handleSaveConfiguration = async (
        configurationName: string,
        needAddToCart?: boolean
    ) => {
        try {
            const ssdList = (products?.ssd as IPartWithQuantity[]) ?? [];
            const fansList = (products?.fan as IPartWithQuantity[]) ?? [];

            const configuration: PcConfigurationDto = {
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

            // edit configuration
            if (id && defaultConfiguration?.userCreated?.id === user?.userId) {
                try {
                    configuration.id = id as string;
                    await editConfiguration(configuration);

                    const data: IPurchaseItem[] = await getUserCartItems();
                    dispatch(setCartState(data));

                    Notification({
                        type: "success",
                        message: "Успешно",
                        description: "Конфигурация успешно изменена",
                    });
                } catch {
                    Notification({
                        type: "error",
                        message: "Ошибка",
                        description: "Не удалось изменить конфигурацию",
                    });
                }
            }
            // add new configuration
            else {
                const configID = await saveConfiguration(configuration);

                // if need to save and add to cart
                if (needAddToCart) {
                    const dto: IConfiguratorProductsDto = {
                        userId: user?.userId as string,
                        pc: {
                            pcId: configID?.id,
                            quantity: 1,
                        } as PcIdWithQuantity,
                        parts: getPartsPurchaseItemsFromConfiguration(products),
                    };

                    addToCart(dto);

                    Notification({
                        type: "success",
                        message: "Успешно",
                        description: "Конфигурация успешно добавлена в корзину",
                    });

                    // just save
                } else {
                    Notification({
                        type: "success",
                        message: "Успешно",
                        description: "Конфигурация успешно сохранена",
                    });
                }
            }
        } catch (error) {
            Notification({
                type: "error",
                message: "Ошибка",
                description: "Не удалось сохранить конфигурацию",
            });
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

    const filteredComponentList = isManageRole
        ? componentsList.components.filter(
              (el) => el.category.value === "components"
          )
        : componentsList.components;

    return (
        <>
            {contextHolder}
            <section
                className={`configurator container section-decreased ${
                    isManageRole && "mb-40"
                }`}
            >
                <aside className="aside-components-tree hidden-tablet sticky-block">
                    <NavTree
                        categories={categories}
                        allItems={allItems}
                        isManageRole={isManageRole}
                    />
                </aside>

                <ul className="components-list">
                    {filteredComponentList.map((item, i) => {
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
                                    key={`MultiSelectFormListItemV2-${i}`}
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
                                key={`FormListItemV2-${i}`}
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
                        id={id as string}
                        isManageRole={isManageRole}
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
