import { ConfigProvider, Modal } from "antd";
import "../../inputs/custom-input/CustomInput.scss";
import { useEffect, useState } from "react";

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

interface SaveConfigurationModalProps {
    open: boolean;
    handleOk: (name: string) => void;
    handleCancel: () => void;
    defaultName?: string;
}

const SaveConfigurationModal = ({
    open,
    handleOk,
    handleCancel,
    defaultName,
}: SaveConfigurationModalProps) => {
    const [name, setName] = useState<string>(defaultName || "");

    useEffect(() => {
        setName(defaultName || "");
    }, [defaultName, open]);

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
                            onClick={() => handleOk(name)}
                        >
                            Сохранить
                        </button>
                    </>
                )}
            >
                <div className="pb-2.5 flex flex-col gap-2.5">
                    <div className="text-xl pb-3">
                        Придумайте название для своей конфигурации
                    </div>

                    <input
                        className={`form-field__input `}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
            </Modal>
        </ConfigProvider>
    );
};

export default SaveConfigurationModal;
