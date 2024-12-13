import { ConfigProvider } from "antd";

const AntdConfigProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Notification: {
                        zIndexPopup: 10000,
                        colorBgElevated: "var(--tm-color-light-black)",
                        colorText: "var(--tm-color-white)",
                        colorTextHeading: "var(--tm-color-white)",
                        colorIcon: "var(--tm-color-white)",
                        colorIconHover: "gray",
                    },
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
};

export default AntdConfigProvider;
