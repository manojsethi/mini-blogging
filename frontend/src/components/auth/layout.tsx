import { Card } from "antd";
import React from "react";

const AuthLayout = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex justify-center items-center h-screen max-md:px-3">
      <Card className="w-full shadow-lg md:max-w-[500px] max-w-[400px]">
        <div className="my-2">
          <h2 className="text-2xl font-semibold mb-5 text-center text-primary">
            {title}
          </h2>
          {children}
        </div>
      </Card>
    </div>
  );
};

export default AuthLayout;
