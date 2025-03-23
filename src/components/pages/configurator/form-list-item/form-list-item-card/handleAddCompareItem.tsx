import { CompareItemsDto } from "@/interfaces/types-v2";
import useFetch from "@/lib/hooks/useFetch";
import {
    setCompareItems,
    setCompareState,
} from "@/lib/redux/store/slices/compareSlice";
import { useAppDispatch } from "@/lib/redux/store/store";

const useAddCompareItem = () => {
    const { addCompareItem, getCompareItemsCount, getCompareItems } =
        useFetch();
    const dispatch = useAppDispatch();

    const handleAddCompareItem = async (productId: string) => {
        await addCompareItem(productId);
    };

    const fetchCompareItemsCount = async () => {
        const data: number = await getCompareItemsCount();
        dispatch(setCompareState(data));
    };

    const fetchCompareItems = async () => {
        const data: CompareItemsDto = await getCompareItems();
        dispatch(setCompareItems(data.items));
    };

    return { handleAddCompareItem, fetchCompareItemsCount, fetchCompareItems };
};

export default useAddCompareItem;
