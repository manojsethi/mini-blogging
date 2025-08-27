import { Button, Form, Input } from "antd";
import type { ISignup } from "../../interfaces/request/signup";
import { useNavigate } from "react-router-dom";
import PATHS from "../../routes/path";

const SignupForm = ({
  handleOnFinish,
  loading,
}: {
  handleOnFinish: (values: ISignup) => void;
  loading: boolean;
}) => {
  const navigate = useNavigate();
  
  return (
    <Form
      onFinish={handleOnFinish}
      onFinishFailed={() => {}}
      autoComplete="off"
    >
      <label className=" text-sm">Username</label>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Username is required!" }]}
      >
        <Input
          min={3}
          max={30}
          className="h-[40px] mt-1"
          placeholder="Write your username"
        />
      </Form.Item>
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

      <label className=" text-sm">Confirm Password</label>
      <Form.Item
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Please confirm your password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords do not match!"));
            },
          }),
        ]}
      >
        <Input.Password
          className="h-[40px] mt-1"
          placeholder="Confirm your password"
        />
      </Form.Item>
      <Form.Item>
        <Button
          loading={loading}
          htmlType="submit"
          className="w-full h-[40px] mt-4 text-base rounded-full"
          type="primary"
        >
          Submit
        </Button>
      </Form.Item>

      <p className="text-end mt-3">
        Already have an account?{" "}
        <span
          onClick={() => {
            navigate(PATHS.AUTH.LOGIN);
          }}
          className="text-primary p-0 cursor-pointer"
        >
          Sign in
        </span>
      </p>
    </Form>
  );
};

export default SignupForm;
