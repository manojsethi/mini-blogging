import { Layout as AntdLayout, Drawer, Grid } from "antd";
import Sidebar from "./sidebar";
import React, { useState } from "react";
import Header from "./header";
import { Content } from "antd/es/layout/layout";

const { useBreakpoint } = Grid;

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const screens = useBreakpoint();
  const isDesktop = screens.lg;
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  return (
    <AntdLayout className="min-h-screen">
      {isDesktop && <Sidebar collapsed={collapsed} />}
      {!isDesktop && (
        <Header
          onMobileMenu={() => setMobileOpen(true)}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      )}
      <AntdLayout>
        {isDesktop && (
          <Header
            onMobileMenu={() => setMobileOpen(true)}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
        )}
        {!isDesktop && (
          <Drawer
            placement="left"
            open={mobileOpen}
            width={280}
            getContainer={false}
            onClose={() => setMobileOpen(false)}
          >
            <Sidebar collapsed={false} />
          </Drawer>
        )}
        <Content className="min-h-[93vh] p-6">{children}</Content>
      </AntdLayout>
    </AntdLayout>
  );
};

export default Layout;
