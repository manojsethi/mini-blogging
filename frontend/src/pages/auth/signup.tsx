import { useNavigate } from "react-router-dom";
import PATHS from "../../routes/path";
import services from "../../utils/services";
import type { ISignup } from "../../interfaces/request/signup";
import useApp from "antd/es/app/useApp";
import { useState } from "react";
import AuthLayout from "../../components/auth/layout";
import SignupForm from "../../components/auth/signupForm";

const Signup = () => {
  const { notification } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleOnSignup = async (values: ISignup) => {
    try {
      setLoading(true);
      const response = await services.signup(values);

      if (!response?.success) {
        throw new Error(response?.error?.message || "Signup failed!");
      }
      notification.success({
        message: "Signup Successful ",
        description: "Your account has been created. Please login to continue.",
      });
      navigate(PATHS.AUTH.LOGIN);
    } catch (error: any) {
      notification.error({
        message: "Signup Failed",
        description: error?.message ?? "Unexpected error occurred at SignUp!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="SignUp">
      <SignupForm handleOnFinish={handleOnSignup} loading={loading} />
    </AuthLayout>
  );
};

export default Signup;
