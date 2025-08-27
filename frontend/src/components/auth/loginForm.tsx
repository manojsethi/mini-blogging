import { Button, Form, Input } from "antd";
import type { ILogin } from "../../interfaces/request/login";
import { useNavigate } from "react-router-dom";
import PATHS from "../../routes/path";

const LoginForm = ({
  handleOnFinish,
}: {
  handleOnFinish: (val: ILogin) => void;
}) => {
  const navigate = useNavigate();

  return (
    <Form
      onFinish={handleOnFinish}
      autoComplete="off"
    >
      <label className=" text-sm">Email</label>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Email is required!" },
          { type: "email", message: "Please enter a valid email address!" },
        ]}
      >
        <Input className="h-[40px] mt-1" placeholder="Enter your email" />
      </Form.Item>

      <label className=" text-sm">Password</label>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Password is required!" }]}
      >
        <Input.Password
          className="h-[40px] mt-1"
          placeholder="Enter your password"
        />
      </Form.Item>

      <Form.Item>
        <Button
          htmlType="submit"
          className="w-full h-[40px] mt-4 text-base rounded-full"
          type="primary"
        >
          Submit
        </Button>
      </Form.Item>

      <p className="text-end mt-3">
        Don’t have an account?{" "}
        <span
          onClick={() => {
            navigate(PATHS.AUTH.SIGNUP);
          }}
          className="text-primary p-0 cursor-pointer"
        >
          Sign up
        </span>
      </p>
    </Form>
  );
};

export default LoginForm;
