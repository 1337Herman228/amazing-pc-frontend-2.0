import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { ConfigProvider, Spin } from "antd";
import "./LoadingPage.scss";

const LoadingPage = () => (
    <div className="spinner-container">
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#c0ff01",
                },
            }}
        >
            <Spin
                // fullscreen
                indicator={
                    <LoadingOutlined
                        style={{
                            fontSize: 70,
                        }}
                        spin
                    />
                }
            />
        </ConfigProvider>
    </div>
);
export default LoadingPage;
