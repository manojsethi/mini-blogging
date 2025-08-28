import { Header as AppHeader } from "antd/es/layout/layout";
import { Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const Header = ({
  collapsed,
  setCollapsed,
  onMobileMenu,
}: {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
  onMobileMenu?: () => void;
}) => {
  return (
    <AppHeader className="bg-white p-0">
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => {
          setCollapsed(!collapsed);
          onMobileMenu&&onMobileMenu();
        }}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
    </AppHeader>
  );
};

export default Header;
