import { PC_TYPES } from "@/constants";
import PcInfo from "./PcInfo";
import Quantity from "./Quantity";
import DeleteModal from "@/components/modals/delete-modal/DeleteModal";
import { IPc } from "@/interfaces/types-v2";

interface PcItemRowProps {
    pc: IPc;
    quantity: number;
    open: boolean;
    toggleModal: (idx: any, target: any) => void;
    handleCancel: Function;
    handleOk: Function;
    showModal: () => void;
    handleSetQuantity: (q: number) => void;
}

const PcItemRow = ({
    pc,
    quantity,
    handleSetQuantity,
    toggleModal,
    handleCancel,
    handleOk,
    showModal,
    open,
}: PcItemRowProps) => {
    return (
        <>
            <tr className="product-item-row hidden-tablet">
                <td className="product-item-row__cell">
                    <img
                        className="product-item-row__main-image"
                        src={pc.image}
                        alt=""
                        width={320}
                        height={220}
                    />
                </td>
                <td className="product-item-row__cell">
                    <PcInfo
                        name={pc.name}
                        isConfiguration={
                            pc?.pcType?.value === PC_TYPES.CONFIGURATION
                        }
                        id={pc.id}
                        toggleModal={toggleModal}
                    />
                </td>
                <td className="product-item-row__cell available">
                    <span className="available__text">В наличии</span>
                </td>
                <td className="product-item-row__cell quantity">
                    <Quantity
                        quantity={quantity}
                        handleSetQuantity={handleSetQuantity}
                    />
                </td>
                <td className="product-item-row__cell price">
                    <span>{pc.price * quantity} BYN</span>
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
                                src={pc.image}
                                alt=""
                                width={320}
                                height={220}
                            />
                        </div>
                        <div className="grid-cell__info">
                            <PcInfo
                                name={pc.name}
                                isConfiguration={
                                    pc?.pcType?.value === PC_TYPES.CONFIGURATION
                                }
                                id={pc.id}
                                toggleModal={toggleModal}
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
                        <div className="grid-cell__available available">
                            <span className="available__text">В наличии</span>
                        </div>
                        <div className="grid-cell__price price">
                            <span>{pc.price * quantity} BYN</span>
                        </div>
                    </div>
                </td>
            </tr>
        </>
    );
};

export default PcItemRow;
