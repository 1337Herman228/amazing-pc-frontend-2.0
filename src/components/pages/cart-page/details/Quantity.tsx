interface QuantityProps {
    quantity: number;
    handleSetQuantity: (q: number) => void;
}

const Quantity = ({ quantity, handleSetQuantity }: QuantityProps) => {
    return (
        <div className="quantity">
            <button
                onClick={() => handleSetQuantity(quantity - 1)}
                className={`quantity__btn-change-count ${
                    quantity === 1 ? "disabled" : ""
                }`}
            >
                <svg width="16" height="16" viewBox="0 0 20 20">
                    <rect width="18" height="1" x="1" y="9"></rect>
                </svg>
            </button>
            <input
                onChange={(e) => handleSetQuantity(+e.target.value)}
                className="quantity__input"
                value={quantity}
                min={1}
                max={99}
                type="number"
            />
            <button
                onClick={() => handleSetQuantity(quantity + 1)}
                className={`quantity__btn-change-count ${
                    quantity === 99 ? "disabled" : ""
                }`}
            >
                <svg width="16" height="16" viewBox="0 0 20 20">
                    <rect width="1" height="17" x="9" y="1"></rect>
                    <rect width="17" height="1" x="1" y="9"></rect>
                </svg>
            </button>
        </div>
    );
};

export default Quantity;
