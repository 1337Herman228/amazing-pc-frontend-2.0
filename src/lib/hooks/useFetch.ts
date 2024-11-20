import useHttp from "./useHttp";
import { useAppSelector } from "../redux/store/store";

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

    return {
        getGamingPcCatalog,
        getNotebooksCatalog,
        getWorkstationsCatalog,
        getPcByModelGroupName,
        isLoading,
        error,
    };
};

export default useFetch;
