import { ConfigProvider, Modal } from "antd";
import "./ActionModal.scss";

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

interface ActionModalProps {
    open: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    message: string;
}

const ActionModal = ({
    open,
    handleOk,
    handleCancel,
    message,
}: ActionModalProps) => {
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
                            className="action-modal-btn mr main-color-transparent-rect-btn"
                            onClick={handleCancel}
                        >
                            Отмена
                        </button>
                        <button
                            className="action-modal-btn main-color-filled-rect-btn text-gray-800"
                            onClick={handleOk}
                        >
                            Да
                        </button>
                    </>
                )}
            >
                <div className="action-modal-title">
                    <p>{message}</p>
                </div>
            </Modal>
        </ConfigProvider>
    );
};

export default ActionModal;
