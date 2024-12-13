import Link from "next/link";
import "./ConfigBuyBtn.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCartItem } from "@/lib/redux/store/slices/cartSlice";

interface ConfigBuyBtnProps {
    is_btn_pressed: boolean;
    product: any;
}

const ConfigBuyBtn = ({
    is_btn_pressed = false,
    product,
}: ConfigBuyBtnProps) => {
    const [isBtnPressed, setIsBtnPressed] = useState(is_btn_pressed);

    const dispatch = useDispatch();
    const handleAddToCart = () => {
        dispatch(addCartItem(product));
    };

    const onClickToCartButton = () => {
        setIsBtnPressed(true);
        !isBtnPressed ? handleAddToCart() : null;
    };

    return (
        <>
            {isBtnPressed ? (
                <Link href={"/cart"}>
                    <button
                        onClick={onClickToCartButton}
                        className={`configuration-card__buy-button checkout-button`}
                    >
                        Оформить
                    </button>
                </Link>
            ) : (
                <button
                    onClick={onClickToCartButton}
                    className="configuration-card__buy-button _buy-button"
                >
                    Купить
                </button>
            )}
        </>
    );
};

export default ConfigBuyBtn;
