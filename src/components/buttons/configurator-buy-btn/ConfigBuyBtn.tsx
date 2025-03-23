import Link from "next/link";
import "./ConfigBuyBtn.scss";

interface ConfigBuyBtnProps {
    isPressed: boolean;
    onClick: () => void;
    disabled?: boolean;
}

const ConfigBuyBtn = ({
    isPressed = false,
    onClick,
    disabled,
}: ConfigBuyBtnProps) => {
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
                    className={`configuration-card__buy-button _buy-button ${
                        disabled && "_buy-button--disabled"
                    }`}
                >
                    Купить
                </button>
            )}
        </>
    );
};

export default ConfigBuyBtn;
