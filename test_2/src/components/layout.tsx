import React from "react";
import { Layout } from 'antd';

const LayoutComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            {children}
        </Layout >
    )
}

export default LayoutComponent;