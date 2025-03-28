import Link from "next/link";
import "./ButtonToCart.scss";
import { CSSProperties } from "react";

interface ButtonToCartProps {
    isPressed: boolean;
    onClick: () => void;
    style?: CSSProperties;
}

const ButtonToCart = ({
    isPressed = false,
    onClick,
    style,
}: ButtonToCartProps) => {
    return (
        <>
            {isPressed ? (
                <Link href={"/cart"}>
                    <button
                        style={style}
                        className={`configuration-card__buy-button checkout-button`}
                    >
                        Оформить
                    </button>
                </Link>
            ) : (
                <button
                    style={style}
                    onClick={onClick}
                    className="configuration-card__buy-button buy-button"
                >
                    Купить
                </button>
            )}
        </>
    );
};

export default ButtonToCart;
