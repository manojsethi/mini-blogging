import { Spin } from "antd";

const Loader = ({ className }: { className?: string }) => {
  return (
    <div className={`flex justify-center items-center h-screen ${className}`}>
      <Spin />
    </div>
  );
};

export default Loader;
