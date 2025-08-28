import { useEffect, useState } from "react";
import useApp from "antd/es/app/useApp";
import { Avatar, Button, Card, Tooltip } from "antd";
import { EyeFilled, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import services from "../../../utils/services";
import type { IUserData } from "../../../interfaces/response/user";
import Loader from "../../../components/shared/loader";

const Users = () => {
  const [userList, setUserList] = useState<IUserData[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const { notification } = useApp();
  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      setLoader(true);
      const response = await services.getAllUsers();
      if (!response.success) {
        throw new Error(response?.error?.message ?? "Get posts failed");
      }
      setUserList(response.data);
    } catch (error: any) {
      notification.error({
        message: error?.message ?? "Unexpected error occurs on getting posts!",
      });
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (loader) {
    return <Loader className="h-[30vh]" />;
  }
  return (
    <div>
      <h2 className="text-base text-primary font-medium">Users</h2>
      <br />
      <div className="grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-4">
        {userList.map((user) => (
          <Card className="relative" key={user._id}>
            <Avatar
              src={<UserOutlined className="text-black" />}
              size={"large"}
            />
            <p className="mt-4">{user.email}</p>
            <p className="text-primary text-sm mt-1">{user.username}</p>
            <Tooltip title="User blogs">
              <Button
                onClick={() => {
                  navigate(`/user/${user._id}`);
                }}
                className=" text-primary absolute top-2 right-2"
                type="text"
                icon={<EyeFilled />}
              />
            </Tooltip>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Users;
