import { useEffect, useState } from "react";
import UserBlogs from "../../../components/blog/userBlogs";
import { useParams } from "react-router-dom";
import services from "../../../utils/services";
import type { IUserData } from "../../../interfaces/response/user";
import useApp from "antd/es/app/useApp";
import Loader from "../../../components/shared/loader";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState<IUserData>();
  const { notification } = useApp();
  const [loader, setLoader] = useState<boolean>(false);

  const getUserDetail = async () => {
    try {
      if (!id) {
        return;
      }
      setLoader(true);
      const response = await services.getUser(id);
      if (!response.success) {
        throw new Error(response?.error?.message ?? "Get posts failed");
      }
      setUser(response.data);
    } catch (error: any) {
      notification.error({
        message: error?.message ?? "Unexpected error occurs on getting posts!",
      });
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  if (loader) {
    return <Loader className="h-[30vh]" />;
  }
  return user && <UserBlogs user={user} />;
};

export default UserDetail;
