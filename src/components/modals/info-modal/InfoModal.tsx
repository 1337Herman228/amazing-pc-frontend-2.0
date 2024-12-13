// @ts-nocheck

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

const InfoModal = ({ data, isModalOpen, name, toggleModal }) => {
    const makeObjectEntries = (data) => {
        if (data != undefined) return Object.entries(data);
        else return [];
    };

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
                                    Характеристики {name}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {makeObjectEntries(data).map(([key, value]) => (
                                <tr key={key} className="modal-table__row">
                                    <td className="modal-table__row-info">
                                        {key}
                                    </td>
                                    <td className="modal-table__row-price">
                                        {value}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Modal>
            </ConfigProvider>
        </>
    );
};

export default InfoModal;
