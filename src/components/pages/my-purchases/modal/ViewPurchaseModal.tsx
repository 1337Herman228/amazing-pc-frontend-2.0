import PcSpecModal from "@/components/modals/pc-spec-modal/PcSpecModal";
import { IPc, IPurchase, IPurchaseItem } from "@/interfaces/types-v2";
import { mapPcToConfiguratorFieldValues } from "@/lib/functions";
import { ConfigProvider, Modal } from "antd";
import { useState } from "react";
import InfoModal from "@/components/modals/info-modal/InfoModal";

const bg_color = "#111";
const modalStyles = {
    mask: {
        backdropFilter: "blur(3px)",
    },
    content: {
        color: "white",
        backgroundColor: bg_color,
        borderRadius: "5px",
    },
};

interface ViewPurchaseModalProps {
    open: boolean;
    handleCancel: () => void;
    purchase: IPurchase;
}

const ViewPurchaseModal = ({
    open,
    handleCancel,
    purchase,
}: ViewPurchaseModalProps) => {
    return (
        <ConfigProvider
            modal={{
                styles: modalStyles,
            }}
        >
            <Modal
                centered
                open={open}
                closeIcon={false}
                onCancel={handleCancel}
                width={1250}
                footer={null}
            >
                <div className="">
                    <ul className="flex flex-col overflow-y-auto max-h-[700px]">
                        {purchase.itemList.map((item) => (
                            <ItemRow key={item.id} item={item} />
                        ))}
                    </ul>
                </div>
            </Modal>
        </ConfigProvider>
    );
};

interface ItemRowProps {
    item: IPurchaseItem;
}

const ItemRow = ({ item }: ItemRowProps) => {
    const [isModalOpen, setIsModalOpen] = useState([false, false]);
    const toggleModal = (idx: any, target: any) => {
        setIsModalOpen((p) => {
            p[idx] = target;
            return [...p];
        });
    };

    return (
        <li className="border-b-1 nth-last-1:border-b-0 border-[#5a5d5f] p-3.5 flex flex-row gap-4 place-items-center text-md">
            <div className="">
                <img
                    className=""
                    src={item?.product?.image || ""}
                    alt={item?.product?.name}
                    width={250}
                    height={250}
                />
            </div>
            <div className="ml-4">
                <div className="mb-2">{item.product.name}</div>
                {"cpu" in item.product &&
                    item.product.pcType.value === "configuration" && (
                        <div className="text-[#c0ff01] mb-2 ">
                            {item.product.id}
                        </div>
                    )}
                <button
                    onClick={() => toggleModal(1, true)}
                    className="button-transparent-white !rounded-none p-2 !text-xs cursor-pointer px-4"
                >
                    Характеристики
                </button>
            </div>
            <div className="text-md p-4 pl-6">{item.quantity} шт.</div>
            <div className="p-3">{item.quantity * item.product?.price} BYN</div>

            {"cpu" in item.product ? (
                <PcSpecModal
                    product={mapPcToConfiguratorFieldValues(
                        item.product as IPc
                    )}
                    isModalOpen={isModalOpen}
                    toggleModal={toggleModal}
                />
            ) : (
                <InfoModal
                    part={item.product}
                    isModalOpen={isModalOpen}
                    toggleModal={toggleModal}
                />
            )}
        </li>
    );
};

export default ViewPurchaseModal;
