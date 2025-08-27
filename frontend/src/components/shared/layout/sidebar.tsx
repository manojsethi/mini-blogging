import {
  FileZipOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useLocation, useNavigate } from "react-router-dom";
import PATHS from "../../../routes/path";

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const sidebarItems = [
    {
      key: PATHS.USERS,
      icon: <UserOutlined />,
      label: "Users",
    },
    {
      key: PATHS.BLOGS,
      icon: <FileZipOutlined />,
      label: "Blogs",
    },
    {
      key: PATHS.PROFILE,
      icon: <ProfileOutlined />,
      label: "Profile",
    },
  ];
  return (
    <Sider
      className="bg-white"
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <h1 className="text-center mt-6 text-primary">LOGO</h1>
      <div className="mt-6" />
      <Menu
        mode="inline"
        defaultSelectedKeys={[pathname]}
        items={sidebarItems.map((item) => {
          return { ...item, onClick: () => navigate(item.key) };
        })}
      />
    </Sider>
  );
};

export default Sidebar;
