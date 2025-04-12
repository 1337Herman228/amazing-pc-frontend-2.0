import useHttp from "./useHttp";
import { useAppSelector } from "../redux/store/store";
import { useCallback } from "react";
import {
    IAddPcCategory,
    IAddPCDto,
    IAddPcModelGroup,
    IAddPcType,
    IChangePassword,
    IConfiguratorProductsDto,
    INewUser,
    IPart,
    IPartition,
    IPcCategory,
    IPcType,
    IType,
    PcConfigurationDto,
    PcToCartDto,
} from "@/interfaces/types-v2";

const useFetch = () => {
    const { requestJson, isLoading, error } = useHttp();
    const { session, token, user } = useAppSelector((state) => state.session);

    const getGamingPcCatalog = useCallback(async () => {
        if (token) {
            const data = await requestJson(
                token,
                "http://localhost:8080/user/gaming-pc-catalog"
            );
            return data;
        }
    }, [token]);

    const getPcCategories = useCallback(async () => {
        if (token) {
            const data = await requestJson(
                token,
                "http://localhost:8080/user/pc-categories"
            );
            return data;
        }
    }, [token]);

    const getNotebooksCatalog = useCallback(async () => {
        if (token) {
            const data = await requestJson(
                token,
                "http://localhost:8080/user/notebooks-catalog"
            );
            return data;
        }
    }, [token]);

    const getWorkstationsCatalog = useCallback(async () => {
        if (token) {
            const data = await requestJson(
                token,
                "http://localhost:8080/user/workstations-catalog"
            );
            return data;
        }
    }, [token]);

    const getPcByModelGroupName = useCallback(
        async (modelGroupName: string) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/user/get-pc-by-model-group-name/${modelGroupName}`
                );
                return data;
            }
        },
        [token]
    );

    const getConfiguratorParts = useCallback(async () => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/user/configurator-parts`
            );
            return data;
        }
    }, [token]);

    const getParts = useCallback(async () => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/user/parts`
            );
            return data;
        }
    }, [token]);

    const getAccounts = useCallback(async () => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/admin/users`
            );
            return data;
        }
    }, [token]);

    const getTypes = useCallback(async () => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/user/types`
            );
            return data;
        }
    }, [token]);

    const getCompareItems = useCallback(async () => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/user/compare/${user.userId}`
            );
            return data;
        }
    }, [token]);

    const getCompareItemsCount = useCallback(async () => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/user/compare-count/${user.userId}`
            );
            return data;
        }
    }, [token]);

    const getUserConfigurations = useCallback(async () => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/user/my-configurations/${user.userId}`
            );
            return data;
        }
    }, [token]);

    const getTypeById = useCallback(
        async (id: string) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/user/types/${id}`
                );
                return data;
            }
        },
        [token]
    );

    const getTypeByValue = useCallback(
        async (value: string) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/user/type-by-value/${value}`
                );
                return data;
            }
        },
        [token]
    );

    const getPartsByType = useCallback(
        async (typeId: string) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/user/parts-by-type/${typeId}`
                );
                return data;
            }
        },
        [token]
    );

    const getUserById = useCallback(
        async (id: string) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/admin/users/${id}`
                );
                return data;
            }
        },
        [token]
    );

    const getConfigurationById = useCallback(
        async (id: string) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/user/configurations/${id}`
                );
                return data;
            }
        },
        [token]
    );

    const editUser = useCallback(
        async (user: INewUser) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/admin/users`,
                    "PUT",
                    JSON.stringify(user)
                );
                return data;
            }
        },
        [token]
    );

    const editUserInfo = useCallback(
        async (user: INewUser) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/user/users`,
                    "PUT",
                    JSON.stringify(user)
                );
                return data;
            }
        },
        [token]
    );

    const changePassword = useCallback(
        async (dto: IChangePassword) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/user/change-password`,
                    "PUT",
                    JSON.stringify(dto)
                );
                return data;
            }
        },
        [token]
    );

    const editPurchaseItemQuantity = useCallback(
        async (id: string, quantity: number) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/user/edit-purchase-item-quantity`,
                    "PUT",
                    JSON.stringify({
                        id,
                        quantity,
                    })
                );
                return data;
            }
        },
        [token]
    );

    const getCategories = useCallback(async () => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/user/categories`
            );
            return data;
        }
    }, [token]);

    const getNotEmptyPcCategories = useCallback(async () => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/user/not-empty-pc-categories`
            );
            return data;
        }
    }, [token]);

    const getPartitions = useCallback(async () => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/user/partitions`
            );
            return data;
        }
    }, [token]);

    const getUserCartItems = useCallback(async () => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/user/user-cart/${user?.userId}`
            );
            return data;
        }
    }, [token]);

    const getPartById = useCallback(async (id: string) => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/user/parts/${id}`
            );
            return data;
        }
    }, []);

    const getRoles = useCallback(async () => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/admin/roles`
            );
            return data;
        }
    }, []);

    const getPartitionById = useCallback(
        async (id: string) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/user/partitions/${id}`
                );
                return data;
            }
        },
        [token]
    );

    const editPurchases = useCallback(
        async (dto: {
            id: string;
            userId: string;
            status: string;
            destination: string;
        }) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/admin/purchases`,
                    "PUT",
                    JSON.stringify(dto)
                );
                return data;
            }
        },
        [token]
    );

    const getPurchases = useCallback(async () => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/user/purchases/${user.userId}`
            );
            return data;
        }
    }, [token]);

    const getPurchaseById = useCallback(
        async (id: string) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/admin/purchases/${id}`
                );
                return data;
            }
        },
        [token]
    );

    const getAllPurchases = useCallback(async () => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/admin/purchases`
            );
            return data;
        }
    }, [token]);

    const getUserInfo = useCallback(async () => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/user/users/${user.userId}`
            );
            return data;
        }
    }, [token]);

    const addPartition = useCallback(
        async (partiton: IPartition) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/admin/partitions`,
                    "POST",
                    JSON.stringify(partiton)
                );
                return data;
            }
        },
        [token]
    );

    const configuratorProductsToCart = useCallback(
        async (dto: IConfiguratorProductsDto) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/user/configurator-products-to-cart`,
                    "POST",
                    JSON.stringify(dto)
                );
                return data;
            }
        },
        [token]
    );

    const saveConfiguration = useCallback(
        async (configuration: PcConfigurationDto) => {
            if (token) {
                const id = await requestJson(
                    token,
                    `http://localhost:8080/user/configurations`,
                    "POST",
                    JSON.stringify(configuration)
                );
                return id;
            }
        },
        [token]
    );

    const editConfiguration = useCallback(
        async (configuration: PcConfigurationDto) => {
            if (token) {
                const response = await requestJson(
                    token,
                    `http://localhost:8080/user/configurations`,
                    "PUT",
                    JSON.stringify(configuration)
                );
                return response;
            }
        },
        [token]
    );

    const addUser = useCallback(
        async (user: INewUser) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/admin/users`,
                    "POST",
                    JSON.stringify(user)
                );
                return data;
            }
        },
        [token]
    );

    const deletePcCategory = useCallback(
        async (id: string) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/admin/pc-category/${id}`,
                    "DELETE"
                );
                return data;
            }
        },
        [token]
    );

    const getPcCategoryById = useCallback(
        async (id: string) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/admin/pc-category/${id}`
                );
                return data;
            }
        },
        [token]
    );

    const addPcCategory = useCallback(
        async (dto: IAddPcCategory) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/admin/pc-category`,
                    "POST",
                    JSON.stringify(dto)
                );
                return data;
            }
        },
        [token]
    );

    const editPcCategory = useCallback(
        async (dto: IPcCategory) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/admin/pc-category`,
                    "PUT",
                    JSON.stringify(dto)
                );
                return data;
            }
        },
        [token]
    );

    const getAllPc = useCallback(async () => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/user/pc`
            );
            return data;
        }
    }, [token]);

    const deletePc = useCallback(
        async (id: string) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/admin/pc/${id}`,
                    "DELETE"
                );
                return data;
            }
        },
        [token]
    );

    const deletePcType = useCallback(
        async (id: string) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/admin/pc-types/${id}`,
                    "DELETE"
                );
                return data;
            }
        },
        [token]
    );

    const getPcTypes = useCallback(async () => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/user/pc-types`
            );
            return data;
        }
    }, [token]);

    const addPc = useCallback(
        async (dto: IAddPCDto) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/admin/pc`,
                    "POST",
                    JSON.stringify(dto)
                );
                return data;
            }
        },
        [token]
    );

    const editPc = useCallback(
        async (dto: IAddPCDto) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/admin/pc`,
                    "PUT",
                    JSON.stringify(dto)
                );
                return data;
            }
        },
        [token]
    );

    const getPcModelGroups = useCallback(async () => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/user/pc-model-groups`
            );
            return data;
        }
    }, [token]);

    const getPcModelGroupsReduced = useCallback(async () => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/user/pc-model-groups-reduced`
            );
            return data;
        }
    }, [token]);

    const getPcModelGroupById = useCallback(
        async (id: string) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/user/pc-model-groups/${id}`
                );
                return data;
            }
        },
        [token]
    );

    const addPcModelGroups = useCallback(
        async (dto: IAddPcModelGroup) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/admin/pc-model-groups`,
                    "POST",
                    JSON.stringify(dto)
                );
                return data;
            }
        },
        [token]
    );

    const editPcModelGroup = useCallback(
        async (dto: IAddPcModelGroup) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/admin/pc-model-groups`,
                    "PUT",
                    JSON.stringify(dto)
                );
                return data;
            }
        },
        [token]
    );

    const deletePcModelGroup = useCallback(
        async (id: string) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/admin/pc-model-groups/${id}`,
                    "DELETE"
                );
                return data;
            }
        },
        [token]
    );

    const getPcTypeById = useCallback(
        async (id: string) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/admin/pc-types/${id}`
                );
                return data;
            }
        },
        [token]
    );

    const addPcType = useCallback(
        async (dto: IAddPcType) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/admin/pc-types`,
                    "POST",
                    JSON.stringify(dto)
                );
                return data;
            }
        },
        [token]
    );

    const editPcType = useCallback(
        async (dto: IPcType) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/admin/pc-types`,
                    "PUT",
                    JSON.stringify(dto)
                );
                return data;
            }
        },
        [token]
    );

    const deletePartition = useCallback(
        async (id: string) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/admin/partitions/${id}`,
                    "DELETE"
                );
                return data;
            }
        },
        [token]
    );

    const editPartition = useCallback(
        async (partiton: IPartition) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/admin/partitions`,
                    "PUT",
                    JSON.stringify(partiton)
                );
                return data;
            }
        },
        [token]
    );

    const addType = useCallback(
        async (type: IType) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/admin/types`,
                    "POST",
                    JSON.stringify(type)
                );
                return data;
            }
        },
        [token]
    );

    const deleteType = useCallback(
        async (id: string) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/admin/types/${id}`,
                    "DELETE"
                );
                return data;
            }
        },
        [token]
    );

    const deletePurchaseItem = useCallback(
        async (id: string) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/user/purchase-items/${id}`,
                    "DELETE"
                );
                return data;
            }
        },
        [token]
    );

    const deletePurchase = useCallback(
        async (id: string) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/admin/purchases/${id}`,
                    "DELETE"
                );
                return data;
            }
        },
        [token]
    );

    const editType = useCallback(
        async (type: IType) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/admin/types`,
                    "PUT",
                    JSON.stringify(type)
                );
                return data;
            }
        },
        [token]
    );

    const addPart = useCallback(
        async (part: IPart) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/admin/parts`,
                    "POST",
                    JSON.stringify(part)
                );
                return data;
            }
        },
        [token]
    );

    const addPcToCard = useCallback(
        async (pc: PcToCartDto) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/user/pc-to-cart`,
                    "POST",
                    JSON.stringify(pc)
                );
                return data;
            }
        },
        [token]
    );

    const addProductToCard = useCallback(
        async (productId: string, quantity?: number) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/user/product-to-cart`,
                    "POST",
                    JSON.stringify({
                        userId: user?.userId,
                        productId,
                        quantity: quantity || 1,
                    })
                );
                return data;
            }
        },
        [token]
    );

    const deletePart = useCallback(async (id: String) => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/admin/parts/${id}`,
                "DELETE"
            );
            return data;
        }
    }, []);

    const deleteUser = useCallback(async (id: String) => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/admin/users/${id}`,
                "DELETE"
            );
            return data;
        }
    }, []);

    const editPart = useCallback(
        async (part: IPart) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/admin/parts`,
                    "PUT",
                    JSON.stringify(part)
                );
                return data;
            }
        },
        [token]
    );

    const deleteCompareItem = useCallback(
        async (id: string) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/user/compare/${id}`,
                    "DELETE"
                );
                return data;
            }
        },
        [token]
    );

    const deleteAllCompareItems = useCallback(async () => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/user/compare`,
                "DELETE"
            );
            return data;
        }
    }, [token]);

    const addCompareItem = useCallback(
        async (productId: string) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/user/compare`,
                    "POST",
                    JSON.stringify({ userId: user?.userId, productId })
                );
                return data;
            }
        },
        [token]
    );

    const deleteUserConfiguration = useCallback(
        async (configurationId: string) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/user/my-configurations/${configurationId}`,
                    "DELETE"
                );
                return data;
            }
        },
        [token]
    );

    const createPurchase = useCallback(
        async (destination: string) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/user/purchases`,
                    "POST",
                    JSON.stringify({ userId: user?.userId, destination })
                );
                return data;
            }
        },
        [token]
    );

    const cancelPurchase = useCallback(
        async (id: string) => {
            if (token) {
                const data = await requestJson(
                    token,
                    `http://localhost:8080/user/purchases/${id}`,
                    "PUT"
                );
                return data;
            }
        },
        [token]
    );

    const getBestsellers = useCallback(async () => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/admin/statistic/bestsellers`
            );
            return data;
        }
    }, [token]);

    const getMostComparing = useCallback(async () => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/admin/statistic/most-comparing`
            );
            return data;
        }
    }, [token]);

    const getSellingTypes = useCallback(async () => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/admin/statistic/selling-types`
            );
            return data;
        }
    }, [token]);

    const getDailySalesIncomeStatistic = useCallback(async () => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/admin/statistic/daily-sales-income`
            );
            return data;
        }
    }, [token]);

    return {
        getDailySalesIncomeStatistic,
        getSellingTypes,
        getMostComparing,
        getBestsellers,
        editPurchases,
        getPurchaseById,
        deletePurchase,
        getAllPurchases,
        editPc,
        addPc,
        deletePc,
        getAllPc,
        getPcModelGroupById,
        getPcModelGroupsReduced,
        editPcModelGroup,
        getPcModelGroups,
        addPcModelGroups,
        deletePcModelGroup,
        getPcTypes,
        deletePcType,
        addPcType,
        editPcType,
        getPcTypeById,
        getPcCategoryById,
        editPcCategory,
        addPcCategory,
        deletePcCategory,
        changePassword,
        editUserInfo,
        getUserInfo,
        getPartsByType,
        getTypeByValue,
        cancelPurchase,
        getPurchases,
        createPurchase,
        deleteUserConfiguration,
        getUserConfigurations,
        addProductToCard,
        addCompareItem,
        getCompareItemsCount,
        deleteCompareItem,
        deleteAllCompareItems,
        getCompareItems,
        addPcToCard,
        editConfiguration,
        configuratorProductsToCart,
        getConfigurationById,
        saveConfiguration,
        editPurchaseItemQuantity,
        getNotEmptyPcCategories,
        deletePurchaseItem,
        getPcCategories,
        getUserById,
        editUser,
        deleteUser,
        addUser,
        getAccounts,
        getGamingPcCatalog,
        getNotebooksCatalog,
        getWorkstationsCatalog,
        getPcByModelGroupName,
        getConfiguratorParts,
        getUserCartItems,
        getRoles,
        getPartitions,
        getCategories,
        getPartitionById,
        addPartition,
        deletePartition,
        editPartition,
        getParts,
        addPart,
        deletePart,
        getPartById,
        getTypeById,
        editPart,
        getTypes,
        editType,
        addType,
        deleteType,
        isLoading,
        error,
    };
};

export default useFetch;
