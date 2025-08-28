import { useNavigate } from "react-router-dom";
import PATHS from "../../routes/path";
import type { ILogin } from "../../interfaces/request/login";
import services from "../../utils/services";
import useApp from "antd/es/app/useApp";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import AuthLayout from "../../components/auth/layout";
import LoginForm from "../../components/auth/loginForm";

const Login = () => {
  const navigate = useNavigate();
  const { notification } = useApp();
  const { setAuth } = useContext(AuthContext);

  const handleOnLogin = async (values: ILogin) => {
    try {
      const response = await services.login(values);

      if (!response?.success) {
        throw new Error(response?.error?.message || "Login failed!");
      }
      setAuth({
        ...response.data,
        user: { ...response.data.user, _id: response.data.user.id },
      });
      notification.success({
        message: "Welcome Back",
        description: "You have successfully logged in.",
      });
      navigate(PATHS.ROOT);
    } catch (error: any) {
      notification.error({
        message: "Login Failed",
        description: error?.message ?? "Unexpected error occurred at Login!",
      });
    }
  };
  return (
    <AuthLayout title="Login">
      <LoginForm handleOnFinish={handleOnLogin} />
    </AuthLayout>
  );
};

export default Login;
