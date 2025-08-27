import {
    HomeOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useNavigate } from "react-router-dom";
import PATHS from "../../../routes/path";

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
    const navigate = useNavigate();
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
                defaultSelectedKeys={["1"]}
                items={[
                    {
                        key: "home",
                        icon: <HomeOutlined />,
                        label: "Home",
                        onClick: () => {
                            navigate(PATHS.ROOT);
                        },
                    },
                    {
                        key: "users",
                        icon: <UserOutlined />,
                        label: "Users",
                        onClick: () => {
                            navigate(PATHS.USERS.ROOT);
                        },
                    },
                ]}
            />
        </Sider>
    );
};

export default Sidebar;
