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

interface CloseConfiguratorModalProps {
    open: boolean;
    handleOk: () => void;
    handleCancel: () => void;
}

const CloseConfiguratorModal = ({
    open,
    handleOk,
    handleCancel,
}: CloseConfiguratorModalProps) => {
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
                            onClick={() => handleOk()}
                        >
                            Закрыть
                        </button>
                    </>
                )}
            >
                <div className="pb-2.5 flex flex-col gap-2.5">
                    <div className="text-xl pb-3">
                        Закрыть конфигуратор?
                        <br />
                        Текущая конфигурация не сохранится.
                    </div>
                </div>
            </Modal>
        </ConfigProvider>
    );
};

export default CloseConfiguratorModal;
