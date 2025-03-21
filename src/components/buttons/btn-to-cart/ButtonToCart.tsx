import Link from "next/link";
import "./ButtonToCart.scss";

interface ButtonToCartProps {
    isPressed: boolean;
    onClick: () => void;
}

const ButtonToCart = ({ isPressed = false, onClick }: ButtonToCartProps) => {
    return (
        <>
            {isPressed ? (
                <Link href={"/cart"}>
                    <button
                        className={`configuration-card__buy-button checkout-button`}
                    >
                        Оформить
                    </button>
                </Link>
            ) : (
                <button
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
