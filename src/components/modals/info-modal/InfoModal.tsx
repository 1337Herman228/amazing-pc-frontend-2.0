import { IPart } from "@/interfaces/types-v2";
import "../pc-spec-modal/PcSpecModal.scss";
import { ConfigProvider, Modal } from "antd";

const bg_color = "#111";
const modalStyles = {
    mask: {
        backdropFilter: "blur(0px)",
    },
    content: {
        color: "white",
        backgroundColor: bg_color,
    },
};

interface PartInfoModalProps {
    part: IPart;
    isModalOpen: boolean[];
    toggleModal: Function;
}

const PartInfoModal = ({
    part,
    isModalOpen,
    toggleModal,
}: PartInfoModalProps) => {
    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorIcon: "white",
                        colorIconHover: "var(--main-color)",
                    },
                }}
                modal={{
                    styles: modalStyles,
                }}
            >
                <Modal
                    centered
                    open={isModalOpen[1]}
                    onOk={() => toggleModal(1, false)}
                    onCancel={() => toggleModal(1, false)}
                    footer={null}
                    width={800}
                    zIndex={3000}
                >
                    <table className="modal-table">
                        <thead>
                            <tr className="modal-table__header">
                                <th
                                    className="modal-table__header-text"
                                    colSpan={2}
                                >
                                    {part.name}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="modal-table__row">
                                <td className="modal-table__row-info">
                                    Категория
                                </td>
                                <td className="modal-table__row-price">
                                    {part.categories.label}
                                </td>
                            </tr>
                            <tr className="modal-table__row">
                                <td className="modal-table__row-info">Тип</td>
                                <td className="modal-table__row-price">
                                    {part.types.label}
                                </td>
                            </tr>
                            {part.characteristics.map(
                                ({ label, value, item }) => (
                                    <tr
                                        key={value}
                                        className="modal-table__row"
                                    >
                                        <td className="modal-table__row-info">
                                            {label}
                                        </td>
                                        <td className="modal-table__row-price">
                                            {Array.isArray(item)
                                                ? item.join(", ")
                                                : item}
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </Modal>
            </ConfigProvider>
        </>
    );
};

export default PartInfoModal;
