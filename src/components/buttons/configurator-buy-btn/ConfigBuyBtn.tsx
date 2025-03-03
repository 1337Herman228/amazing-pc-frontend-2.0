import Link from "next/link";
import "./ConfigBuyBtn.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface ConfigBuyBtnProps {
    isPressed: boolean;
    onClick: () => void;
}

const ConfigBuyBtn = ({ isPressed = false, onClick }: ConfigBuyBtnProps) => {
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
                    className="configuration-card__buy-button _buy-button"
                >
                    Купить
                </button>
            )}
        </>
    );
};

export default ConfigBuyBtn;
