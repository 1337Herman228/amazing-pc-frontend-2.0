import { ConfigProvider, Modal } from "antd";

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

interface ResetModalModalProps {
    open: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    message: string;
}

const ResetModal = ({
    open,
    handleOk,
    handleCancel,
    message,
}: ResetModalModalProps) => {
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
                            className="h-9 mr-1 main-color-transparent-rect-btn"
                            onClick={handleCancel}
                        >
                            Отмена
                        </button>
                        <button
                            className="h-9 main-color-filled-rect-btn text-gray-800 font-semibold"
                            onClick={handleOk}
                        >
                            Да
                        </button>
                    </>
                )}
            >
                <div className="text-xl pb-3">
                    <p>{message}</p>
                </div>
            </Modal>
        </ConfigProvider>
    );
};

export default ResetModal;
