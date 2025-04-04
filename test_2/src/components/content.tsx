import React from "react";
import { Layout, theme } from "antd";

const { Content } = Layout;

const ContentComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Content
            style={{
                margin: "24px 24px",
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
            }}
        >
            {children}
        </Content>
    );
};

export default ContentComponent;