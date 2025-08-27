import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import CreatePostModal from "../../components/post/create.modal";

const Dashboard = () => {
  const [isCreatePost, setIsCreatePost] = useState<boolean>(false);

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-base text-primary">Posts</h2>
        <Button
          onClick={() => {
            setIsCreatePost(true);
          }}
          type="primary"
          icon={<PlusOutlined />}
        >
          Post
        </Button>
      </div>
      {isCreatePost && (
        <CreatePostModal
          isVisible={isCreatePost}
          handleOnClose={() => {
            setIsCreatePost(false);
          }}
        />
      )}
    </>
  );
};

export default Dashboard;
