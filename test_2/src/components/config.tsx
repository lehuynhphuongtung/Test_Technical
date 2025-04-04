import React from "react";
import { ConfigProvider } from "antd";
import { useDarkMode } from "../context/darkmode";

const ConfigProviderComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { statusMode } = useDarkMode();
    return (
        <ConfigProvider
            theme={!statusMode ?
                {
                    token: {
                        colorPrimary: "#4F46E5",
                        colorBgContainer: "#fff",
                        colorBgLayout: "#C7D2FE",
                        colorText: "#000"
                    }
                } : {
                    token: {
                        colorPrimary: "#4F46E5",
                        colorBgContainer: "#374151",
                        colorBgLayout: "#C7D2FE",
                        colorText: "#fff"
                    },
                    components: {
                        Input: {
                            colorTextPlaceholder: "#9CA3AF"
                        },
                        Select: {
                            optionSelectedColor: "#374151"
                        },
                        Message: {
                            colorText: "#000"
                        },
                        Skeleton: {
                            gradientFromColor: "#9CA3AF"
                        }

                    }
                }}
        >
            {children}
        </ConfigProvider>
    );
};

export default ConfigProviderComponent;