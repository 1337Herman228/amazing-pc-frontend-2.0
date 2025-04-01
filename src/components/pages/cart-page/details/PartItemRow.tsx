import Quantity from "./Quantity";
import DeleteModal from "@/components/modals/delete-modal/DeleteModal";
import { IPart } from "@/interfaces/types-v2";
import OtherInfo from "./OtherInfo";

interface PartItemRowProps {
    part: IPart;
    quantity: number;
    open: boolean;
    toggleModal: (idx: any, target: any) => void;
    handleCancel: Function;
    handleOk: Function;
    showModal: () => void;
    handleSetQuantity: (q: number) => void;
}

const PartItemRow = ({
    part,
    quantity,
    handleSetQuantity,
    toggleModal,
    handleCancel,
    handleOk,
    showModal,
    open,
}: PartItemRowProps) => {
    return (
        <>
            <tr className="product-item-row hidden-tablet">
                <td className="product-item-row__cell">
                    <img
                        className="product-item-row__main-image"
                        src={part.image}
                        alt=""
                        width={320}
                        height={220}
                    />
                </td>
                <td className="product-item-row__cell">
                    <OtherInfo type={part.types.label} name={part.name} />
                </td>

                <td className="product-item-row__cell quantity">
                    <Quantity
                        quantity={quantity}
                        handleSetQuantity={handleSetQuantity}
                    />
                </td>
                <td className="product-item-row__cell price">
                    <span>{part.price * quantity} BYN</span>
                </td>
                <td className="product-item-row__cell del-btn">
                    <button onClick={showModal} className="btn-delete">
                        <img
                            src="/red-x-icon.svg"
                            alt=""
                            width={20}
                            height={20}
                        />
                    </button>
                    <DeleteModal
                        open={open}
                        handleCancel={handleCancel}
                        handleOk={handleOk}
                        message="Удалить товар из корзины?"
                    />
                </td>
            </tr>

            {/* таблица для отображения у планшетов и меньше */}
            <tr className="product-item-row visible-tablet">
                <td className="product-item-row__cell">
                    <div className="grid-cell">
                        <div className="grid-cell__main-image">
                            <img
                                src={part.image}
                                alt=""
                                width={320}
                                height={220}
                            />
                        </div>
                        <div className="grid-cell__info">
                            <OtherInfo
                                type={part.types.label}
                                name={part.name}
                            />
                        </div>
                        <div className="grid-cell__del-btn">
                            <button onClick={showModal} className="btn-delete">
                                <img
                                    src="/red-x-icon.svg"
                                    alt=""
                                    width={20}
                                    height={20}
                                />
                            </button>
                            <DeleteModal
                                open={open}
                                handleOk={handleOk}
                                handleCancel={handleCancel}
                                message="Удалить товар из корзины?"
                            />
                        </div>
                        <div className="grid-cell__quantity">
                            <Quantity
                                quantity={quantity}
                                handleSetQuantity={handleSetQuantity}
                            />
                        </div>

                        <div className="grid-cell__price price">
                            <span>{part.price * quantity} BYN</span>
                        </div>
                    </div>
                </td>
            </tr>
        </>
    );
};

export default PartItemRow;
