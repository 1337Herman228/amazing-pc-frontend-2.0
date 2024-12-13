// @ts-nocheck
import { ConfigProvider, Modal } from "antd";
import "./DeleteModal.scss";

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

const DeleteModal = ({
    open,
    handleOk,
    handleCancel,
    message = "Удалить товар из корзины?",
}) => {
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
                width={550}
                footer={(_) => (
                    <>
                        <button
                            className="delete-modal-btn mr main-color-transparent-rect-btn"
                            onClick={handleCancel}
                        >
                            Отмена
                        </button>
                        <button
                            className="delete-modal-btn main-color-filled-rect-btn"
                            onClick={handleOk}
                        >
                            Да
                        </button>
                    </>
                )}
            >
                <div className="delete-modal-title">
                    <p>{message}</p>
                </div>
            </Modal>
        </ConfigProvider>
    );
};

export default DeleteModal;
