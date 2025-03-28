import ConfigBuyBtn from "@/components/buttons/configurator-buy-btn/ConfigBuyBtn";
import { IPurchaseItem } from "@/interfaces/types-v2";
import useFetch from "@/lib/hooks/useFetch";
import { setCartState } from "@/lib/redux/store/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store/store";
import Link from "next/link";
import React from "react";

interface PcInfoProps {
    name: string;
    isConfiguration: boolean;
    id: string;
    toggleModal: Function;
    hasToCartBtn?: boolean;
}

const PcInfo = ({
    name,
    isConfiguration,
    id,
    toggleModal,
    hasToCartBtn,
}: PcInfoProps) => {
    const cart = useAppSelector((state) => state.cart);
    const { addPcToCard, getUserCartItems } = useFetch();
    const { user } = useAppSelector((state) => state.session);
    const dispatch = useAppDispatch();

    const handleAddPcToCard = async () => {
        await addPcToCard({
            pcId: id,
            quantity: 1,
            userId: user?.userId as string,
        });
        const data: IPurchaseItem[] = await getUserCartItems();
        dispatch(setCartState(data));
    };

    return (
        <div className="pc-info">
            <div className="title-div">
                <span className="title-div--pc-name">{name}</span>
                {isConfiguration && (
                    <span className="title-div--pc-id">{id}</span>
                )}
            </div>
            <div className="pc-dashboard">
                <button
                    className="pc-dashboard__btn main-color-transparent-rect-btn"
                    onClick={() => toggleModal(1, true)}
                >
                    Cпецификация
                </button>
                <Link
                    className="pc-dashboard__btn main-color-transparent-rect-btn"
                    href={`/configurator/${id}`}
                >
                    Изменить
                </Link>
            </div>
            {hasToCartBtn && (
                <ConfigBuyBtn
                    styles={{ maxWidth: "305px" }}
                    onClick={handleAddPcToCard}
                    isPressed={!!cart.items?.find((el) => el.product.id === id)}
                />
            )}
        </div>
    );
};

export default PcInfo;
