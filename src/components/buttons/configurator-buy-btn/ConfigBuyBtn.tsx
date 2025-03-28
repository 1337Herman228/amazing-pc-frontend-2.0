import Link from "next/link";
import "./ConfigBuyBtn.scss";
import { CSSProperties } from "react";

interface ConfigBuyBtnProps {
    isPressed: boolean;
    onClick: () => void;
    disabled?: boolean;
    styles?: CSSProperties;
}

const ConfigBuyBtn = ({
    isPressed = false,
    onClick,
    disabled,
    styles,
}: ConfigBuyBtnProps) => {
    return (
        <>
            {isPressed ? (
                <Link href={"/cart"}>
                    <button
                        style={styles}
                        className={`configuration-card__buy-button checkout-button`}
                    >
                        Оформить
                    </button>
                </Link>
            ) : (
                <button
                    onClick={onClick}
                    style={styles}
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
