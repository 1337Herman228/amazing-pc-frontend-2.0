import useHttp from "./useHttp";
import { useAppSelector } from "../redux/store/store";
import { IPart, IPartition, IType } from "@/interfaces/types";

const useFetch = () => {
    const { requestJson, isLoading, error } = useHttp();
    const { session, token, user } = useAppSelector((state) => state.session);

    const getGamingPcCatalog = async () => {
        if (token) {
            const data = await requestJson(
                token,
                "http://localhost:8080/user/gaming-pc-catalog"
            );
            return data;
        }
    };

    const getNotebooksCatalog = async () => {
        if (token) {
            const data = await requestJson(
                token,
                "http://localhost:8080/user/notebooks-catalog"
            );
            return data;
        }
    };

    const getWorkstationsCatalog = async () => {
        if (token) {
            const data = await requestJson(
                token,
                "http://localhost:8080/user/workstations-catalog"
            );
            return data;
        }
    };

    const getPcByModelGroupName = async (modelGroupName: string) => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/user/get-pc-by-model-group-name/${modelGroupName}`
            );
            return data;
        }
    };

    const getConfiguratorParts = async () => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/user/configurator-parts`
            );
            return data;
        }
    };

    const getParts = async () => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/admin/parts`
            );
            return data;
        }
    };

    const getTypes = async () => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/admin/types`
            );
            return data;
        }
    };

    const getPartitions = async () => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/admin/partitions`
            );
            return data;
        }
    };

    const getUserCartItems = async () => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/user/get-user-cart-items/${user?.userId}`
            );
            return data;
        }
    };

    const getPartById = async (partId: string | number) => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/admin/get-part/${partId}`
            );
            return data;
        }
    };

    const getTypeById = async (typeId: string | number) => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/admin/get-type/${typeId}`
            );
            return data;
        }
    };

    const getPartitionById = async (id: string | number) => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/admin/get-partition/${id}`
            );
            return data;
        }
    };

    const addPartition = async (partiton: IPartition) => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/admin/add-partition`,
                "POST",
                JSON.stringify(partiton)
            );
            return data;
        }
    };

    const deletePartition = async (id: number) => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/admin/delete-partition/${id}`,
                "DELETE"
            );
            return data;
        }
    };

    const editPartition = async (partiton: IPartition) => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/admin/edit-partition`,
                "PUT",
                JSON.stringify(partiton)
            );
            return data;
        }
    };

    const addType = async (type: IType) => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/admin/add-type`,
                "POST",
                JSON.stringify(type)
            );
            return data;
        }
    };

    const deleteType = async (typeId: number) => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/admin/delete-type/${typeId}`,
                "DELETE"
            );
            return data;
        }
    };

    const editType = async (type: IType) => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/admin/edit-type`,
                "PUT",
                JSON.stringify(type)
            );
            return data;
        }
    };

    const addPart = async (part: IPart) => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/admin/add-part`,
                "POST",
                JSON.stringify(part)
            );
            return data;
        }
    };

    const deletePart = async (id: number) => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/admin/delete-part/${id}`,
                "DELETE"
            );
            return data;
        }
    };

    const editPart = async (partDto: any) => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/admin/edit-part`,
                "POST",
                JSON.stringify(partDto)
            );
            return data;
        }
    };

    return {
        getGamingPcCatalog,
        getNotebooksCatalog,
        getWorkstationsCatalog,
        getPcByModelGroupName,
        getConfiguratorParts,
        getUserCartItems,
        getPartitions,
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
