import { Layout as AntdLayout } from "antd";
import Sidebar from "./sidebar";
import React, { useState } from "react";
import Header from "./header";
import { Content } from "antd/es/layout/layout";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    return (
        <AntdLayout>
            <Sidebar collapsed={collapsed} />
            <AntdLayout>
                <Header collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content
                   className="min-h-screen p-6"
                >
                    {children}
                </Content>
            </AntdLayout>
        </AntdLayout>
    );
};

export default Layout;
