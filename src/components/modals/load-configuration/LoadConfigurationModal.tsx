import { ConfigProvider, Modal } from "antd";
import "../../inputs/custom-input/CustomInput.scss";
import { useState } from "react";

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

interface LoadConfigurationModalProps {
    open: boolean;
    handleOk: (id: string) => void;
    handleCancel: () => void;
}

const LoadConfigurationModal = ({
    open,
    handleOk,
    handleCancel,
}: LoadConfigurationModalProps) => {
    const [id, setId] = useState<string>("");

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
                            onClick={() => handleOk(id)}
                        >
                            Загрузить
                        </button>
                    </>
                )}
            >
                <div className="pb-2.5 flex flex-col gap-2.5">
                    <div className="text-xl pb-3">Введите код конфигурации</div>

                    <input
                        className={`form-field__input`}
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </div>
            </Modal>
        </ConfigProvider>
    );
};

export default LoadConfigurationModal;
