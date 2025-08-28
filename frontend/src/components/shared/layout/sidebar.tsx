import {
  FileZipOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useLocation, useNavigate } from "react-router-dom";
import PATHS from "../../../routes/path";
import useApp from "antd/es/app/useApp";
import common from "../../../utils/common";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    modal: { confirm },
  } = useApp();
  const { setAuth } = useContext(AuthContext);

  const sidebarItems = [
    {
      key: PATHS.USERS.ROOT,
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
      className="bg-white min-h-[88vh] !relative"
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
      <div className="absolute bottom-32 w-full flex justify-center">
        <Button
          onClick={() => {
            confirm({
              title: "Do you want to logout?",
              type: "confirm",
              onOk: () => {
                common.deleteCookie("blog_user");
                setAuth(null);
                navigate(PATHS.AUTH.LOGIN);
              },
            });
          }}
          type="primary"
        >
          Logout
        </Button>
      </div>
    </Sider>
  );
};

export default Sidebar;
