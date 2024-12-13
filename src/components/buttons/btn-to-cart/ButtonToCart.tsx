import Link from "next/link";
import "./ButtonToCart.scss";
import { useState } from "react";
import { useAppDispatch } from "@/lib/redux/store/store";
import { addCartItem } from "@/lib/redux/store/slices/cartSlice";

interface ButtonToCartProps {
    is_btn_pressed?: boolean;
    product: any; // временно
}

const ButtonToCart = ({
    is_btn_pressed = false,
    product,
}: ButtonToCartProps) => {
    console.log("product", product);

    const [isBtnPressed, setIsBtnPressed] = useState(is_btn_pressed);

    const dispatch = useAppDispatch();

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
                    className="configuration-card__buy-button buy-button"
                >
                    В корзину
                </button>
            )}
        </>
    );
};

export default ButtonToCart;
