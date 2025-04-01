"use client";

import { useState } from "react";
import "./CartPage.scss";
import { IPart, IPc, IPurchaseItem } from "@/interfaces/types-v2";
import { PRODUCT_TYPE } from "@/constants";
import useFetch from "@/lib/hooks/useFetch";
import PcItemRow from "./details/PcItemRow";
import { mapPcToConfiguratorFieldValues } from "@/lib/functions";
import PcSpecModal from "@/components/modals/pc-spec-modal/PcSpecModal";
import PartItemRow from "./details/PartItemRow";

interface CartTableItemProps {
    item: IPurchaseItem;
    fetchCartItems: () => Promise<void>;
}

const CartTableItem = ({ item, fetchCartItems }: CartTableItemProps) => {
    const { editPurchaseItemQuantity, deletePurchaseItem } = useFetch();

    const [isModalOpen, setIsModalOpen] = useState([false, false]);
    const toggleModal = (idx: any, target: any) => {
        setIsModalOpen((p) => {
            p[idx] = target;
            return [...p];
        });
    };

    const [quantity, setQuantity] = useState<number>(item?.quantity);
    const [open, setOpen] = useState(false);

    const handleSetQuantity = async (q: number) => {
        if (q > 0 && q < 100) {
            setQuantity(q);
            editPurchaseItemQuantity(item.id, q);
            fetchCartItems();
        }
    };

    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        onDeleteCartItem();
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    const onDeleteCartItem = async () => {
        await deletePurchaseItem(item.id);
        await fetchCartItems();
    };

    return (
        <>
            {item.product.productType === PRODUCT_TYPE.PC ? (
                <PcItemRow
                    open={open}
                    pc={item.product as IPc}
                    quantity={quantity}
                    toggleModal={toggleModal}
                    handleCancel={handleCancel}
                    handleOk={handleOk}
                    showModal={showModal}
                    handleSetQuantity={handleSetQuantity}
                />
            ) : (
                <PartItemRow
                    open={open}
                    part={item.product as IPart}
                    quantity={quantity}
                    toggleModal={toggleModal}
                    handleCancel={handleCancel}
                    handleOk={handleOk}
                    showModal={showModal}
                    handleSetQuantity={handleSetQuantity}
                />
            )}

            <PcSpecModal
                product={mapPcToConfiguratorFieldValues(item.product as IPc)}
                isModalOpen={isModalOpen}
                toggleModal={toggleModal}
            />
        </>
    );
};
export default CartTableItem;
