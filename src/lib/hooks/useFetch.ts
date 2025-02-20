import useHttp from "./useHttp";
import { useAppSelector } from "../redux/store/store";
import { useCallback, useEffect } from "react";
import {
    INewUser,
    IPart,
    IPartition,
    IType,
    IUser,
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

    return {
        getNotEmptyPcCategories,
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
